import { CreateBorrowerInput } from './create-borrower.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBorrowerInput extends PartialType(CreateBorrowerInput) {
  @Field(() => Int)
  id: number;
  @Field(() => Boolean)
  showSettings: boolean;
}
