<template>
  <div class="relative search-workspace max-w-sm w-full">
    <SearchInput
      @inputValue="(val) => Search(val)"
      placeholderInput="Buscar quadro"
    />

    <ContainerResults @click.stop :state="stateContainerResults">
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
      <NoResults v-if="searchedItems.length === 0">
        Sem resultados :(
      </NoResults>
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
  input.value = val;

  // closes the search modal if the input is empty
  if (input.value.length === 0) {
    controlContainerResults.close();
  } else {
    controlContainerResults.open();
  }

  input.value = removeSpaces(input.value);

  if (input.value.length != 0) {
    clearSearchedItems();

    for (let j = 0; j < frames.length; j++) {
      let inputLength = input.value.length;

      // takes a part of each string to compare
      let search = removeDiacritics(getPieceOfString(input.value, inputLength));
      let databaseWord = removeDiacritics(
        getPieceOfString(frames[j].title, inputLength)
      );

      if (search === databaseWord) {
        // if the user value is in the database it will be displayed
        searchedItems.value.push({
          title: frames[j].title,
          id: j,
        });
      }
    }
  }
};

const getPieceOfString = (string, index) => {
  let formattedIndex = index === 0 ? 1 : index;
  return string.split("").splice(0, formattedIndex).join("");
};

const removeDiacritics = (val) => {
  return val
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const removeSpaces = (val) => val.split(" ").join("");

let stateContainerResults = ref(false);
const controlContainerResults = {
  open: () => (stateContainerResults.value = true),
  close: () => (stateContainerResults.value = false),
};

const clearSearchedItems = () => {
  searchedItems.value = [];
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
