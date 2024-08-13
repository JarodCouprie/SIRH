import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button.js";
import { FieldRow } from "@/components/user/fieldRow.js";
import { customFetcher } from "@/helper/fetchInstance.js";
import { Label } from "@/components/ui/label.js";
import { Input } from "@/components/ui/input.js";
import { AgencyModel } from "@/models/organisation/agency/Agency.model.js";

interface AgencyAddressProps {
  agency: AgencyModel;
  setAgency: Dispatch<SetStateAction<AgencyModel>>;
}

class AgencyAddressData {
  street: string;
  streetNumber: string;
  locality: string;
  zipcode: string;

  constructor(agency: AgencyModel) {
    this.street = agency.address.street;
    this.streetNumber = agency.address.streetNumber;
    this.locality = agency.address.locality;
    this.zipcode = agency.address.zipcode;
  }
}

export const AgencyAddress: React.FC<AgencyAddressProps> = ({
  agency,
  setAgency,
}) => {
  const [agencyCanBeUpdated, setAgencyCanBeUpdated] = useState(false);
  const [agencyUpdated, setAgencyUpdated] = useState(
    new AgencyAddressData(agency),
  );

  const handleUpdateAgency = () => {
    setAgencyUpdated(new AgencyAddressData(agency));
    setAgencyCanBeUpdated(!agencyCanBeUpdated);
  };

  const handleSubmitUpdatedAgency = async () => {
    const config = {
      method: "POST",
      body: JSON.stringify(agencyUpdated),
    };
    await customFetcher(
      `http://localhost:5000/api/agency/update-address/${agency.id}`,
      config,
    ).then((response) => {
      setAgency(response.data.data);
      setAgencyCanBeUpdated(!agencyCanBeUpdated);
    });
  };

  const handleAgencyFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAgencyUpdated({
      ...agencyUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const userFields = (
    <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
      <FieldRow title="Adresse">
        {agency.address.streetNumber} {agency.address.street}
      </FieldRow>
      <FieldRow title="Code postal">{agency.address.zipcode}</FieldRow>
      <FieldRow title="Ville">{agency.address.locality}</FieldRow>
    </CardContent>
  );

  const userUpdating = (
    <CardContent className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="streetNumber">Numéro de rue</Label>
        <Input
          type="number"
          id="streetNumber"
          placeholder="Numéro de rue"
          name="streetNumber"
          value={agencyUpdated.streetNumber}
          onChange={handleAgencyFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="street">Nom de rue</Label>
        <Input
          type="text"
          id="street"
          placeholder="Nom de rue"
          name="street"
          value={agencyUpdated.street}
          onChange={handleAgencyFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="zipcode">Code postal</Label>
        <Input
          type="number"
          id="zipcode"
          placeholder="Code postal"
          name="zipcode"
          value={agencyUpdated.zipcode}
          onChange={handleAgencyFormDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="locality">Ville</Label>
        <Input
          type="text"
          id="locality"
          placeholder="Ville"
          name="locality"
          value={agencyUpdated.locality}
          onChange={handleAgencyFormDataChange}
        />
      </div>
    </CardContent>
  );

  return (
    <Card>
      <CardHeader className="text-gray-900 dark:text-gray-300">
        <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
          <div className="flex flex-wrap items-center gap-4">
            <FaLocationDot />
            <span>Adresse</span>
          </div>
          {agencyCanBeUpdated ? (
            <Button variant="ghost" onClick={handleUpdateAgency}>
              Annuler
            </Button>
          ) : (
            <Button variant="callToAction" onClick={handleUpdateAgency}>
              Modifier
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      {agencyCanBeUpdated ? userUpdating : userFields}
      {agencyCanBeUpdated && (
        <CardFooter className="justify-end">
          <Button variant="callToAction" onClick={handleSubmitUpdatedAgency}>
            Enregistrer
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
