<template>
  <div class="devicesList">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="8" :xl="8" v-for="item in devicesList">
        <div class="deviceRow">
          <DeviceItem :device=item class="deviceItem" @contextmenu.prevent="openMenuDialog(item)"/>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogTableVisible" :title="dialogTitle">
      <DeviceMenu :device="menuDevice"/>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import DeviceItem from "./DeviceItem.vue";
import axios from "axios";
import api from "../api/api";
import DeviceMenu from "./DeviceMenu.vue";
import addrToHex from "../util/util";
import {Device} from "../api/api";
import {ElMessage} from "element-plus";

export default {
  name: "DevicesList",
  components: {DeviceMenu, DeviceItem},
  data() {
    let devicesList: Device[] = []
    let handle;

    return {devicesList, handle, dialogTableVisible: false, dialogTitle: "", menuDevice: Object}
  },
  beforeMount() {
    this.update()
  },

  mounted() {
    this.handle = setInterval(this.update, 3000)
  },

  beforeUnmount() {
    clearInterval(this.handle)
  },
  methods: {
    update() {
      axios.get(api.allDevices, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
          .then(response => {
            // console.log(response.data)
            this.devicesList = response.data["devices"]
          })
          .catch(err => {
            console.log(err)
            if (err.response.status == 403) {
              ElMessage({
                message: '请求被拒绝，请重新登录！',
                type: 'error',
              })
              setTimeout(() => {
                this.$router.push({path: '/login'})
              }, 3000)
            }
          })
    },
    openMenuDialog(device) {
      this.menuDevice = device
      this.dialogTitle = "电灯: " + addrToHex(device.addr)
      this.dialogTableVisible = true
    }
  },

}
</script>

<style scoped>
.devicesList {
  padding: 10px 10px 0 10px;
}

.deviceItem {
  margin-bottom: 10px;
  flex-grow: 1;
}

@media (max-width: 768px) {
  .deviceRow {
    display: flex;
    justify-content: center;
    width: auto;
  }
}

</style>
