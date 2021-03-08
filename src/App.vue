<template>
  <div id="app">
    <div>
      <nav class="nav-extended blue darken-4">
        <div class="nav-brand">
          <a href="#" class="brand-logo center alingLogo">
            <div class="valign-wrapper">
              <img
                src="./assets/logo-novo.png"
                class=""
                alt=""
                width="50em"
                height="44em"
              />
              <span>Interagindo</span>
            </div>
          </a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger"
            ><i class="material-icons">menu</i></a
          >
        </div>
        <div class="nav-content">
          <ul class="tabs tabs-transparent tabs-swipe-demo">
            <li class="tab">
              <router-link to="/interacao" class="nav-link">
                Interação
              </router-link>
            </li>
            <li class="tab">
              <router-link to="/bula" class="nav-link"> Bula </router-link>
            </li>

            <li class="right hide-on-med-and-down">
              <profileNav align="desk" />
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <ul class="sidenav" id="mobile-demo">
      <li class="container hide-on-large-only">
        <profileNav />
      </li>
      <li>
        <router-link to="/interacao" class="nav-link sidenav-close">
          Interação
        </router-link>
      </li>
      <li>
        <router-link to="/bula" class="nav-link sidenav-close">
          Bula
        </router-link>
      </li>
    </ul>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import M from "materialize-css";

import profileNav from "./components/profileNav.vue";

export default {
  name: "app",
  components: {
    profileNav
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {},
  mounted() {
    M.AutoInit();
    console.log("Passou");

    // // Inicializa expanção das interações
    // document.addEventListener("DOMContentLoaded", function() {
    //   var elems = document.querySelectorAll(".collapsible");
    //   var instances = M.Collapsible.init(elems, options);
    // });

    // document.addEventListener("DOMContentLoaded", function () {
    //   var elems = document.querySelectorAll(".sidenav");
    //   var instances = M.Sidenav.init(elems, options);
    // });
  }
};
</script>

<style>
.imgprofile {
  /* margin-top: 10vh; */
  border: white solid 2px;
}
@media screen and (min-width: 993px) {
  .alingLogo {
    margin-top: -0.25em;
  }
}
.alingLogo span {
  padding-left: 0.2em;
}
.teste {
  border: white solid 2px;
}
.waves-effect.waves-brown .waves-ripple {
  /* The alpha value allows the text and background color
   of the button to still show through. */
  background-color: rgba(58, 83, 224, 0.65);
}
</style>
