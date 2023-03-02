function errorHandler(err, req, res, next) {
    let statusCode = 500,
        message = "Internal Server Error"
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            statusCode = 400;
            message = err.errors[0].message
            break;

        case "loginError":
            statusCode = 400;
            message = "Invalid Username or Password";
            break;

        case "loginFormEmpty":
            statusCode = 400;
            message = "Username or Password is Required";
            break;

        case "notFound":
            statusCode = 404;
            message = "Data Not Found";
            break;

        case "unAuthentication":
        case "JsonWebTokenError":
            statusCode = 403;
            message = "Invalid Token";
            break;
            
        case "unauthorized":
            statusCode = 401;
            message = "Unauthorized";
            break;
    }
    console.log(err);
    return res.status(statusCode).json({ message });
};

module.exports = { errorHandler }