import Transaction from "@/transaction/store";
import {getModule} from "vuex-module-decorators";
import {createProvider} from "@/vue-apollo";
import Store from "@/base/store";
import flushPromises from 'flush-promises'
jest.mock('@/vue-apollo')

let store: Transaction;
describe('Transaction Store', () => {
  beforeEach(() => {
    store = getModule(Transaction, Store)
  })
  describe('Actions', () => {
    it('can fetch all transactions', async () => {
      await store.fetchTransactions()
      await flushPromises()
      expect(createProvider().defaultClient.query).toHaveBeenCalledTimes(1)
    })
  })
})
