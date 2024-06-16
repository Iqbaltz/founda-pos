import { CustomerEntity } from "./customer-entity";
import { PaymentMethodEntity } from "./payment-method-entity";

interface CashierTransactionItemEntity {
  id: number;
  cashier_transaction_id: number;
  barang_id: number;
  transaction_type: string;
  price_per_barang: number;
  qty: number;
  created_at: string;
  updated_at: string;
}

export interface CashierTransactionEntity {
  id: number;
  transaction_number: string;
  transaction_date: Date;
  cashier_id: number;
  customer_id: number;
  payment_method_id: number;
  discount: string;
  created_at: string;
  updated_at: string;
  payment_amount: number;
  payment_status: number;
  cashier: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    photo: string;
    active_role_id: string;
  };
  customer: CustomerEntity;
  payment_method: PaymentMethodEntity;
  transaction_items: CashierTransactionItemEntity[];
}
