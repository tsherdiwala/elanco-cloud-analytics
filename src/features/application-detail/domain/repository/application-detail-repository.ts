import NetworkState from "../../../../core/utils/resource";
import { ApplicationDetailEntity } from "../entity/application-detail.entity";

export interface ApplicationDetailRepository {
    getApplicationDetail(name: string) :  Promise<NetworkState<ApplicationDetailEntity>> 
}