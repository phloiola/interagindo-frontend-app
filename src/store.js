import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    dadosBula: { id: String, tipo: String, nome: String, bula: Array },
    listMedBula: [],
    listMed: [],
    listPrin: [],
    selectedItem: [],
    countIntera: 0
  },
  actions: {
    setBula({ commit }, bula) {
      commit("storeBula", bula);
    },
    setListMedBula({ commit }, list) {
      commit("setListMedBula", list);
    },
    setCountIntera({ commit }, bula) {
      commit("storeCountIntera", bula);
    },
    getListMedBula({ commit }) {
      let that = this;
      return new Promise((resolve, reject) => {
        if (that.state.listMedBula.length != 0) {
          resolve(that.state.listMedBula);
        } else {
          axios
            .get(that.UrlServ() + "/medicamento/bula/")
            .then(res => {
              that.commit("setListMedBula", res.data);
              resolve(res.data);
            })
            .catch(err => reject(err));
        }
      });
    },
    getListPrin({ commit }) {
      let that = this;
      return new Promise((resolve, reject) => {
        if (that.state.listPrin.length != 0) {
          resolve(that.state.listPrin);
        } else {
          axios
            .get(that.UrlServ() + "/princAtivo/")
            .then(res => {
              that.commit("setListPrin", res.data);
              resolve(res.data);
            })
            .catch(err => reject(err));
        }
      });
    },
    getListMed({ commit }) {
      let that = this;
      return new Promise((resolve, reject) => {
        if (that.state.listMed.length != 0) {
          resolve(that.state.listMed);
        } else {
          axios
            .get(that.UrlServ() + "/medicamento/")
            .then(res => {
              that.commit("setListMed", res.data);
              resolve(res.data);
            })
            .catch(err => reject(err));
        }
      });
    },
    addSelectedItem({ commit }, list) {
      commit("addSelectedItem", list);
    },
    delSelectedItem({ commit }, index) {
      commit("delSelectedItem", index);
    }
  },
  mutations: {
    storeBula(state, payload) {
      state.dadosBula = payload;
    },
    setListMedBula(state, payload) {
      state.listMedBula = payload;
    },
    setListMed(state, payload) {
      state.listMed = payload;
    },
    setListPrin(state, payload) {
      state.listPrin = payload;
    },
    addSelectedItem(state, payload) {
      state.selectedItem.push(payload);
    },
    delSelectedItem(state, payload) {
      state.selectedItem.splice(payload, 1);
    },
    storeCountIntera(state, payload) {
      state.countIntera = payload;
    }
  }
});

store.UrlServ = function() {
  let urn = document.location.origin.split(":");
  urn.splice(2, 1);
  let url = urn.join(":") + ":3000/v1";
  return url;
};

export default store;
