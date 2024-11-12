import './main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const app = createApp(App)

app.use(router)

app.config.globalProperties.$axios = axios;

app.mount('#app')
