import { assert, describe, expect, test } from "vitest";
import { CreateUser, ResetUserPassword, User } from "../common/model/User";
import { RoleEnum } from "../common/enum/RoleEnum";
import { UserDTO } from "../resources/user/dto/UserDTO";
import { UserListDTO } from "../resources/user/dto/UserListDTO";

const user: User = new User(
  17,
  "firstname",
  "lastname",
  "email",
  "phone",
  new Date("2024-07-12"),
  true,
  12,
  19,
  27,
  "street",
  "streetNumber",
  "locality",
  "zipcode",
  27,
  1,
  "country",
  "français",
  [RoleEnum.USER],
  "iban",
  "bic",
  "image_key",
);

describe("User models should be what we give him", () => {
  test("Test User Model", () => {
    expect(user.id).toBe(17);
    expect(user.firstname).toBe("firstname");
    expect(user.lastname).toBe("lastname");
    expect(user.email).toBe("email");
    expect(user.phone).toBe("phone");
    expect(user.created_at).toStrictEqual(new Date("2024-07-12"));
    expect(user.active).toBe(true);
    expect(user.ca).toBe(12);
    expect(user.tt).toBe(19);
    expect(user.rtt).toBe(27);
    expect(user.street).toBe("street");
    expect(user.streetNumber).toBe("streetNumber");
    expect(user.locality).toBe("locality");
    expect(user.zipcode).toBe("zipcode");
    expect(user.lat).toBe(27);
    expect(user.lng).toBe(1);
    expect(user.country).toBe("country");
    expect(user.nationality).toBe("français");
    expect(user.roles).toStrictEqual([RoleEnum.USER]);
    expect(user.iban).toBe("iban");
    expect(user.bic).toBe("bic");
    expect(user.image_key).toBe("image_key");
  });
  test("Test CreateUser Model", () => {
    const user: CreateUser = new CreateUser(
      "firstname",
      "lastname",
      "email",
      "password",
      "phone",
      1,
      "nationality",
      "country",
      "iban",
      "bic",
    );
    assert.equal(user.firstname, "firstname");
    expect(user.lastname).toBe("lastname");
    expect(user.email).toBe("email");
    expect(user.password).toBe("password");
    expect(user.phone).toBe("phone");
    expect(user.id_address).toBe(1);
    expect(user.nationality).toBe("nationality");
    expect(user.country).toBe("country");
    expect(user.iban).toBe("iban");
    expect(user.bic).toBe("bic");
    expect(user.image_key).toBe("");
  });
  test("Test ResetUserPassword Model", () => {
    const resetUserPassword: ResetUserPassword = new ResetUserPassword(
      1,
      "laMaisonEstTouteVerte",
    );
    expect(resetUserPassword.id).toBe(1);
    expect(resetUserPassword.password).toBe("laMaisonEstTouteVerte");
  });
  test("Test UserDTO", () => {
    const userDTO = new UserDTO(user);
    expect(user.id).toBe(17);
  });
  test("Test UserListDTO", () => {
    const userDTO = new UserListDTO(user);
    expect(user.id).toBe(17);
  });
});
