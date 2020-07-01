module.exports = {
    error: {

        // Agency
        AGENCY_NOT_FOUND: 'Agency not found',
        AGENCYID_NOT_FOUND: 'Agency Id can\'t be empty',
        AGENCY_EMAIL_NOT_FOUND: 'Agency with this email not found!',
        AGENCY_ALREADY_EXIST: 'Agency already exist',


        // Object
        OBJECT_NOT_FOUND: 'Object not found',
        OBJECT_NAME_ALREADY_EXIST: 'Object already exist',
        OBJECT_INVALID_IDENTIFIER: 'Please provide valid device indentifier(objectId)',
        OBJECT_IS_DELETED:'Object is deleted',
        OBJECT_ALREADY_PAIRED:'Object is paired, please un-pair and try again',
        OBJECT_ALREADY_UNPAIRED:'Object is not associated with any device(not paired)',


        // Client
        CLIENT_NOT_FOUND: 'Client not found',
        CLIENT_INVALID_IDENTIFIER: 'Please provide valid client indentifier(clientId)',
        CLIENT_IS_DELETED:'Client is deleted',
        CLIENT_IS_DEACTIVE:'Client is de-activated',
        CLIENT_LIST_INVALID_ID:'Client list contains an invalid Id',
        CLIENT_INVALID_LIST: 'Invalid access list',
        CLIENT_EMPTY_LIST: 'Empty access list',
        CLIENT_DUPLICATE_IN_LIST: 'Redundant client id\'s found in list',
        CLIENT_UPDATE_DATA_NEEDED:'No update data provided',


        // SUBSCRIPTION
        SUBSCRIPTION_KEY_NOT_FOUND:'Subscription key seems to be missing',
        SUBSCRIPTION_KEY_NOT_INVALID:'Invalid Subscription Key',

       

        // COMMON
        EMAIL_ALREADY_EXIST: 'Email already exist, Please login!',
        PASSWORD_NOT_FOUND: 'password can\'t be empty',
        EMAIL_NOT_FOUND: 'Email can\'t be empty',
        INVALID_EMAIL_FOUND: 'Email is invalid',
        EMAIL_NOT_AVAILABLE: 'This email is taken',
        EMAIL_IS_AVAILABLE: 'This email is available',
        DUPLICATE_EMAIL_FOUND: 'User already exists with this Email',
        GENDER_NOT_FOUND: 'Gender can\'t be empty',
        PASSWORD_NOT_FOUND: 'Password can\'t be empty',
        CONFIRM_PASSWORD_NOT_FOUND: 'Confirm password can\'t be empty',
        WRONG_PASSWORD: 'The entered password is wrong',
        CONFIRM_PASSWORD_AND_PASSWORD_MISMATCH: 'Enter the same password',
        NAME_NOT_FOUND: 'Name can\'t be empty',
        MOBILE_NOT_FOUND: 'Mobile number can\'t be empty',
        ADDRESS_NOT_FOUND: `Address can't be empty`,
        VERIFY_EMAIL: `Please verify your email, before login!`,
        URL_NOT_FOUND: 'URL can\'t be empty',
        EMAIL_ALREADY_VERIFIED: `Email is already verified!`,
        REQ_QUERY_EMPTY: `Request query is missing!`,
        REQ_BODY_EMPTY: `Request body is missing!`,
        PASSWORD_LENGTH_ERROR: 'Password must be atleast 8 character long!',
        INVALID_COLLECTION: 'Invalid collection name!',
        BadRequest: {
            status: 400,
            code: "BadRequest",
            message: "The request body contains bad syntax or is incomplete."
        },
        ValidationError: {
            status: 400,
            code: "ValidationError",
            message: "Validation error(s) present. See embedded errors list for more details. (See below)"
        },
        InvalidCredentials: {
            status: 401,
            code: "InvalidCredentials",
            message: "Missing or invalid Authorization header"
        },
        InvalidAccessToken: {
            status: 401,
            code: "InvalidAccessToken",
            message: "Invalid access token"
        },
        ExpiredAccessToken: {
            status: 401,
            code: "ExpiredAccessToken",
            message: "Generate a new access token using your client credentials"
        },
        InvalidAccountStatus: {
            status: 401,
            code: "InvalidAccountStatus",
            message: "Invalid access token account status."
        },
        InvalidApplicationStatus: {
            status: 401,
            code: "InvalidApplicationStatus",
            message: "Invalid application status"
        },
        InvalidScopes: {
            status: 401,
            code: "InvalidScopes",
            message: "Missing or invalid scopes for requested endpoint."
        },
        ServerError: {
            status: 500,
            code: "ServerError",
            message: "The request timed out"
        }
    },
    success: {

        // AGENCY
        AGENCY_DELETED_SUCCESS:'Agency is deleted successfully',
        AGENCY_UPDATED_SUCCESS:'Agency data is updated successfully',

        // CLIENT
        CLIENT_DETAILS_UPDATED:'Client data is updated successfully',
        
    }
}