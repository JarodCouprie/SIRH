export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
  RH = "RH",
  DAY_OFF_REFERRAL = "DAY_OFF_REFERRAL",
  HEAD_OF_SERVICE = "HEAD_OF_SERVICE",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  TEAM_MANAGER = "TEAM_MANAGER",
}

export function roleEnumKeyToFrench(role: string): string {
  switch (role) {
    case RoleEnum.USER.toString():
      return "Collaborateur";
    case RoleEnum.ADMIN.toString():
      return "Administrateur";
    case RoleEnum.RH.toString():
      return "Directeur des ressources humaines";
    case RoleEnum.DAY_OFF_REFERRAL.toString():
      return "Référent congés";
    case RoleEnum.HEAD_OF_SERVICE.toString():
      return "Chef de service";
    case RoleEnum.PROJECT_MANAGER.toString():
      return "Chef de projet";
    case RoleEnum.TEAM_MANAGER.toString():
      return "Chef d'équipe";
    default:
      return "Role inconnu";
  }
}
