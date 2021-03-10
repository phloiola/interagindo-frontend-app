import Vue from "vue";
import App from "./App.vue";
import router from "./routers";

// Importa biblioteca CSS Materialize
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/css/materialize.css";

// Os dois imports foram utilizados para ativar o ES7 / aSync aWait no Vue
// import utilizado para funcionar - npm i -S core-js@latest regenerator-runtime@latest
// Recomendation of babeljs (https://babeljs.io/docs/en/babel-polyfill)
import "core-js/stable"; // only stable feature also is possible with only `core-js`
import "regenerator-runtime/runtime"; // To ensure that regeneratorRuntime is defined globally

new Vue({
  el: "#app",
  render: h => h(App),
  router
});
