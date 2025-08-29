import type MessageResponse from "./message-response.js";

type ErrorResponse = {
  stack?: string;
  errors?: unknown;
} & MessageResponse;

export default ErrorResponse;
