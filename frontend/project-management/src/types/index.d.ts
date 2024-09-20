export interface item {
  _id: string;
  name: string;
}

export interface formProps {
  onClose: () => void;
}

export interface userData {
  email: string;
  isAdmin?: boolean;
  name: string;
  token: string;
  _id: string;
}

export interface user {
  name: string;
  email: string;
  _id: string;
  token: string;
  projects: Array;
}

export interface signup {
  name?: string;
  email?: string;
  password?: string;
}
export interface login {
  email?: string;
  password?: string;
}

export interface project {
  _id?: string;
  name: string;
  description: string;
  technologies: string[];
  deadline?: Date | ReactNode;
  users?: string[];
  tasks?: string[];
  isDone?: boolean;
}

export interface task {
  name?: string;
  deadline?: Date;
  addedBy?: string[];
  isDone?: boolean;
}
