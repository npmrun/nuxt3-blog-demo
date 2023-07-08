<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import btybreaks from "@bytemd/plugin-breaks";
import zhHans from "bytemd/locales/zh_Hans.json";
import collectPlugin from "./plugins/collectPlugin";
import { Editor as MdEditor, Viewer } from ".";

const ppp: any = {
  viewerEffect({ markdownBody }: any) {
    const links = markdownBody.querySelectorAll("a");
    links.forEach((link: any) => {
      link.setAttribute("target", "_blank");
      // @ts-ignore
      link.onclick = window.setURL;
      link.oncontextmenu = function () {};
      link.setAttribute("ahref", link.getAttribute("href"));
      link.removeAttribute("href");
    });
  },
};

onMounted(() => {
  document.querySelector(".markdown-body")?.classList.add("content");
});
</script>

<template>
  <MdEditor :plugins="[gfm(), frontmatter(), btybreaks(), ppp, collectPlugin()]" :locale="zhHans">
  </MdEditor>
</template>

<style lang="scss" scoped>
:deep(.bytemd) {
  height: 100%;
}
// .doc-card {
//     display: inline-block;
//     box-sizing: border-box;
//     width: calc(100% / 4 - 18px);
//     margin: 10px;
//     margin-left: 0;

//     @include media-pc(lg) {
//         width: calc(100% / 3 - 16px);
//         margin: 10px;
//         margin-left: 0;
//     }

//     @include media-pc(md) {
//         width: calc(100% / 2 - 16px);
//         margin: 10px;
//         margin-left: 0;
//     }

//     @include media-pc(sm) {
//         width: 100%;
//         margin: 10px;
//         margin-left: 0;
//     }

//     /* min-width: 20%; */
//     padding: 10px;
//     background: white;
//     border-radius: 5px;
//     box-shadow: 0px 2px 10px 0px rgb(212, 212, 212);
//     transition: transform 0.5s ease,
//     box-shadow 0.5s linear;
//     position: relative;
//     overflow: hidden;

//     &.doc-card-inner::after {
//         content: "内";
//         position: absolute;
//         left: 3px;
//         top: 3px;
//         font-size: 14px;
//         line-height: 1;
//         font-weight: bold;
//         color: rgb(106, 189, 11);
//     }

//     &.doc-card-inner::before {
//         content: "";
//         position: absolute;
//         left: 0;
//         top: 0;
//         width: 0;
//         height: 0;
//         border: 13px solid red;
//         border-right-color: transparent;
//         border-bottom-color: transparent;
//     }

//     &.doc-card-demo::after {
//         content: "Demo";
//         position: absolute;
//         left: 3px;
//         top: 3px;
//         font-size: 14px;
//         line-height: 1;
//         font-weight: bold;
//         color: rgb(106, 189, 11);
//     }

//     &.doc-card-demo::before {
//         content: "";
//         position: absolute;
//         left: 0;
//         top: 0;
//         width: 0;
//         height: 0;
//         border: 13px solid red;
//         border-right-color: transparent;
//         border-bottom-color: transparent;
//     }

//     &:hover {
//         box-shadow: 0px 6px 15px 0px rgb(212, 212, 212);
//         transform: translateY(-6px);
//     }

//     .doc-card-title {
//         font-size: 20px;
//         font-weight: bold;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         white-space: nowrap;
//         margin-bottom: 5px;
//     }

//     .doc-card-describe {
//         font-size: 14px;
//         line-height: 1.3;
//         height: 36.4px;
//         color: #b9b9b9;
//         display: -webkit-box;
//         -webkit-box-orient: vertical;
//         -webkit-line-clamp: 2;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         word-break: break-all;
//     }

//     .doc-card-bottom {
//         height: 35px;
//         border-top: 0.5px solid rgb(221, 221, 221);
//         margin: 0 -10px;
//         padding: 0 10px;
//         padding-top: 5px;
//         margin-top: 5px;
//         margin-bottom: 0;
//         display: flex;
//         align-items: center;
//         min-height: 25px;
//         flex-wrap: nowrap;
//         overflow-x: auto;
//         scrollbar-width: none; // 火狐隐藏滚动条

//         &::-webkit-scrollbar {
//             display: none; // chrome隐藏滚动条
//         }
//     }

//     .doc-card-bottom .doc-card-tag {
//         display: inline-block;
//         text-decoration: none;
//         color: white;
//         background-color: rgb(106, 189, 11);
//         padding: 2px 4px;
//         font-size: 12px;
//         cursor: pointer;
//         white-space: nowrap;
//         margin-right: 5px;
//         margin-top: 5px;

//         &::before {
//             content: "";
//             border-bottom: 0 !important;
//         }
//     }
// }

// .doc-card-a {
//     display: block;
//     color: unset;
//     text-decoration: none !important;
//     white-space: nowrap;

//     &::before {
//         content: "";
//         border-bottom: 0 !important;
//     }

//     .doc-card-describe {
//         white-space: pre-wrap;
//     }
// }
</style>
