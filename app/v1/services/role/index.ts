const Role = require("./model");
const constant = require("../../../../config/constants").response_msgs;
const logger = require("../../../../config/logger");
import { EmployeeRole } from "../../../../interface";
const Company = require("../company/model");
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const create_role = async (data: EmployeeRole) => {
  try {
    let exist = await Role.findOne({
      name: data.name,
      company_id: data.company_id,
    });
    if (exist) {
      return {
        success: false,
        status: 400,
        message: constant.ROLE.EXIST,
      };
    }
    let company = await Company.findOne({ _id: data.company_id });
    if (!company) {
      return {
        success: false,
        status: 404,
        message: constant.ROLE.COMPANY_NOT_FOUND,
      };
    }
    let new_role = await Role.create(data);
    return {
      success: true,
      status: 200,
      message: constant.ROLE.SUCCESS,
      role: new_role,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const update_role = async (update: EmployeeRole, role_id: string) => {
  try {
    if (!ObjectId.isValid(role_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let role = await Role.findOne({ _id: role_id });
    if (!role) {
      return {
        success: false,
        status: 404,
        mesage: constant.ROLE.NOT_FOUND,
      };
    }
    await Role.findOneAndUpdate({ _id: role_id }, update, { new: true });
    return {
      success: true,
      status: 200,
      message: constant.ROLE.UPDATE,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const list_roles = async (query: any) => {
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
    const totalRecord = await Role.countDocuments(params);
    const role_data = await Role.find(params)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    if (role_data.length) {
      return {
        success: true,
        status: 200,
        message: constant.SUCCESS,
        totalRecord: totalRecord,
        data: role_data,
        next_page: totalRecord > page * limit ? true : false,
      };
    } else {
      return {
        success: true,
        status: 200,
        totalRecord: totalRecord,
        message: constant.ROLE.NO_RECORD,
      };
    }
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const remove_role = async (role_id: string) => {
  try {
    if (!ObjectId.isValid(role_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let exist = await Role.findOne({ _id: role_id });
    if (!exist) {
      return {
        success: false,
        status: 404,
        message: constant.ROLE.NOT_FOUND,
      };
    }
    await Role.findOneAndRemove({ _id: role_id });
    return {
      success: true,
      status: 200,
      message: constant.ROLE.DELETED,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

module.exports = {
  create_role,
  update_role,
  list_roles,
  remove_role,
};
