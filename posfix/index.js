const NonThreeDPaymentRequest = require("./NonThreeDPaymentRequest");
const PreAuthRequest = require("./PreAuthRequest");
const ThreeDPaymentRequest = require("./ThreeDPaymentRequest");
const PaymentInquiryRequest = require("./PaymentInquiryRequest");
const PaymentInquiryWithTimeRequest = require("./PaymentInquiryWithTimeRequest");
const BinNumberInquiryRequest = require("./BinNumberInquiryRequest");
const BinNumberInquiryV4Request = require("./BinNumberInquiryV4Request");
const AddCardToWalletRequest = require("./AddCardToWalletRequest");
const BankCardInquiryRequest = require("./BankCardInquiryRequest");
const BankCardDeleteRequest = require("./BankCardDeleteRequest");
const NonThreeDPaymentWithWalletRequest = require("./NonThreeDPaymentWithWalletRequest");
const PaymentLinkCreateRequest = require("./PaymentLinkCreateRequest");
const PaymentLinkDeleteRequest = require("./PaymentLinkDeleteRequest");
const PaymentLinkInquiryRequest = require("./PaymentLinkInquiryRequest");
const PaymentRefundRequest = require("./PaymentRefundRequest");
const PaymentRefundInquiryRequest = require("./PaymentRefundInquiryRequest");

module.exports = {
    NonThreeDPaymentRequest: NonThreeDPaymentRequest,
    PreAuthRequest: PreAuthRequest,
    ThreeDPaymentRequest: ThreeDPaymentRequest,
    PaymentInquiryRequest: PaymentInquiryRequest,
    PaymentInquiryWithTimeRequest: PaymentInquiryWithTimeRequest,
    BinNumberInquiryRequest: BinNumberInquiryRequest,
    BinNumberInquiryV4Request: BinNumberInquiryV4Request,
    AddCardToWalletRequest: AddCardToWalletRequest,
    BankCardInquiryRequest: BankCardInquiryRequest,
    BankCardDeleteRequest: BankCardDeleteRequest,
    NonThreeDPaymentWithWalletRequest: NonThreeDPaymentWithWalletRequest,
    PaymentLinkCreateRequest: PaymentLinkCreateRequest,
    PaymentLinkInquiryRequest: PaymentLinkInquiryRequest,
    PaymentLinkDeleteRequest: PaymentLinkDeleteRequest,
    PaymentRefundRequest: PaymentRefundRequest,
    PaymentRefundInquiryRequest: PaymentRefundInquiryRequest,
};
