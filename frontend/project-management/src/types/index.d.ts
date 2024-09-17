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
