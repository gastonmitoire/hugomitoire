import React from "react";

import { User } from "@nextui-org/user";

export const UserMenu: React.FC = () => {
  return (
    <div className="flex items-center">
      <User
        name="John Doe"
        avatarProps={{
          src: "https://i.pravatar.cc/300?img=3",
          alt: "John Doe",
        }}
      />
    </div>
  );
};
