export interface ApplicationDetailDataEntity {
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
            timestamp: 1691714406891, 
            serviceName: "Tejas Cloud", 
            quantityConsumed: 50
        },
        {
            timestamp: 1691714406891, 
            serviceName: "Tejas Cloud", 
            quantityConsumed: 100
        },
        {
            timestamp: 1691714406891, 
            serviceName: "Azure Cloud", 
            quantityConsumed: 50
        }

    ]
}