<template>
  <li class="collection-item avatar col s12 m12 listmed">
    <i class="material-icons hide"></i>

    <div class="blockOverflow">
      <div class="moveScroll" ref="q">
        <!-- <p class="title truncate scrolling"> -->
        <p class="title truncate scrolling destacaText" ref="p">
          {{ dados.nome }}
        </p>
      </div>
    </div>

    <p>{{ dados.tipo }}</p>
    <a href="#" class="secondary-content" @click="emitEventDelete">
      <i class="material-icons red-text text-darken-4">remove_circle</i></a
    >
    <hr />
  </li>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dados: Object
  },
  methods: {
    onResize: function() {
      if (this.$refs.p.scrollWidth > this.$refs.p.offsetWidth) {
        this.$refs.p.classList.add("scrolling");
      } else {
        this.$refs.p.classList.remove("scrolling");
      }
    },
    emitEventDelete: function(evt) {
      evt.preventDefault();
      this.$emit("eventDelMed", { dados: this.dados, component: this });
    }
  },
  mounted() {
    // Monitora mudança no tamanho da tela
    window.addEventListener("resize", this.onResize);
    this.onResize();
    // if (this.$refs.p.scrollWidth > this.$refs.p.offsetWidth) {
    //   this.$refs.p.classList.add("scrolling");
    // }
  }
};
</script>

<style scoped>
.blockOverflow {
  overflow-x: hidden;
  overflow-y: hidden;
}

.moveScroll:hover .scrolling {
  /* This is not completely accurate. It resizes to 2x the current width. */
  left: -100%;
  width: 170%;
  margin-right: 50px;
}

.scrolling {
  position: relative;
  left: 0%;
  width: 85%;
  transition: left 4s, width 4s ease;
}

.destacaText {
  font-weight: bold;
}
</style>
