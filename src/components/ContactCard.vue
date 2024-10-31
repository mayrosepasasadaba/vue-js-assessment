<template>
  <div class="contact-card">
    <div class="contact-header">
      <router-link
        :to="`/view/${contactInfo.id}`"
        routerLinkActive="router-link-active"
        class="contact-name"
        ><span>{{ contactInfo.name }}</span></router-link
      >
      <p class="action-buttons">
        <button>
          <span class="material-symbols-outlined" @click="onEdit"> edit </span>
        </button>
        <button>
          <span class="material-symbols-outlined" @click="onDelete">
            delete
          </span>
        </button>
      </p>
    </div>
    <div class="mt-1">{{ contactInfo.email }}</div>
    <div class="mt-1">{{ contactInfo.contact_no }}</div>
  </div>
</template>

<script>
export default {
  props: ["contactInfo"],
  methods: {
    onDelete() {
      this.$emit("delete-contact");
    },
    onEdit() {
      this.$emit("edit-contact");
    },
  },
};
</script>

<style>
.contact-card {
  border: 1px solid #ccc;
  padding: 6%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0.5em;
}

.contact-header {
  display: flex;
  justify-content: space-between;
  padding: 0;
}
.contact-header p {
  margin: 0;
}

.contact-name {
  font-weight: bold;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: black;
}

.mt-1 {
  margin-top: 1em;
}

.action-buttons {
  display: flex;
  justify-content: end;
  gap: 0.3em;
}

.action-buttons button {
  background-color: transparent;
  border: none;
  padding-bottom: 0;
  padding-top: 0;
  padding-right: 0;
}

.action-buttons .material-symbols-outlined {
  font-size: 1.4em;
}

@media (max-width: 412px) {
  .contact-card {
    font-size: 3vw;
  }

  .material-symbols-outlined {
    font-size: 4em !important;
  }
}
</style>
