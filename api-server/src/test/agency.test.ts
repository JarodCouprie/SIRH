import { describe, expect, test } from "vitest";
import { Agency, CreateAgency } from "../common/model/Agency";
import {
  AgencyCoord,
  AgencyDTO,
  AgencyList,
} from "../resources/agency/dto/AgencyDTO";

const agency = new Agency(
  1477,
  "label",
  "street",
  "streetNumber",
  "locality",
  "zipcode",
  2477,
  147,
);
describe("Agency models should be what we give it", () => {
  test("Test Agency Model", () => {
    expect(agency.id).toBe(1477);
    expect(agency.label).toBe("label");
    expect(agency.street).toBe("street");
    expect(agency.streetNumber).toBe("streetNumber");
    expect(agency.locality).toBe("locality");
    expect(agency.zipcode).toBe("zipcode");
    expect(agency.lat).toBe(2477);
    expect(agency.lng).toBe(147);
  });
  test("Test CreateAgency Model", () => {
    const agency = new CreateAgency("Agence de Metz", 1747);
    expect(agency.label).toBe("Agence de Metz");
    expect(agency.id_address).toBe(1747);
  });
  test("Test AgencyList", () => {
    const agencyList = new AgencyList(agency);
    expect(agencyList.id).toBe(1477);
  });
  test("Test AgencyDTO", () => {
    const agencyDTO = new AgencyDTO(agency);
    expect(agencyDTO.id).toBe(1477);
  });
  test("Test AgencyCoord", () => {
    const agencyCoord = new AgencyCoord(agency);
    expect(agencyCoord.id).toBe(1477);
  });
});
