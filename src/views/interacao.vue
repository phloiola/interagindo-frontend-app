<template>
  <div id="interacao">
    Interações
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
            tipo: line.tipo
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
          v-for="(line, index) in selectedItem"
          :key="index"
          :dados="dataInt"
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
    itemInteracao
  },
  props: {
    // columns: Array,
    // data: Array,
  },

  data() {
    return {
      axios: {},
      listMed: [],
      listPrin: [],
      selectedItem: [],
      buscaMedicamento: ""
      //   dataInt: {
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
      //         nome_med: "Aas\r"
      //       }
      //     ],
      //     inputs_02: [
      //       {
      //         param: 1210,
      //         tipo: "Medicamento",
      //         nome_med: "Captopril\r"
      //       },
      //       {
      //         param: 1210,
      //         tipo: "Medicamento",
      //         nome_med: "Captopril\r"
      //       },
      //       {
      //         param: 1210,
      //         tipo: "Medicamento",
      //         nome_med: "Captopril\r"
      //       }
      //     ]
      //   }
    };
  },
  created() {
    console.log(axios);

    const viewInteracao = this;
    viewInteracao.axios = axios;
    viewInteracao.axios
      .get("http://127.0.0.1:3000/v1/medicamento/")
      .then(res => {
        // debugger;
        viewInteracao.listMed = res.data;
        console.log(res.data);
        viewInteracao.setListMed();
      });

    viewInteracao.axios
      .get("http://127.0.0.1:3000/v1/princAtivo/")
      .then(res => {
        viewInteracao.listPrin = res.data;
        console.log(res.data);
      });
  },
  methods: {
    setListMed: function() {
      let elems_complete = this.$refs.autocomplete;
      let instances_complete = M.Autocomplete.getInstance(elems_complete);
      let list = {};
      this.listMed.map(line => {
        list[line.nome] = null;
      });
      // debugger;
      instances_complete.updateData(list);
    }
  },
  mounted() {
    const viewInteracao = this;

    // Inicializa expanção das interações
    let opt = {
      onOpenStart: function(e) {
        debugger;
      },
      onCloseStart: function(e) {
        debugger;
      }
    };
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems, opt);

    let options = {
      onAutocomplete: function(evt) {
        let selected = viewInteracao.listMed.find(line => {
          let nome = line.nome.replace("\r", "");
          return nome == evt;
        });
        viewInteracao.selectedItem.push(selected);
        // debugger;
      }
    };

    let elems_complete = document.querySelector("#autocomplete-input");
    let instances_complete = M.Autocomplete.init(elems_complete, options);
  },
  computed: {
    dataInt: {
      get() {
        debugger;
        let viewInteracao = this;
        if (viewInteracao.selectedItem.length < 2) {
          return [];
        }
        viewInteracao.axios
          .post("http://127.0.0.1:3000/v1/interacao/", {
            interacao: [
              { id: "485", tipo: "Principio" },
              { id: "3", tipo: "Medicamento" },
              { id: "1210", tipo: "Medicamento" },
              { id: "5234", tipo: "Medicamento" },
              { id: "1880", tipo: "Principio" },
              { id: "123", tipo: "Medicamento" },
              { id: "321", tipo: "Medicamento" },
              { id: "111", tipo: "Principio" }
            ]
          })
          .then(res => {
            debugger;
            // viewInteracao.listPrin = res.data;
            console.log(res.data);
            return res.data;
          });
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

.teste45 {
  width: 45%;
}
.teste10 {
  width: 10%;
}
/* #9a9a9a */

/* autocomplete-input */
</style>
