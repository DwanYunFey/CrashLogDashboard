import Mock from 'mockjs';

const List = [];
const count = 100;
const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i,  // 自增主键
    time: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),  // 字符串格式的时间
    name: "abcd", // 随机文件名，后缀可以是txt, pdf, docx等
    version: "dsssss",
    timestamp: Mock.Random.date('T') / 1000,  // 生成时间戳，Mock.Random.date('T') 返回的日期是ISO格式，除以1000转为 Unix 时间戳
  }));
}
/***
 *      ListCoreDumpRequest: {
        page: 1,  // 分页的页数
        limit: 20, // 每页的数量
        name: "", // 文件名称的模糊搜索
        product: "", // 产品型号
        version: "", // mcu 版本
        timDesc: true, // 时间字段降序排序
        verDesc: true // 版本字段降序排序
      },
 */
export default [
  {
    url: '/vue-element-admin/article/list',
    method: 'get',
    response: config => {
      const { page = 1, limit = 20, name, product, version, timDesc, verDesc } = config.query;
      console.log("hdahdhahd")
      let mockList = List

      const pageList = mockList.filter((_, index) => index < limit * page && index >= limit * (page - 1));

      return {
        code: 20000,
        msg: "ok",
        data: {
          "items": pageList,
          "total": 200,
        }
      };
    }
  },

  {
    url: '/vue-element-admin/article/detail',
    method: 'get',
    response: config => {
      const { id } = config.query;
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          };
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    method: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      };
    }
  },

  {
    url: '/vue-element-admin/article/create',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      };
    }
  },

  {
    url: '/vue-element-admin/article/update',
    method: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      };
    }
  }
];

