import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import ContactPage from "./components/ContactPage.vue";
import ContactCard from "./components/ContactCard.vue";
import NewContact from "./components/NewContact.vue";
import ViewContact from "./components/ViewContact.vue";
import PageNotFound from "./components/PageNotFound.vue";
import ShowAlert from "./shared/ShowAlert.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ContactPage,
    },
    {
      path: "/view/:contactId",
      component: ViewContact,
      props: true,
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/:notFound(.*)",
      component: PageNotFound,
    },
  ],
});

const app = createApp(App);
app.component("contact-card", ContactCard);
app.component("new-contact", NewContact);
app.component("show-alert", ShowAlert);
app.use(router);
app.use(createPinia());
app.mount("#app");
