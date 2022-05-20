import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BorrowerService } from './borrower.service';
import { Borrower } from './entities/borrower.entity';
import { CreateBorrowerInput } from './dto/create-borrower.input';
import { UpdateBorrowerInput } from './dto/update-borrower.input';

@Resolver(() => Borrower)
export class BorrowerResolver {
  constructor(private readonly borrowerService: BorrowerService) { }

  @Mutation(() => Borrower)
  createBorrower(@Args('createBorrowerInput') createBorrowerInput: CreateBorrowerInput) {
    return this.borrowerService.create(createBorrowerInput);
  }

  @Query(() => Borrower, { name: 'borrower' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.borrowerService.findOne(id);
  }

  @Mutation(() => Borrower)
  updateBorrower(@Args('updateBorrowerInput') updateBorrowerInput: UpdateBorrowerInput) {
    return this.borrowerService.update(updateBorrowerInput.id, updateBorrowerInput);
  }
}
