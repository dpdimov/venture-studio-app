import ProjectDetailPage from "@/components/Project/ProjectDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venture Detail | Venture Studio",
  description: "View venture details on Venture Studio.",
};

const VentureDetailPage = ({ params }: { params: { id: string } }) => {
  return <ProjectDetailPage project_id={params.id} />;
};

export default VentureDetailPage;
