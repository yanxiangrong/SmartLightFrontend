const backendUrl = "http://localhost:9527"
// const backendUrl = ""

const apiPrefix = "/api"

export interface Device {
  addr: Number,
  current: Number,
  switch: Boolean,
  fault: Boolean,
  remark: String,
  update_at: Number
}

const api = {
  openAll: backendUrl + apiPrefix + "/openAll",
  closeAll: backendUrl + apiPrefix + "/closeAll",
  open: backendUrl + apiPrefix + "/open",
  close: backendUrl + apiPrefix + "/close",
  allDevices: backendUrl + apiPrefix + "/allDevices",
  setDevices: backendUrl + apiPrefix + "/setDevices",
  deleteDevice: backendUrl + apiPrefix + "/deleteDevice",
  setRemark: backendUrl + apiPrefix + "/setRemark",
  login: backendUrl + "/login"
}

export default api
