import React from "react";

import { AdminSidebar } from "./AdminSidebar";

export const AdminDashboard: React.FC = () => {
  return (
    <div className="grid h-full grid-cols-5">
      <AdminSidebar />
      <div className="col-span-4"></div>
    </div>
  );
};
