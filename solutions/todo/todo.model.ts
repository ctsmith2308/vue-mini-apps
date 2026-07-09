interface Todo {
  id: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type FilterStatus = 'all' | 'completed' | 'pending';

export type { Todo, FilterStatus };
