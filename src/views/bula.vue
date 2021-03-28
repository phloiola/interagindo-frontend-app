<template>
  <div id="bula">
    <div class="row">
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
            <label for="autocomplete-input">Nome do medicamento</label>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="this.dataBula.nome !== String">
      <div class="col s12 center">
        <h5>{{ this.dataBula.nome }}</h5>
      </div>
      <div
        class="col s12"
        v-for="(line, index) in this.dataBula.bula"
        :key="index"
      >
        <h6 class="title">{{ line.titulo }}</h6>
        <p class="grey-text text-darken-2">{{ line.descricao }}</p>
      </div>

      <!-- <ul class="collection col s12 m6 clear">
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
        /> -->

      <!-- <selectedItem
          :dados="{ nome: 'Medicamento 001', tipo: 'Principio Ativo' }"
        /> -->
      <!-- </ul> -->
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

      <!-- <ul class="collapsible col s12 m6 popout clear">
        <itemInteracao
          v-for="(line, index) in dataInt"
          :key="index"
          :dados="line"
        />
        <p
          class="flow-text center"
          v-if="selectedItem.length > 1 && dataInt.length == 0"
        >
          Não foram localizados interações 😅
        </p> -->
      <!-- <itemInteracao :dados="dataInt" />
        <itemInteracao :dados="dataInt" /> -->
      <!-- </ul> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import selectedItem from "../components/selectedItem.vue";
import itemInteracao from "../components/itemInteracao.vue";

export default {
  name: "bula",
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
      // listMed: [],
      selectedItem: [],
      buscaMedicamento: ""
      // dataBula: { id: String, tipo: String, nome: String, bula: Array }
    };
  },
  created() {
    const viewBula = this;
    viewBula.axios = axios;

    this.$store.dispatch("getListMedBula").then(res => {
      viewBula.defineListSearch();
    });

    // viewBula.listMed
    // await dispatch("actionA");
    // viewBula.defineListSearch();
  },
  methods: {
    defineListSearch: function() {
      let viewBula = this;
      let options = {
        onAutocomplete: viewBula.onAutocomplete,
        minLength: 3,
        sortFunction: viewBula.sortFunction
      };

      let elems_complete = viewBula.$refs.autocomplete;
      let instances_complete = M.Autocomplete.init(elems_complete, options);

      let list = {};

      // Função com async/await para aguardar os dados
      const updateList = async () => {
        await Promise.all(
          viewBula.listMed.map(line => {
            list[line.nome] = null;
          })
        );
        instances_complete.updateData(list);
      };
      updateList();
    },
    onAutocomplete: function(evt) {
      let viewBula = this;

      let selected = viewBula.listMed.find(line => {
        let nome = line.nome.replace("\r", "");
        return nome == evt;
      });

      viewBula.axios
        .get(viewBula.UrlServ() + "/medicamento/bula/" + selected.id)
        .then(res => {
          viewBula.dataBula = res.data;
          console.log(res.data);
          // viewBula.defineListSearch();
        });

      let instances_complete = M.Autocomplete.getInstance(
        viewBula.$refs.autocomplete
      );
      // viewBula.selectedItem.push(selected);
      instances_complete.close();

      viewBula.$refs.autocomplete.nextElementSibling.nextElementSibling.removeAttribute(
        "class"
      );
      // //debugger;
    },
    sortFunction: function(a, b, inputString) {
      return a.indexOf(inputString) - b.indexOf(inputString);
    },
    UrlServ: function() {
      let urn = document.location.origin.split(":");
      urn.splice(2, 1);
      let url = urn.join(":") + ":3000/v1";
      return url;
    }
  },
  mounted() {
    const viewBula = this;

    let options = {
      onAutocomplete: this.onAutocomplete,
      minLength: 3,
      sortFunction: this.sortFunction
    };

    let elems_complete = viewBula.$refs.autocomplete;
    let instances_complete = M.Autocomplete.init(elems_complete, options);
  },
  asyncComputed: {
    async dataInt() {
      //debugger;
      // let viewInteracao = this;
      // if (viewInteracao.selectedItem.length < 2) {
      return [];
      // }
      // const arraySelected = [];

      // const arraySelected = viewInteracao.selectedItem.map(line => {
      //   return { id: line.id, tipo: line.tipo };
      // });

      // const searchIntera = async Selected => {
      //   let data = await viewInteracao.axios.post(
      //     "http://127.0.0.1:3000/v1/interacao/",
      //     {
      //       interacao: arraySelected
      //     }
      //   );
      //   // .then((res) => {
      //   //   debugger;
      //   //   // viewInteracao.listPrin = res.data;
      //   //   console.log(res.data);
      //   //   return res.data;
      //   // });
      //   console.log(data.data);
      //   return data.data;
      // };
      // let dataIntera = [];

      // try {
      //   dataIntera = await searchIntera(arraySelected);
      // } catch (error) {
      //   dataIntera = [];
      // }

      // return dataIntera;
      // debugger;
      // console.log(dataIntera);
      // return dataIntera;
    }
  },
  computed: {
    dataBula: {
      get() {
        return this.$store.state.dadosBula;
      },
      set(evt) {
        this.$store.dispatch("setBula", evt);
      }
    },
    listMed: {
      get() {
        return this.$store.state.listMedBula;
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

#bula {
  margin: 15px;
}
/* autocomplete-input */
.title {
  border-bottom: 1px solid #9a9a9a !important;
  font-weight: bold;
  /* box-shadow: 0 1px 0 0 #9a9a9a !important; */
}

.row div {
  margin-bottom: 0;
}
</style>
