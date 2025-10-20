import { randomUUID } from 'crypto';

export interface TransferProps {
  transactionId: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  createdAt?: Date;
}

export class Transfer {
  private _id: string;
  private props: TransferProps;

  constructor(props: TransferProps, id?: string) {
    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get transactionId(): string {
    return this.props.transactionId;
  }

  public set transactionId(value: string) {
    this.props.transactionId = value;
  }

  public get fromAccountId(): string {
    return this.props.fromAccountId;
  }

  public set fromAccountId(value: string) {
    this.props.fromAccountId = value;
  }

  public get toAccountId(): string {
    return this.props.toAccountId;
  }

  public set toAccountId(value: string) {
    this.props.toAccountId = value;
  }

  public get amount(): number {
    return this.props.amount;
  }

  public set amount(value: number) {
    if (value <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    const decimalPart = value.toString().split('.')[1];
    if (decimalPart && decimalPart.length > 2) {
      throw new Error('Amount must have at most two decimal places');
    }

    this.props.amount = value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  public validateAccounts(): void {
    if (this.props.fromAccountId === this.props.toAccountId) {
      throw new Error('From and To accounts must be different');
    }
  }
}
