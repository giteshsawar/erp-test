import { Request } from "express";
import logger from "../../../../config/logger";
const { auth } = require("./auth/authentication");
const {
  user_signup,
  verify_otp,
  user_login,
  resend_otp,
  login_otp,
  reset_forgot_password,
  update_user,
} = require("../../services/user");
const {
  create_company,
  update_company,
  list_company,
  remove_company,
} = require("../../services/company");
const {
  create_warehouse,
  update_warehouse_details,
  list_warehouse,
  remove_warehouse,
} = require("../../services/warehouse");
const {
  create_variant,
  update_variant_details,
  list_variant,
  remove_variant,
} = require("../../services/item_variants");
const {
  create_category,
  update_category_details,
  list_category,
  remove_category,
} = require("../../services/item_category");
const {
  add_item,
  update_iteam_details,
  list_item,
  remove_item,
} = require("../../services/item");
const User = require("../../services/user/model");
const constant = require("../../../../config/constants").response_msgs;
let controller = Object.create(null);
/* 
All user auth related controllers
*/
controller.user_signup = async (data, req, context, res) => {
  try {
    const result = await user_signup(data.userInput);
    return result; //res.status(result.status).json(result);
  } catch (error: any) {
    logger.error("Error while signup user");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while signing up user`);
  }
};

controller.verify_otp = async ({ phone_number, otp }) => {
  try {
    const result = await verify_otp(phone_number, otp);
    return result;
  } catch (error: any) {
    logger.error("Error while verify_otp");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while verifying user otp`);
  }
};

controller.resend_otp = async ({ phone_number }) => {
  try {
    const result = await resend_otp(phone_number);
    return result;
  } catch (error: any) {
    logger.error("Error while resend_otp");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while resend_otp`);
  }
};

controller.user_login = async ({ phone_number, password }) => {
  try {
    const result = await user_login(phone_number, password);
    return result;
  } catch (error: any) {
    logger.error("Error while user_login");
    logger.error(error.message);
    throw new Error(`${error.toString()},while loging user`);
  }
};

controller.login_otp = async ({ phone_number }) => {
  try {
    const result = await login_otp(phone_number);
    return result;
  } catch (error: any) {
    logger.error("Error while login_otp");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while login_otp`);
  }
};

controller.user_details = async ({ hello }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: constant.USER_NOT_FOUND,
      };
    }
    return {
      success: true,
      status: 200,
      message: "success",
      user: user,
    };
  } catch (error: any) {
    logger.error("Error while user_details");
    logger.error(error.message);
    throw new Error(`${error.toString()},while user_details`);
  }
};

controller.reset_forgot_password = async ({
  phone_number,
  otp,
  new_password,
}) => {
  try {
    const result = await reset_forgot_password(phone_number, new_password, otp);
    return result;
  } catch (error: any) {
    logger.error("Error while reset_forgot_password");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while user reset_forgot_password`);
  }
};

controller.update_user = async (updateUserInput, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let update = updateUserInput.updateUserInput;
    let user_id = req.user._id;
    const result = await update_user(update, user_id);
    return result;
  } catch (error: any) {
    logger.error("Error while update_user");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while update_user`);
  }
};

/*
  company controllers
*/
controller.create_company = async (companyInput, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let data = companyInput.companyInput;
    data.owner = req.user._id;
    const result = await create_company(data);
    return result;
  } catch (error: any) {
    logger.error("Error while create_company");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while create_company`);
  }
};

controller.update_company = async ({ companyUpdateInput, company_id }, req) => {
  try {
    console.log(req.is_authorized);
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let user_id = req.user._id;
    let result = await update_company(companyUpdateInput, user_id, company_id);
    return result;
  } catch (error: any) {
    logger.error("Error while update_company");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while update_company`);
  }
};

controller.list_company = async ({ companyQuery }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    companyQuery.user_id = req.user._id;
    const result = await list_company(companyQuery);
    return result;
  } catch (error: any) {
    logger.error("Error while list_company");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while list_company`);
  }
};

controller.remove_company = async ({ company_id }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let user_id = req.user._id;
    const result = await remove_company(user_id, company_id);
    return result;
  } catch (error: any) {
    logger.error("Error while remove_company");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while remove_company`);
  }
};

/* 
 warehouse controllers.
*/
controller.create_warehouse = async ({ warehouseInput }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    warehouseInput.owner = req.user._id;
    const result = await create_warehouse(warehouseInput);
    return result;
  } catch (error: any) {
    logger.error("Error while create_warehouse");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while create_warehouse`);
  }
};

controller.update_warehouse_details = async (
  { warehouseUpdateInput, warehouse_id },
  req
) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let user_id = req.user._id;
    const result = await update_warehouse_details(
      warehouseUpdateInput,
      user_id,
      warehouse_id
    );
    return result;
  } catch (error: any) {
    logger.error("Error while update_warehouse_details");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while update_warehouse_details`);
  }
};

controller.list_warehouse = async ({ warehouseQuery }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    warehouseQuery.owner = req.user._id;
    const result = await list_warehouse(warehouseQuery);
    return result;
  } catch (error: any) {
    logger.error("Error while list_warehouse");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while list_warehouse`);
  }
};

controller.remove_warehouse = async ({ warehouse_id }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let user_id = req.user._id;
    const result = await remove_warehouse(user_id, warehouse_id);
    return result;
  } catch (error: any) {
    logger.error("Error while remove_warehouse");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while remove_warehouse`);
  }
};

/**
 * iteam variant controllers
 */
controller.create_variant = async ({ variantInput }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    variantInput.owner = req.user._id;
    const result = await create_variant(variantInput);
    return result;
  } catch (error: any) {
    logger.error("Error while create_variant");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while create_variant`);
  }
};

controller.update_variant_details = async (
  { variantUpdateInput, variant_id },
  req
) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    const result = await update_variant_details(
      variantUpdateInput,
      req.user._id,
      variant_id
    );
    return result;
  } catch (error: any) {
    logger.error("Error while update_variant_details");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while update_variant_details`);
  }
};

controller.list_variant = async ({ variantQuery }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    variantQuery.owner = req.user._id;
    const result = await list_variant(variantQuery);
    return result;
  } catch (error: any) {
    logger.error("Error while create_variant");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while create_variant`);
  }
};

controller.remove_variant = async ({ variant_id }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let user_id = req.user._id;
    const result = await remove_variant(user_id, variant_id);
    return result;
  } catch (error: any) {
    logger.error("Error while remove_variant");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while remove_variant`);
  }
};

/**
 * Item category controllers.
 */
controller.create_category = async ({ categoryInput }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    categoryInput.owner = req.user._id;
    const result = await create_category(categoryInput);
    return result;
  } catch (error: any) {
    logger.error("Error while create_category");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while create_category`);
  }
};

controller.update_category_details = async (
  { categoryUpdateInput, category_id },
  req
) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let user_id = req.user._id;
    const result = await update_category_details(
      categoryUpdateInput,
      user_id,
      category_id
    );
    return result;
  } catch (error: any) {
    logger.error("Error while update_category_details");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while update_category_details`);
  }
};

controller.list_category = async ({ categoryQuery }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    categoryQuery.user_id = req.user._id;
    const result = await list_category(categoryQuery);
    return result;
  } catch (error: any) {
    logger.error("Error while list_category");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while list_category`);
  }
};

controller.remove_category = async ({ category_id }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let user_id = req.user._id;
    const result = await remove_category(user_id, category_id);
    return result;
  } catch (error: any) {
    logger.error("Error while remove_category");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while remove_category`);
  }
};

/**
 * item controller
 */
controller.add_item = async ({ itemInput }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    itemInput.owner = req.user._id;
    const result = await add_item(itemInput);
    return result;
  } catch (error: any) {
    logger.error("Error while add_item");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while add_item`);
  }
};

controller.update_iteam_details = async ({ itemUpdateInput, item_id }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let user_id = req.user._id;
    const result = await update_iteam_details(
      itemUpdateInput,
      user_id,
      item_id
    );
    return result;
  } catch (error: any) {
    logger.error("Error while update_iteam_details");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while update_iteam_details`);
  }
};

controller.list_item = async ({ itemQuery }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    itemQuery.user_id = req.user._id;
    const result = await list_item(itemQuery);
    return result;
  } catch (error: any) {
    logger.error("Error while list_item");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while list_item`);
  }
};

controller.remove_item = async ({ item_id }, req) => {
  try {
    if (!req.is_authorized) {
      return {
        success: false,
        status: 401,
        message: constant.INVALID_TOKEN,
      };
    }
    let user_id = req.user._id;
    const result = await remove_item(user_id, item_id);
    return result;
  } catch (error: any) {
    logger.error("Error while remove_item");
    logger.error(error.toString());
    throw new Error(`${error.toString()},while remove_item`);
  }
};
module.exports = controller;
