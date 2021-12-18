import 'reflect-metadata';
import { Resolver, Query, Args, FieldResolver, Root, Arg, Ctx } from 'type-graphql';
import { Transaction } from '../types/transaction';
import { Service } from 'typedi';
import TransactionRepository from './transaction-repository';
import GetTransactionsArgs from './GetTransactionsArgs';
import dayjs from 'dayjs';

const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

@Service()
@Resolver((of) => Transaction)
export class TransactionResolver {
  private transactionCollection: Transaction[] = [];

  constructor(private readonly repository: TransactionRepository) {}

  @Query((returns) => [Transaction])
  async transactions(@Args() options: GetTransactionsArgs): Promise<Transaction[]> {
    return await this.repository.getTransactions(options);
  }

  @Query((returns) => Transaction)
  async transaction(@Arg('id') id: string) {
    return await this.repository.getTransaction(id);
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
