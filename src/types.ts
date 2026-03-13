export type Priority = "low" | "medium" | "high";

export type Category = "personal" | "work" | "shopping" | "health" | "other";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number | null;
  priority: Priority;
  category: Category;
  dueDate: number | null;
}
