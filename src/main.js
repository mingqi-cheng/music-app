import { createApp } from 'vue'
import './style.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './App.vue'
import { createPinia } from 'pinia'
import axios from '../src/plugins/axiosInstance.js'
import router from './router'
import { Notify } from '@/../vant';
import ElementPlus from 'element-plus'
import 'default-passive-events'
import 'element-plus/dist/index.css'
const app = createApp(App)
const pinia = createPinia()
app.use(Notify);
app.use(pinia)
app.use(Vant)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
app.config.globalProperties.$axios=axios;