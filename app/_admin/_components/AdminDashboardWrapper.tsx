import React from "react";

import { AdminDashboard } from "./AdminDashboard";

export const AdminDashboardWrapper: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>
        This page is only accessible to administrators. Try logging in with the
        username <code>admin</code> and the password <code>admin</code>.
      </p>
      <AdminDashboard />
    </div>
  );
};
