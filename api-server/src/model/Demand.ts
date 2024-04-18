export class Demand {
    id: number;
    startDate: Date;
    endDate: Date;
    motivation: string;
    createdAt: Date;
    status: string;
    type: DemandType;
    idOwner: number;
    idValidator: number;


    constructor(id: number, startDate: Date, endDate: Date, motivation: string, createAt: Date, status: string, type: DemandType, idOwner: number, idValidator: number) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.motivation = motivation;
        this.createdAt = createAt;
        this.status = status;
        this.type = type;
        this.idOwner = idOwner;
        this.idValidator = idValidator;
    }
}

export enum DemandType {
    RTT = "RTT",
    TT = "TT",
    CA = "CA"
}


