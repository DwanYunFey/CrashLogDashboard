<template>
    <SubPage Dst="https://cleanea.dun.mi.com/whitelist/json_update"></SubPage>
</template>
<script>
import { defineComponent } from 'vue';
import SubPage from '@/views/external-link/components/SubPage.vue';

export default defineComponent({
    name: 'WhiteListConf',
    components: { SubPage },
})
</script>
<style scoped></style>