export interface DashboardEntity {
  total_sales: number;
  total_transactions: number;
  total_customers: number;
  total_products: number;
  sales_trend_weekly: Array<{
    date: string;
    sales: number;
  }>;
  top_selling_items: Array<{
    product_name: string;
    sold: number;
  }>;
  recent_transactions: Array<{
    id: number;
    transaction_number: string;
    customer_name: string;
    transaction_date: string;
    payment_amount: number;
    payment_status: string;
    items_count: number;
    cashier_name: string;
  }>;
}
