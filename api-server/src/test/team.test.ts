import { describe, test, expect } from "vitest";
import { Team } from "../common/model/Team";

describe("Team models should be what we give it", () => {
  test("Test Team Model", () => {
    const team = new Team(1754, "Équipe 7", 8, 19, 122, "Marketing");
    expect(team.id).toBe(1754);
    expect(team.label).toBe("Équipe 7");
    expect(team.minimum_users).toBe(8);
    expect(team.id_user_lead_service).toBe(19);
    expect(team.id_service).toBe(122);
    expect(team.service_label).toBe("Marketing");
  });
});
