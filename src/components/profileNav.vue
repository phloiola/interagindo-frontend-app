<template>
  <div>
    <!-- <a href="#user" class="dropdown-trigger divimgprofile" -->
    <a href="#user" class="valign-wrapper" :class="getClassMob()"
      ><img
        class="circle imgprofile "
        :class="getClass()"
        :width="widthimg"
        src="https://pbs.twimg.com/profile_images/799590028372545536/bl3bXBZC_400x400.jpg"
      />
      <span class="adjustpadding"> Paulo Loiola</span>
      <i class="material-icons iconimgprofile right" v-if="align == `desk`"
        >arrow_drop_down</i
      >
      <i class="material-icons iconimgprofile" v-else>arrow_drop_down</i>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      widthimg: "40vh"
    };
  },
  props: {
    align: String
  },
  methods: {
    getClass: function() {
      if (this.align == "desk") {
        return "profiledesk";
      }
      // return "container";
    },
    getClassMob: function() {
      if (this.align !== "desk") {
        return "profilemob";
      }
      // return "container";
    }
  },
  mounted() {
    if (this.align !== "desk") {
      this.widthimg = "60vh";
    }
  }
};
</script>

<style scoped>
.profiledesk {
  margin-top: -1vh;
  padding: 1px;
}
.profilemob {
  /* margin-top: 1em;
  margin-left: 1em; */
  margin: 1em;
}
.adjustpadding {
  padding-left: 0.5em;
}
.right .iconimgprofile {
  margin-left: 0.5vh;
}
</style>
