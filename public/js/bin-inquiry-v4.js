document.getElementById("pay").addEventListener("click", function (e) {
    var binNumber = document.getElementsByName("binNumber")[0].value;
    var amount = document.getElementsByName("amount")[0].value;
    var threeD = document.getElementsByName("threeD")[0].value;
    if (!binNumber || !amount || !threeD) return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/bin-inquiry-v4", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Sorgula";
        target.disabled = false;
        var data = JSON.parse(ajax.response);
        if (data.error) return alert(data.error);
        document.getElementById("result").innerHTML = JSON.stringify(
            data,
            null,
            4
        );
    };
    ajax.send(
        JSON.stringify({
            binNumber,
            amount,
            threeD,
        })
    );
});
