/*
    @author:Kishan
*/

const ItemCategory = require("./model");
const constant = require("../../../../config/constants").response_msgs;
const logger = require("../../../../config/logger");
const Company = require("../company/model");
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const create_category = async (data) => {
  try {
    if (!ObjectId.isValid(data.company_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let company = await Company.findOne({ _id: data.company_id });
    if (!company) {
      return {
        success: false,
        status: 404,
        message: constant.WAREHOUSE.COMPANY_NOT_FOUND,
      };
    }
    let new_category = await ItemCategory.create(data);

    return {
      success: true,
      status: 200,
      message: constant.ITEAM_CATEGORY.CREATED,
      warehouse: new_category,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const update_category_details = async (update, user_id, category_id) => {
  try {
    if (!ObjectId.isValid(category_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let warehouse = await ItemCategory.findOne({
      owner: user_id,
      _id: category_id,
    });
    if (!warehouse) {
      return {
        success: false,
        status: 404,
        message: constant.WAREHOUSE.NOT_FOUND,
      };
    }
    await ItemCategory.findOneAndUpdate(
      { _id: category_id, owner: user_id },
      update,
      { new: true }
    );
    return {
      success: true,
      status: 200,
      message: constant.ITEAM_CATEGORY.UPDATE,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const list_category = async (query) => {
  try {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sortOrder ? parseInt(query.sortOrder) : -1;

    const sortOptions = {
      [sortBy]: sortOrder,
    };

    let params = Object.create(null);

    if (query._id) {
      if (!ObjectId.isValid(query._id)) {
        return {
          success: false,
          status: 400,
          message: constant.INVALID_OBJECTID,
        };
      }
      params["_id"] = query._id;
    }
    if (query.name) {
      params["name"] = new RegExp(`${query.name}`, "i");
    }
    if (query.company_id) {
      if (!ObjectId.isValid(query.company_id)) {
        return {
          success: false,
          status: 400,
          message: constant.INVALID_OBJECTID,
        };
      }
      params["company_id"] = query.company_id;
    }
    if (query.user_id) {
      params["owner"] = query.user_id;
    }
    if (query.is_active) {
      params["is_active"] = query.is_active;
    }
    if (query.type) {
      params["type"] = query.type;
    }

    const totalRecord = await ItemCategory.countDocuments(params);
    const category_data = await ItemCategory.find(params)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    if (category_data.length) {
      return {
        success: true,
        status: 200,
        message: constant.SUCCESS,
        totalRecord: totalRecord,
        data: category_data,
        next_page: totalRecord > page * limit ? true : false,
      };
    } else {
      return {
        success: true,
        status: 200,
        totalRecord: totalRecord,
        message: constant.ITEAM_CATEGORY.NO_RECORD,
      };
    }
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const remove_category = async (user_id, category_id) => {
  try {
    if (!ObjectId.isValid(category_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    const warehouse = await ItemCategory.findOne({
      owner: user_id,
      _id: category_id,
    });
    if (!warehouse) {
      return {
        success: false,
        status: 404,
        message: constant.ITEAM_CATEGORY.NOT_FOUND,
      };
    }
    await ItemCategory.findOneAndRemove({ _id: category_id });
    return {
      success: true,
      status: 200,
      message: constant.ITEAM_CATEGORY.DELETED,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

module.exports = {
  create_category,
  update_category_details,
  list_category,
  remove_category,
};
