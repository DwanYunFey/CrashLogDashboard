<template>
    <iframe :src="Dst"></iframe>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SubPage',
    props: {
        Dst: {
            type: String,
        }
    }
});
</script>

<style scoped>
iframe {
    width: 100%;
    /* 设置宽度为父容器的 100% */
    height: 100vh;
    /* 高度为视口的 100% */
    border: none;
    /* 去掉 iframe 的默认边框 */
    max-width: 100%;
    /* 最大宽度限制为父容器的 100% */
    display: block;
    /* 使 iframe 作为块级元素，避免影响布局 */
    margin: 0 auto;
    /* 居中显示 */
}
</style>