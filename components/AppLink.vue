<script lang="ts" setup>
const props = defineProps<{
	to: string;
}>();

const computedTo = computed(() => {
	return getLocalePath(props.to);
});
</script>

<template>
	<NuxtLink :to="computedTo"> <slot></slot> </NuxtLink>
</template>
