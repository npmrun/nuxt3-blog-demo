<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import btybreaks from "@bytemd/plugin-breaks";
import zhHans from "bytemd/locales/zh_Hans.json";
import { Viewer } from "@/components/MdEditor";

definePageMeta({
    layout: "pure-layout",
});

const loginModalEl = ref<HTMLDialogElement>()

function openLoginModal() {
    loginModalEl.value?.showModal()
}

console.log(22);


const {
    data: article,
    pending,
    error,
} = useFetch("/api/home", {
    method: "GET",
    query: {}
});
</script>

<template>
    <div class="max-w-[960px] mx-auto min-h-full py-8 flex flex-col">
        <div>
            <ChangeLanguage class="mr-2"></ChangeLanguage>
            <ChangeTheme></ChangeTheme>
        </div>
        <div class="my-5 h-full flex-grow relative">
            <div class="absolute top-8 right-full mr-8">
                <div class="tooltip tooltip-left" data-tip="切换文章">
                    <button class="btn btn-square shadow bg-base-100 hover:bg-base-300 outline-1">
                        <Icon name="ph:article-medium-light" class="h-6 w-6"></Icon>
                    </button>
                </div>
            </div>
            <div class="absolute top-8 left-full ml-8">
                <div class="tooltip tooltip-right" data-tip="登陆">
                    <button @click="openLoginModal"
                        class="btn btn-square shadow bg-base-100 hover:bg-base-300 outline-1">
                        <Icon name="ant-design:login-outlined" class="h-6 w-6"></Icon>
                    </button>
                </div>
                <!-- <div class="tooltip tooltip-right mt-3" data-tip="编辑">
                    <button class="btn btn-square shadow bg-base-100 hover:bg-base-300 outline-1">
                        <Icon name="mingcute:edit-line" class="h-6 w-6"></Icon>
                    </button>
                </div> -->
            </div>
            <div class="p-5 rounded-lg bg-base-100 shadow-lg">
                <Viewer :plugins="[gfm(), frontmatter(), btybreaks()]" :locale="zhHans" :value="article"></Viewer>
            </div>
        </div>
        <div class="text-center">
            © 2023 <a target="_blank" href="https://github.com/npmrun">NPMRUN</a>. All rights reserved.
            <div>
                Built with ♥ | Powered By Nuxt
            </div>
        </div>
        <dialog ref="loginModalEl" class="modal">
            <div class="modal-box w-11/12 max-w-5xl">
                <h3 class="font-bold text-lg">Hello!</h3>
                <p class="py-4">Click the button below to close</p>
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

<style lang="scss" scoped></style>
