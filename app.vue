<script lang="ts" setup>
const { loggedIn, user } = useUserSession()

// watch(loggedIn, () => {
//   if (!loggedIn.value) {
//     navigateTo('/')
//   }
// })
</script>

<template>
  <NuxtLayout name="main-layout">
    <NuxtPage />--{{ loggedIn }}--{{ user.email }}
  </NuxtLayout>
</template>
