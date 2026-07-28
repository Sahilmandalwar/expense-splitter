export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Array<{ field: string; message: string }>
}
