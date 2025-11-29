const errorMiddleware = (err, req, res, next) => { 
    console.log("Error middleware called");
    console.error('stack:', err.stack);
    let status = err.status || 500;
    
    if( err.name === 'ValidationError') {
        status = 400;
        message = " error from validation";
    }

    res.status(300).json({
        message: err.message || 'Internal Server Error',
        status: status
    });
}

export default errorMiddleware;