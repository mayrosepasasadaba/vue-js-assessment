<template>
  <section class="gold-bg">
    <h2>Contacts Information</h2>

    <div class="container">
      <p>
        Your list of contacts appear here. To add a new contact, click on the
        Add New Contact button.
      </p>
      <button @click="onOpenFormModal">Add New Contact</button>
    </div>

    <div class="toggle-icons">
      <button @click="onSelectViewType('card')">
        <span
          class="material-symbols-outlined"
          :class="{ active: viewType === 'card' }"
          >grid_view</span
        >
      </button>
      <button @click="onSelectViewType('table')">
        <span
          class="material-symbols-outlined"
          :class="{ active: viewType === 'table' }"
          >table</span
        >
      </button>
    </div>

    <div class="contact-card-container" v-if="viewType === 'card'">
      <contact-card
        v-for="contact in allContacts"
        :key="contact"
        :contact-info="contact"
      />
    </div>

    <new-contact v-if="openFormModal" :closeFormModal="onCloseFormModal" />
  </section>
</template>

<script>
import contactService from "@/services/contactService";

export default {
  data() {
    return {
      allContacts: [],
      viewType: "card",
      openFormModal: false,
    };
  },
  methods: {
    onSelectViewType(type) {
      this.viewType = type;
    },

    async getAllContacts() {
      try {
        const response = await contactService.getContacts();
        this.allContacts = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    onOpenFormModal() {
      this.openFormModal = true;
    },
    onCloseFormModal() {
      console.log("triggered");
      this.openFormModal = false;
    },
  },
  created() {
    this.getAllContacts();
  },
};
</script>

<style>
section {
  margin-top: 1rem;
}

h2 {
  margin: 0;
}

.toggle-icons {
  display: flex;
  justify-content: end;
  gap: 1em;
  margin-top: 1rem;
}
.toggle-icons button {
  background-color: transparent;
  border: none;
}

.toggle-icons .material-symbols-outlined {
  color: rgb(45, 41, 41);
  font-size: 2vw;
}

.active {
  color: rgb(211, 207, 207) !important;
}

.contact-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  grid-gap: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 1%;
  text-align: left;
}

th {
  background-color: var(--primary-color);
  color: white;
}

a {
  color: black;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1em;
}

.action-buttons button {
  background-color: transparent;
  border: none;
}

.action-buttons .material-symbols-outlined {
  font-size: 1.2em;
}

.container {
  display: grid;
  grid-template-columns: 6fr 1fr;
  align-items: center;
}

.container button {
  background: var(--secondary-color);
  color: white;
  padding: 5% 0;
  width: 100%;
  justify-self: end;
  border-radius: 2em;
  border: none;
  font-weight: bolder;
}

@media (max-width: 412px) {
  h2 {
    font-size: 4vw;
  }

  .container {
    grid-template-columns: 2fr 1fr;
  }
  .container p {
    font-size: 2vw;
  }
  button {
    width: 80% !important;
    font-size: 2vw;
  }

  .contact-card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80em, 1fr));
    grid-gap: 10px;
  }

  .toggle-icons .material-symbols-outlined {
    font-size: 2em !important;
  }

  table {
    font-size: 1.5vw;
  }
}
</style>
