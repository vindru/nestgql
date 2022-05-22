import { Field, Int, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import { UTCDateTransformer } from "src/transformers/utc-date.transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('borrower_profile_settings')
@ObjectType()
export class BorrowerProfileSetting {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ name: 'auto_save', nullable: false })
  @Field({ nullable: false })
  autoSave: boolean;

  @Column({ name: 'borrower_id', nullable: false })
  @Field({ nullable: false })
  borrowerId: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
    precision: 6,
    nullable: false,
    transformer: UTCDateTransformer,
  })
  @Field({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updated_at',
    precision: 6,
    nullable: false,
    transformer: UTCDateTransformer,
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  @Field({ nullable: false })
  updatedAt: Date;
}
