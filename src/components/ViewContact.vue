<template>
  <main>
    <div class="row">
      <router-link to="/home" class="back">
        <span class="material-symbols-outlined"> keyboard_backspace </span>
      </router-link>
      <span><h2>Contact Information</h2></span>
    </div>
    <article class="container">
      <div class="row info-row">
        <div>
          <span>First Name</span>
          <h3>{{ contactInfo.name }}</h3>
        </div>
        <div>
          <span>Email Address</span>
          <h3>{{ contactInfo.email }}</h3>
        </div>
        <div>
          <span>Contact Number</span>
          <h3>{{ formatContactNumber(contactInfo.contact_no) }}</h3>
        </div>
      </div>
    </article>
  </main>
</template>

<script>
import { useContactsStore } from "@/stores/contactStore";

export default {
  props: ["contactId"],
  data() {
    return {
      contactStore: useContactsStore(),
      contactInfo: {
        id: "",
        name: "",
        email: "",
        contact_no: "",
      },
    };
  },
  methods: {
    async getContactInfo() {
      try {
        const response = await this.contactStore.fetchContact(this.contactId);
        this.contactInfo = response;
      } catch (error) {
        console.log(error);
      }
    },

    formatContactNumber(value) {
      return this.contactStore.formatContactNumber(value);
    },
  },
  mounted() {
    this.getContactInfo();
  },
};
</script>

<style>
.row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.back .material-symbols-outlined {
  font-size: 3vw;
}

.container {
  border: 1px solid var(--medium-gray);
  border-radius: 0.5em;
  padding: 4%;
}
.container .info-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
