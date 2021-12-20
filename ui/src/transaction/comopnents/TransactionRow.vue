<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            Account: {{ transaction.account }}
          </div>
          <div class="text-sm text-gray-500">
            Description: {{ transaction.description }}
          </div>
          <div class="text-sm text-gray-500">
            Category: {{ transaction.category }}
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div v-if="transaction.reference" class="text-sm text-gray-900">
        {{ transaction.reference }}
      </div>
      <span v-else class="text-xs italic">Not Available</span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span
          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
      >
        {{ transaction.currency }}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ transaction.amount }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span
          class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-500 text-white"
      >
        {{ transaction.status }}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ transaction.transactionDisplayDate }}
    </td>
    <td
        class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"
    >
      <router-link :to="`transactions/${transaction.id}`" class="text-indigo-600 hover:text-indigo-900"
      >Details
      </router-link
      >
    </td>
  </tr>

</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import {TransactionModel} from "@/transaction/models/TransactionModel";

@Component({})
export default class TransactionRow extends Vue {
  @Prop()
  public transaction?: TransactionModel
}
</script>

<style scoped>

</style>
