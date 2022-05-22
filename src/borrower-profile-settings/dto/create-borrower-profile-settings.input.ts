import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBorrowerProfileSettingsInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  borrowerId: string;

  @Field({ nullable: false })
  @IsBoolean()
  @IsNotEmpty()
  autoSave: boolean;
}
