export type SurveyQuestion = {
  id: string;
  text: string;
  type: "rating" | "text";
};

// Placeholder questions — swap in real Qualtrics questions when provided
export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "q1",
    text: "How innovative is this venture idea?",
    type: "rating",
  },
  {
    id: "q2",
    text: "How feasible is this venture?",
    type: "rating",
  },
  {
    id: "q3",
    text: "How well does the team understand the market?",
    type: "rating",
  },
  {
    id: "q4",
    text: "How clear is the value proposition?",
    type: "rating",
  },
  {
    id: "q5",
    text: "Overall, how would you rate this venture?",
    type: "rating",
  },
  {
    id: "q6",
    text: "What feedback would you give to this team?",
    type: "text",
  },
];
