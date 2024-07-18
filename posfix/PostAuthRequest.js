const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function PostAuthRequest(obj) {
    return new Promise((resolve, reject) => {
        if (!obj.orderId)
            return reject({
                error: "OrderId bulunamadı !",
            });
        else if(!obj.amount)
            return reject({
                error: "Amount bulunamadı !",
            });

            const data = JSON.stringify({
                orderId: obj.orderId,
                amount: obj.amount,
                clientIp: "127.0.0.1"
            });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey + obj.orderId + obj.amount + settings.mode + data.clientIp +  transactionDate
        );
        axios({
            url: settings.baseURL + "/rest/payment/postauth",
            method: "POST",
            headers: {
                transactionDate,
                version: settings.version,
                token,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(data),
            },
            data: data,
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = PostAuthRequest;
