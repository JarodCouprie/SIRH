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

// Définir une interface pour les erreurs
interface Errors {
  label?: string;
  street?: string;
  streetNumber?: string;
  city?: string;
  zipcode?: string;
  country?: string;
}

export const AgencyCreate = () => {
  const [agency, setAgency] = useState(new CreateOrganisationFormDataModel());
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    if (!agency.label) newErrors.label = "Le nom est requis.";
    if (!agency.street) newErrors.street = "L'adresse est requise.";
    if (!agency.streetNumber)
      newErrors.streetNumber = "Le numéro d'adresse est requis.";
    if (!agency.city) newErrors.city = "La ville est requise.";
    if (!agency.zipcode) newErrors.zipcode = "Le code postal est requis.";
    if (!agency.country) newErrors.country = "Le pays est requis.";

    return newErrors;
  };

  const handleClickSubmitButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const config = {
      method: "POST",
      body: JSON.stringify(agency),
    };
    const newAgencyFetch = await customFetcher(
      "http://localhost:5000/api/agency/create",
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

    if (errors[e.target.name as keyof Errors]) {
      setErrors({
        ...errors,
        [e.target.name]: undefined, // Mettre à jour l'erreur pour ce champ
      });
    }
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
            {errors.label && <p className="text-red-500">{errors.label}</p>}

            <Label htmlFor="address">Adresse</Label>
            <Input
              className="p-6"
              type="text"
              id="street"
              placeholder="Adresse de l'agence..."
              name="street"
              onChange={handleOrganisationFormDataChange}
            />
            {errors.street && <p className="text-red-500">{errors.street}</p>}

            <Label htmlFor="address">Numéro adresse</Label>
            <Input
              className="p-6"
              type="number"
              id="streetNumber"
              placeholder="Numéro d'adresse de l'agence..."
              name="streetNumber"
              onChange={handleOrganisationFormDataChange}
            />
            {errors.streetNumber && (
              <p className="text-red-500">{errors.streetNumber}</p>
            )}

            <Label htmlFor="city">Ville</Label>
            <Input
              className="p-6"
              type="text"
              id="city"
              placeholder="Ville de l'agence..."
              name="city"
              onChange={handleOrganisationFormDataChange}
            />
            {errors.city && <p className="text-red-500">{errors.city}</p>}

            <Label htmlFor="zip_code">Code postal</Label>
            <Input
              className="p-6"
              type="number"
              id="zipcode"
              placeholder="Code postal de l'agence..."
              name="zipcode"
              onChange={handleOrganisationFormDataChange}
            />
            {errors.zipcode && <p className="text-red-500">{errors.zipcode}</p>}

            <Label htmlFor="state">Pays</Label>
            <Input
              className="p-6"
              type="text"
              id="country"
              placeholder="Pays de l'agence..."
              name="country"
              onChange={handleOrganisationFormDataChange}
            />
            {errors.country && <p className="text-red-500">{errors.country}</p>}

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
