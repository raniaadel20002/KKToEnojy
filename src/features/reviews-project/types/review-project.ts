export interface ReviewProjectItem {
  id: number;
  comment: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  rate: number;
  createdAt: string;
}

export interface ReviewProjectCreateInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  comment: string;
  rate: number;
}

export interface ReviewProjectApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

