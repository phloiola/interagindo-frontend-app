<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-lg navbar-dark"
      style="background: linear-gradient(to left, #1ac1bb, #007eae, #3a1c71)"
    >
      <a class="navbar-brand" href="#">
        <div>
          <img
            src="./assets/logo-white.png"
            class="d-inline-block align-middle"
            alt=""
          />
          Interagindo
        </div>
      </a>
      <button
        class="navbar-toggler bg-black"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#"
              >Interação <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Uso Continuo</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">Bula</a>
          </li>
        </ul>
        <ul class="navbar-nav my-2 my-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Olá, João!
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Dados Pessoais</a>
              <a class="dropdown-item" href="#">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div>
      <!-- <interacao></interacao> -->
      <bula></bula>
    </div>
  </div>
</template>

<script>
import interacao from "./pages/interacao.vue";
import bula from "./pages/bula.vue";

export default {
  name: "app",
  components: {
    interacao,
    bula,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style>
img {
  border-style: none;
  max-width: 80px;
  padding: 5px;
}
.full-height {
  height: calc(100vh - 75px);
}
.sidebar-wrapper {
  position: relative;
  overflow: auto;
  width: 260px;
  padding-bottom: 20px;
}

.logo {
  display: flex;
  vertical-align: middle;
}

/* Reposanviso */
@media (max-width: 544px) {
  .navbar .navbar-nav > .nav-item {
    float: none;
    margin-left: 0.1rem;
  }
  .navbar .navbar-nav {
    float: none !important;
  }
  .navbar .collapse.in,
  .navbar .collapsing {
    clear: both;
  }
}
</style>
