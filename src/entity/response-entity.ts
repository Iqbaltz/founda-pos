export interface ResponseEntity<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}
