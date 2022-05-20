import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Borrower {
  @Field(() => Boolean)
  showSettings: boolean;
}
