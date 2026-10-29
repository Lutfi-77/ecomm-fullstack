// src/domain/entities/UserAddress.ts

export interface UserAddressProps {
  userId: string;
  recipientName: string;
  phone: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  province?: string;
  isDefault?: boolean;
  createdAt?: Date;
}

export class UserAddress {
  private readonly _id?: string;
  private props: UserAddressProps;

  constructor(props: UserAddressProps, id?: string) {
    this._id = id;
    this.props = {
      ...props,
      isDefault: props.isDefault ?? false,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id(): string | undefined {
    return this._id;
  }
  get userId(): string {
    return this.props.userId;
  }
  get recipientName(): string {
    return this.props.recipientName;
  }
  get phone(): string {
    return this.props.phone;
  }
  get streetAddress(): string {
    return this.props.streetAddress;
  }
  get city(): string {
    return this.props.city;
  }
  get postalCode(): string {
    return this.props.postalCode;
  }
  get province(): string | undefined {
    return this.props.province;
  }
  get isDefault(): boolean {
    return this.props.isDefault!;
  }
  get createdAt(): Date {
    return this.props.createdAt!;
  }

  setDefault(value: boolean) {
    this.props.isDefault = value;
  }
}

