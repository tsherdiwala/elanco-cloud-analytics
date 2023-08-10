import  {Api} from "../../../../core/network/api";
import { ApplicationDetailModel } from "../model/application-detail-model";

export interface ApplicationDetailSource {
    getApplicationDetail(name: string): Promise<ApplicationDetailModel[]>
}

export class ApplicationDetailSourceImpl implements ApplicationDetailSource {

    constructor(private impl: Api) {}

    getApplicationDetail(name: string): Promise<ApplicationDetailModel[]> {
        return this.impl.getApplicationDetail(name);
    }

}