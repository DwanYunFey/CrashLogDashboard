<template>
  <el-descriptions title="" :column="1" border>
    <el-descriptions-item v-for="(v, k) in info" :label="k" :key="k">{{ v }}</el-descriptions-item>
  </el-descriptions>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    info: {
      type: Object,
    },
  },
});
</script>
