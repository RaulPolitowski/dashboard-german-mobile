-- Create sales table
CREATE TABLE public.sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_value DECIMAL(10,2) NOT NULL,
  seller TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  total_value DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL,
  due_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create service_orders table
CREATE TABLE public.service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  technician TEXT NOT NULL,
  status TEXT NOT NULL,
  priority TEXT NOT NULL,
  due_date DATE NOT NULL,
  estimated_value DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create budgets table
CREATE TABLE public.budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_number TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  description TEXT NOT NULL,
  total_value DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL,
  valid_until DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create expenses table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  due_date DATE NOT NULL,
  status TEXT NOT NULL,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create financial_overview table
CREATE TABLE public.financial_overview (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period_date DATE NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  inflow DECIMAL(10,2) NOT NULL DEFAULT 0,
  outflow DECIMAL(10,2) NOT NULL DEFAULT 0,
  balance DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_overview ENABLE ROW LEVEL SECURITY;

-- Create public read policies (since this is a demo dashboard)
CREATE POLICY "Enable read access for all users" ON public.sales FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.products FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.service_orders FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.budgets FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.expenses FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.financial_overview FOR SELECT USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_sales_date ON public.sales(date);
CREATE INDEX idx_sales_seller ON public.sales(seller);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_service_orders_status ON public.service_orders(status);
CREATE INDEX idx_budgets_status ON public.budgets(status);
CREATE INDEX idx_expenses_due_date ON public.expenses(due_date);