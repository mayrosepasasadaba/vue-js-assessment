<template>
  <div class="contact-card">
    <div class="contact-header">
      <a class="contact-name">
        <span>{{ contactInfo.name }}</span>
      </a>
      <p class="action-buttons">
        <button>
          <span class="material-symbols-outlined"> edit </span>
        </button>
        <button>
          <span class="material-symbols-outlined"> delete </span>
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
  methods: {},
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
  gap: 1em;
}

.action-buttons button {
  background-color: transparent;
  border: none;
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
