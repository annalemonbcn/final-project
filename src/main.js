import { createApp } from 'vue'
import { createPinia } from 'pinia'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons' // --> FA
import { far } from '@fortawesome/free-regular-svg-icons' // --> FA

library.add(fas, far) // --> FA

// Import toaster
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Import datepicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  timeout: 3000,
  maxToasts: 20,
  newestOnTop: true,
  position: "top-right",
})

app.component('fa', FontAwesomeIcon) // --> FA
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
