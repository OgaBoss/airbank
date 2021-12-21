<template>
  <div class="transactions-container p-5">
    <div class="header flex justify-between bg-gray-100 px-5">
      <p class="text-3xl font-bold">
        Details <span class="text-xs">#{{ $route.params.id }}</span>
      </p>
      <router-link :to="`/`" class="text-xs font-bold mt-2">back</router-link>
    </div>
    <div class="border-b my-4"></div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
          >
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
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created Date
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <TransactionRow :transaction="transaction" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import Transaction from "@/transaction/store";
import { TransactionModel } from "@/transaction/models/TransactionModel";
import TransactionRow from "@/transaction/comopnents/TransactionRow.vue";

@Component({
  components: {
    TransactionRow,
  },
})
export default class TransactionDetail extends Vue {
  public loading = false;

  get transactionStore(): Transaction {
    return getModule(Transaction, this.$store);
  }

  get transaction(): TransactionModel | null {
    return this.$store.state.Transaction.transaction;
  }

  async fetchTransaction(): Promise<void> {
    this.loading = true;
    try {
      await this.transactionStore.fetchTransaction(this.$route.params.id);
    } catch (e) {
      this.loading = false;
    }
    this.loading = false;
  }

  async mounted(): Promise<void> {
    await this.fetchTransaction();
  }
}
</script>

<style scoped></style>
