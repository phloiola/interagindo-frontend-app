<template>
  <div id="interacao">
    <div class="row col-12">
      <div class="col-4" style="padding: 15px ,height: 100px">
        <input type="radio" id="med" value="1" name="tipo" class="col-1" />
        <label for="med" class="col-5">Medicamento</label>
        <input type="radio" id="pri" value="2" name="tipo" class="col-1" />
        <label for="pri" class="col-4">Princípio Ativo</label>
        <div class="col-11" style="padding: 10px">
          <input
            type="text"
            placeholder="Nome do medicamento"
            id=""
            class="col-12"
          />
        </div>
      </div>
      <div class="col-4 border" style="height: 400px">
        Lista dos medicamentos
      </div>
      <div class="col-4 border">Interações</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "interacao",
  props: {
    // columns: Array,
    // data: Array,
  },
  data() {
    return {
      interação: [],
    };
  },
  methods: {},
};
</script>

<style>
.simple {
  margin-top: 20px;
  margin-left: 5px;
}
#interacao {
  margin: 15px;
}
</style>