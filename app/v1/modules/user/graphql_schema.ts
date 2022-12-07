const { buildSchema } = require("graphql");
module.exports = buildSchema(`
#/******* all schema type *******/

  # /******** for comman responce  ******/
    type commanResponce {
        success:Boolean!
        status:Int!
        message:String!
        error:String
    }

  # /******** all users types ******/
    #/**** user model *****/
    type User {
        _id: ID!
        name: String
        phone_number: String
        birth_date: String
        id_proof: String
        is_verified: Boolean
        createdAt:String
        updatedAt:String
    }

    #/***** user details. *****/
    type userDetails {
        success:Boolean!
        status:Int!
        message:String!
        user:User
    }

    #/*******user authentication******/
    type userAuth {
        auth_token:String!
        user_id:String!
        success:Boolean
        status: Int
        message:String
        user:User
    }

    #/********address model for all******/
    type Address {
        address:String!
        zip_code:String!
        state:String!
        city:String!
    }

  #/*******all company types*******/.
    #/******company model*******/
    type Company {
        _id: ID
        name: String
        gst_no:String
        phone_number: String
        email:String
        address:Address
        is_warehouse_address:Boolean
        locatioin:String
        owner:String
        industry_type:String
        is_active:Boolean
        createdAt:String
        updatedAt:String
    }

    #/*******company common responce********/
    type CompanyCommonResponce {
        success:Boolean!
        status:Int!
        message:String!
        company:Company
    }

    #/*******company list*******/
    type ListCompany {
        success:String!
        status:Int!
        totalRecord:Int!
        message:String
        data: [Company!]
        next_page:Boolean
    }

  #/******all warehouse types********/
    #/******warehouse model******/
    type Warehouse {
        _id:String
        name:String
        address:Address
        location:String
        company_id:String
        owner:String
        is_active:Boolean
        createdAt:String
        updatedAt:String
    }

    #/*****warehouse comman responce******/
    type warehouseCommanResponce {
        success:Boolean!
        status:String!
        message:String!
        warehouse:Warehouse
    }

    #/******warehouse list*******/
    type ListWarehouse {
        success:String!
        status:Int!
        totalRecord:Int!
        message:String
        data: [Warehouse!]
        next_page:Boolean
    }

  #/******item category types*******/
    #/*****category model******/
    type Category {
        type:String
        name:String
        specification:String
        description:String
        units:String
        company_id:String
        is_active:Boolean
        createdAt:String
        updatedAt:String
    }

    #/******comman category responce******/
    type categoryCommanResponce {
        message:String!
        status:Int!
        success:Boolean!
        category: Category
    }

    #/*******list category*******/
    type ListCategory {
        message:String
        status:Int!
        success:Boolean!
        data: [Category!]
        totalRecord:Int!
        next_page:Boolean
    }

  #/*****iteam varient types ******/
    #/**** price object type*****/
    type Price {
        amount:Int!
        tax_includes:Int!
        min_price:Int!
    }

    #/*****stock object type ****/
    type Stock {
        total:String
        unit_id:String
        low_stock_limit:String
    }

    #/****iteam varient model *******/
    type Varient {
        name:String
        specification:String
        image:[String!]
        price:Price
        stock:Stock
        warehouse_id:String
        expiry_range:String
        is_active:String
        createdAt:String
        updatedAt:String
    }

    #/*****comman responce of variant ******/
    type varientCommanResponce {
        status:Int!
        success:Boolean!
        message:String!
        variant:Varient
    }

    #/*******list variant*******/
    type ListVariant {
        message:String
        status:Int!
        success:Boolean!
        data: [Varient!]
        totalRecord:Int!
        next_page:Boolean
    }

#/************all inpute type***********/

  #/******all user inputs*******/
    #/*****signup user inputs.******/
    input UserInput {
        name: String!
        password: String!
        phone_number: String!
    }

    #/******user profile update inputs.******/
    input updateUserInput {
        name:String
        birth_date:String
        id_proof:String
    }

    #/******comman address inputs.*******/
    input commanAddress {
        address:String!
        zip_code:String!
        state:String!
        city:String!
    }

  #/******all company inputs.*******/
    #/********create company inputs.******/
    input companyInput {
        name: String!
        gst_no:String!
        phone_number: String!
        email:String!
        address:commanAddress!
        is_warehouse_address:Boolean
        location:String
        industry_type:String
        is_active:Boolean
    }

    #/*******company update inputs.*********/
    input companyUpdateInput {
        name: String
        gst_no:String
        phone_number: String
        email:String
        address:commanAddress
        is_warehouse_address:Boolean
        location:String
        industry_type:String
        is_active:Boolean
    }

    #/******copmany list query.*******/
    input companyQuery {
        name:String
        _id:String
        phone_number:String
        email:String
        city:String
        state:String
        is_active:Boolean
        industry_type:String
        page:String
        limit:String
        sortBy:String
    }

  #/******all ware house inputs********/
    #/*****create warehouse inputs******/
    input warehouseInput {
        name:String!
        address:commanAddress!
        location:String
        company_id:String!
    }

    #/*****update warehouse inputs******/
    input warehouseUpdateInput {
        name:String
        address:commanAddress
        locatioin:String
        is_active:Boolean
    }
    
    #/*******warehouse list query********/
    input warehouseQuery {
        _id:String
        name:String
        company_id:String
        city:String
        state:String
        is_active:String
        page:String
        limit:String
        sortBy:String
        sortOrder:String
    }

   #/*****category inputs******/
    #/******create category input******/
    input categoryInput {
        name: String!
        type:String
        specification:String
        description:String
        units:String
        company_id:String! 
    }

    #/******category update inputs*******/
    input categoryUpdateInput {
        name: String
        type:String
        specification:String
        description:String
        units:String
        company_id:String
        is_active:Boolean
    }

    #/********category quer input *******/
    input categoryQuery {
        _id:String
        name:String
        company_id:String
        is_active:String
        type:String
        page:String
        limit:String
        sortBy:String
        sortOrder:String
    }

  #/*****iteam variant ******/
    #/*****price input *****/
    input price {
        amount:Int
        tax_includes:Int
        min_price:Int
    }

    #/***** stock input *****/
    input stock {
        total:String
        unit_id:String
        low_stock_limit:String
    }

    #/***** create variant ****/
    input variantInput {
        name:String!
        specification:String
        image:[String]
        price:price
        stock:stock
        warehouse_id:String
        expiry_range:String
    }

    #/***** update varient *****/
    input variantUpdateInput {
        name:String
        specification:String
        image:[String]
        price:price
        stock:stock
        warehouse_id:String
        expiry_range:String
        is_active:Boolean
    }

    #/**** variant query inputs *****/
    input variantQuery {
        _id:String
        name:String
        warehouse_id:String
        is_active:String
        stock:String
        page:String
        limit:String
        sortBy:String
        sortOrder:String
    }
    
#/**************All querys.************/
    type RootQuery {
        #/*******description: user local login *******/
            #parameters:
                #name: phone_number
                    #description: user's phone number.
                    #in: body
                    #required: true
                    #type: string
                #name: password
                    #description: user's password.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success, auth_token: (jwt token), user: user object
        user_login(phone_number:String!,password:String!):userAuth

        #/******description: user get details*******/
            #parameters:
                #name: x-auth-token
                    #description: user's auth token.
                    #in: header
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success, user: (user details)
        user_details(hello:String):userDetails

        #description:Resend verification otp.
            #parameters:
                #name: phone_number
                    #description: user's phone number.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: otp sent,
        resend_otp(phone_number:String!):commanResponce

        #description:login with otp.
            #parameters:
                #name: phone_number
                    #description: user's phone number.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: otp sent,
        login_otp(phone_number:String!):commanResponce

        #description:List of user's company.
            #parameters:
                #name: name
                    #description: comapny's name.
                    #in: body
                    #required: false
                    #type: string
                #name: phone_number
                    #description: company's phone number.
                    #in: body
                    #required: false
                    #type: string
                #name: email
                    #description: company's email.
                    #in: body
                    #required: false
                    #type: string
                #name: city
                    #description: company's  city.
                    #in: body
                    #required: false
                    #type: string
                #name: state
                    #description: company's  state.
                    #in: body
                    #required: false
                    #type: string
                #name: industry_type
                    #description: company type.
                    #in: body
                    #required: false
                    #type: string
                #name: _id
                    #description: company's id.
                    #in: body
                    #required: false
                    #type: string
                #name: is_active
                    #description: company's active status.
                    #in: body
                    #required: false
                    #type: booolean
            #responce:
                #success:true, status:200, totalRecord:numberOfRecord, data: company list,next_page:true/false
        list_company(companyQuery:companyQuery):ListCompany

        #/******description:remove company.*******/
            #parameters:
                #name: company_id
                    #description: user's company id.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success,
        remove_company(company_id:String!):commanResponce

        #/******description:List of company's warehouse.
            #parameters:
                #name: name
                    #description: warehouse's name.
                    #in: body
                    #required: false
                    #type: string
                #name: city
                    #description: warehouse's  city.
                    #in: body
                    #required: false
                    #type: string
                #name: state
                    #description: warehouse's  state.
                    #in: body
                    #required: false
                    #type: string
                #name: company_id
                    #description: company's id.
                    #in: body
                    #required: false
                    #type: string
                #name: is_active
                    #description: warehouse's active status.
                    #in: body
                    #required: false
                    #type: boolean
                #name:_id
                    #description: warehouse's id.
                    #in: body
                    #required: false
                    #type: string
            #responce:
                #success:true, status:200, totalRecord:numberOfRecord, data: warehouse list,next_page:true/false
        list_warehouse(warehouseQuery:warehouseQuery):ListWarehouse

        #/******description:remove warehouse.*******/
            #parameters:
                #name: warehouse_id
                    #description: company's warehouse id.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success,
        remove_warehouse(warehouse_id:String!):commanResponce

        #/******description:List of company's category.
            #parameters:
                #name: name
                    #description: category's name.
                    #in: body
                    #required: false
                    #type: string
                #name: company_id
                    #description: company's id.
                    #in: body
                    #required: false
                    #type: string
                #name: is_active
                    #description: category's active status.
                    #in: body
                    #required: false
                    #type: boolean
                #name:_id
                    #description: category's id.
                    #in: body
                    #required: false
                    #type: string
                #name:type
                    #description: category's type.
                    #in: body
                    #required: false
                    #type: string
            #responce:
                #success:true, status:200, totalRecord:numberOfRecord, data: category list,next_page:true/false
        list_category(categoryQuery:categoryQuery):ListCategory

        #/******description:remove category.*******/
            #parameters:
                #name: category_id
                    #description: company's category id.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success,
        remove_category(category_id:String!):commanResponce

        #/******description:List of company's variant.
            #parameters:
                #name: name
                    #description: variant's name.
                    #in: body
                    #required: false
                    #type: string
                #name: warehouse_id
                    #description: warehouse_id's id.
                    #in: body
                    #required: false
                    #type: string
                #name: is_active
                    #description: category's active status.
                    #in: body
                    #required: false
                    #type: boolean
                #name:stock
                    #description: stock.
                    #in: body
                    #required: false
                    #type: string
            #responce:
                #success:true, status:200, totalRecord:numberOfRecord, data: category list,next_page:true/false
        list_variant(variantQuery:variantQuery):ListVariant

        #/******description:remove variant.*******/
            #parameters:
                #name: variant_id
                    #description: company's variant id.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success,
        remove_variant(variant_id:String!):commanResponce
    }

#All Mutations

    type RootMutation {
        #/*******description: user local signup*********/
            #parameters:
              #userInput:
                #name: phone_number
                    #description: user's phone number.
                    #in: body
                    #required: true
                    #type: string
                #name: password
                    #description: user's password.
                    #in: body
                    #required: true
                    #type: string
                #name: name
                    #description: user's name.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success,verify phone number
        user_signup(userInput:UserInput):commanResponce

        #/********description: user verify phone number*******/
            #parameters:
                #name: phone_number
                    #description: user's phone number.
                    #in: body
                    #required: true
                    #type: string
                #name: otp
                    #description: otp user recived at sign up.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success, auth_token: (jwt token), user: user object
        verify_otp(phone_number:String!, otp:String!): userAuth

        #/********description: user reset forgot password.*********/
            #parameters:
                #name: phone_number
                    #description: user's phone number.
                    #in: body
                    #required: true
                    #type: string
                #name: otp
                    #description: otp user recived at sign up.
                    #in: body
                    #required: true
                    #type: string
                #name: new_password
                    #description: New password of user.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success
        reset_forgot_password(phone_number:String!,otp:String!,new_password:String!):commanResponce

        #/*******description: user update profile.********/
            #parameters:
                #name: name
                    #description: user's name.
                    #in: body
                    #required: true
                    #type: string
                #name: birth_date
                    #description: user's date of birth.
                    #in: body
                    #required: true
                    #type: string
                #name: id_proof
                    #description: user's id proof.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success
        update_user(updateUserInput:updateUserInput):commanResponce

        #/*********description: Create company.*********/
            #parameters:
                #name: name
                    #description: comapny's name.
                    #in: body
                    #required: true
                    #type: string
                #name: gst_no
                    #description: comapny's gst number .
                    #in: body
                    #required: true
                    #type: string
                #name: phone_number
                    #description: company's phone number.
                    #in: body
                    #required: true
                    #type: string
                #name: email
                    #description: company's email.
                    #in: body
                    #required: true
                    #type: string
                #name: address
                    #description: company's full address.
                    #in: body
                    #required: true
                    #type: object
                #name: is_warehouse_address
                    #description: is company address is same as ware house address.
                    #in: body
                    #required: false
                    #type: boolean
                #name: locatioin
                    #description: company location deatils on map.
                    #in: body
                    #required: false
                    #type: string
                #name: industry_type
                    #description: company type.
                    #in: body
                    #required: false
                    #type: string
            #responce:
                #success:true, status:200, message: success, company: company object
        create_company(companyInput:companyInput):CompanyCommonResponce

        #/*******description: update company.******/
            #parameters:
                #name: name
                    #description: comapny's name.
                    #in: body
                    #required: false
                    #type: string
                #name: gst_no
                    #description: comapny's gst number .
                    #in: body
                    #required: false
                    #type: string
                #name: phone_number
                    #description: company's phone number.
                    #in: body
                    #required: false
                    #type: string
                #name: email
                    #description: company's email.
                    #in: body
                    #required: false
                    #type: string
                #name: address
                    #description: company's full address.
                    #in: body
                    #required: false
                    #type: object
                #name: is_warehouse_address
                    #description: is company address is same as ware house address.
                    #in: body
                    #required: false
                    #type: boolean
                #name: locatioin
                    #description: company location deatils on map.
                    #in: body
                    #required: false
                    #type: string
                #name: industry_type
                    #description: company type.
                    #in: body
                    #required: false
                    #type: string
            #responce:
                #success:true, status:200, message: success,
        update_company(companyUpdateInput:companyUpdateInput,company_id:String!):CompanyCommonResponce

        #/*******description: create warehouse.********/
            #parameters:
                #name: name
                    #description: warehouse's name.
                    #in: body
                    #required: true
                    #type: string
                #name: address
                    #description: warehouse's full address.
                    #in: body
                    #required: true
                    #type: object
                #name: locatioin
                    #description: warehouse location deatils on map.
                    #in: body
                    #required: false
                    #type: string
                #name: company_id
                    #description: company's id to add.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success, warehouse:warehouse object
        create_warehouse(warehouseInput:warehouseInput):warehouseCommanResponce
        
        #/*******description: update warehouse details.********/
            #parameters:
                #name: name
                    #description: warehouse's name.
                    #in: body
                    #required: false
                    #type: string
                #name: address
                    #description: warehouse's full address.
                    #in: body
                    #required: false
                    #type: object
                #name: locatioin
                    #description: warehouse location deatils on map.
                    #in: body
                    #required: false
                    #type: string
                #name:is_active
                    #description: set warehouse active true or false.
                    #in: body
                    #required: false
                    #type: boolean
            #responce:
                #success:true, status:200, message: success, warehouse:warehouse object
        update_warehouse_details(warehouseUpdateInput:warehouseUpdateInput,warehouse_id:String!):warehouseCommanResponce

        #/*******description: create category.********/
            #parameters:
                #name: name
                    #description: category's name.
                    #in: body
                    #required: true
                    #type: string
                #name: type
                    #description: category's type.
                    #in: body
                    #required: false
                    #type: string
                #name: specification
                    #description: category specification.
                    #in: body
                    #required: false
                    #type: string
                #name: description
                    #description: category's description.
                    #in: body
                    #required: false
                    #type: string
                #name: units
                    #description: units.
                    #in: body
                    #required: false
                    #type: string
                #name:company_id
                    #description: company id of category.
                    #in: body
                    #required: true
                    #type: string
            #responce:
                #success:true, status:200, message: success, category:category object
        create_category(categoryInput:categoryInput):categoryCommanResponce

        #/*******description: update category details.********/
            #parameters:
                #name: name
                    #description: category's name.
                    #in: body
                    #required: false
                    #type: string
                #name: type
                    #description: category's type.
                    #in: body
                    #required: false
                    #type: string
                #name: specification
                    #description: category specification.
                    #in: body
                    #required: false
                    #type: string
                #name: description
                    #description: category's description.
                    #in: body
                    #required: false
                    #type: string
                #name: units
                    #description: units.
                    #in: body
                    #required: false
                    #type: string
                #name:company_id
                    #description: company id of category.
                    #in: body
                    #required: false
                    #type: string
                #name:is_active
                    #description: set active satatus.
                    #in: body
                    #required: false
                    #type: boolean
            #responce:
                #success:true, status:200, message: success, category:category object
        update_category_details(categoryUpdateInput:categoryUpdateInput,category_id:String!):commanResponce

        #/*******description: create variant.********/
            #parameters:
                #name: name
                    #description: variant's name.
                    #in: body
                    #required: true
                    #type: string
                #name: specification
                    #description: variant specification.
                    #in: body
                    #required: false
                    #type: string
                #name: price
                    #description: amount,tax_includes and min_price.
                    #in: body
                    #required: false
                    #type: int
                #name:warehouse_id
                    #description: warehouse id.
                    #in: body
                    #required: false
                    #type: string
                #name:stock
                    #description: total,unit_id and low_stock_limit.
                    #in: body
                    #required: false
                    #type: string
                #name:expiry_range
                    #description: expiry_range of iteam.
                    #in: body
                    #required: false
                    #type: string
            #responce:
                #success:true, status:200, message: success, variant:category object
        create_variant(variantInput:variantInput):varientCommanResponce

        #/*******description: update variant details.********/
            #parameters:
                #name: name
                    #description: variant's name.
                    #in: body
                    #required: false
                    #type: string
                #name: specification
                    #description: variant specification.
                    #in: body
                    #required: false
                    #type: string
                #name: price
                    #description: amount,tax_includes and min_price.
                    #in: body
                    #required: false
                    #type: int
                #name:warehouse_id
                    #description: warehouse id.
                    #in: body
                    #required: false
                    #type: string
                #name:stock
                    #description: total,unit_id and low_stock_limit.
                    #in: body
                    #required: false
                    #type: string
                #name:expiry_range
                    #description: expiry_range of iteam.
                    #in: body
                    #required: false
                    #type: string
                #name:is_active
                    #description: set active status.
                    #in: body
                    #required: false
                    #type: boolean
            #responce:
                #success:true, status:200, message: success
        update_variant_details(variantUpdateInput:variantUpdateInput,variant_id:String!):commanResponce
    }


    schema {
        query: RootQuery
        mutation:RootMutation
    } 
`);
