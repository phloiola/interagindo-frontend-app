<template>
  <div id="bula">
    <div class="simple">
      <input
        type="text"
        id="medicamento"
        placeholder="Digite o nome do medicamento"
        class="col-3"
      />
    </div>
    <div class="row simple">
      <div
        class="nav flex-column nav-pills col-3"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <a
          id="v-pills-home-tab"
          data-toggle="pill"
          role="tab"
          aria-controls="v-pills-home"
          v-for="(bula, index) in bulas"
          :href="`#medicamento-${index}`"
          :aria-selected="index === 0"
          :class="checkSelected(index)"
          :key="index"
          >{{ bula.descricao }}</a
        >
      </div>
      <div class="tab-content col-9" id="v-pills-tabContent">
        <div
          role="tabpanel"
          aria-labelledby="v-pills-home-tab"
          v-for="(bula, index) in bulas"
          :id="`medicamento-${index}`"
          :key="`medicamento-${index}`"
          :class="firstSelectedClass(index)"
        >
          <h2>{{ bula.medicamento }}</h2>
          {{ bula.descricao }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bula",
  props: {
    // columns: Array,
    // data: Array,
  },
  data() {
    return {
      bulas: [
        {
          medicamento: "Medicamento 01",
          descricao: "Bula do medicamento 01",
        },
        {
          medicamento: "Medicamento 02",
          descricao: "Bula do medicamento 02",
        },
        {
          medicamento: "Medicamento 03",
          descricao: "Bula do medicamento 03",
        },
        {
          medicamento: "Medicamento 04",
          descricao: "Bula do medicamento 04",
        },
        {
          medicamento: "Medicamento 05",
          descricao: "Bula do medicamento 05",
        },
        {
          medicamento: "Medicamento 06",
          descricao: "Bula do medicamento 06",
        },
        {
          medicamento: "Medicamento 07",
          descricao: "Bula do medicamento 07",
        },
        {
          medicamento: "Medicamento 08",
          descricao: "Bula do medicamento 08",
        },
        {
          medicamento: "Medicamento 09",
          descricao: "Bula do medicamento 09",
        },
        {
          medicamento: "Medicamento 10",
          descricao: "Bula do medicamento 10",
        },
        {
          medicamento: "Medicamento 11",
          descricao: "Bula do medicamento 11",
        },
        {
          medicamento: "Medicamento 12",
          descricao: "Bula do medicamento 12",
        },
        {
          medicamento: "Medicamento 13",
          descricao: "Bula do medicamento 13",
        },
        {
          medicamento: "Medicamento 14",
          descricao: "Bula do medicamento 14",
        },
        {
          medicamento: "Medicamento 15",
          descricao: "Bula do medicamento 15",
        },
      ],
    };
  },
  methods: {
    checkSelected: function (index) {
      if (index === 0) {
        return ["nav-link", "active"];
      } else {
        return ["nav-link"];
      }
    },
    firstSelectedClass: function (index) {
      if (index === 0) {
        return ["tab-pane", "fade", "show", "active"];
      } else {
        return ["tab-pane", "fade", "show"];
      }
    },
  },
};
</script>

<style>
.simple {
  margin-top: 20px;
  margin-left: 5px;
}
#bula {
  margin: 15px;
}
</style>