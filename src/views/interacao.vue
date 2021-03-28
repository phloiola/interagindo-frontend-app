<template>
  <div id="interacao">
    <div class="row">
      <div class="spaceInput">
        <div class="col s12 m8 l6 radioalign">
          <label class="col s6">
            <input
              class="with-gap"
              name="group1"
              type="radio"
              value="M"
              v-model="rb_check_list"
              @change="defineListSearch"
            />
            <span>Medicamento</span>
          </label>
          <label class="col s6">
            <input
              class="with-gap"
              name="group1"
              type="radio"
              value="P"
              v-model="rb_check_list"
              @change="defineListSearch"
            />
            <span>Princípio Ativo</span>
          </label>
        </div>
      </div>
      <div class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">search</i>
            <input
              type="text"
              id="autocomplete-input"
              class="autocomplete set_relative"
              :v-model="buscaMedicamento"
              :value="buscaMedicamento"
              ref="autocomplete"
            />
            <!-- <ul
              class="autocomplete-content dropdown-content autocompleteCust"
              tabindex="0"
            ></ul> -->
            <label for="autocomplete-input">{{ this.labelInput }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <ul class="collection col s12 m6 clear">
        <selectedItem
          v-for="(line, index) in selectedItem"
          :key="line.id"
          :dados="{
            id: line.id,
            nome: line.nome,
            tipo: line.tipo,
            index: index
          }"
          @eventDelMed="deletaMed($event)"
        />

        <!-- <selectedItem
          :dados="{ nome: 'Medicamento 001', tipo: 'Principio Ativo' }"
        /> -->
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
        <itemInteracao
          v-for="(line, index) in dataInt"
          :key="index"
          :dados="line"
        />
        <p
          class="flow-text center"
          v-if="selectedItem.length == 1 && countIntera == 0"
        >
          Informe mais um medicamento 😄
        </p>
        <p
          class="flow-text center"
          v-if="selectedItem.length > 1 && countIntera == 0"
        >
          Nenhuma interação localizada 😅
        </p>

        <!-- <itemInteracao :dados="dataInt" />
        <itemInteracao :dados="dataInt" /> -->
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import selectedItem from "../components/selectedItem.vue";
import itemInteracao from "../components/itemInteracao.vue";

export default {
  name: "interacao",
  components: {
    selectedItem,
    itemInteracao
  },
  props: {
    // columns: Array,
    // data: Array,
  },

  data() {
    return {
      axios: {},
      rb_check_list: "M",
      labelInput: "Nome do medicamento",
      // selectedItem: [],
      buscaMedicamento: ""
    };
  },
  created() {
    const viewInteracao = this;
    viewInteracao.axios = axios;

    this.$store.dispatch("getListMed").then(res => {
      viewInteracao.defineListSearch();
    });
  },
  methods: {
    defineListSearch: function() {
      let viewInteracao = this;
      let options = {
        onAutocomplete: viewInteracao.onAutocomplete,
        minLength: 3,
        sortFunction: viewInteracao.sortFunction
      };

      let elems_complete = viewInteracao.$refs.autocomplete;
      let instances_complete = M.Autocomplete.init(elems_complete, options);

      if (!instances_complete) {
        return;
      }

      // Função com async/await para aguardar os dados
      const updateList = async (viewInteracao, instances_complete) => {
        let list = {};

        switch (this.rb_check_list) {
          case "M":
            viewInteracao.labelInput = "Nome do medicamento";
            // Get Lista de Medicamento
            await Promise.all(
              viewInteracao.listMed.map(line => {
                list[line.nome] = null;
              })
            );
            break;

          case "P":
            viewInteracao.labelInput = "Nome do princípio ativo";
            // Get Lista de Principio ativo
            await Promise.all(
              viewInteracao.listPrin.map(line => {
                list[line.nome] = null;
              })
            );
            break;
          default:
            break;
        }

        instances_complete.updateData(list);
      };
      updateList(viewInteracao, instances_complete);
    },
    deletaMed: function(evt) {
      this.$store.dispatch("delSelectedItem", evt.dados.index);
      // this.selectedItem.splice(evt.dados.index, 1);
      console.log(`passou`);
    },
    UrlServ: function() {
      let urn = document.location.origin.split(":");
      urn.splice(2, 1);
      let url = urn.join(":") + ":3000/v1";
      return url;
    },
    onAutocomplete: function(evt) {
      //debugger;
      let viewInteracao = this;

      let listSelected = [];

      listSelected =
        viewInteracao.rb_check_list == "M" // M = Médicamento
          ? viewInteracao.listMed
          : viewInteracao.listPrin;

      let selected = listSelected.find(line => {
        let nome = line.nome.replace("\r", "");
        return nome == evt;
      });

      this.$store.dispatch("addSelectedItem", selected);
      // viewInteracao.selectedItem.push(selected);

      let instances_complete = M.Autocomplete.getInstance(
        viewInteracao.$refs.autocomplete
      );
      // viewBula.selectedItem.push(selected);
      instances_complete.close();

      viewInteracao.$refs.autocomplete.nextElementSibling.nextElementSibling.removeAttribute(
        "class"
      );
    },
    sortFunction: function(a, b, inputString) {
      return a.indexOf(inputString) - b.indexOf(inputString);
    }
  },
  mounted() {
    const viewInteracao = this;

    // Inicializa expanção das interações
    let opt = {
      onOpenStart: function(e) {
        //debugger;
      },
      onCloseStart: function(e) {
        //debugger;
      }
    };
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, opt);

    let options = {
      onAutocomplete: this.onAutocomplete,
      minLength: 3,
      sortFunction: this.sortFunction
    };

    let elems_complete = document.querySelector("#autocomplete-input");
    let instances_complete = M.Autocomplete.init(elems_complete, options);
  },
  asyncComputed: {
    async dataInt() {
      let viewInteracao = this;

      if (viewInteracao.selectedItem.length < 2) {
        return [];
      }

      if (!viewInteracao.axios.post) {
        return [];
      }

      const arraySelected = viewInteracao.selectedItem.map(line => {
        return { id: line.id, tipo: line.tipo };
      });

      const searchIntera = async Selected => {
        let data = await viewInteracao.axios.post(
          this.UrlServ() + "/interacao/",
          {
            interacao: arraySelected
          }
        );
        // .then((res) => {
        //   debugger;
        //   // viewInteracao.listPrin = res.data;
        //   console.log(res.data);
        //   return res.data;
        // });
        console.log(data.data);
        return data.data;
      };
      let dataIntera = [];

      try {
        dataIntera = await searchIntera(arraySelected);
      } catch (error) {
        dataIntera = [];
      }
      viewInteracao.countIntera = dataIntera.length;
      return dataIntera;
      // debugger;
      // console.log(dataIntera);
      // return dataIntera;
    }
  },
  computed: {
    listMed: {
      get() {
        return this.$store.state.listMed;
      }
    },
    listPrin: {
      get() {
        return this.$store.state.listPrin;
      }
    },
    selectedItem: {
      get() {
        return this.$store.state.selectedItem;
      }
    },
    countIntera: {
      get() {
        return this.$store.state.countIntera;
      },
      set(evt) {
        this.$store.dispatch("setCountIntera", evt);
      }
    }
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
  margin-bottom: 20px;
  padding-top: 5px;
}

.collapsible th {
  padding-bottom: 0px !important;
  border-bottom: 0.5px solid #838383;
}

.popout.clear {
  padding-left: 0px !important;
}

.collapsible.popout > li.active {
  margin-top: 0px;
}

/* .listInt {
  border: none !important;
  box-shadow: none !important;
}
.collapsible tr {
  border: none;
}
.collapsible td {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  border: none;
  box-shadow: 0 1px 0 0 #9a9a9a32 !important;
}
.lowrisk {
  border-bottom: 1px solid #f3ef03 !important;
  box-shadow: 0 1px 0 0 #f5f242 !important;
}
.moderaterisk {
  border-bottom: 1px solid #daa20a !important;
  box-shadow: 0 1px 0 0 #f7b03e !important;
}
.highrisk {
  border-bottom: 1px solid #ac0404 !important;
  box-shadow: 0 1px 0 0 #f00505 !important;
}

.nonerisk {
  border-bottom: 1px solid #9a9a9a !important;
  box-shadow: 0 1px 0 0 #9a9a9a !important;
}

.limpaTable {
  border-top: 0px !important;
  padding-top: 0px !important;
}

.alteraIcon {
  padding-top: 10px;
}
.clearSpace {
  padding: 0;
  margin: 0;
}
.clearSpace > p {
  padding: 0;
  margin: 0;
  text-decoration: underline;
  font-weight: bold;
} */
table {
  /* table-layout: fixed; */
  word-break: break-all;
}

.spaceInput {
  margin-left: 3rem;
}

@media only screen and (max-width: 600px) {
  .spaceInput {
    margin-left: 0rem;
  }
}

.radioalign {
  padding-left: 0;
}
.teste45 {
  width: 45%;
}
.teste10 {
  width: 10%;
}
/* #9a9a9a */

/* autocomplete-input */
</style>
