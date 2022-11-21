const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        phone_number: String!
        password:String
        birth_date: String
        id_proof: String
        is_verified: Boolean
        success:Boolean
        status: Int
        message:String
        auth_token:String
    }

    input UserInput {
        name: String!
        password: String!
        phone_number: String!
        birth_date: String
        id_proof: String
    }

    input VerifyOtp {
        phone_number: String!
        otp: String!
    }

    type Company {
        _id: ID!
        name: String!
        gst_no:String!
        phone_number: String!
        email:String!
        address:String!
        zip_code:String!
        state:String!
        city:String!
        is_warehouse_address:Boolean
        locatioin:String
        industry_type:String
        is_active:Boolean
    }

    input companyInput {
        name: String!
        gst_no:String!
        phone_number: String!
        email:String!
        address:String!
        zip_code:String!
        state:String!
        city:String!
        is_warehouse_address:Boolean
    }


    type RootQuery {
        user_details: User
        company:Company
        user_login(phone_number:String!,password:String!):User
    }

    type RootMutation {
        user_signup(userInput:UserInput):User
        verify_otp(userInput:VerifyOtp): User
        
        create_company(companyInput:companyInput):Company
    }

    schema {
        query: RootQuery,
        mutation:RootMutation
    } 
`);
