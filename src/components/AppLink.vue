<template>
  <a
    v-if="isExternal"
    target="_blank"
    rel="noopener"
    class="external-link"
    :href="to"
    ><slot
  /></a>
  <router-link v-else v-bind="$props"><slot /></router-link>
</template>

<script lang="ts">
import { RouterLink } from "vue-router";

export default {
  props: {
    // @ts-ignore
    ...RouterLink.props,
  },
  computed: {
    isExternal() {
      return typeof this.to === "string" && this.to.startsWith("http");
    },
  },
};
</script>
