import { Injectable } from '@nestjs/common';
import { CreateBorrowerInput } from './dto/create-borrower.input';
import { UpdateBorrowerInput } from './dto/update-borrower.input';

@Injectable()
export class BorrowerService {
  create(createBorrowerInput: CreateBorrowerInput) {
    return 'Hello';
  }

  findOne(id: number) {
    return `Hello`;
  }

  update(id: number, updateBorrowerInput: UpdateBorrowerInput) {
    return `Hello`;
  }
}
