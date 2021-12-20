import Transaction from "@/transaction/store";
import { getModule } from "vuex-module-decorators";
import Store from "@/base/store";
import { mockData } from "@/__mocks__/vue-apollo";

jest.mock("@/vue-apollo");

let store: Transaction;
describe("Transaction Store", () => {
  beforeEach(() => {
    store = getModule(Transaction, Store);
  });
  describe("Actions", () => {
    it("can fetch all transactions", async () => {
      await store.fetchTransactions();
      expect(store.transactions.length).toBe(2);
      expect(store.$apollo.query).toHaveBeenCalled();
    });

    it("can fetch a single transaction", async () => {
      await store.fetchTransaction("00647231-5bbb-4656-9960-56fbd5e01276");
      expect(store.transaction).toBeTruthy();
      expect(store.$apollo.query).toHaveBeenCalled();
    });
  });

  describe("Mutation", () => {
    it("can update transactions state", () => {
      store.setTransactionsProperty(mockData);

      expect(store.transactions.length).toBe(2);
    });

    it("can update transaction state", () => {
      store.setTransactionsProperty(mockData[0]);

      expect(store.transaction).toBeTruthy();
    });
  });
});
