<template>
  <h2 class="title">智能灯控系统</h2>
  <div class="devicePanel">
    <div class="buttonPanel">
      <el-button class="button2" @click="openAll" round>打开所有灯</el-button>
      <el-button class="button" @click="closeAll" round>关闭所有灯</el-button>
      <el-button class="button" style="margin-left: auto; margin-right: 20px" @click="logout" round>注销</el-button>
    </div>
    <h4 class="listTitle">我的设备</h4>
    <DevicesList/>
  </div>
</template>

<script>
import DevicesList from "../components/DevicesList.vue";
import axios from "axios";
import api from "../api/api";
import {ElMessage} from "element-plus";

export default {
  name: "home",
  components: {DevicesList},
  methods: {
    openAll() {
      axios.get(api.openAll, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
          .then(response => {
            console.log(response.data)
          })
          .catch(err => {
            console.log(err)
          })
    },

    closeAll() {
      axios.get(api.closeAll, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
          .then(response => {
            console.log(response.data)
          })
          .catch(err => {
            console.log(err)
          })
    },

    logout() {
      ElMessage({
        message: '已注销！',
        type: 'info',
      })
      localStorage.removeItem("token")
    }
  }
}
</script>

<style scoped>

.title {
  color: azure;
  font-weight: normal;
}

.devicePanel {
  width: 100%;
}

.listTitle {
  color: #A9A9A9;
  margin-left: 20px;
  text-align: start;
}

.buttonPanel {
  display: flex;
  flex-direction: row;
}

.button {
  background-color: #494949;
  color: azure;
  border: none;
}

.button:hover {
  background-color: #575757;
  color: azure;
}

.button:focus {
  background-color: #494949;
  color: azure;
}

.button:active {
  background-color: #414141;
  transform: scale(.95);
}

.button2 {
  background-color: #F6F2DF;
  color: #2c3e50;
  border: none;
  margin-right: 20px;
}

.button2:hover {
  background-color: #e5dfd1;
  color: #2c3e50;
}

.button2:focus {
  background-color: #F6F2DF;
  color: #2c3e50;
}

.button2:active {
  background-color: #dedddd;
  transform: scale(.95);
}

.buttonPanel {
  margin-left: 20px;
}

</style>
