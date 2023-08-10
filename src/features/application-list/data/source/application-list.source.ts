import { Api } from "../../../../core/network/api";

export interface ApplicationListSource {
    getApplications() : Promise<string[]>
}

export class ApplicationListSourceImpl implements ApplicationListSource {

    constructor(private api: Api) {}

    getApplications(): Promise<string[]> {
        return this.api.getApplications();
    }

}

