import { validateRequest } from "@/lib/server/lucia/functions/validate-request";
import { connectToDatabase } from "@/lib/server/mongo/init";
import { redirect } from "next/navigation";

export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectToDatabase();
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/signin");
  }
  return <>{children}</>;
}
