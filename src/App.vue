<template>
  <div id="app">
    <div>
      <nav class="nav-extended blue darken-4">
        <div class="nav-brand">
          <a href="#" class="brand-logo center alingLogo">
            <div class="valign-wrapper">
              <!-- <img
                src="./assets/logo-novo.png"
                class=""
                alt=""
                width="50em"
                height="44em"
              /> -->
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
import axios from "axios";

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
  methods: {
    UrlServ: function() {
      let urn = document.location.origin.split(":");
      urn.splice(2, 1);
      let url = urn.join(":") + ":3000/v1";
      return url;
    }
  },
  created() {
    const viewApp = this;
    viewApp.axios = axios;

    // antecipa busca de dados
    // this.$store.dispatch("getListMed").then(res => {});
    this.$store.dispatch("getListMedBula").then(res => {});
    this.$store.dispatch("getListPrin").then(res => {});
  },
  mounted() {
    M.AutoInit();
    console.log("Passou");
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

[type="radio"]:checked + span:after,
[type="radio"].with-gap:checked + span:after {
  background-color: #3584c5;
}

[type="radio"]:checked + span:after,
[type="radio"].with-gap:checked + span:before,
[type="radio"].with-gap:checked + span:after {
  border: 2px solid #3584c5;
}
</style>
