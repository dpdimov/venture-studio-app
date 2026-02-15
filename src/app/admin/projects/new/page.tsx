import ProjectForm from "@/components/Admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-black dark:text-white">
        Create Project
      </h1>
      <ProjectForm />
    </div>
  );
}
