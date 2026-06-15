import { requireAuth } from "@/features/auth/actions";

import React from "react";

export default async function ProtectedLayout({ children}:{children:React.ReactNode}){
    return (
        <div className="min-h-svh">
            {children}
        </div>
    )
}