import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import ContactPage from "./components/ContactPage.vue";
import ContactCard from "./components/ContactCard.vue";
import NewContact from "./components/NewContact.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ContactPage,
    },
  ],
});

const app = createApp(App);
app.component("contact-card", ContactCard);
app.component("new-contact", NewContact);
app.use(router);
app.use(createPinia());
app.mount("#app");
