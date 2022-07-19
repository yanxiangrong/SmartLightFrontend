<template>
  <el-form ref="form" :model="form">
    <el-form-item label="设备备注：">
      <el-input v-model="form.remark"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="onDelete" :loading="deleteLoading">删除设备</el-button>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="saveLoading">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import axios from "axios";
import api from "../api/api";
import {ElMessage} from 'element-plus'
import addrToHex from "../util/util";


export default {
  name: "DeviceMenu",
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
      form: {
        remark: "",
      },
      deleteLoading: false,
      saveLoading: false
    }
  },
  updated() {
    if (this.device.remark != null && this.remark !== "") {
      this.form.remark = this.device.remark
    }
  },
  mounted() {
    if (this.device.remark != null && this.remark !== "") {
      this.form.remark = this.device.remark
    }
  },
  methods: {
    onSubmit() {

      this.saveLoading = true
      axios.post(api.setRemark, {
        addr: this.device.addr,
        remark: this.form.remark
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
          .then(res => {
                console.log(res)
                ElMessage({
                  message: '设置备注成功。',
                  type: 'success',
                })
                this.saveLoading = false
              }
          ).catch(err => {
        console.log(err)
        ElMessage({
          message: '保存失败：' + err,
          type: 'error',
        })
        this.saveLoading = false
      })
    },
    onDelete() {
      this.deleteLoading = true
      axios.get(api.deleteDevice, {
        params: {
          addr: this.device.addr
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
          .then(res => {
                console.log(res)
                ElMessage({
                  message: '设备' + addrToHex(this.device.addr) + '已经删除。',
                  type: 'success',
                })
                this.deleteLoading = false
              }
          ).catch(err => {
        console.log(err)
        ElMessage({
          message: '删除失败：' + err,
          type: 'error',
        })
        this.deleteLoading = false
      })
    }
  }
}
</script>

<style scoped>
</style>
