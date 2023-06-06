<template>
  <div class="card">
    <img :src="`/images/${experience?.image}`" :alt="experience?.name" />
    <span class="card__text">
      {{ experience?.name }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    experience: { type: Object, require: true },
  },
};
</script>
