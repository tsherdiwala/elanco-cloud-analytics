import NetworkState, { Factory } from "../../../../core/utils/resource"
import { ApplicationDetailEntity, DUMMY } from "../../domain/entity/application-detail.entity"
import { useCase } from "../../index"

export const  getApplicationDetail = async (name: string, onStateUpdated: (state: NetworkState<ApplicationDetailEntity>) => void) =>  {
    onStateUpdated(Factory.createLoading())
    const response = await useCase.invoke(name);
    onStateUpdated(response);
} 