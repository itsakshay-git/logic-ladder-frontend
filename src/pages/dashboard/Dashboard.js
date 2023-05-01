import React from "react";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import Ordertable from "../../components/orderTable/orderTable";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");

  return (
    <div>
      <Ordertable  />
    </div>
  );
};

export default Dashboard;