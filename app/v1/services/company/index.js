const logger = require("../../../../config/logger");
const Company = require("./model");
const constant = require("../../../../config/constants").response_msgs;
const ObjectId = require("mongoose").Types.ObjectId;

const create_company = async (data) => {
  try {
    console.log(data);
    let new_company = await Company.create(data);
    return {
      success: true,
      status: 200,
      message: constant.COMPANY.CREATED,
      company: new_company,
    };
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

const update_company = async (update, user_id, company_id) => {
  try {
    if (!ObjectId.isValid(company_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let company = await Company.findOne({ owner: user_id, _id: company_id });
    if (!company) {
      return {
        success: false,
        status: 404,
        message: constant.COMPANY.NOT_FOUND,
      };
    }
    await Company.findOneAndUpdate(
      { _id: company_id, owner: user_id },
      update,
      { new: true }
    );
    return {
      success: true,
      status: 200,
      message: constant.COMPANY.UPDATE,
    };
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

const list_company = async (query) => {
  try {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sortOrder ? parseInt(sortOrder) : -1;

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
    if (query.phone_number) {
      params["phone_number"] = query.phone_number;
    }
    if (query.email) {
      params["email"] = new RegExp(`${query.email}`, "i");
    }
    if (query.city) {
      params["address"]["city"] = new RegExp(`${query.city}`, "i");
    }
    if (query.state) {
      params["address"]["state"] = new RegExp(`${query.state}`, "i");
    }
    if (query.user_id) {
      params["owner"] = query.user_id;
    }
    if (query.is_active) {
      params["is_active"] = query.is_active;
    }

    const totalRecord = await Company.countDocuments(params);
    const company_data = await Company.find(params)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);
    if (company_data.length) {
      return {
        success: true,
        status: 200,
        totalRecord: totalRecord,
        data: company_data,
        next_page: totalRecord > page * limit ? true : false,
      };
    } else {
      return {
        success: true,
        status: 200,
        totalRecord: totalRecord,
        message: constant.COMPANY.NO_RECORD,
      };
    }
  } catch (error) {
    logger.error(error.toString());
    throw error;
  }
};

module.exports = {
  create_company,
  update_company,
  list_company,
};

// module.exports = {
//   create_company: (data) => create_company(data),
// };
