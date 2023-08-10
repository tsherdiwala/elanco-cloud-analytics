import { v4 as uuidv4 } from 'uuid';

export interface ApplicationDetailDataEntity {
    id: string,
    timestamp: number,
    serviceName: string,
    quantityConsumed: number,
 }

export interface ApplicationDetailEntity {
    name: string,
    data: ApplicationDetailDataEntity[]
}

export const DUMMY : ApplicationDetailEntity = {
    name: 'Dummy Application',
    data : [
        {
            id : uuidv4(),
            timestamp: 1691714406891, 
            serviceName: "Tejas Cloud", 
            quantityConsumed: 50
        },
        {
            id : uuidv4(),
            timestamp: 1691714406891, 
            serviceName: "Tejas Cloud", 
            quantityConsumed: 100
        },
        {
            id : uuidv4(),
            timestamp: 1691714406891, 
            serviceName: "Azure Cloud", 
            quantityConsumed: 50
        }

    ]
}