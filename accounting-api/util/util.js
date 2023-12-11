import crypto from 'crypto';

module.exports = {
    md5: function(pwd) {
        let md5 = crypto.createHash('md5');
        return md5.update(pwd).digest('hex');
    },
    // respond client
    responseClient(res, httpCode = 500, status = 3, message = 'service error', data = {}) {
        let responseData = {};
        responseData.status = status;
        responseData.message = message;
        responseData.data = data;
        res.status(httpCode).json(responseData);
    },
};
