<template>
  <div @click.stop class="w-full max-w-[460px] rounded-lg relative h-[38px]">
    <input
      type="text"
      class="rounded-full w-full h-[38px] absolute top-0 left-0 z-40 outline-none ring-1 ring-thirdBorderF focus:ring-zinc-400 bg-secondaryColorF focus:bg-subSecondaryColorF py-2 px-3 text-white text-sm placeholder-zinc-400"
      placeholder="Buscar..."
      @input="search"
      @click="search"
      v-model="input"
    />
    <div class="absolute top-0 left-0 w-full z-30">
      <ContainerResults :state="state">
        <div v-if="stateRecentProjects">
          <div class="flex px-5">
            <span class="text-textSecondaryColorF text-sm select-none pb-2"
              >Recentes</span
            >
          </div>
          <ItemSearchResult
            v-for="(item, index) in recentProjects"
            :key="index"
            :link="`/dashboard/frame/${index}`"
          >
            {{ item.title }}
          </ItemSearchResult>
        </div>
        <div v-else-if="searchedItems.length != 0">
          <div class="flex px-5">
            <span class="text-textSecondaryColorF text-sm select-none pb-2"
              >Resultados</span
            >
          </div>
          <ItemSearchResult
            v-for="(item, index) in searchedItems"
            :key="index"
            :link="item.link"
          >
            {{ item.title }}
          </ItemSearchResult>
        </div>
        <div v-else-if="noResults">
          <div class="flex px-5">
            <span class="text-textSecondaryColorF text-sm select-none pb-2"
              >Sem resultados</span
            >
          </div>
        </div>
      </ContainerResults>
    </div>
  </div>
</template>

<script setup>
import ContainerResults from "./ContainerResults.vue";
import ItemSearchResult from "./ItemSearchResult.vue";

let input = ref("");
let state = ref(false);
let stateRecentProjects = ref(false);
let noResults = ref(false);

const search = () => {
  state.value = true;
  stateRecentProjects.value = true;

  clearSearchedItems();

  if (input.value) {
    arr.value.forEach((item, index) => {
      let userInput = removeDiacritics(input.value).trim();
      let title = removeDiacritics(item.title);

      if (title.includes(userInput)) {
        stateRecentProjects.value = false;

        searchedItems.value.push({
          title: arr.value[index]?.title,
          link: `/dashboard/frame/${index}`,
        });
      }
    });

    if (searchedItems.value.length === 0) {
      stateRecentProjects.value = false;
      noResults.value = true;
    }
  } else if (input.value.length === 0) {
    stateRecentProjects.value = true;
  }
};

const removeDiacritics = (val) => {
  return val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const props = defineProps({
  array: Array,
});

const handleClickOutsite = () => {
  state.value = false;
};

let arr = ref(props.array || []);

let recentProjects = ref(getRecentProjects([...arr.value]));

watchEffect(() => {
  recentProjects.value = getRecentProjects([...arr.value]);
});

let searchedItems = ref([]);
const clearSearchedItems = () => (searchedItems.value = []);

onMounted(() => {
  document.body.addEventListener("click", handleClickOutsite);
});

onBeforeUnmount(() => {
  document.body.addEventListener("click", handleClickOutsite);
});
</script>

<style lang="scss" scoped></style>
