export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
  HR = "HR",
  LEAVE_MANAGER = "LEAVE_MANAGER",
}

export function roleEnumKeyToFrench(role: string): string {
  switch (role) {
    case RoleEnum.USER.toString():
      return "Collaborateur";
    case RoleEnum.ADMIN.toString():
      return "Administrateur";
    case RoleEnum.HR.toString():
      return "Directeur des ressources humaines";
    case RoleEnum.LEAVE_MANAGER.toString():
      return "Référent congés";
    default:
      return "Collaborateur";
  }
}
