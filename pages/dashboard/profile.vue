<template>
  <header
    class="h-full bg-secondaryColorF p-4 rounded-lg w-full overflow-y-auto grid gap-y-4 grid-rows-[auto,auto,2fr]"
  >
    <nav class="px-4 py-7 rounded-lg flex gap-5 items-center">
      <img
        :src="userInfo?.photoUrl"
        alt="Img user"
        class="rounded-full w-[90px] h-[90px] ring-1 ring-zinc-700"
      />

      <div>
        <h1 class="w-full text-white font-medium text-xl">
          {{ userInfo?.name }}
        </h1>
        <span class="text-textSecondaryColorF text-sm font-medium">{{
          userInfo?.email
        }}</span>
      </div>
    </nav>
    <main
      class="rounded-lg bg-subSecondaryColorF ring-1 ring-zinc-600 flex flex-col md:flex-row items-center justify-around px-4 py-6"
    >
      <header class="w-3/12 flex justify-center items-center">
        <main class="text-center">
          <h1 class="text-textPrimaryColorF font-bold text-4xl">
            {{ totalTasks }}
          </h1>
          <span class="font-medium text-sm text-textSecondaryColorF"
            >Tarefas</span
          >
        </main>
      </header>
      <div class="w-full my-3 md:my-0 h-[1px] md:w-[1px]  md:h-12 bg-zinc-600"></div>
      <header class="w-3/12 flex justify-center items-center">
        <main class="text-center">
          <h1 class="text-textPrimaryColorF font-bold text-4xl">
            {{ totalProjects }}
          </h1>
          <span class="font-medium text-sm text-textSecondaryColorF"
            >Projetos</span
          >
        </main>
      </header>
    </main>
    <footer class="grid grid-rows-[auto,1fr]">
      <h1 class="text-zinc-300 font-medium text-sm pb-3">Atividade</h1>
      <div
        class="rounded-lg bg-subSecondaryColorF p-2 ring-1 ring-zinc-600 flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 64 64"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
          fill-rule="evenodd"
          class="w-[100px] h-[100px]"
        >
          <g>
            <path
              fill="#cadcf0"
              d="M52 35.617H12v18.512a2 2 0 0 0 1.425 1.916l18 5.4a2.01 2.01 0 0 0 1.15 0l18-5.4A2 2 0 0 0 52 54.129V35.617z"
              opacity="1"
              data-original="#cadcf0"
              class=""
            ></path>
            <path
              fill="#a4bbdb"
              d="M52 35.617H32s-.194 25.912 0 25.912.387-.028.575-.084l18-5.4A2 2 0 0 0 52 54.129V35.617z"
              opacity="1"
              data-original="#a4bbdb"
            ></path>
            <path
              fill="#e9f3fc"
              d="m32 42.106-20-6.489-5.075 7.524a1 1 0 0 0 .52 1.511l17.995 5.846a1 1 0 0 0 1.137-.39L32 42.106zM52 35.617l-20 6.489 5.423 8.002a1 1 0 0 0 1.137.39l17.995-5.846a1 1 0 0 0 .52-1.511L52 35.617z"
              opacity="1"
              data-original="#e9f3fc"
            ></path>
            <path
              fill="#cadcf0"
              d="M27.159 21.986a1 1 0 0 0-1.136-.388L8.027 27.445a.998.998 0 0 0-.52 1.51L12 35.617l20-6.511-4.841-7.12z"
              opacity="1"
              data-original="#cadcf0"
              class=""
            ></path>
            <path
              fill="#e9f3fc"
              d="M56.493 28.955a1 1 0 0 0-.52-1.51l-17.996-5.847a1 1 0 0 0-1.136.388L32 29.106l20 6.511 4.493-6.662z"
              opacity="1"
              data-original="#e9f3fc"
            ></path>
            <path
              fill="#cadcf0"
              d="m52 35.617-20-6.511-20 6.511 20 6.489z"
              opacity="1"
              data-original="#cadcf0"
              class=""
            ></path>
            <path
              fill="#a4bbdb"
              d="M32 42.106v-13l-20 6.511z"
              opacity="1"
              data-original="#a4bbdb"
            ></path>
            <g fill="#347bfa">
              <path
                d="M27.982 31.978a8.757 8.757 0 0 1-1.124-.868 1 1 0 0 0-1.352 1.473c.409.376.87.734 1.382 1.069a1 1 0 0 0 1.094-1.674zM24.866 28.906a8.689 8.689 0 0 1-.754-1.213 1 1 0 0 0-1.783.907c.254.498.562.997.927 1.492a1 1 0 0 0 1.61-1.186zM23.404 24.825c.01-.403.069-.794.177-1.169a1 1 0 0 0-1.923-.551 6.71 6.71 0 0 0-.254 1.67 1 1 0 0 0 2 .05zM24.942 21.485c.257-.238.545-.458.86-.657a1 1 0 0 0-1.067-1.692 7.855 7.855 0 0 0-1.152.882 1 1 0 0 0 1.359 1.467zM28.661 19.76a11.338 11.338 0 0 1 1.598-.176 1.001 1.001 0 0 0-.085-1.999c-.66.028-1.286.099-1.877.208a1 1 0 0 0 .364 1.967zM33.873 19.701c.853.01 1.647-.02 2.384-.085a1 1 0 0 0-.177-1.992c-.675.059-1.402.087-2.184.077a1 1 0 0 0-.023 2zM39.544 19.003c.99-.303 1.826-.691 2.526-1.136a1 1 0 0 0-1.075-1.687 8.302 8.302 0 0 1-2.036.91 1 1 0 0 0 .585 1.913zM44.634 15.068a6.21 6.21 0 0 0 .607-3.003 1 1 0 0 0-1.998.093 4.215 4.215 0 0 1-.41 2.04 1.001 1.001 0 0 0 1.801.87zM43.997 8.529c-.729-.985-1.718-1.671-2.796-1.892a1.001 1.001 0 0 0-.402 1.96c.622.127 1.17.554 1.591 1.123a1 1 0 1 0 1.607-1.191z"
                fill="#347bfa"
                opacity="1"
                data-original="#347bfa"
              ></path>
            </g>
            <path
              fill="#cadcf0"
              d="M30.933 6.831c1.082-6.127 10.459-5.731 5 0zM30.933 8.383c1.082 6.126 10.459 5.731 5 0z"
              opacity="1"
              data-original="#cadcf0"
              class=""
            ></path>
            <path
              fill="#347bfa"
              d="M30.843 8.617h6.696a1 1 0 0 0 0-2h-6.696a1.001 1.001 0 0 0 0 2z"
              opacity="1"
              data-original="#347bfa"
            ></path>
          </g>
        </svg>
      </div>
    </footer>
  </header>
  <SpeedInsights />
</template>

<script setup>
import { useWorkspace } from "~/stores/workspace";
import { SpeedInsights } from "@vercel/speed-insights/nuxt"

let userInfo = useCookie("userInfo");
let totalTasks = ref(0);
let totalProjects = ref(0);

onMounted(() => {
  useWorkspace()
    .workspace()
    .then((data) => {
      if (!userInfo.value) {
        useCookie("userInfo").value = {
          name: data.name,
          email: data.email,
          photoUrl: data.photoUrl,
        };
      }

      totalProjects.value = data.frames.length

      data.frames.forEach((frame) => {
        frame.frame.forEach((list) => {
          totalTasks.value += list.cards.length
        });
      });

    });
});
</script>
