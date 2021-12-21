<template>
  <DatePicker v-model="range" @input="handleDateChange" is-range :masks="masks">
    <template v-slot="{ inputValue, inputEvents }">
      <div class="flex justify-start items-center h-full">
        <span class="text-xs font-bold">Transaction Date: </span>
        <input
          :value="`${inputValue.start} - ${inputValue.end}`"
          readonly
          v-on="inputEvents.start"
          @change="handleDateChange"
          class="ml-3 border px-2 py-1 w-40 text-xs rounded focus:outline-none focus:border-indigo-300"
        />
      </div>
    </template>
  </DatePicker>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import dayjs from "dayjs";

@Component({
  components: {
    DatePicker,
  },
})
export default class DateSelector extends Vue {
  public masks: any = {
    input: "YYYY-MM-DD",
  };

  public range: any = {
    start: new Date(),
    end: new Date(),
  };

  handleDateChange($event: any) {
    this.$emit("handleDateChange", {
      start: dayjs($event.start).format("YYYY-MM-DD"),
      end: dayjs($event.end).format("YYYY-MM-DD"),
    });
  }
}
</script>

<style scoped></style>
