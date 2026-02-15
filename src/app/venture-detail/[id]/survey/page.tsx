import SurveyForm from "@/components/Survey/SurveyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evaluate Venture | Venture Studio",
  description: "Evaluate this venture on Venture Studio.",
};

const SurveyPage = ({ params }: { params: { id: string } }) => {
  return <SurveyForm projectId={params.id} />;
};

export default SurveyPage;
