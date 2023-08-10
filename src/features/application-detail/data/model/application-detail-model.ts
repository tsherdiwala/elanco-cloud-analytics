import { v4 as uuidv4 } from 'uuid';
import { ApplicationDetailDataEntity, ApplicationDetailEntity } from "../../domain/entity/application-detail.entity"
export interface ApplicationDetailModel {
    ConsumedQuantity: string,
    Date: string,
    ServiceName: string
}

export const toEntity = ( model: ApplicationDetailModel): ApplicationDetailDataEntity  => {

    let date = new Date();

    const [dateOfMonth, month, year] = model.Date.split("/")
    date.setDate(parseInt(dateOfMonth))
    date.setMonth(parseInt(month) - 1)
    date.setFullYear(parseInt(year));

    return {
        id : uuidv4(),
        timestamp: date.valueOf(),
        quantityConsumed: parseInt(model.ConsumedQuantity),
        serviceName: model.ServiceName
    }
}