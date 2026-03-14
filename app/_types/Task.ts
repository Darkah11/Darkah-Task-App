export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Task {
  title: string;
  description?: string;
  status: "to-do" | "in-progress" | "pending" | "completed";
  priority: "low" | "medium" | "high";
  createdAt?: number;
  updatedAt?: number;
  dueDate?: string;
  subtasks?: Subtask[];
}

export type TaskWithId = Task & {
  id: string;
};
