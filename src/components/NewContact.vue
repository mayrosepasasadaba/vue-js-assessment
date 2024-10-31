<template>
  <div class="backdrop" @click="closeModal"></div>
  <dialog open>
    <form @submit.prevent="submit">
      <div class="vertical">
        <label for="name">Name</label>
        <input
          v-model.trim="formValues.name"
          @blur="v$.formValues.name.$touch()"
        />
        <div
          class=""
          v-for="error of v$.formValues.name.$errors"
          :key="error.$uid"
        >
          <div class="control-error">{{ getErrorMessage(error, "name") }}</div>
        </div>
      </div>

      <div class="vertical">
        <label for="email">Email</label>
        <input
          v-model.trim="formValues.email"
          @blur="v$.formValues.email.$touch()"
        />
        <div
          class="control-error"
          v-for="error of v$.formValues.email.$errors"
          :key="error.$uid"
        >
          <div class="control-error">
            {{ getErrorMessage(error, "Email address") }}
          </div>
        </div>
      </div>

      <div class="vertical">
        <label for="contact_no">Contact Number</label>
        <input
          v-model.trim="formValues.contact_no"
          @blur="handleContactInput"
          type="text"
        />
        <div
          class="control-error"
          v-for="error of v$.formValues.contact_no.$errors"
          :key="error.$uid"
        >
          <div class="control-error">
            {{ getErrorMessage(error, "contact number") }}
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between">
        <button @click="closeModal()" class="cancel-button">Cancel</button>
        <button
          @click="submitForm()"
          class="save-button"
          v-if="formAction === 'add'"
          :disabled="v$.$invalid"
        >
          Add Contact
        </button>
        <button
          @click="saveChanges()"
          class="save-button"
          v-if="formAction === 'edit'"
          :disabled="v$.$invalid"
        >
          Save Changes
        </button>
      </div>
    </form>
  </dialog>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { useContactsStore } from "@/stores/contactStore";

// Custom validator for length of 11
const elevenDigits = helpers.withParams(
  { message: "Contact number must only contain 11 digits" },
  (value) => value.length === 11
);

export default {
  props: ["formAction", "defaultFormValues"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      contactStore: useContactsStore(),
      formValues: {
        id: "",
        name: "",
        contact_no: "",
        email: "",
      },
    };
  },
  validations() {
    return {
      formValues: {
        name: { required },
        contact_no: { required, elevenDigits },
        email: { required, email },
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        await this.contactStore.createContact(this.formValues);
        this.contactStore.getAllContacts();
        this.closeModal();
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },

    async saveChanges() {
      try {
        await this.contactStore.updateContact(
          this.defaultFormValues.id,
          this.formValues
        );
        this.contactStore.getAllContacts();
        this.closeModal();
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },

    closeModal() {
      this.$emit("close-modal");
    },

    handleContactInput() {
      this.formValues.contact_no = this.formValues.contact_no
        .replace(/\D/g, "")
        .slice(0, 11);
      this.v$.formValues.contact_no.$touch();
    },

    getErrorMessage(error, field) {
      switch (error.$validator) {
        case "required":
          return `Please enter ${field}`;
        case "email":
          return "Please enter a valid Email dddress";
        case "elevenDigits":
          return "Contact number must contain 11 digits";
        default:
          return "Invalid input";
      }
    },
  },
  mounted() {
    this.formValues = this.defaultFormValues;
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

.control-error {
  color: red;
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
