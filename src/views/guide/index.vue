<template>
  <div class="app-container">
    <aside>
      更具体的使用方式请参见
      <a href="https://xiaomi.f.mioffice.cn/docx/doxk4WtviFurh2OITx3XkCI4New" target="_blank">使用指南</a>
    </aside>
    <el-button :icon="QuestionFilled" type="primary" @click.prevent.stop="guide">
      新手教程
    </el-button>
  </div>
</template>

<script>
import { driver } from 'driver.js'; // import driver.js
import 'driver.js/dist/driver.css'; // import driver.js css
import { defineComponent, markRaw } from 'vue';
import steps from './steps';
import { QuestionFilled } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'Guide',
  data() {
    return {
      QuestionFilled: markRaw(QuestionFilled),
      driver: null
    };
  },
  mounted() {
    this.driver = driver({
      steps
    });
  },
  methods: {
    guide() {
      this.driver.drive();
    }
  }
});
</script>
