<template>
  <div class="p-2">
    <select v-model="take" id="" class="mr-3" @change="$emit('handleCountChange', take)">
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="25">25</option>
      <option :value="50">50</option>
    </select>
    <span @click="handlePrev" class="prev text-xs inline-block mr-3 cursor-pointer" :class="{'cursor-not-allowed text-gray-400': skip === 0, 'cursor-pointer': skip > 0}" >prev</span>
    <span @click="handleNext" class="next text-xs cursor-pointer">next</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Pagination extends Vue {
  @Prop({type: Number, default: 0})
  public transactionCount: number | undefined

  public take: number = 10

  public skip: number = 0

  handlePrev (): void {
    if (this.skip > 0) {
      this.skip = this.skip - this.take

      this.$emit('handlePageChange', this.skip)
    }
  }

  handleNext (): void {
    if (this.transactionCount) {
      this.skip = this.skip + this.take

      this.$emit('handlePageChange', this.skip)
    }
  }
}
</script>

<style scoped>

</style>
