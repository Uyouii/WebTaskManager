/**
 * Created by 泰佑 on 2017/4/7.
 */

//重新调整窗口时设置屏幕div在竖直方向上高度为全屏
$(document).ready(function(){
    $(window).resize(function() {
        setFullHeight();
    });
});

function setFullHeight() {
    var height = window.innerHeight;
    var fullScreenElement =  document.getElementsByClassName("fullScreen");
    for(var i=0;i<fullScreenElement.length;i++) {
        fullScreenElement[i].setAttribute("style","height: " + height + "px;");
    }

    var style = "height: " + height + "px; background-color: #2c2c32";
    document.getElementById("sidebar").setAttribute("style",style);

}

var email;
var username;
var containers = [];
var nowContainer = -1;
var liArray = [];
var liNow;

window.onload = function () {
    email = getCookie("email");
    if(email == "") {
        window.location.href = "Login.html";
    }
    else {
        $.post("../php/getUser.php", {
            email : email
        },
        function (data) {
            var obj = JSON.parse(data);
            username = obj.username;
            document.getElementById("userName").innerText = "User : " + username;
        });
    }

    setFullHeight();
    localStorage.setItem("containername","");
    setContainer();
};


function setContainer() {
    $.post("../php/getContainer.php",
        {
            email : email
        },
        function (data) {
            var jsondata = JSON.parse(data);
            for(var j = 0; j < jsondata.length;j++) {
                containers[j] = jsondata[j].containername;
            }
            if(containers.length > 0) {
                nowContainer = 0;
                localStorage.setItem("containername",containers[0]);
                document.getElementById("iframe-manage").setAttribute("src","taskList.html");
                var bar = document.getElementById("containerBar");
                for(var i = 0; i < containers.length; i++) {
                    var li = document.createElement("li");
                    li.setAttribute("role","presentation");
                    li.num = i;
                    li.onclick = function () {
                        if(nowContainer != this.num) {
                            liArray[nowContainer].setAttribute("class", "");
                            nowContainer = this.num;
                            liArray[nowContainer].setAttribute("class", "active");
                        }

                        localStorage.setItem("containername",containers[nowContainer]);
                    };
                    var a = document.createElement("a");
                    a.setAttribute("href","taskList.html");
                    a.setAttribute("target","iframe-manage");
                    a.innerText = containers[i];
                    li.appendChild(a);
                    bar.appendChild(li);
                    liArray[liArray.length] = li;
                }
                liArray[nowContainer].setAttribute("class", "active");
            }
            else {
                document.getElementById("iframe-manage").setAttribute("src","noContainerTip.html");
            }
        }
    );
}

function addContainer() {
    $('#addContainerModal').modal('show');
}

function deleteContainer() {

    var tip = document.getElementById("deleteContainerTipText");
    tip.innerHTML = "Container " + containers[nowContainer] + "will be deleted.\n" +
        "And all the tasks in the container will be delete.\n" +
            "Sure to do that?";
    $('#deleteContainerModal').modal('show');

}

function deleteContainerinDatabase() {

    $.post("../php/deleteContainer.php",{
        email:email,
        containername : containers[nowContainer]
    },
    function (data) {
        var obj = JSON.parse(data);
        if(obj.type == '1' ) {
            var bar = document.getElementById("containerBar");
            bar.removeChild(liArray[nowContainer]);
            liArray.splice(nowContainer, 1);
            containers.splice(nowContainer, 1);
            if (nowContainer == liArray.length) {
                nowContainer = liArray.length - 1;
            }
            if(nowContainer >= 0)
                liArray[nowContainer].setAttribute("class", "active");
            else {
                document.getElementById("iframe-manage").setAttribute("src","noContainerTip.html");
            }
        }
        else {

        }
    });

}

function addContainerToDatabase() {
    var containername = document.getElementById("containerName").value;

    var ready = true;
    for(var i = 0; i < containers.length; i++) {
        if(containers[i] == containername)
        {
            ready = false;
            break;
        }
    }

    if(containername != "" && ready) {

        var num = getContainerNum();
        $.post("../php/addContainer.php", {
                email: email,
                containername: containername,
                time: num
            },
            function (data) {
                var bar = document.getElementById("containerBar");
                var li = document.createElement("li");
                li.setAttribute("role","presentation");
                li.num = liArray.length;
                li.onclick = function () {
                    liArray[nowContainer].setAttribute("class", "");
                    nowContainer = this.num;
                    liArray[nowContainer].setAttribute("class", "active");
                };
                var a = document.createElement("a");
                a.setAttribute("href","taskList.html");
                a.setAttribute("target","iframe-manage");
                a.innerText = containername;
                li.appendChild(a);
                liArray[liArray.length] = li;
                bar.appendChild(li);
                containers[containers.length] = containername;
                if(containers.length == 1) {
                    nowContainer = 0;
                    liArray[nowContainer].setAttribute("class", "active");
                    document.getElementById("iframe-manage").setAttribute("src","taskList.html");
                }
            }
        );
    }
    else {

    }
}


//获取container的排序数字
function getContainerNum() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if(month < 10)
        month = "0" + month;
    var day = date.getDate();
    if(day < 10)
        day = "0" + day;
    var hour = date.getHours();
    if(hour < 10)
        hour = "0" + hour;
    var minute = date.getMinutes();
    if(minute < 10)
        minute = "0" + minute;
    var seconds = date.getSeconds();
    if(seconds < 10)
        secondes = "0" + secondes;
    return year +  month +  day + hour + minute + seconds;
}


function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}
