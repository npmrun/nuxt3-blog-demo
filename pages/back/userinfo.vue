<script setup lang="ts">
definePageMeta({
    layout: "admin-layout",
});
const { user, loggedIn, fetch } = useUserSession()

const showImg = ref('')
const formData = reactive({
    username: undefined,
    email: undefined,
    nickname: undefined,
    tel: undefined,
    file: undefined
})

watch(() => user.value, () => {
    if (user.value) {
        Object.assign(formData, user.value)
        showImg.value = user.value.avatar
    } else {
        showImg.value = ''
        Object.assign(formData, {
            username: undefined,
            email: undefined,
            nickname: undefined,
            tel: undefined,
            file: undefined
        })
    }
}, {
    immediate: true,
    deep: true
})

function handleFileChange(ev: any) {
    const [file] = ev.target.files
    formData.file = file
    showImg.value = URL.createObjectURL(file)
}

async function handleSubmit(ev: Event) {
    ev.preventDefault()
    const form = new FormData()
    for (const key in formData) {
        const element = formData[key as keyof typeof formData];
        if (element) {
            form.append(key, element)
        }
    }
    await $fetch("/api/auth/user", {
        method: "POST",
        body: form,
    }).then(() => {
        fetch()
        useNuxtApp().$toast("修改成功")
    }).catch(() => {
        useNuxtApp().$toast("修改失败")
    })
}
</script>

<template>
    <div class="m-5">
        {{ user.avatar }}
        <form action="#" @submit="handleSubmit">
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">用户名</span>
                </label>
                <input type="text" v-model="formData.username" placeholder="Type here"
                    class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">邮箱</span>
                </label>
                <input type="text" v-model="formData.email" placeholder="Type here"
                    class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">昵称</span>
                </label>
                <input type="text" v-model="formData.nickname" placeholder="Type here"
                    class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">电话</span>
                </label>
                <input type="text" v-model="formData.tel" placeholder="Type here"
                    class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs">
                <label class="label">
                    <span class="label-text">当前头像</span>
                </label>
                <div class="avatar mt-1 mb-1">
                    <div class="w-24 rounded relative">
                        <img :src="showImg" :alt="user.nickname" />
                        <input type="file" @change="handleFileChange" class="absolute inset-0 opacity-0">
                    </div>
                </div>
                <!-- <input type="file" @change="handleFileChange" class="file-input w-full max-w-xs" /> -->
            </div>
            <button class="btn mt-5" type="submit">提交</button>
        </form>

    </div>
</template>

<style lang="scss" scoped></style>