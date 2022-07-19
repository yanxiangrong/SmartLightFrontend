<template>
  <h2 class="title">登录</h2>
  <div>
    <el-form
        label-position="right"
        label-width="auto"
        :model="formLabelAlign"
        style="max-width: 16rem; margin: 0 auto"
    >
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.id"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formLabelAlign.passwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {reactive} from "vue";
import axios from "axios";
import api from "../api/api";
import {ElMessage} from "element-plus";

interface User {
  id: string,
  passwd: string,
}

export default {
  name: "login",

  data() {
    const formLabelAlign = reactive({
      id: '',
      passwd: '',
    })
    return {formLabelAlign}
  },
  methods: {
    submitForm() {
      console.log(this.formLabelAlign)

      const user: User = {
        id: this.formLabelAlign.id,
        passwd: this.formLabelAlign.passwd
      };

      axios.post(api.login, user)
          .then(res => {
                if (res.data["status"] == "ok") {
                  ElMessage({
                    message: '登陆成功！3秒后自动跳转。',
                    type: 'success',
                  })

                  localStorage.setItem("token", res.data["token"])

                  setTimeout(() => {
                    this.$router.push({path: '/'})
                  }, 3000)
                } else {
                  ElMessage({
                    message: '登陆失败！',
                    type: 'error',
                  })
                }
              }
          ).catch(err => {
        console.log(err)
        ElMessage({
          message: '错误：' + err,
          type: 'error',
        })
      })

    }
  }
}

</script>

<style scoped>
.title {
  color: azure;
  font-weight: normal;
}
</style>