<template>
  <div class="backdrop" @click="close"></div>
  <dialog open>
    <form @submit.prevent="submitForm">
      <div
        class="form-control"
        :class="{ invalid: userNameValidity === 'invalid' }"
      >
        <label for="user-name">Your Name</label>
        <input
          id="user-name"
          name="user-name"
          type="text"
          v-model.trim="userName"
          @blur="validateInput"
        />
        <p v-if="userNameValidity === 'invalid'">
          Please enter a valid username
        </p>
      </div>
    </form>
  </dialog>
</template>

<script>
export default {
  props: {
    closeFormModal: Function,
  },
  data() {
    return {
      formValues: {},
    };
  },
  methods: {
    submitForm() {
      console.log(this.formValues);
    },

    close() {
      console.log("hey");
    },
  },
};
</script>

<style>
.backdrop {
  background-color: #504c4c;
  position: fixed;
  opacity: 90%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

dialog {
  width: 100%;
  max-width: 20rem;
  background-color: white;
  border-radius: 6px;
  border: none;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 1.5rem;
  top: 7rem;
}

form {
  padding: 2%;
}

.vertical {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}
.vertical label {
  margin-bottom: 0.5rem;
  font-weight: bolder;
}

.vertical input {
  padding: 4% 3%;
}

button {
  padding: 0.6rem 1.25rem;
  border-radius: 1.5em;
}

@media (max-width: 412px) {
  dialog {
    padding: 2rem;
  }
}
</style>
