import Vue from "vue";
import VueRouter from "vue-router";
import Bula from "../views/bula";
import Interacao from "../views/interacao";
// import Alunos from "../views/Alunos";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      name: "Bulario",
      path: "/bula",
      component: Bula
    },
    {
      name: "Tela de Intereaçao Medicamentosa",
      path: "/interacao",
      component: Interacao
    },
    // {
    //   name: "Tela Lista de Alunos",
    //   path: "/alunos",
    //   component: Alunos
    // },
    {
      name: "Home",
      path: "/",
      redirect: "/interacao"
    }
  ]
});

export default router;
