// eventBus.js
import { reactive } from "vue";

const state = reactive({
  alert: {
    message: "",
    type: "info",
    visible: false,
  },
});

const showAlert = (message, type = "info", duration = 3000) => {
  state.alert.message = message;
  state.alert.type = type;
  state.alert.visible = true;

  setTimeout(() => {
    state.alert.visible = false;
  }, duration);
};

export { state, showAlert };
