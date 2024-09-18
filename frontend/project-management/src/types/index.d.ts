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
  _id: string;
  token: string;
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
