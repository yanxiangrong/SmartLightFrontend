import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import home from "../views/home.vue"
import login from "../views/login.vue"

const routes = [
  {path: '/', component: home},
  {path: '/login', component: login},
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router
