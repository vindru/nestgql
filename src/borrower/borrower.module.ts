import { Module } from '@nestjs/common';
import { BorrowerService } from './borrower.service';
import { BorrowerResolver } from './borrower.resolver';

@Module({
  providers: [BorrowerResolver, BorrowerService]
})
export class BorrowerModule {}
