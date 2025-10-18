import { PrismaClient } from 'generated/prisma';

// Inferimos o tipo certo do tx a partir do client da versão atual
export type PrismaTx = Parameters<PrismaClient['$transaction']>[0] extends (
  arg: infer T,
  ...rest: any
) => any
  ? T
  : never;

// Nosso TransactionContext concreto para Prisma
export interface PrismaTransactionContext {
  client: PrismaTx;
}
