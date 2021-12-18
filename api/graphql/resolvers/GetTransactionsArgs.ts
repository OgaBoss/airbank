import "reflect-metadata";
import {ArgsType} from "type-graphql";
import {Field, Int} from 'type-graphql'
import {Min, Max} from "class-validator";

@ArgsType()
export default class GetTransactionsArgs {
  @Field(type => Int, { nullable: true })
  @Min(0)
  skip: number;

  @Field(type => Int, { nullable: true })
  @Min(1)
  @Max(50)
  take = 10;

  @Field({ nullable: true })
  start:  string

  @Field({ nullable: true })
  end: string
}
