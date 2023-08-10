import Api from "../../core/network/api";
import { ApplicationDetailRepositoryImpl } from "./data/repository/application-detail-repository-impl";
import { ApplicationDetailSource, ApplicationDetailSourceImpl } from "./data/source/application-detail-source";
import { ApplicationDetailRepository } from "./domain/repository/application-detail-repository";
import { GetApplicationDetailUseCase } from "./domain/usecase/get-application-detail.usecase";



export const source : ApplicationDetailSource = new ApplicationDetailSourceImpl(Api)

export const repository : ApplicationDetailRepository = new ApplicationDetailRepositoryImpl(source);

export const useCase : GetApplicationDetailUseCase = new GetApplicationDetailUseCase(repository);