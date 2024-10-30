import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:3000", // Base URL for json-server or your API
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Fetch all contacts
  getContacts() {
    return httpClient.get("/contacts");
  },

  // Fetch a single contact by ID
  getContact(id) {
    return httpClient.get(`/contacts/${id}`);
  },

  // Create a new contact
  createContact(contactData) {
    return httpClient.contact("/contacts", contactData);
  },

  // Update a contact by ID
  updateContact(id, contactData) {
    return httpClient.put(`/contacts/${id}`, contactData);
  },

  // Delete a contact by ID
  deleteContact(id) {
    return httpClient.delete(`/contacts/${id}`);
  },
};
