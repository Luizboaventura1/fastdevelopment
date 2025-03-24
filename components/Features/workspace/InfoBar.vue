<template>
  <div class="flex justify-center">
    <div class="flex gap-3 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full py-3 px-10">
      <div class="flex items-center gap-3">
        <PrimaryText>
          {{ totalTasks }}
        </PrimaryText>
        <span class="text-textSecondaryColorF">{{
          totalTasks === 1 ? "tarefa" : "tarefas"
        }}</span>
      </div>
      <div class="border border-left border-primary-icon-color mx-5"></div>
      <div>
        <div class="flex items-center gap-3">
          <PrimaryText>
            {{ totalProjects }}
          </PrimaryText>
          <span class="text-textSecondaryColorF">{{
            totalProjects === 1 ? "quadro" : "quadros"
          }}</span> 
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useWorkspace } from "~/stores/workspace";
import PrimaryText from "@/components/Common/Text/PrimaryText";

let { frames } = storeToRefs(useWorkspace());

const getTotalTasks = () => {
  let tasks = 0;

  if (frames.value) {
    frames.value.forEach((frame) =>
      frame.lists.forEach((list) => (tasks += list.cards.length))
    );
  }

  return tasks ?? 0;
};

let totalTasks = ref(getTotalTasks());
let totalProjects = ref(frames.value.length ?? 0);

watch(
  () => frames.value,
  () => {
    if (frames.value !== null && frames.value !== undefined) {
      totalProjects.value = frames.value.length;
      totalTasks.value = getTotalTasks();
    }
  },
  { deep: true }
);
</script>
