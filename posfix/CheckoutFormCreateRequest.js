const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");
const crypto = require("crypto");

function CheckoutFormCreateRequest(obj) {
    return new Promise((resolve, reject) => {
        const purchaserAddress = {
            name : "Ahmet",
            surname : "Veli",
            address : "Mevlüt Pehlivan Mah. PosFix Plaza Şişli",
            zipcode : "34782",
            city : "34",
            country : "TR",
            tcCertificate : "1234567890",
            taxNumber : "9999999999",
            taxOffice : "Kozyatağı",
            companyName : "PosFix",
            phoneNumber : "2122222222"
        }

        const shippingAddress = {
            name : "Ahmet",
            surname : "Veli",
            address : "Mevlüt Pehlivan Mah. PosFix Plaza Şişli",
            zipcode : "34782",
            city : "34",
            country : "TR",
            phoneNumber : "2122222222"
        }

        const products = [
            {
                price : "5000",
                productCode : "TLF0001",
                productName : "Telefon",
                quantity : "1"
            },
            {
                price : "5000",
                productCode : "TLF0001",
                productName : "Telefon",
                quantity : "1"
            }
        ]

        const purchaser = {
            name: "Ahmet",
            surname: "Veli",
            email : "ahmet@veli.com",
            birthDate : Date.now(), 
            gsmNumber : "5400343434",
            clientIp : "192.168.0.54",
            tcCertificate : "99999999999",
            shippingAddress: shippingAddress,
        };

        const data = JSON.stringify({
            orderId: crypto.randomUUID(),
            amount: 10000,
            callbackUrl: "https://apitest.posfix.com.tr/rest/payment/threed/test/result",
            threed: false,
            allowedInstallments: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            mode: settings.mode,
            purchaser: purchaser,
            purchaserAddress: purchaserAddress,
            shippingAddress: shippingAddress,
            echo: "Echo",
            version: "1.0",
            transactionDate: Date.now(),
            vendorId: "",
            products: products,
            
        });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey +
                settings.mode +
                purchaser.name + 
                purchaser.surname +
                purchaser.email + 
                transactionDate
        );
        axios({
            url: settings.baseURL + "/rest/checkoutForm/create",
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

module.exports = CheckoutFormCreateRequest;
