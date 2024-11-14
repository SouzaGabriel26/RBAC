export interface IRequest {
  body: Record<string, unknown>;
  params: Record<string, string>;
  headers: Record<string, string>;
  user?: {
    id: string;
    role: string;
  };
}
