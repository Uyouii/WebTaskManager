/**
 * Created by 泰佑 on 2017/4/7.
 */
//重新调整窗口时设置屏幕div在竖直方向上高度为全屏
$(document).ready(function(){
    $(window).resize(function() {
        setLocation();
    });
});

//设置显示的位置
function setLocation() {
    // var fullScreenElement =  document.getElementsByClassName("fullScreen");
    // for(var i=0;i<fullScreenElement.length;i++) {
    //     fullScreenElement[i].setAttribute("style","height: " + window.innerHeight + "px;");
    // }
    var l = document.getElementById("workspace");
    var height = window.innerHeight;
    var lHeight = l.clientHeight;
    var style = "padding-top: " + Math.floor((height - lHeight) / 2 - 80)  + "px;";
    l.setAttribute("style",style);

    document.getElementById("screen").setAttribute("style","height: " + window.innerHeight + "px; " +
        "background-color: #2c2c32;");

    //var style2 = "padding-top: " + Math.floor((height - lHeight) / 2 - 100)  + "px;";
    document.getElementById("workspace").setAttribute("style",style);
}


window.onload = function () {

    setLocation();
};

function register() {
    var name = document.getElementById("registerName").value;
    var email = document.getElementById("registerEmail").value;
    var pass = document.getElementById("registerPassword").value;
    var pass2 = document.getElementById("registerPassword2").value;

    var ready = true;

    if(name == "") {
        document.getElementById("registerNameGroup").setAttribute("class","form-group has-error");
        ready = false;
    }
    else
        document.getElementById("registerNameGroup").setAttribute("class","form-group has-success");

    if(email == "") {
        document.getElementById("registerEmailGroup").setAttribute("class","form-group has-error");
        ready = false;
    }
    else
        document.getElementById("registerEmailGroup").setAttribute("class","form-group has-success");

    if(pass == "") {
        document.getElementById("registerPasswordGroup").setAttribute("class","form-group has-error");
        ready = false;
    }
    else
        document.getElementById("registerPasswordGroup").setAttribute("class","form-group has-success");

    if(pass2 == "") {
        document.getElementById("registerPasswordGroup2").setAttribute("class","form-group has-error");
        ready = false;
    }
    else if(pass != pass2) {
        document.getElementById("registerPasswordGroup").setAttribute("class","form-group has-error");
        document.getElementById("registerPasswordGroup2").setAttribute("class","form-group has-error");
        ready = false;
    }
    else {
        document.getElementById("registerPasswordGroup2").setAttribute("class","form-group has-success");
    }

    if(ready) {
        $.post("../php/register.php", {
            name : name,
            email : email,
            pass : pass
        },
        function(data) {
            var obj = JSON.parse(data);
            var tip = document.getElementById("tipText");
            if(obj.type == '1') {
                document.getElementById("tipText").setAttribute("class","modal-body has-success");
                tip.innerHTML = "Register successfully.";
            }
            else if(obj.type == '0') {
                document.getElementById("tipText").setAttribute("class", "modal-body has-error");
                tip.innerHTML = "This email has been registered.";
            }
            else {
                document.getElementById("tipText").setAttribute("class", "modal-body has-error");
                tip.innerHTML = "Fail to connect the database.";
            }

            $('#myModal').modal('show');
        });
        clearInput();
    }

}

function login() {
    var email = document.getElementById("loginEmail").value;
    var pass = document.getElementById("loginPassword").value;

    var ready = true;

    if(email == "") {
        document.getElementById("loginEmailGroup").setAttribute("class","form-group has-error");
        ready = false;
    }
    else
        document.getElementById("loginEmailGroup").setAttribute("class","form-group has-success");

    if(pass == "") {
        document.getElementById("loginPasswordGroup").setAttribute("class","form-group has-error");
        ready = false;
    }
    else
        document.getElementById("loginPasswordGroup").setAttribute("class","form-group has-success");

    if(ready) {
        $.post("../php/login.php", {
                email : email,
                pass : pass
            },
            function(data) {
                var obj = JSON.parse(data);
                var tip = document.getElementById("tipText");
                if(obj.type == 'success') {
                    document.cookie = "email=" + email +"; path=home.html";
                    document.cookie = "email=" + email +"; path=taskList.html";
                    document.cookie = "email=" + email +"; path=addTask.html";
                    window.location.href="../UI/home.html";
                }
                else if(obj.type == 'wrongPassword') {
                    document.getElementById("tipText").setAttribute("class", "modal-body has-error");
                    tip.innerHTML = "Password is Wrong.";
                }
                else if(obj.type == 'noEmail') {
                    document.getElementById("tipText").setAttribute("class", "modal-body has-error");
                    tip.innerHTML = "Email hasn't been registered.";
                }
                else {
                    document.getElementById("tipText").setAttribute("class", "modal-body has-error");
                    tip.innerHTML = "Fail to connect the database.";
                }

                $('#myModal').modal('show');
            });
        clearInput();
    }

}



function resetColor() {
    document.getElementById("registerNameGroup").setAttribute("class","form-group");
    document.getElementById("registerEmailGroup").setAttribute("class","form-group");
    document.getElementById("registerPasswordGroup").setAttribute("class","form-group");
    document.getElementById("registerPasswordGroup2").setAttribute("class","form-group");
    document.getElementById("loginEmailGroup").setAttribute("class","form-group");
    document.getElementById("loginPasswordGroup").setAttribute("class","form-group");
}

function clearInput() {
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("registerPassword2").value = "";
    resetColor();
}