import 'reflect-metadata';
import {Field, ObjectType, Float, Root} from 'type-graphql'
import {IsUUID} from "class-validator";
// import Currency from "../enums/currency";
// import Status from "../enums/status";
import {Currency, Status} from '@prisma/client'

@ObjectType()
export class Transaction {
  @Field()
  @IsUUID()
  id: string

  @Field()
  account: string

  @Field(type => String,{nullable: true})
  description: string | null

  @Field(type => String,{nullable: true})
  category: string | null

  @Field(type => String,{nullable: true})
  reference: string | null

  @Field()
  currency: Currency

  @Field(type => Float)
  amount: number

  @Field()
  status: Status

  @Field()
  transactionDate: Date

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
