<script setup lang="ts">
const colorMode = useColorMode();
const themes = [
  "system",
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];
</script>

<template>
  <select id="theme" v-model="colorMode.preference" class="select max-w-xs select-sm">
    <option disabled selected>Theme</option>
    <option v-for="theme of themes" :key="theme">
      {{ theme }}
    </option>
  </select>
</template>

<style lang="scss" scoped></style>
