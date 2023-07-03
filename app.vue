<script lang="ts" setup>
const { loggedIn, user } = useUserSession()

// watch(loggedIn, () => {
//   if (!loggedIn.value) {
//     navigateTo('/')
//   }
// })
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
