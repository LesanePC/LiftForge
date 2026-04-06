export type ID = string;
export type DateString = string;

export interface BaseEntity {
  id: ID;
  createdAt?: DateString;
  updatedAt?: DateString;
}

export type Category = 'bench' | 'squat' | 'deadlift' | 'accessory';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}