export type Project = {
  id: number;
  title: string;
  shortDescription: string | null;
  problem: string | null;
  solution: string | null;
  product: string | null;
  advantage: string | null;
  market: string | null;
  vision: string | null;
  team: string | null;
  funding: string | null;
  nextMilestone: string | null;
  image: { src: string } | null;
  video: { id: string; source: string } | null;
  attachments: { src: string; title: string }[] | null;
  isPrivate: boolean;
  isVisible: boolean;
  surveyEnabled: boolean;
  editKey: string | null;
  createdAt: string;
  createdBy: {
    name: string;
  };
};
