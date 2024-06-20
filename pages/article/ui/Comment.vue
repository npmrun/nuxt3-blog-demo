<script setup lang="ts">
const state = reactive({
    comment: undefined
})
</script>
<template>
    <ClientOnly>
        <div>
            asdaa-{{ state.comment }}
        </div>
        <textarea v-model="state.comment" placeholder="评论"
            class="textarea textarea-bordered textarea-sm w-full max-w-xs"></textarea>
    </ClientOnly>
</template>