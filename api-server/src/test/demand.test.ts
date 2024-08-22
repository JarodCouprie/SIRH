import { describe, expect, test } from "vitest";
import {
  ConfirmDemand,
  Demand,
  DemandStatus,
  DemandType,
  RejectDemand,
  StatusDemand,
  ValidatedDemand,
} from "../common/model/Demand";

describe("Demand models should be what we give it", () => {
  test("Test Demand Model", () => {
    const demand = new Demand(
      1,
      new Date("2024-07-12"),
      new Date("2024-07-12"),
      "motivation",
      "justification",
      new Date("2024-07-12"),
      DemandStatus.DENIED,
      DemandType.CA,
      2,
      3,
      4,
      "Paul",
      "Dupont",
      new Date("2024"),
      "file_key",
    );
    expect(demand.id).toBe(1);
    expect(demand.start_date).toStrictEqual(new Date("2024-07-12"));
    expect(demand.end_date).toStrictEqual(new Date("2024-07-12"));
    expect(demand.motivation).toBe("motivation");
    expect(demand.justification).toBe("justification");
    expect(demand.created_at).toStrictEqual(new Date("2024-07-12"));
    expect(demand.status).toStrictEqual(DemandStatus.DENIED);
    expect(demand.type).toStrictEqual(DemandType.CA);
    expect(demand.number_day).toBe(2);
    expect(demand.id_owner).toBe(3);
    expect(demand.id_validator).toBe(4);
    expect(demand.validator_firstname).toBe("Paul");
    expect(demand.validator_lastname).toBe("Dupont");
    expect(demand.validated_at).toBeInstanceOf(Date);
    expect(demand.file_key).toBe("file_key");
  });
  test("Test ValidatedDemand Model", () => {
    const demand = new ValidatedDemand(
      1,
      new Date("2027"),
      new Date("2027"),
      "motivation validée",
      "justification validée",
      new Date("2014"),
      DemandStatus.ACCEPTED,
      DemandType.TT,
      5,
      7,
      7888,
      "Jean",
      "Témoin",
      new Date("2017"),
    );
    expect(demand.id).toBe(1);
    expect(demand.start_date).toStrictEqual(new Date("2027"));
    expect(demand.end_date).toStrictEqual(new Date("2027"));
    expect(demand.motivation).toBe("motivation validée");
    expect(demand.justification).toBe("justification validée");
    expect(demand.created_at).toStrictEqual(new Date("2014"));
    expect(demand.status).toStrictEqual(DemandStatus.ACCEPTED);
    expect(demand.type).toStrictEqual(DemandType.TT);
    expect(demand.number_day).toBe(5);
    expect(demand.id_owner).toBe(7);
    expect(demand.id_validator).toBe(7888);
    expect(demand.validator_firstname).toBe("Jean");
    expect(demand.validator_lastname).toBe("Témoin");
    expect(demand.validated_at).toStrictEqual(new Date("2017"));
  });
  test("Test ConfirmDemand Model", () => {
    const demand = new ConfirmDemand(114787, 45);
    expect(demand.id).toBe(114787);
    expect(demand.validatorId).toBe(45);
    expect(demand.status).toStrictEqual(DemandStatus.ACCEPTED);
    expect(demand.validated_at).toBe(
      new Date().toISOString().split("Z")[0].replace("T", " ").split(".")[0],
    );
  });
  test("Test RejectDemand Model", () => {
    const demand = new RejectDemand(787, 4285, "justification");
    expect(demand.id).toBe(787);
    expect(demand.validatorId).toBe(4285);
    expect(demand.justification).toBe("justification");
    expect(demand.status).toStrictEqual(DemandStatus.DENIED);
    expect(demand.validated_at).toBe(
      new Date().toISOString().split("Z")[0].replace("T", " ").split(".")[0],
    );
  });
  test("Test StatusDemand Model", () => {
    const demand = new StatusDemand(787, DemandStatus.DRAFT);
    expect(demand.id).toBe(787);
    expect(demand.status).toStrictEqual(DemandStatus.DRAFT);
  });
});
