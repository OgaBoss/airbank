import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { createProvider } from "@/vue-apollo";
import gql from "graphql-tag";
import {QueryOption} from "@/transaction/models/QueryOption";

@Module({
  name: "Transaction",
  namespaced: true
})
export default class Transaction extends VuexModule {
  public transactions: Transaction[] = [];
  public transaction: Transaction | null = null;
  public $apollo = createProvider().defaultClient;

  @Mutation
  setTransactionsProperty(payload: any){
    this.transactions = payload
  }

  @Mutation
  setTransactionProperty(payload: any){
    this.transaction = payload
  }

  @Action({rawError: true})
  async fetchTransactions(options: QueryOption = {}) {
    const response = await this.$apollo.query({
      query: gql `query Query($skip: Int, $take: Int, $start: String, $end: String) {
        transactions(skip: $skip, take: $take, start: $start, end: $end) {
          id
          transactionDisplayDate
          status
          amount
          currency
          account
        }
      }`,
      variables: {
        ...options
      },
    });
    this.context.commit('setTransactionsProperty', response.data.transactions)
  }

  @Action({rawError: true})
  async fetchTransaction(id: string) {
    const response = await this.$apollo.query({
      query: gql `query Query($id: String) {
        transaction(id: $id) {
          ... on Transaction {
            id
            account
            description
            category
            reference
            currency
            amount
            status
            transactionDisplayDate
            createdAtDisplayDate
            updatedAtDisplayDate
          }

          ... on TransactionError {
            message
          }
        }
      }`,
      variables: {
        id
      },
    })

    this.context.commit('setTransactionsProperty', response.data.transaction)
  }
}
