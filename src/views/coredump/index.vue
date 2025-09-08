<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="ListCoreDumpRequest.name" placeholder="文件名称" style="width: 120px;" class="filter-item"
        @keyup.enter="ClickSearch" />
      <el-select v-model="ListCoreDumpRequest.product" placeholder="产品型号" clearable style="width: 120px"
        class="filter-item">
        <el-option v-for="item in Options.products" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="ListCoreDumpRequest.version" placeholder="版本" clearable style="width: 120px"
        class="filter-item">
        <el-option v-for="item in Options.version" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-button class="filter-item" type="success" :icon="search.icon" @click="ClickSearch">
        <span v-waves>搜索</span>
      </el-button>
      <el-button :loading="excel.loading" class="filter-item" type="primary" :icon="excel.icon" @click="export2Excel">
        <span v-waves>下载所有日志</span>
      </el-button>
    </div>
    <el-table :key="table.Key" v-loading="table.loading" :data="table.items" border fit highlight-current-row
      style="width: 100%;" @sort-change="sortByColumn">
      <el-table-column label="ID" align="center" width="80px">
        <template v-slot="{ $index }"> <!-- row在数组中的索引 -->
          <span>{{ $index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" prop="datetime" min-width="150px" sortable="custom" align="center"
        :class-name="Sort.class">
        <template v-slot="{ row }">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品型号" min-width="100px">
        <template v-slot="{ row }">
          <span class="link-type" @click="ToFdsBucket(row.name)">{{ row.name }}</span>
          <el-tag v-if="row.tag !== ''">{{ row.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="SN" min-width="150px">
        <template v-slot="{ row }">
          <span>{{ row.sn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="uid" min-width="100px">
        <template v-slot="{ row }">
          <span class="link-type" @click="ToQueryLink">{{ row.uid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="did" min-width="100px">
        <template v-slot="{ row }">
          <span class="link-type" @click="ToQueryLink">{{ row.did }}</span>
        </template>
      </el-table-column>
      <el-table-column label="程序" width="150px" align="center">
        <template v-slot="{ row }">
          <span>{{ row.exe }}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本" width="150px" align="center">
        <template v-slot="{ row }">
          <span>{{ row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230px" class-name="small-padding fixed-width">
        <template v-slot="{ row }">
          <el-button type="success" size="small" @click="CatMiInfo(row.id)">
            详细信息
          </el-button>
          <el-button type="primary" size="small" @click="DownLoadCoreDump(row.id)">
            下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="table.total > 0" :total="table.total" v-model:page="ListCoreDumpRequest.page"
      v-model:limit="ListCoreDumpRequest.limit" @pagination="getItems" />

    <el-dialog title="详细信息" v-model="miInfo.Visible" :width="'70%'">
      <template #default>
        <el-scrollbar style="height: 400px; overflow-y: auto">
          <pre>{{ miInfo.Content }}</pre>
        </el-scrollbar>
      </template>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="miInfo.Visible = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, markRaw } from 'vue';
import waves from '@/directive/waves'; // 按钮的波浪特效
import { Search, Download } from '@element-plus/icons-vue';
import { CoredumpAllExcel, CoredumpFdsUrl, CoreDumpList, CoredumpMiInfo } from '@/api/coredump';
import { VersionsAll } from '@/api/mcu';
import { ProductsAll } from '@/api/product';
import Pagination from '@/components/Pagination'; // secondary package based on el-pagination

export default defineComponent({
  name: 'CoreDump',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      table: {
        Key: 0, // 每次表变化，table.Key++ Vue重新渲染
        items: [], // 表格某一页数据源：后端
        total: 0, // 总条目数：后端
        loading: true // 表示当表格数据加载过程中，表格是否显示一个 loading 动画
      },
      Options: {
        products: [],  // 可以选择的产品型号：后端
        version: [] // 可以选择的版本型号：后端
      },
      ListCoreDumpRequest: {
        page: 1,  // 分页的页数
        limit: 20, // 每页的数量
        name: "", // 文件名称的模糊搜索
        product: "", // 产品型号
        version: "", // mcu 版本
        timdesc: true, // 时间字段降序排序（始终为 true)
        verdesc: true // mcu版本字段降序排序（始终为 true)
      },
      Sort: {
        class: "descending"
      },
      excel: {
        loading: false,
        icon: markRaw(Download)
      },
      search: {// 标记这个图标对象为原始对象
        icon: markRaw(Search)
      },
      miInfo: {
        Visible: false,
        Content: "此崩溃日志没有启用文本摘要功能"
      }
    };
  },
  created() {
    this.getItems();
    this.GetAllProducts()
    this.GetAllMcu()

  },
  methods: {
    ToQueryLink() {
      window.open("https://iot.mi.com/fe-op/manageCenter/member/enterprise")
    },
    ToFdsBucket(name) {
      if (!name.startsWith("xiaomi-")) {
        name = "xiaomi-" + name
      }
      window.open("https://cloud.mioffice.cn/fusion-ui/#/product/file-store/objects/" + name)
    },
    GetAllMcu() {
      VersionsAll().then(response => {
        this.Options.version = response.data.items
      })
    },
    GetAllProducts() {
      ProductsAll().then(response => {
        this.Options.products = response.data.items
      })
    },
    getItems() {
      this.table.loading = true;
      CoreDumpList(this.ListCoreDumpRequest).then(response => {
        this.table.items = response.data.items;
        this.table.total = response.data.total;
        this.Sort.class = this.ListCoreDumpRequest.timdesc ? "descending" : "ascending"
        this.table.loading = false
      });
    },
    ClickSearch() {
      this.ListCoreDumpRequest.page = 1;
      this.getItems();
    },
    sortByColumn({ prop, order }) {
      if (prop !== 'datetime' || order === this.Sort.class) { return; }
      this.Sort.class = order
      this.table.items.sort((a, b) => {
        let result = a.timestamp - b.timestamp
        if (result === 0) {
          result = a.version - b.version
        }
        return order === "ascending" ? result : -result
      })
    },
    DownLoadCoreDump(id) {
      CoredumpFdsUrl(id).then(response => {
        window.open(response.data.url);
      })
    },
    CatMiInfo(id) {
      window.open("https://cleanea.dun.mi.com/backend/goapi/coredump/miinfo?id=" + id)
    },
    export2Excel() {
      window.open("https://cleanea.dun.mi.com/backend/goapi/coredump/allexcel")
    }
  }
});
</script>
<style>
.filter-container {
  display: flex;
  flex-wrap: wrap;
  /* 允许换行 */
  gap: 10px;
  /* 这里设置每个元素之间的间隔为 10px */
}

.filter-item {
  margin-right: 10px;
  /* 为每个元素添加右边距 */
}
</style>