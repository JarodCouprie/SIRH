import { MemberStatus } from "@/common/enum/MemberStatus.enum.ts";

export class TeamMembers {
  id_member: number;
  member_firstname: string;
  member_lastname: string;
  member_email: string;
  member_avatar: string;
  is_present: MemberStatus;

  constructor(
    id_member: number,
    member_firstname: string,
    member_lastname: string,
    member_email: string,
    member_avatar: string,
    is_present: MemberStatus,
  ) {
    this.id_member = id_member;
    this.member_firstname = member_firstname;
    this.member_lastname = member_lastname;
    this.member_email = member_email;
    this.member_avatar = member_avatar;
    this.is_present = is_present;
  }
}
