<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import btybreaks from "@bytemd/plugin-breaks";
import zhHans from "bytemd/locales/zh_Hans.json";
import { Viewer } from "@/components/MdEditor";

import { SkeletonBlock, SkeletonImage } from 'skeleton-elements/vue';
import { stat } from "fs";

definePageMeta({
    layout: "pure-layout",
});

const state = reactive({
    isEdit: false
})

const formState = reactive({
    articleContent: ''
})

const loginModalEl = ref<HTMLDialogElement>()
function openLoginModal() {
    // naivigatePush("/login")
    loginModalEl.value?.showModal()
}

function handleLoginSuccess() {
    loginModalEl.value?.close("animalNotChosen")
}

async function handleQuit() {
    const { clear } = useUserSession();
    await clear();
    useTo("退出成功");
}

function toggleEdit() {
    state.isEdit = !state.isEdit
    if(state.isEdit && article.value !== null){
        formState.articleContent = article.value
    }
}

async function save() {
    const loadID = useNuxtApp().$toast.loading("保存中...")
	await $fetch("/api/home", {
		method: "POST",
		body:  toRaw(formState)
	})
    useNuxtApp().$toast.remove(loadID)
    useNuxtApp().$toast.success("保存成功")
	nextTick(()=>{
        refresh()
    })
}

const { user, loggedIn } = useUserSession()
const {
    data: article,
    pending,
    refresh,
    error,
} = useFetch("/api/home", {
    method: "GET",
    query: {},

});
</script>

<template>
    <div class="max-w-[960px] mx-auto min-h-full py-8 flex flex-col">
        <div>
            <div v-if="loggedIn" class="mb-2">欢迎您, <span class="underline underline-offset-2 cursor-pointer">{{
                user.nickname }}</span>阁下</div>
            <ChangeLanguage class="mr-2"></ChangeLanguage>
            <ChangeTheme></ChangeTheme>
        </div>
        <div class="my-5 h-full flex-grow relative" :style="{ height: state.isEdit ? '0' : '' }">
            <div class="absolute top-8 right-full mr-8">
                <div class="tooltip tooltip-left" data-tip="切换文章">
                    <button class="btn btn-square shadow bg-base-100 hover:bg-base-300 outline-1">
                        <Icon name="ph:article-medium-light" class="h-6 w-6"></Icon>
                    </button>
                </div>
            </div>
            <div class="absolute top-8 left-full ml-8">
                <div v-if="!loggedIn" class="tooltip tooltip-right" data-tip="登陆">
                    <button @click="openLoginModal" class="btn btn-square shadow bg-base-100 hover:bg-base-300 outline-1">
                        <Icon name="ant-design:login-outlined" class="h-6 w-6"></Icon>
                    </button>
                </div>
                <template v-else>
                    <div v-if="state.isEdit" class="tooltip tooltip-right" data-tip="保存">
                        <button @click="save"
                            class="btn btn-square shadow bg-base-100 hover:bg-base-300 outline-1">
                            <Icon name="ic:round-save" class="h-6 w-6"></Icon>
                        </button>
                    </div>
                    <div v-if="!state.isEdit" class="tooltip tooltip-right" data-tip="编辑">
                        <button @click="toggleEdit"
                            class="btn btn-square shadow bg-base-100 hover:bg-base-300 outline-1">
                            <Icon name="mingcute:edit-line" class="h-6 w-6"></Icon>
                        </button>
                    </div>
                    <div v-if="state.isEdit" class="tooltip tooltip-right" data-tip="退出编辑">
                        <button @click="toggleEdit"
                            class="btn btn-square shadow bg-base-100 hover:bg-base-300 outline-1">
                            <Icon name="iconamoon:exit-light" class="h-6 w-6"></Icon>
                        </button>
                    </div>
                    <div v-if="!state.isEdit" class="tooltip tooltip-right" data-tip="用户退出">
                        <button @click="handleQuit" class="btn btn-square shadow bg-base-100 hover:bg-base-300 outline-1">
                            <Icon name="iconamoon:exit-light" class="h-6 w-6"></Icon>
                        </button>
                    </div>
                </template>
            </div>
            <div class="rounded-lg bg-base-100 shadow-lg markdown-body"
                :style="{ display: state.isEdit ? 'flex' : '', height: state.isEdit ? '100%' : '' }">
                <div v-if="!state.isEdit && pending">
                    <skeleton-image :width="300" :height="200" effect="wave" />
                    <skeleton-block tag="p" width="60%" effect="wave" />
                    <skeleton-block tag="p" width="20%" effect="wave" />
                    <skeleton-block tag="p" width="40%" effect="wave" />
                    <skeleton-block tag="p" width="45%" effect="wave" />
                    <skeleton-block tag="p" width="30%" effect="wave" />
                    <skeleton-block tag="p" width="35%" effect="wave" />
                    <skeleton-block tag="p" width="56%" effect="wave" />
                    <skeleton-block tag="p" width="60%" effect="wave" />
                    <skeleton-block tag="p" width="70%" effect="wave" />
                </div>
                <template v-else>
                    <div v-if="state.isEdit" class="h-full w-full">
                        <MdEditorBaseMdEditor style="height: calc(100% - 3px);width: 100%;"
                            :value="formState.articleContent" @change="(v: string) => (formState.articleContent = v)">
                        </MdEditorBaseMdEditor>
                    </div>
                    <div v-else class="p-5">
                        <Viewer :plugins="[gfm(), frontmatter(), btybreaks()]" :locale="zhHans" :value="article"></Viewer>
                    </div>
                </template>
            </div>
        </div>
        <div class="text-center">
            © 2023 <a target="_blank" href="https://github.com/npmrun">NPMRUN</a>. All rights reserved.
            <div>
                Built with ♥ | Powered By Nuxt
            </div>
        </div>
        <dialog ref="loginModalEl" class="modal">
            <div class="modal-box">
                <LoginForm @success="handleLoginSuccess"></LoginForm>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>

<style lang="scss" scoped>
.tooltip {
    &+& {
        @apply mt-2;
    }
}
</style>
