const express = require("express");
const Guid = require("guid");
const settings = require("../settings").settings;
const posfix = require("../posfix/index");

exports.api = express.Router();

exports.api.post("/3d-payment", (req, res) => {
    if (
        !req.body ||
        !req.body.cardOwnerName ||
        !req.body.cardNumber ||
        !req.body.cardExpireMonth ||
        !req.body.cardExpireYear ||
        !req.body.cardCvc ||
        !req.body.amount
    )
        return res.json({
            error: "Eksik alanlar var !",
            code: 0,
        });

    const {
        cardOwnerName,
        cardNumber,
        cardExpireMonth,
        cardExpireYear,
        cardCvc,
        amount,
        installment,
    } = req.body;

    const obj = {
        orderId: Guid.raw(),
        cardOwnerName: cardOwnerName,
        cardNumber: cardNumber,
        cardExpireMonth: cardExpireMonth,
        cardExpireYear: cardExpireYear,
        cardCvc: cardCvc,
        amount: amount,
        installment: installment,
        userId: "",
        cardId: "",
        echo: "",
        purchaser: {
            birthDate: "1986-07-11",
            gsmNumber: "5881231212",
            tcCertificate: "1234567890",
            name: "Ahmet",
            surname: "Veli",
            email: "ahmet@veli.com",
            clientIp: "127.0.0.1",
            invoiceAddress: {
                name: "Ahmet",
                surname: "Veli",
                address: "Mevlüt Pehlivan Mah. PosFix Plaza Şişli",
                zipcode: "34782",
                city: "34",
                tcCertificate: "12345678901",
                country: "tr",
                taxNumber: "123456890",
                taxOffice: "Şişli",
                companyName: "PosFix",
                phoneNumber: "2123886600",
            },
            shippingAddress: {
                name: "Ahmet",
                surname: "Veli",
                address: "Mevlüt Pehlivan Mah. PosFix Plaza Şişli",
                zipcode: "34782",
                city: "34",
                country: "tr",
                phoneNumber: "2123886600",
            },
        },
        products: [
            {
                productName: "Telefon",
                productCode: "TLF0001",
                quantity: "1",
                price: "5000",
            },
            {
                productName: "Bilgisayar",
                productCode: "BIL0002",
                quantity: "1",
                price: "5000",
            },
        ],
        language: "tr-TR",
        successUrl: "https://api.posfix.com.tr/rest/payment/threed/test/result",
        failureUrl: "https://api.posfix.com.tr/rest/payment/threed/test/result",
    };

    res.render("3d-one-step-form", {
        form: posfix.ThreeDPaymentRequest(obj),
    });
});

exports.api.post("/preauth", (req, res) => {
    if (
        !req.body ||
        !req.body.cardOwnerName ||
        !req.body.cardNumber ||
        !req.body.cardExpireMonth ||
        !req.body.cardExpireYear ||
        !req.body.cardCvc ||
        !req.body.amount ||
        !req.body.installment
    )
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const {
        cardOwnerName,
        cardNumber,
        cardExpireMonth,
        cardExpireYear,
        cardCvc,
        amount,
        installment,
    } = req.body;

    const obj = {
        orderId: Guid.raw(),
        cardOwnerName: cardOwnerName,
        cardNumber: cardNumber,
        cardExpireMonth: cardExpireMonth,
        cardExpireYear: cardExpireYear,
        cardCvc: cardCvc,
        amount: amount,
        installment: installment,
        userId: "",
        cardId: "",
        echo: "",
        purchaser: {
            birthDate: "1986-07-11",
            gsmNumber: "5881231212",
            tcCertificate: "1234567890",
            name: "Ahmet",
            surname: "Veli",
            email: "ahmet@veli.com",
            clientIp: "123.58.7.4",
            invoiceAddress: {
                name: "Ahmet",
                surname: "Veli",
                address: "Mevlüt Pehlivan Mah. PosFix Plaza Şişli",
                zipcode: "34782",
                city: "34",
                tcCertificate: "12345678901",
                country: "tr",
                taxNumber: "123456890",
                taxOffice: "Şişli",
                companyName: "PosFix",
                phoneNumber: "2123886600",
            },
            shippingAddress: {
                name: "Ahmet",
                surname: "Veli",
                address: "Mevlüt Pehlivan Mah. PosFix Plaza Şişli",
                zipcode: "34782",
                city: "34",
                country: "tr",
                phoneNumber: "2123886600",
            },
        },
        products: [
            {
                productName: "Telefon",
                productCode: "TLF0001",
                quantity: "1",
                price: "5000",
            },
            {
                productName: "Bilgisayar",
                productCode: "BIL0002",
                quantity: "1",
                price: "5000",
            },
        ],
        threeD: "false",
    };

    posfix
        .PreAuthRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/non-3d-payment", (req, res) => {
    if (
        !req.body ||
        !req.body.cardOwnerName ||
        !req.body.cardNumber ||
        !req.body.cardExpireMonth ||
        !req.body.cardExpireYear ||
        !req.body.cardCvc ||
        !req.body.amount ||
        !req.body.installment
    )
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const {
        cardOwnerName,
        cardNumber,
        cardExpireMonth,
        cardExpireYear,
        cardCvc,
        amount,
        installment,
    } = req.body;

    const obj = {
        orderId: Guid.raw(),
        cardOwnerName: cardOwnerName,
        cardNumber: cardNumber,
        cardExpireMonth: cardExpireMonth,
        cardExpireYear: cardExpireYear,
        cardCvc: cardCvc,
        amount: amount,
        installment: installment,
        userId: "",
        cardId: "",
        echo: "",
        purchaser: {
            birthDate: "1986-07-11",
            gsmNumber: "5881231212",
            tcCertificate: "1234567890",
            name: "Ahmet",
            surname: "Veli",
            email: "ahmet@veli.com",
            clientIp: "123.58.7.4",
            invoiceAddress: {
                name: "Ahmet",
                surname: "Veli",
                address: "Mevlüt Pehlivan Mah. PosFix Plaza Şişli",
                zipcode: "34782",
                city: "34",
                tcCertificate: "12345678901",
                country: "tr",
                taxNumber: "123456890",
                taxOffice: "Şişli",
                companyName: "PosFix",
                phoneNumber: "2123886600",
            },
            shippingAddress: {
                name: "Ahmet",
                surname: "Veli",
                address: "Mevlüt Pehlivan Mah. PosFix Plaza Şişli",
                zipcode: "34782",
                city: "34",
                country: "tr",
                phoneNumber: "2123886600",
            },
        },
        products: [
            {
                productName: "Telefon",
                productCode: "TLF0001",
                quantity: "1",
                price: "5000",
            },
            {
                productName: "Bilgisayar",
                productCode: "BIL0002",
                quantity: "1",
                price: "5000",
            },
        ],
        threeD: "false",
    };

    posfix
        .NonThreeDPaymentRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/postauth", (req, res) => {
    if (!req.body || !req.body.orderId || !req.body.amount)
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        orderId: req.body.orderId,
        amount: req.body.amount
    };

    posfix
        .PaymentInquiryRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/payment-inquiry", (req, res) => {
    if (!req.body || !req.body.orderId)
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        orderId: req.body.orderId,
    };

    posfix
        .PaymentInquiryRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/payment-inquiry-with-time", (req, res) => {
    if (!req.body || !req.body.startDate || !req.body.endDate)
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };

    posfix
        .PaymentInquiryWithTimeRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/bin-inquiry", (req, res) => {
    if (
        !req.body ||
        !req.body.binNumber ||
        !req.body.amount ||
        !req.body.threeD
    )
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        binNumber: req.body.binNumber,
        amount: req.body.amount,
        threeD: req.body.threeD,
    };

    posfix
        .BinNumberInquiryRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/bin-inquiry-v4", (req, res) => {
    if (
        !req.body ||
        !req.body.binNumber ||
        !req.body.amount ||
        !req.body.threeD
    )
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        binNumber: req.body.binNumber,
        amount: req.body.amount,
        threeD: req.body.threeD,
    };

    posfix
        .BinNumberInquiryV4Request(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/add-cart-to-wallet", (req, res) => {
    if (
        !req.body ||
        !req.body.userId ||
        !req.body.cardOwnerName ||
        !req.body.cardNumber ||
        !req.body.cardAlias ||
        !req.body.cardExpireMonth ||
        !req.body.cardExpireYear
    )
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        userId: req.body.userId,
        cardOwnerName: req.body.cardOwnerName,
        cardNumber: req.body.cardNumber,
        cardAlias: req.body.cardAlias,
        cardExpireMonth: req.body.cardExpireMonth,
        cardExpireYear: req.body.cardExpireYear,
        clientIp: "127.0.0.1",
    };

    posfix
        .AddCardToWalletRequest(obj)
        .then((results) => {
            res.json(results);
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/card-inquiry", (req, res) => {
    if (!req.body || !req.body.userId)
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        userId: req.body.userId,
        cardId: req.body.cardId || "",
        clientIp: "127.0.0.1",
    };

    posfix
        .BankCardInquiryRequest(obj)
        .then((results) => {
            res.json(results);
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/card-delete", (req, res) => {
    if (!req.body || !req.body.userId)
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        userId: req.body.userId,
        cardId: req.body.cardId || "",
        clientIp: "127.0.0.1",
    };

    posfix
        .BankCardDeleteRequest(obj)
        .then((results) => {
            res.json(results);
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/payment-with-wallet", (req, res) => {
    if (
        !req.body ||
        !req.body.userId ||
        !req.body.cardId ||
        !req.body.installment
    )
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        echo: "",
        amount: "100",
        cardId: req.body.cardId,
        userId: req.body.userId,
        publicKey: settings.publicKey,
        orderId: Guid.raw(),
        mode: settings.mode,
        threeD: "false",
        cardOwnerName: "",
        cardNumber: "",
        cardExpireMonth: "",
        cardExpireYear: "",
        cardCvc: "",
        installment: req.body.installment,
        purchaser: {
            birthDate: "1986-07-11",
            gsmNumber: "5881231212",
            tcCertificate: "1234567890",
            name: "Ahmet",
            surname: "Veli",
            email: "ahmet@veli.com",
            clientIp: "127.0.0.1",
            invoiceAddress: {
                name: "Ahmet",
                surname: "Veli",
                address: "Mevlüt Pehlivan Mah. PosFix Plaza Şişli",
                zipcode: "34782",
                city: "34",
                tcCertificate: "12345678901",
                country: "tr",
                taxNumber: "123456890",
                taxOffice: "Şişli",
                companyName: "PosFix",
                phoneNumber: "2123886600",
            },
            shippingAddress: {
                name: "Ahmet",
                surname: "Veli",
                address: "Mevlüt Pehlivan Mah. PosFix Plaza Şişli",
                zipcode: "34782",
                city: "34",
                country: "tr",
                phoneNumber: "2123886600",
            },
        },
        products: [
            {
                productName: "Telefon",
                productCode: "TLF0001",
                quantity: "1",
                price: "5000",
            },
            {
                productName: "Bilgisayar",
                productCode: "BIL0002",
                quantity: "1",
                price: "5000",
            },
        ],
    };

    posfix
        .NonThreeDPaymentWithWalletRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/payment-link-create", (req, res) => {
    if (
        !req.body ||
        !req.body.name ||
        !req.body.surname ||
        !req.body.email ||
        !req.body.gsm ||
        !req.body.amount ||
        !req.body.threeD ||
        !req.body.expireDate
    )
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        gsm: req.body.gsm,
        amount: req.body.amount,
        threeD: req.body.threeD,
        tcCertificate: req.body.tcCertificate,
        taxNumber: req.body.taxNumber,
        commissionType: req.body.commissionType,
        sendEmail: req.body.sendEmail,
        expireDate: req.body.expireDate,
        clientIp: "127.0.0.1",
    };

    posfix
        .PaymentLinkCreateRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/payment-link-delete", (req, res) => {
    if (!req.body || !req.body.linkId)
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        linkId: req.body.linkId,
        clientIp: "127.0.0.1",
    };

    posfix
        .PaymentLinkDeleteRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/payment-refund", (req, res) => {
    if (
        !req.body ||
        !req.body.orderId ||
        !req.body.refundHash ||
        !req.body.amount
    )
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        orderId: req.body.orderId,
        refundHash: req.body.refundHash,
        amount: req.body.amount,
        clientIp: "127.0.0.1",
    };

    posfix
        .PaymentRefundRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/payment-refund-inquiry", (req, res) => {
    if (!req.body || !req.body.orderId || !req.body.amount)
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        orderId: req.body.orderId,
        amount: req.body.amount,
        clientIp: "127.0.0.1",
    };

    posfix
        .PaymentRefundInquiryRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/payment-link-inquiry", (req, res) => {
    if (!req.body || !req.body.pageSize || !req.body.pageIndex)
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    const obj = {
        email: req.body.email,
        gsm: req.body.gsm,
        linkId: req.body.linkId,
        linkState: req.body.linkState,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        pageSize: req.body.pageSize,
        pageIndex: req.body.pageIndex,
        clientIp: "127.0.0.1",
    };

    posfix
        .PaymentLinkInquiryRequest(obj)
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

exports.api.post("/checkout-form-create", (req, res) => {
    if (!req.body)
        return res.json({
            error: "Gerekli alanlar boş!",
        });

    posfix
        .CheckoutFormCreateRequest()
        .then((results) => {
            res.json({
                data: results,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
