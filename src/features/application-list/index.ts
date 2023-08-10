import Api from "../../core/network/api";
import { ApplicationListRepositoryImpl } from "./data/repository/application-list-impl.repository";
import { ApplicationListSource, ApplicationListSourceImpl } from "./data/source/application-list.source";
import { ApplicationListRepository } from "./domain/repository/application-list.repository";
import { GetApplicationListUseCase } from "./domain/usecase/get-application-list.usecase";



const source : ApplicationListSource = new ApplicationListSourceImpl(Api)

const repository: ApplicationListRepository = new ApplicationListRepositoryImpl(source)

export const useCase = new GetApplicationListUseCase(repository);