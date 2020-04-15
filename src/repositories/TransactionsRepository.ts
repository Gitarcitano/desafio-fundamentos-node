import { json } from 'express';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((prev, cur) => prev + cur.value, 0);

    const sumOutcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((prev, cur) => prev + cur.value, 0);

    const totalBalance = sumIncomes - sumOutcomes;

    const jsonObj = {
      income: sumIncomes,
      outcome: sumOutcomes,
      total: totalBalance,
    };

    return jsonObj;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
