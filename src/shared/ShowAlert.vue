<template>
  <div class="alert" :class="alertType">
    <span v-if="alertType === 'success'" class="material-symbols-outlined">
      check
    </span>
    <span v-if="alertType === 'error'" class="material-symbols-outlined">
      error
    </span>
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: ["alertType", "message"],
};
</script>

<style>
.alert {
  position: fixed;
  bottom: 3%;
  right: 3%;
  border-radius: 0.5em;
  width: auto;
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 0.5% 1%;
}

.alert .material-symbols-outlined {
  font-size: 1.5vw;
}

.success {
  background-color: #7ef3ce !important;
  color: black;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}

.alert .close-button {
  background: none;
  border: none;
  font-size: 16px;
  position: absolute;
  right: 8px;
  top: 8px;
  cursor: pointer;
}
</style>
