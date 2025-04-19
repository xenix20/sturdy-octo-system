import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Notifications from '@kyvg/vue3-notification'


const app = createApp(App);
app.use(Notifications)
app.use(store).use(router).mount('#app')
