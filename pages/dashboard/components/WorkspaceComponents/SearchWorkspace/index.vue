<template>
  <div class="relative search-workspace max-w-sm w-full">
    <SearchInput
      @inputValue="(val) => Search(val)"
      placeholderInput="Buscar quadro"
    />

    <ContainerResults @click.stop :state="stateContainerResults">
      <NoResults v-if="stateNoResults"> Sem resultados :( </NoResults>
      <TransitionGroup name="list" tag="ul">
        <li v-for="(item, index) in searchedItems" :key="index">
          <SearchResult
            tabindex="0"
            @click="$router.push(`/dashboard/${item.id}`)"
          >
            {{ item.title }}
          </SearchResult>
        </li>
      </TransitionGroup>
    </ContainerResults>
  </div>
</template>

<script setup>
import ContainerResults from "./ContainerResults.vue";
import SearchResult from "./SearchResult.vue";
import SearchInput from "./SearchInput.vue";
import NoResults from "./NoResults.vue";
import { useWorkspace } from "~/stores/workspace";

let frames = useWorkspace().frames || [];

let input = ref();
let searchedItems = ref([]);

const Search = (val) => {
  controlNoResults.close();
  input.value = val.trim();

  // closes the search modal if the input is empty
  if (input.value) {
    controlContainerResults.open();
  } else {
    controlContainerResults.close();
  }

  if (input.value.length != 0) {
    clearSearchedItems();

    frames.forEach((frame, index) => {
      let search = removeDiacritics(input.value);
      let title = removeDiacritics(frame.title);

      if (title.includes(search)) {
        searchedItems.value.push({
          title: frame.title,
          id: index,
        });
      }
    });

    if (!searchedItems.value.length) {
      controlNoResults.open();
    }
  }
};

const removeDiacritics = (val) => {
  return val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

let stateContainerResults = ref(false);
const controlContainerResults = {
  open: () => (stateContainerResults.value = true),
  close: () => (stateContainerResults.value = false),
};

const clearSearchedItems = () => {
  searchedItems.value = [];
};

let stateNoResults = ref(false);
let controlNoResults = {
  open: () => (stateNoResults.value = true),
  close: () => (stateNoResults.value = false),
};

// Add a click event listener to the main element (e.g. body)
onMounted(() => {
  document.body.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.body.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (event) => {
  // Check if the click occurred outside ContainerResults
  const containerResultsElement = document.querySelector(".search-workspace");

  if (
    containerResultsElement &&
    !containerResultsElement.contains(event.target)
  ) {
    // Close ContainerResults
    controlContainerResults.close();
  }
};
</script>

<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
