<template>
  <div class="signin">
    <el-form>
      <el-form-item>
        <el-input placeholder="用户名" type="text" v-model="username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="email" type="email" v-model="email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="输入密码"
          type="password"
          v-model="password"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <el-button plain @click="signin">登录</el-button>
    <el-button type="info" plain @click="signup">注册</el-button>
  </div>
</template>

<script lang="ts">
  import { ElInput, ElButton, ElForm, ElFormItem, ElMessage } from 'element-plus'
  import { defineComponent, reactive, toRefs, onBeforeMount, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { userModel } from '../../requests/requests'
  export default defineComponent({
    name: '',
    components: {
      ElInput,
      ElButton,
      ElForm,
      ElFormItem
    },
    setup() {
      const data = reactive({
        username: '',
        email: '',
        password: ''
      })

      const store = useStore()
      const router = useRouter()

      async function signin() {
        if (!data.username || !data.email || !data.password) {
          ElMessage.warning('请填写完整')
          return
        }
        try {
          const res = await userModel.signin(data.username, data.email, data.password)
          if (res.data.code !== 400) {
            ElMessage.success('登录成功')
            store.commit('changeSignFlag', true)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)
            localStorage.setItem('username', res.data.username)
            router.push('/home')
          } else {
            ElMessage.error('用户名或密码错误')
          }
        } catch (error) {
          throw error
        }
      }

      async function signup() {
        if (!data.username || !data.email || !data.password) {
          ElMessage.warning('请填写完整')
          return
        }
        try {
          const res = await userModel.signup(data.username, data.email, data.password)
          if (res.data.code === 500) {
            ElMessage.warning('用户已存在')
          } else {
            ElMessage.success('注册成功，请登录')
          }
        } catch (error) {
          throw error
        }
      }

      return {
        ...toRefs(data),
        signin,
        signup
      }
    }
  })
</script>
<style scoped>
  .signin {
    padding: 10px;
  }
</style>
