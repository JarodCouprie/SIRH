import { describe, test, expect } from "vitest";
import { Address } from "../common/model/Address";
import { User } from "../common/model/User";
import { RoleEnum } from "../common/enum/RoleEnum";
import { Agency } from "../common/model/Agency";

describe("Address models should be what we give it", () => {
  test("Test Address Model from User Model", () => {
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
    const address = new Address(user);

    expect(address.street).toBe("street");
    expect(address.streetNumber).toBe("streetNumber");
    expect(address.locality).toBe("locality");
    expect(address.zipcode).toBe("zipcode");
    expect(address.lat).toBe(27);
    expect(address.lng).toBe(1);
  });
  test("Test Address Model from Agency Model", () => {
    const agency = new Agency(
      147,
      "label",
      "street",
      "streetNumber",
      "locality",
      "zipcode",
      247,
      14,
    );
    const address = new Address(agency);

    expect(address.street).toBe("street");
    expect(address.streetNumber).toBe("streetNumber");
    expect(address.locality).toBe("locality");
    expect(address.zipcode).toBe("zipcode");
    expect(address.lat).toBe(247);
    expect(address.lng).toBe(14);
  });
});
