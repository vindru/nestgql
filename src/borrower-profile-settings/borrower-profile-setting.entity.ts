import { UTCDateTransformer } from "src/transformers/utc-date.transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('borrower_profile_settings')
export class BorrowerProfileSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'auto_save', nullable: false })
  autoSave: boolean;

  @Column({ name: 'borrower_id', nullable: false })
  borrowerId: string;

  public updated_at: Date;
  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
    precision: 6,
    nullable: false,
    default: () => "CURRENT_TIMESTAMP(6)",
    transformer: UTCDateTransformer,
  })
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
  updatedAt: Date;
}
