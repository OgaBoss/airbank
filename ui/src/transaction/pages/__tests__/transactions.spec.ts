import { createLocalVue, mount, Wrapper } from "@vue/test-utils";
import Vuex, { ActionTree, Store } from "vuex";
import Transactions from "@/transaction/pages/Transactions.vue";

jest.mock("@/vue-apollo");

let actions: ActionTree<any, any>;
let store: Store<any>;
let wrapper: Wrapper<Transactions>;

describe("TransactionsComponent", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  beforeEach(() => {
    actions = {
      fetchTransactions: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        Transaction: {
          namespaced: true,
          actions,
        },
      },
    });

    wrapper = mount(Transactions, {
      localVue,
      store,
    });
  });

  it("should fetch transactions on mounted", async () => {
    expect(actions.fetchTransactions).toHaveBeenCalled();
  });

  it("should fetch transactions when count changes", async () => {
    const options = wrapper.find("select").findAll("option");
    await options.at(3).setSelected();

    expect(actions.fetchTransactions).toHaveBeenCalled();
  });

  it("should fetch transactions when next is clicked", async () => {
    const next = wrapper.find(".next");
    await next.trigger("click");

    expect(actions.fetchTransactions).toHaveBeenCalledTimes(1);
  });

  it("should fetch transactions when prev is clicked", async () => {
    const prev = wrapper.find(".prev");
    await prev.trigger("click");

    expect(actions.fetchTransactions).toHaveBeenCalledTimes(1);
  });
});
