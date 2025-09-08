<template>
    <SubPage Dst="https://cleanea.dun.mi.com"></SubPage>
</template>
<script>
import { defineComponent } from 'vue';
import SubPage from '@/views/external-link/components/SubPage.vue';

export default defineComponent({
    name: 'Document',
    components: { SubPage },
})
</script>
<style scoped></style>