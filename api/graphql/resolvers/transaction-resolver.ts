import 'reflect-metadata';
import dayjs from 'dayjs';
import { Service } from 'typedi';
import { TransactionError } from '../types/error';
import { Transaction } from '../types/transaction';
import GetTransactionsArgs from './GetTransactionsArgs';
import TransactionRepository from './transaction-repository';
import { Resolver, Query, Args, FieldResolver, Root, Arg, createUnionType } from 'type-graphql';

const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

const TransactionErrorUnion = createUnionType({
  name: 'TransactionErrorUnion',
  types: () => [Transaction, TransactionError],
  resolveType: value => {
    if ('message' in value) {
      return TransactionError
    }

    return Transaction
  }
});

@Service()
@Resolver((of) => Transaction)
export class TransactionResolver {
  constructor(private readonly repository: TransactionRepository) {}

  @Query((returns) => [Transaction])
  async transactions(@Args() options: GetTransactionsArgs): Promise<Transaction[]> {
    return await this.repository.getTransactions(options);
  }

  @Query((returns) => TransactionErrorUnion)
  async transaction(@Arg('id') id: string): Promise<typeof TransactionErrorUnion> {
    try {
      return await this.repository.getTransaction(id);
    } catch (e: any) {
      return { message: e.message }
    }
  }

  @FieldResolver()
  transactionDisplayDate(@Root() transaction: Transaction): string {
    return dayjs(transaction.transactionDate).format('Do MMMM, YYYY @ h:m A');
  }

  @FieldResolver()
  createdAtDisplayDate(@Root() transaction: Transaction): string {
    return dayjs(transaction.createdAt).format('Do MMMM, YYYY @ h:m A');
  }

  @FieldResolver()
  updatedAtDisplayDate(@Root() transaction: Transaction): string {
    return dayjs(transaction.updatedAt).format('Do MMMM, YYYY @ h:m A');
  }
}
