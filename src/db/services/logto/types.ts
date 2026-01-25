export type LogtoUser = {
  id: string;
  username: string | null;
  primaryEmail: string | null;
  primaryPhone: string | null;
  name: string | null;
  lastSignInAt: number;
  createdAt: number;
  updatedAt: number;
};

export type LogtoRole = {
  tenantId: string;
  id: string;
  name: string;
  description: string;
  type: string;
  isDefault: boolean;
};
