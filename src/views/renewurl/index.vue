<template>
    <div class="container">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="userInput"
            placeholder="请输入 Presigned URL" style="width: 50%"></el-input>
        <div style="margin: 10px 0;"></div>
        <el-button type="primary" @click="handleGenerateUrl" style="margin-top: 10px">
            生成 URL并下载文件
        </el-button>
        <div style="margin: 30px 0;"></div>
        <div v-if="generatedUrl">
            <el-alert title="生成 URL 成功！60分钟后需重新生成！" type="success" effect="dark" style="width: 50%">
            </el-alert>
            <div style="margin: 30px 0;"></div>
            <el-card class="box-card" style="width: 80%">
                <el-link type="primary" :href="generatedUrl">{{ generatedUrl }}</el-link>
            </el-card>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { RenewURL } from '@/api/presigned'
export default defineComponent({
    name: "RenewUrl",
    data() {
        return {
            userInput: '', // 存储输入框内容
            generatedUrl: '' // 存储后端返回的 URL
        };
    },
    methods: {
        // 处理生成 URL 的函数
        handleGenerateUrl() {
            // 发起 POST 请求
            RenewURL(this.userInput).then(
                response => {
                    // 假设返回的是 URL
                    this.generatedUrl = response.data.url;
                    // 自动打开返回的 URL
                    window.open(this.generatedUrl);
                })
        },
    }
});
</script>

<style scoped>
.container {
    padding: 20px;
}
</style>