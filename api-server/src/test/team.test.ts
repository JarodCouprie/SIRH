import { describe, test, expect } from "vitest";
import { Team } from "../common/model/Team";
import { UserListDTO } from "../resources/user/dto/UserListDTO";
import { TeamDTO } from "../resources/team/dto/TeamDTO";

const team = new Team(
  1754,
  "Équipe 7",
  8,
  19,
  122,
  "Marketing",
  "admin",
  "admin",
  "admin@admin.fr",
  [1, "user", "user", "user@user.fr", "", 1],
);
describe("Team models should be what we give it", () => {
  test("Test Team Model", () => {
    expect(team.id).toBe(1754);
    expect(team.label).toBe("Équipe 7");
    expect(team.minimum_users).toBe(8);
    expect(team.id_user_lead_team).toBe(19);
    expect(team.id_service).toBe(122);
    expect(team.service_label).toBe("Marketing");
    expect(team.members);
  });
  test("Test TeamDTO", () => {
    const teamDTO = new TeamDTO(team, 1, 1, team.members);
    expect(team.id).toBe(1754);
  });
});
