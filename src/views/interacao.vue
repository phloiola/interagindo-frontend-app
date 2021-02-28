<template>
  <div id="interacao">
    Interações
    <div class="row">
      <div class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">search</i>
            <input type="text" id="autocomplete-input" class="autocomplete" />
            <label for="autocomplete-input"
              >Nome do medicamento ou princípio ativo</label
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <ul class="collection col s12 m6 clear">
        <itemInteracao
          :dados="{
            nome: 'Medicamentoooooooooooooooooooooo 001',
            tipo: 'Principio Ativo'
          }"
          @eventDelMed="deletaMed($event)"
        />

        <itemInteracao
          :dados="{ nome: 'Medicamento 001', tipo: 'Principio Ativo' }"
        />
      </ul>
      <!-- <ul class="collection col s12 m6 clear">
        <itemInteracao
          :dados="{
            nome: 'Medicamentoooooooooooooooooooooo 001',
            tipo: 'Principio Ativo'
          }"
          @eventDelMed="deletaMed($event)"
        />

        <itemInteracao
          :dados="{ nome: 'Medicamento 001', tipo: 'Principio Ativo' }"
        />
      </ul> -->

      <ul class="collapsible col s12 m6 popout clear">
        <li>
          <div class="collapsible-header clear">
            <i class="material-icons">filter_drama</i>First
          </div>
          <div class="collapsible-body">
            <span>Lorem ipsum dolor sit amet.</span>
          </div>
        </li>
        <li>
          <div class="collapsible-header clear">
            <i class="material-icons">place</i>Second
          </div>
          <div class="collapsible-body">
            <span>Lorem ipsum dolor sit amet.</span>
          </div>
        </li>
        <li>
          <div class="collapsible-header clear">
            <i class="material-icons">whatshot</i>Third
          </div>
          <div class="collapsible-body">
            <span>Lorem ipsum dolor sit amet.</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import itemInteracao from "../components/itemInteracao.vue";

export default {
  name: "interacao",
  components: {
    itemInteracao
  },
  props: {
    // columns: Array,
    // data: Array,
  },
  data() {
    return {
      interação: []
    };
  },
  methods: {},
  mounted() {
    // Inicializa expanção das interações
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".collapsible");
      var instances = M.Collapsible.init(elems, options);
    });
  }
};
</script>

<style scoped>
.simple {
  margin-top: 20px;
  margin-left: 5px;
}
#interacao {
  margin: 15px;
}

#autocomplete-input:focus {
  border-bottom: 1px solid #42a5f5 !important;
  box-shadow: 0 1px 0 0 #42a5f5 !important;
}

.input-field .prefix.active {
  color: #42a5f5;
}
.listmed {
  padding-left: 30px !important;
  padding-bottom: 0px !important;
  margin-bottom: 0px !important;
  border-bottom: none;
}

.clear {
  border: none !important;
  box-shadow: none !important;
}
.collapsible.popout > li.active {
  box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%) !important;
}
.collapsible-header.clear {
  margin: 20px;
}

/* autocomplete-input */
</style>
