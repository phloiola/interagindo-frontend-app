<template>
  <li class="collection-item avatar col s12 m12 listmed">
    <i class="material-icons hide"></i>

    <div class="teste2">
      <div class="teste" ref="q">
        <!-- <p class="title truncate scrolling"> -->
        <p v-bind:class="setClassScroll()" ref="p">
          {{ dados.nome }}
        </p>
      </div>
    </div>

    <p>{{ dados.tipo }}</p>
    <a href="#" class="secondary-content">
      <i class="material-icons red-text text-darken-4">remove_circle</i></a
    >
    <hr />
  </li>
</template>

<script>
export default {
  data() {
    return {
      widthimg: "40vh"
    };
  },
  props: {
    dados: Object
  },
  methods: {
    setClassScroll: function() {
      let css = { title: true, truncate: true, scrolling: false };
      // var boxWidth = $(this).width();
      // var textWidth = $(".scroll", $(this)).width();
      // console.log(this);
      // console.log(e);
      // let boxWidth = this.$el;
      // let textWidth = $(".scrolling", $(this)).width();

      // console.log(boxWidth);
      // console.log(textWidth);
      return css;
    },
    onResize: function() {
      if (this.$refs.p.scrollWidth > this.$refs.p.offsetWidth) {
        this.$refs.p.classList.add("scrolling");
      } else {
        this.$refs.p.classList.remove("scrolling");
      }
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
.teste2 {
  overflow-x: hidden;
  overflow-y: hidden;
}

.teste:hover .scrolling {
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
</style>
