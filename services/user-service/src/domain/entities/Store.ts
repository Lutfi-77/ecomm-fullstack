export interface StoreProps {
  idSeller: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountHolder?: string;
  ratingCache?: number; // Opsional saat di-create
  createdAt?: Date;
}

export class Store {
  private readonly id?: string;
  private props: StoreProps;

  constructor(props: StoreProps, id?: string) {
    this.id = id;
    this.props = {
      ...props,
      ratingCache: props.ratingCache ?? 0,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get idStore(): string | undefined {
    return this.id;
  }
  get idSeller(): string {
    return this.props.idSeller;
  }
  get name(): string {
    return this.props.name;
  }
  get slug(): string {
    return this.props.slug;
  }
  get description(): string | undefined {
    return this.props.description;
  }
  get logoUrl(): string | undefined {
    return this.props.logoUrl;
  }
  get bankName(): string | undefined {
    return this.props.bankName;
  }
  get bankAccountNumber(): string | undefined {
    return this.props.bankAccountNumber;
  }
  get bankAccountHolder(): string | undefined {
    return this.props.bankAccountHolder;
  }
  get ratingCache(): number {
    return this.props.ratingCache!;
  }
  get createdAt(): Date {
    return this.props.createdAt!;
  }

  updateDetails(
    props: Partial<Omit<StoreProps, 'idSeller' | 'ratingCache' | 'createAt'>>,
  ) {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.slug !== undefined) this.props.slug = props.slug;
    if (props.description !== undefined)
      this.props.description = props.description;
    if (props.logoUrl !== undefined) this.props.logoUrl = props.logoUrl;
    if (props.bankName !== undefined) this.props.bankName = props.bankName;
    if (props.bankAccountNumber !== undefined)
      this.props.bankAccountNumber = props.bankAccountNumber;
    if (props.bankAccountHolder !== undefined)
      this.props.bankAccountHolder = props.bankAccountHolder;
  }
}
