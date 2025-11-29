const loggerMiddleware = (req, res, next) => {
    
    res.on('finish', () => {
        const duration = Date.now() - req.startTime;
        const userAgent = req.headers['user-agent'] || 'Unknown';
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms - ${userAgent}`);
    });
    next();
}

export default loggerMiddleware;