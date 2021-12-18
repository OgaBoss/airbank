import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import GetTransactionsArgs from './GetTransactionsArgs';
import dayjs from 'dayjs';
import { Transaction } from '../types/transaction';

@Service()
export default class TransactionRepository {
  prisma: PrismaClient = new PrismaClient();

  async getTransactions(options: GetTransactionsArgs): Promise<Transaction[]> {
    return await this.prisma.transactions.findMany({
      take: options.take,
      skip: options.skip,
      where: {
        transactionDate: {
          gte: options.start ? dayjs(options.start).toDate() : undefined,
          lt: options.end ? dayjs(options.end).toDate() : undefined,
        },
      },
      orderBy: {
        transactionDate: 'desc',
      },
    });
  }

  async getTransaction(id: string): Promise<Transaction | null> {
    const result = await this.prisma.transactions.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      throw new Error(`Transaction of id ${id} does not exits in our system`);
    }

    return result;
  }
}
