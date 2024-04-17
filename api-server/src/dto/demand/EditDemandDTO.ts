import {DemandType} from "../../model/Demand";

export class EditDemandDTO {
    startDate: Date;
    endDate: Date;
    motivation: string;
    type: DemandType;


    constructor(startDate: Date, endDate: Date, motivation: string, type: DemandType) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.motivation = motivation;
        this.type = type;
    }
}