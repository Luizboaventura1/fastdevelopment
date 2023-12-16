<template>
  <button
    @click.stop="$emit('editCard')"
    class="edit-card-button w-[28px] h-[28px] flex items-center justify-center rounded-lg"
  >
    <svg
      class="w-[15px] h-[15px]"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      style="enable-background: new 0 0 512 512"
      xml:space="preserve"
    >
      <g>
        <path
          d="M1.172 19.119A4 4 0 0 0 0 21.947V24h2.053a4 4 0 0 0 2.828-1.172L18.224 9.485l-3.709-3.709ZM23.145.855a2.622 2.622 0 0 0-3.71 0l-3.506 3.507 3.709 3.709 3.507-3.506a2.622 2.622 0 0 0 0-3.71Z"
          opacity="1"
          data-original="#000000"
          class=""
        ></path>
      </g>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.edit-card-button {
  display: none;
  transition: 0.2s;

  svg {
    fill: #b4b4b4;
  }

  &:hover {
    background-color: #1a1a1d;

    svg {
      fill: #ffffff;
    }
  }
}
</style>
