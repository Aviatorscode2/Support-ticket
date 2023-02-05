const errorHanddler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({ 
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack  // Only show the stack trace if we are in development mode
    });
 } // This is the error handler middleware

 module.exports = { errorHanddler };