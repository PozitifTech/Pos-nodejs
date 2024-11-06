const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function PreAuthRequest(obj) {
    return new Promise((resolve, reject) => {
        if (!obj) {
            return resolve({
                error: "Ön Otorizasyon Sonuçları Bulunamadı !",
            });
        } 

        if (
            !obj.cardOwnerName ||
            !obj.cardNumber ||
            !obj.cardExpireMonth ||
            !obj.cardExpireYear ||
            !obj.installment || 
            !obj.amount ||
            !obj.cardCvc
        )
            return reject({
                error: "Eksik alanlar var !",
            });


        const data = JSON.stringify({
            orderId: obj.orderId,
            threeD: obj.threeD,
            amount: obj.amount,
            cardOwnerName: obj.cardOwnerName,
            cardNumber: obj.cardNumber,
            cardExpireMonth: obj.cardExpireMonth,
            cardExpireYear: obj.cardExpireYear,
            installment: obj.installment,
            cardCvc: obj.cardCvc,
            products: obj.products,
            purchaser: obj.purchaser,
            startDate: obj.startDate,
            endDate: obj.endDate,
            mode: settings.mode,
            echo: "",
        });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey +
                obj.orderId +
                obj.amount +
                settings.mode +
                obj.cardOwnerName +
                obj.cardNumber +
                obj.cardExpireMonth +
                obj.cardExpireYear +
                obj.cardCvc +
                obj.userId +
                obj.cardId +
                obj.purchaser.name +
                obj.purchaser.surname +
                obj.purchaser.email +
                transactionDate
        );
        axios({
            url: settings.baseURL + "/rest/payment/preauth",
            method: "POST",
            headers: {
                transactionDate,
                version: settings.version,
                token,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(data),
            },
            data,
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = PreAuthRequest;
