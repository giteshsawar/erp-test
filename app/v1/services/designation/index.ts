const Designation = require("./model");
const constant = require("../../../../config/constants").response_msgs;
const logger = require("../../../../config/logger");
import { Designation } from "../../../../interface";
const Company = require("../company/model");
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const create_designation = async (data: Designation) => {
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
        message: constant.DESIGNATION.COMPANY_NOT_FOUND,
      };
    }
    let exist = await Designation.findOne({
      name: data.name,
      company_id: data.company_id,
    });
    if (exist) {
      return {
        success: false,
        status: 400,
        message: constant.DESIGNATION.EXIST,
      };
    }
    let new_designation = await Designation.create(data);
    return {
      success: true,
      status: 200,
      message: constant.DESIGNATION.SUCCESS,
      designation: new_designation,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const update_designation_detais = async (
  update: Designation,
  designation_id: string
) => {
  try {
    if (!ObjectId.isValid(designation_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let designation = await Designation.findOne({ _id: designation_id });
    if (!designation) {
      return {
        success: false,
        status: 404,
        message: constant.DESIGNATION.NOT_FOUND,
      };
    }
    await Designation.findOneAndUpdate({ _id: designation_id }, update, {
      new: true,
    });
    return {
      success: true,
      status: 200,
      message: constant.DESIGNATION.UPDATE,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const list_designation = async (query: any) => {
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
    if (query.is_active) {
      params["is_active"] = query.is_active;
    }
    if (query.level) {
      params["level"] = query.level;
    }
    const totalRecord = await Designation.countDocuments(params);
    const designation_data = await Designation.find(params)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    if (designation_data.length) {
      return {
        success: true,
        status: 200,
        message: constant.SUCCESS,
        totalRecord: totalRecord,
        data: designation_data,
        next_page: totalRecord > page * limit ? true : false,
      };
    } else {
      return {
        success: true,
        status: 200,
        totalRecord: totalRecord,
        message: constant.DESIGNATION.NOT_FOUND,
      };
    }
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const remove_designation = async (designation_id: string) => {
  try {
    if (!ObjectId.isValid(designation_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let exist = await Designation.findOne({ _id: designation_id });
    if (!exist) {
      return {
        success: false,
        status: 404,
        message: constant.DESIGNATION.NOT_FOUND,
      };
    }
    await Designation.findOneAndRemove({ _id: designation_id });
    return {
      success: true,
      status: 200,
      message: constant.DESIGNATION.DELETED,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};
module.exports = {
  create_designation,
  update_designation_detais,
  list_designation,
  remove_designation,
};
