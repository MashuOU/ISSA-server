function errorHandler(err, req, res, next) {
    let statusCode = 500,
        msg = "Internal Server Error"
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            statusCode = 400;
            msg = err.errors[0].message
            break;

        case "loginError":
            statusCode = 400;
            msg = "Invalid Username or Password";
            break;

        case "loginFormEmpty":
            statusCode = 400;
            msg = "Username or Password is Required";
            break;

        case "notFound":
            statusCode = 404;
            msg = "Data Not Found";
            break;

        case "unAuthentication":
        case "JsonWebTokenError":
            statusCode = 401;
            msg = "Invalid Token";
            break;

        case "unauthorized":
            statusCode = 403;
            msg = "Unauthorized";
            break;

        case "lesson error":
            statusCode = 400;
            msg = "lesson name is required";
            break;
        case "absentError":
            statusCode = 400;
            msg = "student attendance is already assigned";
            break;
    }
    console.log(err);
    return res.status(statusCode).json({ msg });
};

module.exports = { errorHandler }