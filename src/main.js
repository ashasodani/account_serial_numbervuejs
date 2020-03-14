import Vue from 'vue'
import App from './App.vue'
//Router
import router from './router'
// Vuesax
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
//Style.css
import './assets/css/style.css'
import VeeValidate from 'vee-validate'
import Swal from 'sweetalert2'
window.Swal= Swal;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  
  window.Toast = Toast;




Vue.config.productionTip = false
Vue.use(Vuesax)
Vue.use(VeeValidate)

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')