<template>
  <div v-bind:class="{'deviceCardLight': value1, 'deviceCardDark': !value1}">
    <div class="content">
      <div class="deviceIcon">
        <span v-if="isOnline" class="tag">在线</span>
        <span v-else class="tag2">离线</span>
        <el-icon :size="36">
          <reading-lamp/>
        </el-icon>
      </div>
      <div class="text">
        <div class="nameSpace">
          <!--          <span class="deviceName">电灯: {{ device.addr.toString(16).toUpperCase() }}</span>-->
          <span v-if="device.remark.length <= 0" class="deviceName">电灯: <span
              class="nameId">{{ toHex(device.addr) }}</span></span>
          <span v-else class="deviceName">{{ device.remark }}</span>
          <div class="warningIcon">
            <el-icon :size="24" v-show="device.fault">
              <WarningFilled/>
            </el-icon>
          </div>
        </div>
        <div class="deviceInfo">
          <div class="label">
            <span>电流：</span>
            <span v-text="device.current / 10"/>
            <span>A</span>
          </div>
          <div class="label">
            <span>开关：</span>
            <span>{{ device.switch ? "开" : "关" }}</span>
          </div>
          <div class="label">
            <span>状态：</span>
            <span>{{ device.fault ? "故障" : "正常" }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="switchSpace" @click="switchClick">
      <el-switch class="switch" :value="value1" active-color="#C5C0B2" inactive-color="#585858"/>
    </div>
  </div>
</template>

<script lang="ts">
import {ReadingLamp, WarningFilled} from '@element-plus/icons'
import {ElIcon, ElMessage} from "element-plus";
import axios from "axios";
import api from "../api/api";
import addrToHex from "../util/util";

interface DeviceStatus {
  addr: number,
  switch: boolean,
}

export default {
  name: "DeviceItem",
  components: {
    ReadingLamp,
    WarningFilled,
    ElIcon,
  },
  props: {
    device: {
      addr: Number,
      current: Number,
      switch: Boolean,
      fault: Boolean,
      remark: String,
      update_at: Number
    },
  },
  data() {
    return {
      value1: false,
      lastStats: false,
      isOnline: false,
    }
  },
  updated() {
    this.updateStatus();
  },
  beforeMount() {
    this.updateStatus();

  },
  methods: {
    updateStatus() {
      if (this.lastStats != this.device.switch) {
        this.lastStats = this.device.switch
        this.value1 = this.lastStats
      }

      this.isOnline = (new Date().getTime() / 1000 - this.device.update_at) <= 30;
    },
    switchClick() {
      this.value1 = !this.value1
      const status: DeviceStatus = {
        addr: this.device.addr,
        switch: this.value1
      };
      axios.post(api.setDevices, status, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
          .then(res => {
                console.log(res)
              }
          ).catch(err => {
        console.log(err)
        ElMessage({
          message: '错误：' + err,
          type: 'error',
        })
      })
    },
    toHex(addr: Number) {
      return addrToHex(addr)
    }
  }
}
</script>

<style scoped>
.deviceCardDark {
  display: flex;
  flex-direction: row;
  height: 5rem;
  max-width: 32rem;
  min-width: 22rem;
  background-color: #373737;
  border-radius: 15px;
  color: azure;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: background-color .2s ease;
}

.deviceCardLight {
  display: flex;
  flex-direction: row;
  height: 5rem;
  max-width: 32rem;
  min-width: 22rem;
  background-color: #F6F2DF;
  border-radius: 15px;
  color: #2c3e50;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: background-color .2s ease;
}

.content {
  display: flex;
  width: 100%;
}

.switchSpace {
  margin-left: -20px;
}

.switch {
  padding-right: 20px;
  padding-left: 20px;
  height: 100%;
}

.deviceIcon {
  margin-left: 20px;
  margin-right: 20px;
  align-self: center;
}

.text {
  display: flex;
  text-align: start;
  align-self: center;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
}

.deviceName {
  font-size: large;
}

.nameId {
  font-size: x-large;
  font-family: monospace;
}

.deviceInfo {
  display: flex;
  color: #918b84;
  flex-direction: row;
  font-size: small;
}

.label {
  margin-right: 10px;
}

.nameSpace {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.warningIcon {
  margin-left: 6em;
  color: red;
  position: absolute;
}

.tag {
  color: white;
  z-index: 10;
  font-size: 12px;
  position: absolute;
  padding: 0 6px;
  background-color: green;
  border-radius: 7px;
  transform: translateY(-50%) translate(45%);
}

.tag2 {
  color: white;
  z-index: 10;
  font-size: 12px;
  position: absolute;
  padding: 0 6px;
  background-color: gray;
  border-radius: 7px;
  transform: translateY(-50%) translate(45%);
}

</style>
