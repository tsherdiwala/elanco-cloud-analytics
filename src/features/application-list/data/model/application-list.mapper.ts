import { ApplicationEntity } from "../../domain/entity/application.entity"

export const toEntity = (name: string) : ApplicationEntity => {
    return {
        name
    };
}