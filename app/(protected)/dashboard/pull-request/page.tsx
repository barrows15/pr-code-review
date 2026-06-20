import type { Metadata } from "next";
import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { requireAuth } from "@/features/auth/actions";

export const metadata: Metadata = {
  title: "Pull Request · Dashboard",
};

export default async function DashboardPullRequestPage() {
  await requireAuth();

  return (
    <>
      <DashboardHeader title="Pull Request" description="View and manage pull requests." />
      <div className="p-6">This page will show pull request details and review actions.</div>
    </>
  );
}
