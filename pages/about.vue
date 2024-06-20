<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import frontmatter from "@bytemd/plugin-frontmatter";
import btybreaks from "@bytemd/plugin-breaks";
import zhHans from "bytemd/locales/zh_Hans.json";
import { Viewer } from "@/components/MdEditor";
import AboutRaw from "./about.md?raw"
definePageMeta({
	layout: "main-layout",
});

const counterStore = useCounter()

const { double, n } = storeToRefs(counterStore)
console.log(n);

const aa = reactive({
	name: "aa"
})
const b = toRef(aa, "name")

</script>
<template>
	<article class="prose lg:prose-xl m-10">
		<div @click="b = 'nn'">
			{{ aa.name }}-{{ b }}
		</div>
		<p>
			该系统为全栈项目，仅用于熟悉<code>nuxt3</code>，如遇到任何问题，可来此<a target="_blank"
				href="https://github.com/npmrun/nuxt3-blog-demo">仓库</a>提issue！
		</p>
		<p>胸无点墨，不想卖弄。欢迎联系我。</p>
		<Viewer :plugins="[gfm(), frontmatter(), btybreaks()]" :locale="zhHans" :value="AboutRaw">
		</Viewer>
		<div @click="counterStore.increment()">
			{{ double }}-{{ counterStore.double }}
		</div>
		<div @click="n++">
			{{ n }}-{{ counterStore.n }}
		</div>
	</article>
</template>

<style lang="scss" scoped></style>
