export class CreateAgency {
  label: string;
  id_address: number;

  constructor(label: string, id_address: number) {
    this.label = label;
    this.id_address = id_address;
  }
}
