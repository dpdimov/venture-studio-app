import EditVenture from "./EditVenture";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Venture | Venture Studio",
};

export default function EditPage({ params }: { params: { id: string } }) {
  return <EditVenture projectId={params.id} />;
}
