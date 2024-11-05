import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './main.css';
import router from './router'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';

const app = createApp(App)

app.use(router)
app.config.globalProperties.$axios = axios;

app.mount('#app')
