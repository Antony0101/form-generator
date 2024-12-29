class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

function generateApiError(status: number, message: string) {
  return new ApiError(message, status);
}

export { ApiError, generateApiError };
