enum Currency {
  EUR = "EUR",
  GBP = "GBP",
}

enum Status {
  BOOKED = "BOOKED",
}

export type TransactionModel = {
  id?: string;
  account?: string;
  description?: string;
  category?: string;
  reference?: string;
  currency?: Currency;
  amount?: number;
  status?: Status;
  transactionDate?: string;
  createdAt?: string;
  updatedAt?: string;
  transactionDisplayDate?: string;
  createdAtDisplayDate?: string;
  updatedAtDisplayDate?: string;
};
