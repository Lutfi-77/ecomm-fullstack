export class AppError extends Error {
  public errors?: unknown;
  public status: number;
  constructor(status: number, message: string, errors?: unknown) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
