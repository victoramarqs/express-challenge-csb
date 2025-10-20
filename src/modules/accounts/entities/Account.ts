import { randomUUID } from 'crypto';

export interface AccountProps {
  accountNumberBase?: number;
  balance: number;
  createdAt?: Date;
}

export class Account {
  private _id: string;
  private props: AccountProps;

  constructor(props: AccountProps, id?: string) {
    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get accountNumberBase(): number {
    return this.props.accountNumberBase;
  }

  public set accountNumberBase(value: number) {
    this.props.accountNumberBase = value;
  }

  public get balance(): number {
    return this.props.balance;
  }

  public set balance(value: number) {
    this.props.balance = value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set createdAt(value: Date) {
    this.props.createdAt = value;
  }
}
