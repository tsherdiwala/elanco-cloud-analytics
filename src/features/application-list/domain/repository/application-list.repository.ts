import NetworkState from "../../../../core/utils/resource";
import { ApplicationEntity } from "../entity/application.entity";

export interface ApplicationListRepository {
    getApplications() : Promise<NetworkState<ApplicationEntity[]>>
}