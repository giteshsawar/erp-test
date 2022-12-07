const Client = require("./model");
const constant = require("../../../../config/constants").response_msgs;
const logger = require("../../../../config/logger");
import { Client } from "../../../../interface";
import mongoose from "mongoose";
import Company, { update } from "../company/model";
import { query } from "winston";
import { Module } from "module";
const ObjectId = mongoose.Types.ObjectId;

const add_client = async (data: Client) => {
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
        message: constant.CLIENT.COMPANY_NOT_FOUND,
      };
    }
    let exist_phone = await Client.findOne({
      phone: data.phone,
      company_id: data.company_id,
    });
    if (exist_phone) {
      return {
        success: false,
        status: 400,
        message: constant.CLIENT.EXIST_PHONE,
      };
    }
    let exist_email = await Client.findOne({
      email: data.email,
      company_id: data.company_id,
    });
    if (exist_email) {
      return {
        success: false,
        status: 400,
        message: constant.CLIENT.EXIST_EMAIL,
      };
    }
    let new_client = await Client.create(data);
    return {
      success: true,
      status: 200,
      message: constant.CLIENT.SUCCESS,
      client: new_client,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const update_client_details = async (update: Client, client_id: string) => {
  try {
    if (!ObjectId.isValid(client_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let client = await Client.findOne({ _id: client_id });
    if (!client) {
      return {
        success: false,
        status: 404,
        message: constant.CLIENT.NOT_FOUND,
      };
    }
    await Client.findOneAndUpdate({ _id: client_id }, update, { new: true });
    return {
      success: true,
      status: 200,
      message: constant.CLIENT.SUCCESS,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const list_client = async (query: any) => {
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
    if (query.phone) {
      params["phone"] = query.phone;
    }
    if (query.email) {
      params["email"] = query.email;
    }

    const totalRecord = await Client.countDocuments(params);
    const client_data = await Client.find(params)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    if (client_data.length) {
      return {
        success: true,
        status: 200,
        message: constant.SUCCESS,
        totalRecord: totalRecord,
        data: client_data,
        next_page: totalRecord > page * limit ? true : false,
      };
    } else {
      return {
        success: true,
        status: 200,
        totalRecord: totalRecord,
        message: constant.CLIENT.NO_RECORD,
      };
    }
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const remove_client = async (client_id: string) => {
  try {
    if (!ObjectId.isValid(client_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    const client = await Client.findOne({
      _id: client_id,
    });
    if (!client) {
      return {
        success: false,
        status: 404,
        message: constant.CLIENT.NOT_FOUND,
      };
    }
    await Client.findOneAndRemove({ _id: client_id });
    return {
      success: true,
      status: 200,
      message: constant.CLIENT.DELETED,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

module.exports = {
  add_client,
  update_client_details,
  list_client,
  remove_client,
};
