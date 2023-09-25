<template>
  <section class="flex justify-center py-12">
    <div class="container h-full grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
      <div class="benefit flex justify-center items-center h-[220px] rounded-lg overflow-hidden">

        <div class="animation-bar w-[90px] h-[700px] bg-white"></div>

        <div class="benefit-box h-[216px] overflow-hidden rounded-lg">
          <div class="flex items-center ps-7 h-[70px] mb-3">
            <svg
              class="fill-violet-600 w-[40px] h-[40px]"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.com/svgjs"
              viewBox="0 0 512 512"
              style="enable-background:new 0 0 512 512"
              xml:space="preserve"><g><path d="M423.471 196.132a12 12 0 0 0-10.701-6.569h-80.888l82.731-163.135A12.002 12.002 0 0 0 403.911 9H199.039c-4.92 0-9.342 3.003-11.155 7.578L88.075 268.332a12 12 0 0 0 11.156 16.422H223.63l-34.416 204.252a12 12 0 0 0 21.519 9.079l211.723-289.438a12.003 12.003 0 0 0 1.015-12.515zM221.308 442.977l28.346-168.229a12 12 0 0 0-11.833-13.993H116.896L207.19 33h177.18l-82.731 163.135a12.002 12.002 0 0 0 10.703 17.428h76.782z" opacity="1" data-original="#000000" class=""></path></g></svg>
          </div>
          <div class="px-4 h-[148px]">
            <h1 class="text-slate-50 font-bold text-lg mb-3">Fast</h1>
            <p class="text-zinc-300">
              Aumente sua produtividade em 50% com controle de tarefas completo.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
$primary-color: #8257e5;
$secondary-color: #202024;
$sub-secondary-color: #121214;

section {
  background-color: $sub-secondary-color;

  .benefit {
    border: 1px solid #38383d;
    background-color: $secondary-color;
    position: relative;
    width: 360px;

    .benefit-box {
      position: absolute;
      z-index: 40;
      background-color: $secondary-color;
      width: 356px;
      left: 1px;
    }
  }
}
.animation-bar {
  position: absolute;
  z-index: 1;
  left: 130px;
  top: -190px;
  box-shadow: 0 0 190px rgba(255, 255, 255, 0.845);
  animation: animationBar 4s linear infinite;
}

@keyframes animationBar {
  0% {
    rotate: 0deg;
  }

  100% {
    rotate: 360deg;
  }
}
</style>