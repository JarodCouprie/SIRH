import { Badge } from "@/components/ui/badge.js";
import { DemandStatus } from "@/enum/DemandStatus.enum.js";

export const getDemandBadge = (status?: DemandStatus) => {
  switch (status) {
    case DemandStatus.ACCEPTED:
      return <Badge variant="accepted">Acceptée</Badge>;
    case DemandStatus.WAITING:
      return <Badge variant="waiting">En attente</Badge>;
    case DemandStatus.DENIED:
      return <Badge variant="denied">Refusée</Badge>;
    case DemandStatus.DRAFT:
      return <Badge variant="draft">A confirmer</Badge>;
    default:
      return <Badge variant="outline">Erreur</Badge>;
  }
};
