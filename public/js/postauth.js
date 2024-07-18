document.getElementById("postauth").addEventListener("click", function (e) {
    var orderId = document.getElementsByName("orderId")[0].value;
    var amount = document.getElementsByName("amount")[0].value;

    if (
        !orderId || !amount
    )
        return alert("Eksik alanlar var !");

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/postauth", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Ön Otorizasyon Kapat";
        target.disabled = false;
        var data = JSON.parse(ajax.response);
        if (data.error) return alert(data.error);
        console.log("Data:",data)
        const xml_data = vkbeautify.xml(data.data);
        document.getElementById("result").innerText = xml_data;
    };
    ajax.send(
        JSON.stringify({
            orderId,
            amount,
        })
    );
});
