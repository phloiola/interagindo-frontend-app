<template>
  <li class="listInt ">
    <div class="collapsible-header clear lowrisk waves-effect waves-brown">
      <i class="material-icons yellow-text alteraIcon">warning</i>

      <div class="row clearSpace">
        <table class="col s12 m12 l12 xl12">
          <thead>
            <tr>
              <th class="limpaTable center teste45">
                Medicamento 01
              </th>
              <th class="limpaTable center teste10">X</th>
              <th class="limpaTable center teste45">Medicamento 02</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td class="center">Dorflex</td>
              <td></td>
              <td class="center">Advil</td>
            </tr>
            <tr>
              <td class="center">Nimesulida</td>
              <td></td>
              <td class="center">Outro remedio</td>
            </tr>
            <tr>
              <td class="center">Teste</td>
              <td></td>
              <td class="center"></td>
            </tr>
          </tbody>
        </table>

        <p class="col s12 m12 l12 center">Ler mais</p>
      </div>
    </div>

    <div class="collapsible-body">
      <span>Lorem ipsum dolor sit amet.</span>
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
  methods: {},
  mounted() {
    // if (this.$refs.p.scrollWidth > this.$refs.p.offsetWidth) {
    //   this.$refs.p.classList.add("scrolling");
    // }
  }
};
</script>

<style scoped>
.listInt {
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
}

.collapsible-header.clear {
  margin-bottom: 20px;
  padding-top: 5px;
}
</style>
