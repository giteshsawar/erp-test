const Item = require("./model");
const constant = require("../../../../config/constants").response_msgs;
const logger = require("../../../../config/logger");
const ItemCategory = require("../item_category/model");
import { Item } from "../../../../interface";
import mongoose, { Query } from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const add_item = async (data: Item) => {
  try {
    if (!ObjectId.isValid(data.category_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let category = await ItemCategory.findOne({ _id: data.category_id });
    if (!category) {
      return {
        success: false,
        status: 404,
        message: constant.ITEAM.ITEAM_CATEGORY,
      };
    }
    data.company_id = category.company_id;
    let new_item = await Item.create(data);

    return {
      success: true,
      status: 200,
      message: constant.ITEAM.CREATED,
      variant: new_item,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const update_iteam_details = async (
  update: Item,
  user_id: string,
  iteam_id: string
) => {
  try {
    if (!ObjectId.isValid(iteam_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let iteam = await Item.findOne({
      owner: user_id,
      _id: iteam_id,
    });
    if (!iteam) {
      return {
        success: false,
        status: 404,
        message: constant.ITEAM_VARIANT.NOT_FOUND,
      };
    }
    await Item.findOneAndUpdate({ _id: iteam_id, owner: user_id }, update, {
      new: true,
    });
    return {
      success: true,
      status: 200,
      message: constant.ITEAM.UPDATE,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const list_item = async (query: any) => {
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
    if (query.warehouse_id) {
      if (!ObjectId.isValid(query.warehouse_id)) {
        return {
          success: false,
          status: 400,
          message: constant.INVALID_OBJECTID,
        };
      }
      params["warehouse_id"] = query.warehouse_id;
    }
    if (query.user_id) {
      params["owner"] = query.user_id;
    }
    if (query.is_active) {
      params["is_active"] = query.is_active;
    }
    if (query.stock) {
      params["stock.total"] = query.stock;
    }

    const totalRecord = await Item.countDocuments(params);
    const item_data = await Item.find(params)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    if (item_data.length) {
      return {
        success: true,
        status: 200,
        message: constant.SUCCESS,
        totalRecord: totalRecord,
        data: item_data,
        next_page: totalRecord > page * limit ? true : false,
      };
    } else {
      return {
        success: true,
        status: 200,
        totalRecord: totalRecord,
        message: constant.ITEAM.NO_RECORD,
      };
    }
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const remove_item = async (user_id: string, iteam_id: string) => {
  try {
    if (!ObjectId.isValid(iteam_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    const warehouse = await Item.findOne({
      owner: user_id,
      _id: iteam_id,
    });
    if (!warehouse) {
      return {
        success: false,
        status: 404,
        message: constant.ITEAM.NOT_FOUND,
      };
    }
    await Item.findOneAndRemove({ _id: iteam_id });
    return {
      success: true,
      status: 200,
      message: constant.ITEAM_VARIANT.DELETED,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

export = {
  add_item,
  update_iteam_details,
  list_item,
  remove_item,
};
