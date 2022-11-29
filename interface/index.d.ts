/**
 * All interfaces which require in the project will be defined here
 */
export interface CustomError extends Error {
  status: number;
  err: string;
  message: string;
}
export interface UserSignup {
  phone_number: string;
  name: string;
  password: string;
}

export interface User {
  name: string;
  phone_number: string;
  password: string;
  birth_date: string;
  is_verified: Boolean;
  id_proof: string;
  phone_otp: {
    otp: any;
    expire_at: any;
  };
  createdAt: Date;
  updatedAt: Date;
  save: Function;
  gen_auth_token: Function;
}

/**
 * iteam interface
 */
export interface Item {
  name: string;
  category_id: string;
  SKU_id: [string];
  tax_category_id: string;
  cover_image: string;
  HSN_code_id: string;
  variant_id: [string];
  description: string;
  company_id: string;
  owner: string;
  is_active: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * item variant
 */
export interface ItemVariant {
  name: string;
  specification: string;
  image: [string];
  price: {
    amount: number;
    tax_includes: number;
    min_price: number;
  };
  stock: {
    total: string;
    unit_id: string;
    low_stock_limit: string;
  };
  warehouse_id: string;
  owner: string;
  expiry_range: string;
  is_active: Boolean;
}
