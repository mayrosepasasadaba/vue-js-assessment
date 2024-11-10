<template>
  <section class="gold-bg">
    <h2>Contacts Information</h2>

    <div class="header-container">
      <p>
        Your list of contacts appear here. To add a new contact, click on the
        Add New Contact button.
      </p>
      <button @click="openFormModal(defaultFormValues, 'add')">
        Add New Contact
      </button>
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
        @delete-contact="onDeleteContact(contact)"
        @edit-contact="openFormModal(contact, 'edit')"
      />
    </div>

    <div class="contact-table" v-if="viewType === 'table'">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cont in allContacts" :key="cont.id">
            <td>
              <router-link
                :to="`/view/${cont.id}`"
                routerLinkActive="router-link-active"
                >{{ cont.name }}</router-link
              >
            </td>
            <td>{{ cont.contact_no }}</td>
            <td>{{ cont.email }}</td>
            <td>
              <span class="action-buttons">
                <button @click="openFormModal(cont, 'edit')">
                  <span class="material-symbols-outlined"> edit </span>
                </button>
                <button @click="onDeleteContact(cont)">
                  <span class="material-symbols-outlined"> delete </span>
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <new-contact
      v-if="isFormOpen"
      @close-modal="closeFormModal"
      :form-action="action"
      :defaultFormValues="formValues"
    />
  </section>
</template>

<script>
import { useContactsStore } from "@/stores/contactStore";
import { showAlert } from "@/shared/alertEvent";

export default {
  data() {
    return {
      viewType: "card",
      isFormOpen: false,
      action: null,
      defaultFormValues: {
        id: "",
        name: "",
        email: "",
        contact_no: "",
      },
      formValues: this.defaultFormValues,
    };
  },
  computed: {
    contactStore() {
      return useContactsStore();
    },
    allContacts() {
      return this.contactStore.contacts;
    },
  },
  methods: {
    onSelectViewType(type) {
      this.viewType = type;
    },

    async getAllContacts() {
      try {
        await this.contactStore.fetchAllContacts();
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    },

    openFormModal(contactInfo, action) {
      this.formValues = contactInfo;
      this.action = action;
      this.isFormOpen = true;
    },

    closeFormModal() {
      this.action = null;
      this.isFormOpen = false;
    },

    async onDeleteContact(contactInfo) {
      try {
        await this.contactStore.deleteContact(contactInfo.id);
        showAlert("Successfully deleted contact!", "success");
        this.getAllContacts();
      } catch (error) {
        showAlert("Error in deleting contact", "error");
      }
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

.header-container {
  display: grid;
  grid-template-columns: 6fr 1fr;
  align-items: center;
}

.header-container button {
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

  .header-container {
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
