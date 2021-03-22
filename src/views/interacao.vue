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
            <label for="autocomplete-input"
              >Nome do medicamento ou princípio ativo</label
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <ul class="collection col s12 m6 clear">
        <selectedItem
          v-for="line in selectedItem"
          :key="line.id"
          :dados="{
            nome: line.nome,
            tipo: line.tipo,
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
    itemInteracao,
  },
  props: {
    // columns: Array,
    // data: Array,
  },

  data() {
    return {
      axios: {},
      rb_check_list: "M",
      listMed: [],
      listPrin: [],
      selectedItem: [],
      buscaMedicamento: "",
      // dataInt: [
      //   {
      //     _id_pa1: 50,
      //     nome_principio_ativo1: "Acido Acetilsalicilico\r",
      //     _id_pa2: 375,
      //     nome_principio_ativo2: "Captopril\r",
      //     grau_intera: "Moderada",
      //     inicio_intera: "Não especificado",
      //     efeito_intera: "Diminui resposta anti-hipertensiva",
      //     recomend_intera: "Monitorar pressão arterial.",
      //     referencia:
      //       "Guia de interações medicamentosas - Hospital das Clínicas / Universidade Federal de Goiás",
      //     inputs_01: [
      //       {
      //         param: 3,
      //         tipo: "Medicamento",
      //         nome_med: "Aas\r",
      //       },
      //     ],
      //     inputs_02: [
      //       {
      //         param: 1210,
      //         tipo: "Medicamento",
      //         nome_med: "Captopril\r",
      //       },
      //       {
      //         param: 1210,
      //         tipo: "Medicamento",
      //         nome_med: "Captopril\r",
      //       },
      //       {
      //         param: 1210,
      //         tipo: "Medicamento",
      //         nome_med: "Captopril\r",
      //       },
      //     ],
      //   },
      //   {
      //     _id_pa1: 50,
      //     nome_principio_ativo1: "Acido Acetilsalicilico\r",
      //     _id_pa2: 375,
      //     nome_principio_ativo2: "Captopril\r",
      //     grau_intera: "Moderada",
      //     inicio_intera: "Não especificado",
      //     efeito_intera: "Diminui resposta anti-hipertensiva",
      //     recomend_intera: "Monitorar pressão arterial.",
      //     referencia:
      //       "Guia de interações medicamentosas - Hospital das Clínicas / Universidade Federal de Goiás",
      //     inputs_01: [
      //       {
      //         param: 3,
      //         tipo: "Medicamento",
      //         nome_med: "Aas\r",
      //       },
      //     ],
      //     inputs_02: [
      //       {
      //         param: 1210,
      //         tipo: "Medicamento",
      //         nome_med: "Captopril\r",
      //       },
      //       {
      //         param: 1210,
      //         tipo: "Medicamento",
      //         nome_med: "Captopril\r",
      //       },
      //       {
      //         param: 1210,
      //         tipo: "Medicamento",
      //         nome_med: "Captopril\r",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  created() {
    console.log(axios);

    const viewInteracao = this;
    viewInteracao.axios = axios;
    viewInteracao.axios
      .get("http://127.0.0.1:3000/v1/medicamento/")
      .then((res) => {
        // debugger;
        viewInteracao.listMed = res.data;
        console.log(res.data);
        viewInteracao.defineListSearch();
      });

    viewInteracao.axios
      .get("http://127.0.0.1:3000/v1/princAtivo/")
      .then((res) => {
        viewInteracao.listPrin = res.data;
        console.log(res.data);
      });
  },
  methods: {
    defineListSearch: function () {
      let elems_complete = this.$refs.autocomplete;
      let instances_complete = M.Autocomplete.getInstance(elems_complete);
      let list = {};

      // Função com async/await para aguardar os dados
      const updateList = async () => {
        switch (this.rb_check_list) {
          case "M":
            // Get Lista de Medicamento
            await Promise.all(
              this.listMed.map((line) => {
                list[line.nome] = null;
              })
            );
            break;

          case "P":
            // Get Lista de Principio ativo
            await Promise.all(
              this.listPrin.map((line) => {
                list[line.nome] = null;
              })
            );
            break;
          default:
            break;
        }

        instances_complete.updateData(list);
      };
      updateList();
    },
  },
  mounted() {
    const viewInteracao = this;

    // Inicializa expanção das interações
    let opt = {
      onOpenStart: function (e) {
        debugger;
      },
      onCloseStart: function (e) {
        debugger;
      },
    };
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, opt);

    let options = {
      onAutocomplete: function (evt) {
        let selected = viewInteracao.listMed.find((line) => {
          let nome = line.nome.replace("\r", "");
          return nome == evt;
        });
        viewInteracao.selectedItem.push(selected);
        this.close();
        // debugger;
      },
      minLength: 3,
      sortFunction: function (a, b, inputString) {
        return a.indexOf(inputString) - b.indexOf(inputString);
      },
    };

    let elems_complete = document.querySelector("#autocomplete-input");
    let instances_complete = M.Autocomplete.init(elems_complete, options);
  },
  asyncComputed: {
    async dataInt() {
      debugger;
      let viewInteracao = this;
      if (viewInteracao.selectedItem.length < 2) {
        return [];
      }
      // const arraySelected = [];

      const arraySelected = viewInteracao.selectedItem.map((line) => {
        return { id: line.id, tipo: line.tipo };
      });

      const searchIntera = async (Selected) => {
        let data = await viewInteracao.axios.post(
          "http://127.0.0.1:3000/v1/interacao/",
          {
            interacao: arraySelected,
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
      return (dataIntera = await searchIntera(arraySelected));
      // debugger;
      // console.log(dataIntera);
      // return dataIntera;
    },
  },
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
