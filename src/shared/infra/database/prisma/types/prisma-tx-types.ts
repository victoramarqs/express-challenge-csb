import { PrismaClient } from 'generated/prisma';

export type PrismaTx = Parameters<PrismaClient['$transaction']>[0] extends (
  arg: infer T,
  ...rest: any
) => any
  ? T
  : never;

export interface PrismaTransactionContext {
  client: PrismaTx;
}
