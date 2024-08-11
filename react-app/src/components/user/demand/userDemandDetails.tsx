import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button.js";

export const UserDemandDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;

  const handleClick = () => {
    if (location.state?.previousRoute) {
      navigate(location.state.previousRoute);
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 ">
      <Button variant="link" onClick={handleClick}>
        <FaArrowLeft className="mr-2" />
        <div>
          {user ? `${user?.firstname} ${user?.lastname}` : "Utilisateur"}
        </div>
      </Button>
      Demand details from admin
    </div>
  );
};
