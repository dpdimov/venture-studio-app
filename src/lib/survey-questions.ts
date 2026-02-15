export type SurveyQuestion = {
  id: string;
  text: string;
  type: "rating" | "text";
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "problem",
    text: "How clearly does this venture identify a real, validated problem?",
    type: "rating",
  },
  {
    id: "solution",
    text: "How well does the proposed solution address the identified problem?",
    type: "rating",
  },
  {
    id: "market",
    text: "How convincing is the market opportunity?",
    type: "rating",
  },
  {
    id: "competitive_advantage",
    text: "How sustainable is the venture's competitive advantage?",
    type: "rating",
  },
  {
    id: "vision_impact",
    text: "How compelling is the venture's vision and intended impact?",
    type: "rating",
  },
  {
    id: "milestone",
    text: "How achievable and well-defined is the next milestone?",
    type: "rating",
  },
  {
    id: "funding",
    text: "How well justified is the funding ask relative to the plan?",
    type: "rating",
  },
  {
    id: "overall",
    text: "Overall, how would you rate this venture's potential?",
    type: "rating",
  },
  {
    id: "comments",
    text: "What feedback or observations would you share with this team?",
    type: "text",
  },
];
