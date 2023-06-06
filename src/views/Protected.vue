<template>
  <div>
    <h1>Greetings, {{ username }}</h1>
    <button @click="logout">Logout</button>
    <router-link :to="{ name: 'invoices' }">
      <button>Invoices</button>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return { username: window.user };
  },
  methods: {
    logout() {
      window.user = "";
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
