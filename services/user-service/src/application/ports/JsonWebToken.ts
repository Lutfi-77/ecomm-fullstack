export interface JsonWebToken {
  sign(payload: any): string;
  verify(token: string): any;
}
