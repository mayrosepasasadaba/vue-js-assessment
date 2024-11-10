<template>
  <router-view></router-view>
  <show-alert
    v-if="alertState.visible"
    :message="alertState.message"
    :alertType="alertState.type"
    @close="alertState.visible = false"
  ></show-alert>
</template>

<script>
import { state } from "./shared/alertEvent";

export default {
  name: "App",
  components: {},
  computed: {
    alertState() {
      return state.alert;
    },
  },
};
</script>

<style></style>
