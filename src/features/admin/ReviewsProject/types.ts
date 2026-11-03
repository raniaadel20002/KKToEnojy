export type ReviewsProject = {
  id: number;
  comment: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  rate: number | null;
  createdAt: string | null;
};

export type ReviewsProjectListParams = {
  pageNumber: number;
  pageSize: number;
};

export type ReviewsProjectFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  comment: string;
  rate: number;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string | null;
  data: TData;
};

