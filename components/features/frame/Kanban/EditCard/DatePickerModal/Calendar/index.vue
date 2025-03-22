<template>
  <div class="p-2">
    <nav class="flex justify-between w-full">
      <LeftArrowButton @click="controlCalendar.lastMonth" size="14" />
      <div class="flex gap-3 text-textPrimaryColorF">
        <span>{{ months[currentMonth] }}</span>
        <span>-</span>
        <span>{{ currentYear }}</span>
      </div>
      <RightArrowButton @click="controlCalendar.nextMonth" size="14" />
    </nav>
    <main class="py-4">
      <div
        class="flex justify-around text-center text-textPrimaryColorF min-h-[210px] text-sm"
      >
        <div>
          <div class="mb-2">Dom</div>

          <DayButton
            v-for="currentDay in calendar.sunday"
            size="30"
            :class="`text-${currentDay.color} ${
              currentDay.active ? selectedButtonColor : ''
            }`"
            @click="selectDay(currentDay, 'sunday')"
            >{{ currentDay.day }}</DayButton
          >
        </div>
        <div>
          <div class="mb-2">Seg</div>

          <DayButton
            v-for="currentDay in calendar.monday"
            :class="`text-${currentDay.color} ${
              currentDay.active ? selectedButtonColor : ''
            }`"
            @click="selectDay(currentDay, 'monday')"
            size="30"
            >{{ currentDay.day }}</DayButton
          >
        </div>
        <div>
          <div class="mb-2">Ter</div>

          <DayButton
            v-for="currentDay in calendar.tuesday"
            :class="`text-${currentDay.color} ${
              currentDay.active ? selectedButtonColor : ''
            }`"
            @click="selectDay(currentDay, 'tuesday')"
            size="30"
            >{{ currentDay.day }}</DayButton
          >
        </div>
        <div>
          <div class="mb-2">Qua</div>

          <DayButton
            v-for="currentDay in calendar.wednesday"
            :class="`text-${currentDay.color} ${
              currentDay.active ? selectedButtonColor : ''
            }`"
            @click="selectDay(currentDay, 'wednesday')"
            size="30"
            >{{ currentDay.day }}</DayButton
          >
        </div>
        <div>
          <div class="mb-2">Qui</div>

          <DayButton
            v-for="currentDay in calendar.thursday"
            :class="`text-${currentDay.color} ${
              currentDay.active ? selectedButtonColor : ''
            }`"
            @click="selectDay(currentDay, 'thursday')"
            size="30"
            >{{ currentDay.day }}</DayButton
          >
        </div>
        <div>
          <div class="mb-2">Sex</div>

          <DayButton
            v-for="currentDay in calendar.friday"
            :class="`text-${currentDay.color} ${
              currentDay.active ? selectedButtonColor : ''
            }`"
            @click="selectDay(currentDay, 'friday')"
            size="30"
            >{{ currentDay.day }}</DayButton
          >
        </div>
        <div>
          <div class="mb-2">Sab</div>

          <DayButton
            v-for="currentDay in calendar.saturday"
            :class="`text-${currentDay.color} ${
              currentDay.active ? selectedButtonColor : ''
            }`"
            @click="selectDay(currentDay, 'saturday')"
            size="30"
            >{{ currentDay.day }}</DayButton
          >
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import RightArrowButton from "./RightArrowButton.vue";
import LeftArrowButton from "./LeftArrowButton.vue";
import DayButton from "./DayButton.vue";

// Get current date information
const date = ref<Date>(new Date());
const year = ref<number>(date.value.getFullYear());
const month = ref<number>(date.value.getMonth());

// Function to calculate the number of days in a given month
const quantityDaysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate() + 1;
};

// Function to get the day of the week for a given date
const getDayOfWeek = (year: number, month: number, index: number) => {
  return new Date(year, month, index).getDay();
};

// Reactive object to store the calendar days of the week

interface DayInfo {
  day: number;
  color: string;
  active: boolean;
  numberNextMonth?: boolean;
  numberLastMonth?: boolean;
}

const calendar = ref<Record<string, DayInfo[]>>({
  sunday: [],
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
});

const colors = {
  currentMonthColor: "textPrimaryColorF",
  otherMonthsColor: "textSecondaryColorF",
};

const pickDaysOfTheMonth = () => {
  // Populating the calendar with the days of the current month
  for (let i = 0; i < quantityDaysOfMonth(year.value, month.value); i++) {
    const dayOfWeek = getDayOfWeek(year.value, month.value, i);
    const day = { day: i, color: colors.currentMonthColor, active: false };

    // Adds the day to the array corresponding to the day of the week
    calendar.value[daysOfWeek[dayOfWeek]].push(day);
  }

  // Filling in the remaining days of the last month
  fillRemainingDaysOfLastMonth();

  // Filling in the days of the next month
  fillNextMonthDays();

  activateSelectedDay(date.value.getDate(), daysOfWeek[date.value.getDay()]);
};

onMounted(() => {
  pickDaysOfTheMonth();
  activateSelectedDay(date.value.getDate(), daysOfWeek[date.value.getDay()]);
});

// Function to get the last day of the last month
const getLastDayOfLastMonth = () => {
  return new Date(year.value, month.value, 0).getDate();
};

// Array of days of the week
const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

// Function to fill in the remaining days of the last month in the calendar
const fillRemainingDaysOfLastMonth = () => {
  let lastDayOfLastMonth = getLastDayOfLastMonth();

  // True if the number zero hasn't been replaced yet
  let hasNumberZero = true;

  // Iterate through days of the week in reverse order
  [...daysOfWeek].reverse().forEach((day) => {
    // Replace zero with the last day of the previous month
    if (calendar.value[day][0].day === 0) {
      calendar.value[day][0] = {
        day: lastDayOfLastMonth,
        color: colors.otherMonthsColor,
        active: false,
        numberLastMonth: true,
      };

      hasNumberZero = false;
    }

    // If the condition above adds the number, this one will complete with the numbers from the previous month
    if (calendar.value[day][0].day < lastDayOfLastMonth && !hasNumberZero) {
      // Get the previous day of the last day of the previous month
      lastDayOfLastMonth--;

      // Fill in the remaining days of the previous month
      calendar.value[day].unshift({
        day: lastDayOfLastMonth,
        color: colors.otherMonthsColor,
        active: false,
        numberLastMonth: true,
      });
    }
  });
};

// Function to fill in the days of the next month in the calendar
const fillNextMonthDays = () => {
  let largestArray = 0;
  let nextMonthDay = 1;

  // Get the array with the largest column of the week
  daysOfWeek.forEach((day) => {
    if (calendar.value[day].length > largestArray) {
      largestArray = calendar.value[day].length;
    }
  });

  // Add the remaining days of the next month
  daysOfWeek.forEach((day) => {
    if (calendar.value[day].length < largestArray) {
      calendar.value[day].push({
        day: nextMonthDay,
        color: colors.otherMonthsColor,
        active: false,
        numberNextMonth: true,
      });

      nextMonthDay++;
    }
  });
};

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

const controlCalendar = {
  lastMonth: () => {
    month.value--;
    updateDate();
    deactivateAllDays();
  },
  nextMonth: () => {
    month.value++;
    updateDate();
    deactivateAllDays();
  },
};

const resetCalendar = () => {
  daysOfWeek.forEach((day) => {
    calendar.value[day] = [];
  });
};

const updateDate = () => {
  date.value = new Date(year.value, month.value);
  resetCalendar();
  pickDaysOfTheMonth();
};

const currentYear = computed(() => date.value.getFullYear());
const currentMonth = computed(() => date.value.getMonth());

const activateSelectedDay = (currentDay: number, seletedDayOfWeek: string) => {
  const days = calendar.value[seletedDayOfWeek];

  const currentDayIndex = days.findIndex(
    (weekDay) => weekDay.day === currentDay
  );

  if (currentDayIndex !== -1) {
    days[currentDayIndex].active = true; // Activate the current day if found
  }
};

const deactivateAllDays = () => {
  daysOfWeek.forEach((weekDay) => {
    calendar.value[weekDay].forEach((day) => {
      day.active = false; // Set all days to inactive
    });
  });
};

const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue"]);

const selectDay = (selectedDay: any, seletedDayOfWeek: string) => {
  deactivateAllDays();

  if (selectedDay.numberNextMonth) {
    controlCalendar.nextMonth();
  } else if (selectedDay.numberLastMonth) {
    controlCalendar.lastMonth();
  }

  activateSelectedDay(selectedDay.day, seletedDayOfWeek);

  emits(
    "update:modelValue",
    new Date(year.value, month.value, selectedDay.day)
  );
};

const selectedButtonColor = ref<string>("bg-primaryColorF");

// Update user-defined date
watch(
  () => props.modelValue,
  () => {
    if (props.modelValue != date.value && props.modelValue) {
      deactivateAllDays();
      date.value = props.modelValue;
      year.value = date.value.getFullYear();
      month.value = date.value.getMonth();

      resetCalendar();
      pickDaysOfTheMonth();
    }
  },
  { deep: true }
);
</script>