import NetworkState from "../../../../core/utils/resource";
import { ApplicationDetailRepositoryImpl } from "../../data/repository/application-detail-repository-impl";
import { ApplicationDetailEntity } from "../entity/application-detail.entity";
import { ApplicationDetailRepository } from "../repository/application-detail-repository";

export class GetApplicationDetailUseCase {

    constructor(private repository: ApplicationDetailRepository){}

    async invoke(applicationName: string):  Promise<NetworkState<ApplicationDetailEntity>>  {
        return this.repository.getApplicationDetail(applicationName);
    }
}