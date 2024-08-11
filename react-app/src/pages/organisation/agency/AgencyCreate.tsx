import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.js";
import { Input } from "@/components/ui/input.js";
import { Button } from "@/components/ui/button.js";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label.js";
import React, { useState } from "react";
import { CreateOrganisationFormDataModel } from "@/models/organisation/CreateOrganisationFormData.model.js";
import { customFetcher } from "@/helper/fetchInstance.js";

export const AgencyCreate = () => {
  const [agency, setAgency] = useState(new CreateOrganisationFormDataModel());
  const navigate = useNavigate();

  const handleClickSubmitButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    console.log(agency);

    const config = {
      method: "POST",
      body: JSON.stringify(agency),
    };
    const newAgencyFetch = await customFetcher(
      "http://localhost:5000/api/organisation/agency/create",
      config,
    );

    if (newAgencyFetch.response.status === 201) {
      return navigate("/organisation");
    }
  };

  const handleOrganisationFormDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAgency({
      ...agency,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Card>
        <CardTitle className="flex items-center justify-between gap-4 text-xl">
          <CardHeader>Création d'une agence</CardHeader>
        </CardTitle>
        <CardContent>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleClickSubmitButton}
          >
            <Label htmlFor="label">Nom</Label>
            <Input
              className="p-6"
              type="text"
              id="label"
              placeholder="Nom de l'agence..."
              name="label"
              onChange={handleOrganisationFormDataChange}
            />

            <Label htmlFor="address">Adresse</Label>
            <Input
              className="p-6"
              type="text"
              id="street"
              placeholder="Adresse de l'agence..."
              name="street"
              onChange={handleOrganisationFormDataChange}
            />

            <Label htmlFor="address">Numéro adresse</Label>
            <Input
              className="p-6"
              type="number"
              id="streetNumber"
              placeholder="Numéro d'adresse de l'agence..."
              name="streetNumber"
              onChange={handleOrganisationFormDataChange}
            />

            <Label htmlFor="city">Ville</Label>
            <Input
              className="p-6"
              type="text"
              id="city"
              placeholder="Ville de l'agence..."
              name="city"
              onChange={handleOrganisationFormDataChange}
            />

            <Label htmlFor="zip_code">Code postal</Label>
            <Input
              className="p-6"
              type="number"
              id="zipcode"
              placeholder="Code postal de l'agence..."
              name="zipcode"
              onChange={handleOrganisationFormDataChange}
            />

            <Label htmlFor="state">Pays</Label>
            <Input
              className="p-6"
              type="text"
              id="country"
              placeholder="Pays de l'agence..."
              name="country"
              onChange={handleOrganisationFormDataChange}
            />

            <div className="flex justify-end gap-2 pt-6">
              <Button
                variant="ghost"
                type="button"
                onClick={() => navigate(`/organisation`)}
              >
                Annuler
              </Button>
              <Button variant="callToAction" type="submit">
                Enregistrer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
