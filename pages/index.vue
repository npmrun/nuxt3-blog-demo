<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});
const { locale } = useI18n();
const { user, loggedIn } = useUserSession();
const localePath = useLocalePath();
const router = useRouter();

async function handleQuit() {
  const { clear } = useUserSession();
  await clear();
  useTo("退出成功", "/");
}

const { data: articles } = useFetch("/api/article/articles", {
  transform(input) {
    return input?.data ?? [];
  },
}) as any;

function toDetail(record: any) {
  router.push(localePath("/article/" + record.id));
}
</script>

<template>
  <div>
    <div class="navbar sticky top-0">
      <!-- <div class="gap-2">
                <div class="form-control">
                    <input type="text" placeholder="搜索" class="input input-bordered w-24 md:w-auto" />
                </div>
            </div> -->
      <div class="flex-1"></div>
      <div class="flex-none ml-2">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost">
            <span>外链</span>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          >
            <li>
              <a href="https://daisyui.com/" target="_blank">daisyui</a>
            </li>
            <li><a href="https://nuxt.com/">nuxt</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content mx-10 my-3">
      <div v-for="(article, index) in articles" class="border-2 rounded-xl p-4 mt-5 first:mt-0">
        <div class="text-2xl line-clamp-1 cursor-pointer" @click="toDetail(article)">
          {{ article.title }}
        </div>
        <div class="text-sm">
          {{ article.author?.nickname ?? "佚名" }}
        </div>
        <div class="line-clamp-2 leading-4 mt-3 cursor-pointer" @click="toDetail(article)">
          {{ article.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
