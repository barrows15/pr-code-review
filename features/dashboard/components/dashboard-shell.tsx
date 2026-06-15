import React from 'react'
import {} from "@/components/ui/tooltip";
import {} from "@/features/dashboard/components/dashboard-sidebar";

import {UserMenuUser} from "@/features/auth/components/user-menu";

type DasshboardShellProps = {
  children : React.ReactNode;
  user: UserMenuUser;
  plan?: string;
}

const dashboard1 = () => {
  return (
    <div>dashboard1</div>
  )
}

export default dashboard1