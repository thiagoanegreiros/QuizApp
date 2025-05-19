export interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer?: string;
  selectedAnswer?: string;
  onSelect: (option: string) => void;
}
