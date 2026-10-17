export class User {
  constructor(
    public fullName: string,
    public email: string,
    public password: string,
    public role: string,
    public readonly id?: string,
    public readonly token?: string,
  ) {}
}
