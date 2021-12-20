<template>
  <div class="transactions-container p-5">
    <div class="header flex justify-between bg-gray-100 px-5">
      <p class="text-3xl font-bold">All Transactions</p>
      <Pagination @handleCountChange="handleCountChange" @handlePageChange="handlePageChange" :transaction-count="transactions ? transactions.length : 0" />
      <DateSelector @handleDateChange="handleDateChange" />
    </div>
    <div class="border-b my-4"></div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 sticky top-0">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Account
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reference
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Currency
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Transaction Date
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Details</span>
                  </th>
                </tr>
              </thead>
              <tbody v-if="loading === false && transactions" class="bg-white divide-y divide-gray-200">
                <TransactionRow v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
              </tbody>
              <TransactionLoading v-if="loading" />
              <TransactionEmpty v-if="!transactions" />
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Transaction from "@/transaction/store";
import { getModule } from "vuex-module-decorators";
import { Component, Vue } from "vue-property-decorator";
import {QueryOption} from "@/transaction/models/QueryOption";
import Pagination from "@/transaction/comopnents/Pagination.vue";
import DateSelector from "@/transaction/comopnents/DatePicker.vue";
import TransactionRow from "@/transaction/comopnents/TransactionRow.vue";
import { TransactionModel } from "@/transaction/models/TransactionModel";
import TransactionEmpty from "@/transaction/comopnents/TransactionEmpty.vue";
import TransactionLoading from "@/transaction/comopnents/TransactionLoading.vue";

@Component({
  components: {
    DateSelector,
    TransactionEmpty,
    TransactionLoading,
    TransactionRow,
    Pagination
  },
})

export default class Transactions extends Vue {
  get transactionStore(): Transaction {
    return getModule(Transaction, this.$store);
  }

  public loading = false;

  public queryOptions: QueryOption = {
    skip: 0,
    take: 10,
    end: null,
    start: null
  }

  get transactions (): TransactionModel[] | null {
    return this.$store.state.Transaction.transactions
  }

  async handleDateChange({end, start}: { end: string, start: string }): Promise<void> {
    this.queryOptions.end = end
    this.queryOptions.start = start

    await this.fetchTransactions()
  }

  async handleCountChange(take: number): Promise<void> {
    this.queryOptions.take = take

    await this.fetchTransactions()
  }

  async handlePageChange(skip: number): Promise<void> {
    this.queryOptions.skip = skip

    await this.fetchTransactions()
  }

  async fetchTransactions(): Promise<void> {
    this.loading = true
    try {
      await this.transactionStore.fetchTransactions(this.queryOptions);
    } catch (e) {
      this.loading = false
    }
    this.loading = false
  }

  async mounted(): Promise<void> {
    await this.fetchTransactions();
  }
}
</script>
