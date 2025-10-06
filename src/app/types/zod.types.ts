export type ParsedError = {
  expected: string;
  code: string;
  path: string[];
  message: string;
}