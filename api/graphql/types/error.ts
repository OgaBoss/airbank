import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TransactionError {
  @Field()
  message: string;
}
