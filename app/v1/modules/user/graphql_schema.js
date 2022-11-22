const { buildSchema } = require("graphql");
module.exports = buildSchema(`
#all schema type

    #for comman responce 
    type commanResponce {
        success:Boolean!
        status:Int!
        message:String!
    }
  #all users types.
    #user model
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

    #user details.
    type userDetails {
        success:Boolean!
        status:Int!
        message:String!
        user:User
    }

    #user authentication
    type userAuth {
        auth_token:String!
        user_id:String!
        success:Boolean
        status: Int
        message:String
        user:User
    }

    #address model for all
    type Address {
        address:String!
        zip_code:String!
        state:String!
        city:String!
    }

    #company model
    type Company {
        _id: ID!
        name: String!
        gst_no:String!
        phone_number: String!
        email:String!
        address:Address!
        is_warehouse_address:Boolean
        locatioin:String
        owner:String
        industry_type:String
        is_active:Boolean
        createdAt:String
        updatedAt:String
    }

    #company common responce
    type CompanyCommonResponce {
        success:Boolean!
        status:Int!
        message:String!
        company:Company
    }

#all inpute type

    #signup user inputs.
    input UserInput {
        name: String!
        password: String!
        phone_number: String!
    }

    #user profile update inputs.
    input updateUserInput {
        name:String
        birth_date:String
        id_proof:String
    }

    #comman address inputs.
    input commanAddress {
        address:String!
        zip_code:String!
        state:String!
        city:String!
    }

    #create company inputs.
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

    #company update inputes.
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
    
#All querys.
    type RootQuery {
        #description: user local login
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

        #description: user get details
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

    }

#All Mutations

    type RootMutation {
        #description: user local signup
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

        #description: user verify phone number
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

        #description: user reset forgot password.
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

        #description: user update profile.
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

        #description: Create company.
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

        #description: update company.
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
    }

    schema {
        query: RootQuery,
        mutation:RootMutation
    } 
`);
