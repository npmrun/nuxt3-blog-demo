<script setup lang="ts">
const router = useRouter()
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

watch(
    () => locale.value,
    () => {
        if (locale.value) {
            router.replace(switchLocalePath(locale.value))
        }
    }
)
</script>

<template>
    <select id="language" class="select max-w-xs select-sm" v-model="locale">
        <option value="zh">
            {{ $t('language.chinese') }}
        </option>
        <option value="en">
            {{ $t('language.english') }}
        </option>
    </select>
</template>

<style lang="scss" scoped></style>