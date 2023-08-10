import NetworkState, { Factory } from "../../../../core/utils/resource"
import { ApplicationEntity } from "../../domain/entity/application.entity"
import { useCase } from "../..";


export const getApplications = async (onStateUpdated: (state: NetworkState<ApplicationEntity[]>) => void) => {
    onStateUpdated(Factory.createLoading());
    const data = await useCase.invoke();
    onStateUpdated(data);
}