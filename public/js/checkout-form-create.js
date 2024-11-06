document.getElementById("check").addEventListener("click", function (e) {

    var target = e.currentTarget;

    target.innerHTML = "Lütfen bekleyiniz...";
    target.disabled = true;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/api/checkout-form-create", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.onload = function () {
        target.innerHTML = "Checkout Formu Oluştur";
        target.disabled = false;
        var data = JSON.parse(ajax.response);
        if (data.error) return alert(data.error);
        data.data.script = data.data.script.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")
        document.getElementById("result").innerHTML = JSON.stringify(
            data.data,
            null,
            4
        );
    };
    ajax.send();
});
