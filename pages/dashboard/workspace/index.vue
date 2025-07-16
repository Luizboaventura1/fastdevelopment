<template>
  <WorkspaceContainer md>
    <WorkspaceContainer ms class="mb-16">
      <PrimaryText sm class="text-center mt-14 mb-3">
        {{ currentDate() }}
      </PrimaryText>
      <Greeting class="mb-5">
        {{ getFirstName(userName) }}
      </Greeting>
      <InfoBar />
    </WorkspaceContainer>
    <Grid v-if="frames.length" col="2">
      <Frame v-for="(frame, index) in frames" :key="index" :frameID="String(index)">
        <PrimaryText lg class="truncate"> {{ frame.title }} </PrimaryText>
      </Frame>
    </Grid>
    <EmptyFrameMessage v-else />
  </WorkspaceContainer>
  <SpeedInsights />
</template>

<script setup>
import WorkspaceContainer from "../../../components/Features/workspace/WorkspaceContainer.vue";
import Greeting from "../../../components/Features/workspace/Greeting.vue";
import Frame from "@/components/Features/workspace/Frame";
import Grid from "../../../components/Features/workspace/Grid.vue";
import PrimaryText from "@/components/Common/Text/PrimaryText";
import { useWorkspace } from "@/stores/workspace";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { storeToRefs } from "pinia";
import InfoBar from "../../../components/Features/workspace/InfoBar.vue";
import EmptyFrameMessage from "../../../components/Features/workspace/EmptyFrameMessage.vue";
import getFirstName from "@/utils/getFirstName.js";

let { frames } = storeToRefs(useWorkspace());
const userName = useCookie("name") || "Username not found";

const closeAllListModals = () => {
  if (!frames.value?.length) return;

  for (const frame of frames.value) {
    if (frame.lists?.length) {
      for (const list of frame.lists) {
        list.stateModal = false;
      }
    }
  }
};

const currentDate = () => {
  const date = new Date();

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  let dayOfWeek = daysOfWeek[date.getDay()];
  let currentDay = date.getDate();
  let currentMonth = months[date.getMonth()];

  return `${dayOfWeek}, ${currentDay} de ${currentMonth}`;
};

onMounted(async () => {
  let workspaceData;

  if (!frames.value.length) {
    workspaceData = await useWorkspace().fetchWorkspaceData();

    frames.value.push(...workspaceData.frames);
  }

  if (!userName.value && workspaceData) {
    userName.value = workspaceData.name;
  }

  closeAllListModals();
});
</script>

<style lang="scss" scoped></style>
