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

/**
 * item category
 */
export interface ItemCategory {
  type: string;
  name: string;
  specification: string;
  description: string;
  units: string;
  company_id: string;
  owner: string;
  is_active: Boolean;
}

/**
 * employee role
 */
export interface EmployeeRole {
  name: string;
  is_active: Boolean;
  priveleges: {
    inventory: {
      view: Boolean;
      create: Boolean;
      delete: Boolean;
    };
    orders: {
      view: Boolean;
      create: Boolean;
      delete: Boolean;
    };
    employees: {
      view: Boolean;
      create: Boolean;
      delete: Boolean;
    };
    clients: {
      view: Boolean;
      create: Boolean;
      delete: Boolean;
    };
    invoice: {
      view: Boolean;
      create: Boolean;
      delete: Boolean;
    };
  };
  company_id: string;
}

/**
 * client
 */
export interface Client {
  type: string;
  name: string;
  phone: string;
  email: string;
  address: {
    billing_address: {
      address: string;
      zip_code: string;
      state: string;
      city: string;
    };
    shipping_address: {
      address: string;
      zip_code: string;
      state: string;
      city: string;
    };
  };
  max_balance: string;
  number_of_sale: string;
  number_of_purchase: string;
  contacts: [
    {
      name: string;
      phone: string;
      email: string;
    }
  ];
  company_id: string;
  is_active: Boolean;
}

/**
 * designation
 */
export interface Designation {
  name: string;
  level: string;
  company_id: string;
  is_active: Boolean;
}
