<template>
  <svg
    :style="`width:${props.size};height:${props.size};`"
    class="fill-textPrimaryColorF focus:fill-blue-600 outline-none"
    tabindex="1"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 128 128"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    data-hydrated-width="true"
  >
    <g>
      <g fill-rule="evenodd" clip-rule="evenodd">
        <path
          d="M46.935 16H34v46.617c.108 7.346 2.757 12.953 7.886 17.052C47.076 83.817 54.208 86 63.5 86c9.44 0 16.613-2.248 21.756-6.509l.005-.004C90.398 75.259 93 69.533 93 62.08V16H80.008v46.615c-.081 4.793-1.438 8.73-4.386 11.44-2.924 2.688-7.083 3.862-12.122 3.862-4.86 0-8.945-1.16-12.01-3.724l-.01-.01-.012-.01c-3.159-2.723-4.533-6.881-4.533-11.993zM102 97H26v12h76z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </g>
  </svg>
</template>

<script setup>
const props = defineProps({
  size: String,
  color: String,
});
</script>
