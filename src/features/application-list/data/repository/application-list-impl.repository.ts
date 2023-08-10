import NetworkState, { Factory } from "../../../../core/utils/resource";
import { ApplicationEntity } from "../../domain/entity/application.entity";
import { ApplicationListRepository } from "../../domain/repository/application-list.repository";
import { toEntity } from "../model/application-list.mapper";
import { ApplicationListSource } from "../source/application-list.source";

export class ApplicationListRepositoryImpl implements ApplicationListRepository {

    constructor(private source: ApplicationListSource) { }

    async getApplications():Promise<NetworkState<ApplicationEntity[]>> {

        try {
            const applications = await this.source.getApplications();
            return Factory.createSuccess(applications.map(name => toEntity(name)));
        } catch (e) {
            return Factory.createError(100);
        }
    }
}