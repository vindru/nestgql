import { EntityRepository, Repository } from "typeorm";
import { BorrowerProfileSetting } from "./borrower-profile-setting.entity"

@EntityRepository(BorrowerProfileSetting)
export class BorrowerProfileSettingsRepository extends Repository<BorrowerProfileSetting> { }
