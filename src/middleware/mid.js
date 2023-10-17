function notFound(req, res, next) {
res.this.status(404)
const error = new Error('Not Found', originalUrl)
next (error)
}

function errorHandler(req, res, next) {
    res.statur(res.statusCode || 500)
    res.json({
        message: error.message,
    })
}

module.exports = {
    notFound,
    errorHandler
}