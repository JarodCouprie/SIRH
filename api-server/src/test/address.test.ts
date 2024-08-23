import { describe, test, expect } from "vitest";
import { Address } from "../common/model/Address";
import { User } from "../common/model/User";
import { RoleEnum } from "../common/enum/RoleEnum";
import { Agency } from "../common/model/Agency";
import { CreateOrUpdateAddressDTO } from "../resources/address/dto/CreateOrUpdateAddressDTO";

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
  test("Test CreateOrUpdateAddressDTO", () => {
    const addressDTO = new CreateOrUpdateAddressDTO(
      "street",
      "streetNumber",
      "locality",
      "zipcode",
      24487,
      14888884,
    );

    expect(addressDTO.street).toBe("street");
    expect(addressDTO.streetNumber).toBe("streetNumber");
    expect(addressDTO.locality).toBe("locality");
    expect(addressDTO.zipcode).toBe("zipcode");
    expect(addressDTO.lat).toBe(24487);
    expect(addressDTO.lng).toBe(14888884);
  });
});
