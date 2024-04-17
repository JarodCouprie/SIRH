import {Demand, DemandType} from "../../model/Demand";

export class DemandDTO {
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    status: string;
    type: DemandType;


    constructor(demand: Demand) {
        this.startDate = demand.startDate;
        this.endDate = demand.endDate;
        this.createdAt = demand.createdAt;
        this.status = demand.status;
        this.type = demand.type;
    }
}

