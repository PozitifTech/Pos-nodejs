document.getElementById("preauth").addEventListener("click", function (e) {
    var cardOwnerName = document.getElementsByName("cardOwnerName")[0].value;
    var cardNumber = document.getElementsByName("cardNumber")[0].value;
    var cardExpireMonth =
        document.getElementsByName("cardExpireMonth")[0].value;
    var cardExpireYear = document.getElementsByName("cardExpireYear")[0].value;
    var cardCvc = document.getElementsByName("cardCvc")[0].value;
    var amount = document.getElementsByName("amount")[0].value;
    var installment = document.getElementsByName("installment")[0].value;

    if (
        !cardOwnerName ||
        !cardNumber ||
        !cardExpireMonth ||
        !cardExpireYear ||
        !cardCvc ||
        !amount
    )
        return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/preauth", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Ön Otorizasyon";
        target.disabled = false;
        var data = JSON.parse(ajax.response);
        if (data.error) return alert(data.error);
        document.getElementById("result").innerHTML = JSON.stringify(
            data.data,
            null,
            4
        );
    };
    ajax.send(
        JSON.stringify({
            cardOwnerName,
            cardNumber,
            cardExpireMonth,
            cardExpireYear,
            cardCvc,
            amount,
            installment,
        })
    );
});
