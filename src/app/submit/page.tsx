import Breadcrumb from "@/components/Common/Breadcrumb";
import SubmitForm from "./SubmitForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Venture | Venture Studio",
  description:
    "Present your venture idea with a structured pitch and reach stakeholders eager to support the next generation of founders.",
};

export default function SubmitPage() {
  return (
    <>
      <Breadcrumb
        pageName="List Your Venture"
        description="Fill in the sections below to create your venture pitch. Once submitted, you'll receive a private edit link to update it anytime."
      />
      <section className="pb-16 pt-8">
        <div className="container">
          <div className="mx-auto max-w-[800px]">
            <SubmitForm />
          </div>
        </div>
      </section>
    </>
  );
}
