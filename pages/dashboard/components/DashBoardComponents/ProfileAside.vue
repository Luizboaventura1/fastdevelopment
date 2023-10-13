<template>
  <div class="my-4 hover:bg-secondaryColorF p-2 flex items-center gap-3 rounded-md transition-colors cursor-pointer">
    <div class="avatar-container">
      <div class="avatar rounded-full w-[45px] h-[45px] overflow-hidden">
        <img
          class="w-[45px] h-[45px] hidden"
          src=""
          alt="User"
        >
      </div>
    </div>
    <div class="user-name">
      <div class="name truncate text-white font-medium w-32">
        Luiz
      </div>
      <div class="category truncate text-zinc-400 italic w-32">
        Developer
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.avatar {
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>