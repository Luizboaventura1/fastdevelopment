<template>
  <div class="relative search-workspace max-w-sm w-full" ref="containerResultsRef">
    <SearchInput
      @inputValue="(val) => Search(val)"
      placeholderInput="Buscar quadro"
    />

    <ContainerResults @click.stop :state="stateContainerResults">
      <li v-for="(item, index) in searchedItems" :key="index">
        <SearchResult
          tabindex="0"
          @click="$router.push(`/dashboard/${item.id}`)"
        >
          {{ item.title }}
        </SearchResult>
      </li>
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

let workspace = [];

onMounted(async () => {
  workspace = [...(await getDataWorkspace())];
});

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

    for (let j = 0; j < workspace.length; j++) {
      let inputLength = input.value.length;

      // takes a part of each string to compare
      let search = removeDiacritics(getPieceOfString(input.value, inputLength));
      let databaseWord = removeDiacritics(
        getPieceOfString(workspace[j].title, inputLength)
      );

      if (search === databaseWord) {
        // if the user value is in the database it will be displayed
        searchedItems.value.push({
          title: workspace[j].title,
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

let containerResultsRef = ref()

const handleClickOutside = (event) => {
  // Check if the click occurred outside ContainerResults
  const containerResultsElement = containerResultsRef.value

  if (
    containerResultsElement &&
    !containerResultsElement.contains(event.target)
  ) {
    // Close ContainerResults
    controlContainerResults.close();
  }
};
</script>
