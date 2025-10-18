// Porto de aplicação (não conhece Prisma)
export interface TransactionContext {
  // opaco; carrega o "client" da transação na implementação
}

export interface UnitOfWork {
  runInTransaction<T>(fn: (tx: TransactionContext) => Promise<T>): Promise<T>;
}

// Token para DI (interfaces não são tokens em Nest)
export const UNIT_OF_WORK = Symbol('UNIT_OF_WORK');
