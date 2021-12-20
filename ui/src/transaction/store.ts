import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import gql from "graphql-tag";
import { QueryOption } from "@/transaction/models/QueryOption";
import { ApolloQueryResult } from "apollo-client/core/types";
import { TransactionModel } from "@/transaction/models/TransactionModel";
import { createProvider } from "@/vue-apollo";

interface TransactionsResponse {
  transactions: TransactionModel[];
}
interface TransactionResponse {
  transaction?: TransactionModel;
  message?: string;
}

@Module({
  name: "Transaction",
  namespaced: true,
})
export default class Transaction extends VuexModule {
  public transactions: TransactionModel[] | null = null;
  public transaction: TransactionModel | null = null;
  public $apollo = createProvider().defaultClient;

  @Mutation
  setTransactionsProperty(payload: any) {
    this.transactions = payload;
  }

  @Mutation
  setTransactionProperty(payload: any) {
    this.transaction = payload;
  }

  @Action({ rawError: true })
  async fetchTransactions(options: QueryOption = {}) {
    const response: ApolloQueryResult<TransactionsResponse> =
      await this.$apollo.query({
        query: gql`
          query Query($skip: Int, $take: Int, $start: String, $end: String) {
            transactions(skip: $skip, take: $take, start: $start, end: $end) {
              id
              transactionDisplayDate
              status
              amount
              currency
              account
            }
          }
        `,
        variables: {
          ...options,
        },
      });
    this.context.commit("setTransactionsProperty", response.data.transactions);
  }

  @Action({ rawError: true })
  async fetchTransaction(id: string) {
    const response: ApolloQueryResult<TransactionResponse> =
      await this.$apollo.query({
        query: gql`
          query Query($id: String!) {
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
          }
        `,
        variables: {
          id,
        },
        fetchPolicy: "no-cache",
      });
    this.context.commit("setTransactionProperty", response.data.transaction);
  }
}
