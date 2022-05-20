import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBorrowerInput {
  @Field(() => Boolean)
  showSettings: boolean;
}
