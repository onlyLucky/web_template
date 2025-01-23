<script setup lang="ts">
import { useUserStore } from '../../store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
let userInfo = userStore.userInfo
const router = useRouter()
function toHome() {
    ElMessage('你好')
    router.push('/home')
}
</script>

<template>
    <div class="login-wrap">
        <p @click="toHome">登录页面1111</p>
        <el-button>Default</el-button>
<!--        {{ userInfo.username }}的年龄是{{ userInfo.age }}-->
    </div>
</template>

<style scoped>
.login-wrap {
    width: 100%;
    height: 100vh;
    background-size: 100% 100%;
    position: relative;
    box-sizing: border-box;

}

.login-wrap p {
    cursor: pointer;
    color: blue;
}
</style>
