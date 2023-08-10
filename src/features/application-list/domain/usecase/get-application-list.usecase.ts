import NetworkState from "../../../../core/utils/resource";
import { ApplicationEntity } from "../entity/application.entity";
import { ApplicationListRepository } from "../repository/application-list.repository";

export class GetApplicationListUseCase {

    constructor(private repository: ApplicationListRepository) {}

    async invoke(): Promise<NetworkState<ApplicationEntity[]>> {
        return this.repository.getApplications();
    }
}