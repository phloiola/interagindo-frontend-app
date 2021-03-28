<template>
  <li class="listInt">
    <div
      class="collapsible-header clear waves-effect waves-brown"
      :class="getClassRisk()"
    >
      <i class="material-icons alteraIcon" :class="getClassRiskColor()"
        >warning</i
      >

      <div class="row clearSpace">
        <table class="col s12 m12 l12 xl12">
          <thead class="center">
            <tr>
              <th class="limpaTable center ocupa45">
                {{ dados.nome_principio_ativo1 }}
              </th>
              <th class="limpaTable center ocupa10">X</th>
              <th class="limpaTable center ocupa45">
                {{ dados.nome_principio_ativo2 }}
              </th>
            </tr>
          </thead>

          <tbody
            class="collection"
            v-for="(line, index) in listMed"
            :key="index"
          >
            <tr>
              <td class="center">{{ line.input_01 }}</td>
              <td></td>
              <td class="center">{{ line.input_02 }}</td>
            </tr>
          </tbody>
        </table>

        <p class="col s12 m12 l12 center blockHeader">Ler mais</p>
      </div>
    </div>

    <div class="collapsible-body row title-div">
      <span class="title col s12">Efeito da interação</span>
      <div class="col s12">
        {{ dados.efeito_intera }}
      </div>
      <span class="title col s12">Grau da interação</span>
      <div class="col s12">
        {{ dados.grau_intera }}
      </div>
      <span class="title col s12">Início da interação</span>
      <div class="col s12">
        {{ dados.inicio_intera }}
      </div>
      <span class="title col s12">Referêcia</span>
      <div class="col s12">
        {{ dados.referencia }}
      </div>
      <!-- <span>Lorem ipsum dolor sit amet.</span> -->
    </div>
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
    getClassRisk: function() {
      let className = "";
      switch (this.dados.grau_intera) {
        case "Leve":
          className = "lowrisk";
          break;
        case "Moderada":
          className = "moderaterisk";
          break;
        case "Grave":
          className = "highrisk";
          break;
        default:
          className = "nonerisk";
          break;
      }
      return className;
    },
    getClassRiskColor: function() {
      let className = "gray-text";
      switch (this.dados.grau_intera) {
        case "Leve":
          className = "yellow-text";
          // className = "yellow-text";
          break;
        case "Moderada":
          className = "amber-text amber-lighten-2";
          // className = "orange-text";
          break;
        case "Grave":
          className = "red-text text-darken-4";
          break;
        default:
          className = "gray-text";
          break;
      }
      return className;
    }
  },
  mounted() {
    // if (this.$refs.p.scrollWidth > this.$refs.p.offsetWidth) {
    //   this.$refs.p.classList.add("scrolling");
    // }
  },
  computed: {
    listMed: {
      get: function() {
        let input_01_clean = this.dados.inputs_01.filter(line => {
          if (!!line.nome_med) {
            return true;
          } else {
            return false;
          }
        });

        let input_02_clean = this.dados.inputs_02.filter(line => {
          if (!!line.nome_med) {
            return true;
          } else {
            return false;
          }
        });

        if (input_01_clean.length < input_02_clean.length) {
          let input_02 = this.dados.inputs_02.map((line, i) => {
            let output = {
              input_02: line.nome_med
            };

            if (!!input_01_clean[i]) {
              output.input_01 = input_01_clean[i].nome_med;
            } else {
              output.input_01 = "";
            }

            return output;
          });
          return input_02;
        } else {
          let input_01 = this.dados.inputs_01.map((line, i) => {
            let output = {
              input_01: line.nome_med
            };

            if (!!input_02_clean[i]) {
              output.input_02 = input_02_clean[i].nome_med;
            } else {
              output.input_02 = "";
            }

            return output;
          });
          return input_01;
        }
      }
    }
  }
};
</script>

<style scoped>
.listInt {
  border: none !important;
  border-radius: 10px;
  /* box-shadow: none !important; */
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
  box-shadow: 0 2px 0 0 #f5f242 !important;
  border-radius: 10px;
}
.moderaterisk {
  border-bottom: 1px solid #daa20a !important;
  box-shadow: 0 2px 0 0 #f7b03e !important;
  border-radius: 10px;
}
.highrisk {
  border-bottom: 1px solid #ac0404 !important;
  box-shadow: 0 2px 0 0 #f00505 !important;
  border-radius: 10px;
}

.nonerisk {
  border-bottom: 1px solid #9a9a9a !important;
  box-shadow: 0 2px 0 0 #9a9a9a !important;
  border-radius: 10px;
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
  /* width: 100vh; */
}
.clearSpace > p {
  padding: 0;
  margin: 0;
  text-decoration: underline;
  font-weight: bold;
}

.collapsible-header.clear {
  margin-bottom: 20px;
  padding-top: 5px;
}
.collapsible th {
  padding-bottom: 0px !important;
}
.title {
  font-weight: bold;
  border-bottom: 1px solid gray;
  padding-top: 10px;
}

.title-div {
  padding-top: 0px !important;
}

.ocupa45 {
  padding: 0;
  width: 45vh;
}
.ocupa10 {
  padding: 0;
  width: 10vh;
}

.blockHeader {
  margin-left: 10px !important;
}
</style>
