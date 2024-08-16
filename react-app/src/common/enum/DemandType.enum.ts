export enum DemandType {
  RTT = "RTT",
  TT = "TT",
  CA = "CA",
  ABSENCE = "ABSENCE",
  SICKNESS = "SICKNESS",
}

export const getDemandTypeLabel = (type?: DemandType) => {
  switch (type) {
    case DemandType.CA:
      return "Congés";
    case DemandType.RTT:
      return "RTT";
    case DemandType.TT:
      return "Télétravail";
    case DemandType.ABSENCE:
      return "Absence";
    case DemandType.SICKNESS:
      return "Arrêt maladie";
    default:
      return "Demande inconnue";
  }
};
