<template>
  <div id="bula">
    <div>
      <input
        type="text"
        id="medicamento"
        placeholder="Digite o nome do medicamento"
      />
    </div>
    <div>
      <a
        v-for="(bula, index) in bulas"
        :href="`#medicamento-${index}`"
        :aria-selected="index === 0"
        :class="checkSelected(index)"
        :key="index"
        >{{ bula.descricao }}</a
      >
    </div>

    <!-- <div
      v-for="(bula, index) in bulas"
      :id="`medicamento-${index}`"
      :key="`medicamento-${index}`"
      :class="firstSelectedClass(index)"
    >
      <h2>{{ bula.medicamento }}</h2>
      {{ bula.descricao }}
    </div> -->
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
          descricao: "Bula do medicamento 01"
        },
        {
          medicamento: "Medicamento 02",
          descricao: "Bula do medicamento 02"
        },
        {
          medicamento: "Medicamento 03",
          descricao: "Bula do medicamento 03"
        },
        {
          medicamento: "Medicamento 04",
          descricao: "Bula do medicamento 04"
        },
        {
          medicamento: "Medicamento 05",
          descricao: "Bula do medicamento 05"
        },
        {
          medicamento: "Medicamento 06",
          descricao: "Bula do medicamento 06"
        },
        {
          medicamento: "Medicamento 07",
          descricao: "Bula do medicamento 07"
        },
        {
          medicamento: "Medicamento 08",
          descricao: "Bula do medicamento 08"
        },
        {
          medicamento: "Medicamento 09",
          descricao: "Bula do medicamento 09"
        },
        {
          medicamento: "Medicamento 10",
          descricao: "Bula do medicamento 10"
        },
        {
          medicamento: "Medicamento 11",
          descricao: "Bula do medicamento 11"
        },
        {
          medicamento: "Medicamento 12",
          descricao: "Bula do medicamento 12"
        },
        {
          medicamento: "Medicamento 13",
          descricao: "Bula do medicamento 13"
        },
        {
          medicamento: "Medicamento 14",
          descricao: "Bula do medicamento 14"
        },
        {
          medicamento: "Medicamento 15",
          descricao: "Bula do medicamento 15"
        }
      ]
    };
  },
  methods: {
    checkSelected: function(index) {
      if (index === 0) {
        return ["nav-link", "active"];
      } else {
        return ["nav-link"];
      }
    },
    firstSelectedClass: function(index) {
      if (index === 0) {
        return ["tab-pane", "fade", "show", "active"];
      } else {
        return ["tab-pane", "fade", "show"];
      }
    }
  }
};
</script>

<style></style>
