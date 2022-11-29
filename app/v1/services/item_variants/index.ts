/*
    @author:Kishan
*/

const ItemVariant = require("./model");
const constant = require("../../../../config/constants").response_msgs;
const logger = require("../../../../config/logger");
const Warehouse = require("../warehouse/model");
import { ItemVariant } from "../../../../interface";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const create_variant = async (data: ItemVariant) => {
  try {
    if (!ObjectId.isValid(data.warehouse_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let warehouse = await Warehouse.findOne({ _id: data.warehouse_id });
    if (!warehouse) {
      return {
        success: false,
        status: 404,
        message: constant.ITEAM_VARIANT.WAREHOUSE_NOT_FOUND,
      };
    }
    let new_variant = await ItemVariant.create(data);

    return {
      success: true,
      status: 200,
      message: constant.ITEAM_VARIANT.CREATED,
      variant: new_variant,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const update_variant_details = async (update, user_id, variant_id) => {
  try {
    if (!ObjectId.isValid(variant_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let variant = await ItemVariant.findOne({
      owner: user_id,
      _id: variant_id,
    });
    if (!variant) {
      return {
        success: false,
        status: 404,
        message: constant.ITEAM_VARIANT.NOT_FOUND,
      };
    }
    await ItemVariant.findOneAndUpdate(
      { _id: variant_id, owner: user_id },
      update,
      { new: true }
    );
    return {
      success: true,
      status: 200,
      message: constant.ITEAM_VARIANT.UPDATE,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const list_variant = async (query) => {
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

    const totalRecord = await ItemVariant.countDocuments(params);
    const variant_data = await ItemVariant.find(params)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    if (variant_data.length) {
      return {
        success: true,
        status: 200,
        message: constant.SUCCESS,
        totalRecord: totalRecord,
        data: variant_data,
        next_page: totalRecord > page * limit ? true : false,
      };
    } else {
      return {
        success: true,
        status: 200,
        totalRecord: totalRecord,
        message: constant.ITEAM_VARIANT.NO_RECORD,
      };
    }
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const remove_variant = async (user_id, variant_id) => {
  try {
    if (!ObjectId.isValid(variant_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    const warehouse = await ItemVariant.findOne({
      owner: user_id,
      _id: variant_id,
    });
    if (!warehouse) {
      return {
        success: false,
        status: 404,
        message: constant.ITEAM_VARIANT.NOT_FOUND,
      };
    }
    await ItemVariant.findOneAndRemove({ _id: variant_id });
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

module.exports = {
  create_variant,
  update_variant_details,
  list_variant,
  remove_variant,
};
