import { UserModel } from "@/models/user/User.model.js";
import React, { useState } from "react";
import { DemandAll } from "@/models/Demand.model.js";
import { InProgress } from "@/components/navigation/InProgress.js";

interface UserDemandProps {
  user: UserModel;
}

export const UserDemands: React.FC<UserDemandProps> = ({ user }) => {
  const [demandList, setDemandList] = useState<DemandAll[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalData, setTotalData] = useState(0);

  console.log(user.id);

  return <InProgress />;
};
