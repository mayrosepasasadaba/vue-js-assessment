import { defineStore } from "pinia";
import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:3000", // Base URL for json-server or your API
  headers: {
    "Content-Type": "application/json",
  },
});

export const useContactsStore = defineStore("contacts", {
  state: () => ({
    contacts: [],
  }),

  actions: {
    async fetchAllContacts() {
      try {
        const response = await httpClient("/contacts");
        this.contacts = response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    // fetch contact by ID
    async fetchContact(id) {
      try {
        const response = await httpClient.get(`/contacts/${id}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    // Create a new contact
    async createContact(newContact) {
      try {
        const randomWholeNumber =
          Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        const newData = {
          ...newContact,
          id: randomWholeNumber.toString(),
        };
        const response = await httpClient.post("/contacts", newData);
        return response.data;
      } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
      }
    },

    // Update a contact by ID
    async updateContact(id, contactData) {
      try {
        const response = await httpClient.put(`/contacts/${id}`, contactData);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    // Delete a contact by ID
    async deleteContact(id) {
      try {
        const response = await httpClient.delete(`/contacts/${id}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    getAllContacts() {
      this.fetchAllContacts();
    },

    formatContactNumber(value) {
      if (!value) return value;
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length !== 11) return value;
      const formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(
        4,
        7
      )}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
      return formatted;
    },
  },
});
