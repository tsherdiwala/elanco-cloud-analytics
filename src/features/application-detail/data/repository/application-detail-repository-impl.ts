import NetworkState, { Factory } from "../../../../core/utils/resource";
import { ApplicationDetailEntity } from "../../domain/entity/application-detail.entity";
import { ApplicationDetailRepository } from "../../domain/repository/application-detail-repository";
import { toEntity } from "../model/application-detail-model";
import { ApplicationDetailSource } from "../source/application-detail-source";

export class ApplicationDetailRepositoryImpl implements ApplicationDetailRepository {
    constructor(private source: ApplicationDetailSource) {}
    async getApplicationDetail(name: string) : Promise<NetworkState<ApplicationDetailEntity>> {
        try {
            const data = await this.source.getApplicationDetail(name);
            return Factory.createSuccess({name, data: data.map(d => toEntity(d))})
        }catch(e) {
            return Factory.createError(100);
        }
    }

}