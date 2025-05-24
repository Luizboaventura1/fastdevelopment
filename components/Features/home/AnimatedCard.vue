<template>
  <div
    class="benefit h-full flex items-center justify-center relative border border-darkGrayBorderF w-full max-w-lg m-auto rounded-lg overflow-hidden"
  >
    <div class="animation-bar w-[90px] h-[750px] bg-white"></div>

    <div class="benefit-box overflow-hidden rounded-lg">
      <div
        class="grid-background flex justify-center items-center h-[150px] border-b border-darkGrayBorderF"
      >
        <slot name="icon" />
      </div>
      <div class="p-5 space-y-2"><slot /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary-color: #8257e5;
$secondary-color: #202024;
$sub-secondary-color: #121214;

.benefit {
  .animation-bar {
    position: absolute;
    z-index: 1;
    top: -250px;
    left: 50%;
    transform: translate(-50%);
    box-shadow: 0 0 30px 30px rgb(255, 255, 255);
    display: none;
  }

  .benefit-box {
    z-index: 40;
    background-color: $sub-secondary-color;
    width: 99.5%;
    height: 99.2%;
    transition: 0.3s;
  }

  &:hover {
    .animation-bar {
      animation: animationBar 3.5s linear infinite;
      display: block;
    }
  }
}

.benefit ::v-deep(.grid-background svg) {
  transition: all 0.5s;
}

.benefit:hover ::v-deep(.grid-background svg) {
  fill: white;
}

@keyframes animationBar {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.grid-background {
  background-image: linear-gradient(to right, #4a4a4a1e 1px, transparent 1px),
    linear-gradient(to bottom, #4a4a4a1e 1px, transparent 1px);
  background-size: 30px 30px;

  svg {
    transition: all 1s;
  }
}
</style>
