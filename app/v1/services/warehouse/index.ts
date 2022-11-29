const Warehouse = require("./model");
const constant = require("../../../../config/constants").response_msgs;
const logger = require("../../../../config/logger");
const Company = require("../company/model");
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const create_warehouse = async (data) => {
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
    let new_warehouse = await Warehouse.create(data);
    return {
      success: true,
      status: 200,
      message: constant.WAREHOUSE.CREATED,
      warehouse: new_warehouse,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const update_warehouse_details = async (update, user_id, warehouse_id) => {
  try {
    if (!ObjectId.isValid(warehouse_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let warehouse = await Warehouse.findOne({
      owner: user_id,
      _id: warehouse_id,
    });
    if (!warehouse) {
      return {
        success: false,
        status: 404,
        message: constant.WAREHOUSE.NOT_FOUND,
      };
    }
    await Warehouse.findOneAndUpdate(
      { _id: warehouse_id, owner: user_id },
      update,
      { new: true }
    );
    return {
      success: true,
      status: 200,
      message: constant.WAREHOUSE.UPDATE,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const list_warehouse = async (query) => {
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
    if (query.city) {
      params["address.city"] = new RegExp(`${query.city}`, "i");
    }
    if (query.state) {
      params["address.state"] = new RegExp(`${query.state}`, "i");
    }
    if (query.user_id) {
      params["owner"] = query.user_id;
    }
    if (query.is_active) {
      params["is_active"] = query.is_active;
    }

    const totalRecord = await Warehouse.countDocuments(params);
    const warehouse_data = await Warehouse.find(params)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    if (warehouse_data.length) {
      return {
        success: true,
        status: 200,
        message: constant.SUCCESS,
        totalRecord: totalRecord,
        data: warehouse_data,
        next_page: totalRecord > page * limit ? true : false,
      };
    } else {
      return {
        success: true,
        status: 200,
        totalRecord: totalRecord,
        message: constant.WAREHOUSE.NO_RECORD,
      };
    }
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const remove_warehouse = async (user_id, warehouse_id) => {
  try {
    if (!ObjectId.isValid(warehouse_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    const warehouse = await Warehouse.findOne({
      owner: user_id,
      _id: warehouse_id,
    });
    if (!warehouse) {
      return {
        success: false,
        status: 404,
        message: constant.WAREHOUSE.NOT_FOUND,
      };
    }
    await Warehouse.findOneAndRemove({ _id: warehouse_id });
    return {
      success: true,
      status: 200,
      message: constant.WAREHOUSE.DELETED,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

module.exports = {
  create_warehouse,
  update_warehouse_details,
  list_warehouse,
  remove_warehouse,
};
