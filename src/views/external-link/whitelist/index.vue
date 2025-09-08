<template>
    <SubPage Dst="https://cleanea.dun.mi.com/whitelist/"></SubPage>
</template>
<script>
import { defineComponent } from 'vue';
import SubPage from '@/views/external-link/components/SubPage.vue';

export default defineComponent({
    name: 'WhiteListMain',
    components: { SubPage },
})
</script>
<style scoped></style>