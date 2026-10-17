export class Seller {
  constructor(
    public fullName: string,
    public email: string,
    public password: string,
    public role: string,
    public phone?: string,
    public avatarUrl?: string,
    public readonly id?: string,
  ) {}
}
