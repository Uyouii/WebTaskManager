/**
 * Created by 泰佑 on 2017/3/4.
 */


var showData;
var successfulDelete = [];  //记录成功删除的行号
var failDelete = [];        //记录没有成功删除的行，一般不存在
var deleteLines = [];       //记录准备删除的行号
var deleteLine = [];       //记录准备删除的行号
var containername;
var email;
var hasData = true;

window.onload = function () {

    email = getCookie("email");
    if(email == "") {
        window.location.href = "Login.html";
    }
    else {
        containername = localStorage.getItem("containername");

        fillTable();
        setInterval("setRemainingTime()", 1000);
    }


};

//从数据库获取数据后填充表格
function fillTable() {
    $.post("../php/taskList.php",
        {
            email:email,
            containername:containername
        },

        function(data){
            if(data.length > 0) {
                showData = JSON.parse(data);
                addDataTable(showData);
                hasData = true;
            }
            else {
                hasData = false;
            }
        }
    );
}

function addDataTable(data) {
    var table = document.getElementById("listTable");
    var num = 1;
    for(var i = 0; i < data.length;i++) {
        if(data[i].taskDDL == "")
            continue;
        var newRow = table.insertRow();

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        newRow.insertCell().appendChild(checkbox);
        newRow.insertCell().innerHTML = num;
        var datetime = data[i].taskDDL + " ";
        if(data[i].taskTime == '')
            datetime += "23:59";
        else datetime += data[i].taskTime;

        newRow.insertCell().innerHTML = datetime;
        newRow.insertCell().innerHTML = data[i].taskName;
        newRow.insertCell().innerHTML = getRemainingTime(data[i].taskDDL,datetime.substr(11,5));
        newRow.datanum = i;

        if(data[i].taskDescription.length > 8) {
            var button = document.createElement("button");
            button.innerText = "Details";
            button.id = "i";
            button.setAttribute("title","Descriptions");
            button.setAttribute("class","btn btn-default");
            button.setAttribute("data-container","body");
            button.setAttribute("data-toggle","popover");
            button.setAttribute("data-placement","top");
            button.setAttribute("data-content",data[i].taskDescription.toString());


            button.onmouseover = function () {

                //document.getElementById(this.id).popover('show');
                $("#" + this.id).popover("show");
            };

            button.onmouseout = function () {
                $("#" + this.id).popover("hide");
            };

            newRow.insertCell().appendChild(button);
        }
        else
            newRow.insertCell().innerHTML = data[i].taskDescription;


        var loc = newRow.cells[4].innerText.indexOf('d');
        var diffDay = newRow.cells[4].innerText.substr(0,loc);
        if(parseInt(diffDay) < 0) {

        }
        else if(parseInt(diffDay) == 0) {
            newRow.setAttribute("class","danger");
        }
        else if(parseInt(diffDay) < 3) {
            newRow.setAttribute("class","warning");
        }
        else if(parseInt(diffDay) < 7) {
            newRow.setAttribute("class","info");
        }

        num++;
    }
}



function setRemainingTime() {

    //判断表格内容是否加载出来，如果没有加载出来则重新加载
    if(document.getElementById("listTable").rows.length <= 1 && hasData) {
        clearTable();
        fillTable();
    }

    var table = document.getElementById("listTable");
    var rows = table.rows;
    for(var i = 1; i < rows.length ;i++) {
        //不判断的话删除数据时会出错(刷新时可能会出现数据已经删除但是没有添加进的情况)
        //这时更新数据则会出错
        if(rows[i].cells[2] == undefined)
            continue;
        var str = rows[i].cells[2].innerText;
        rows[i].cells[4].innerHTML = getRemainingTime(str.substr(0,10),str.substr(11,5));
    }
}

function getRemainingTime(date,time) {
    var todayDate = new Date();
    var DDLDate = new Date(date);
    DDLDate.setHours( time.substr(0,2) );
    DDLDate.setMinutes( time.substr(3,2) );
    var diff = DDLDate.getTime() - todayDate.getTime();
    if(diff <= 0)
        return "-1d -1:-1:-1";
    else {
        var diffDay = Math.floor(diff / (24 * 3600 * 1000));

        diff %= 24 * 3600 * 1000;
        var diffHour = Math.floor(diff / (3600 * 1000));
        if(diffHour < 10)
            diffHour = "0" + diffHour;
        diff %= 3600 * 1000;
        var diffMin = Math.floor(diff / (60 * 1000));
        if(diffMin < 10)
            diffMin = "0" + diffMin;

        diff %= 60 * 1000;
        var diffSec = Math.floor(diff / 1000);
        if(diffSec < 10)
            diffSec = '0' + diffSec;
        return diffDay + "d " + diffHour + ":" + diffMin + ":" + diffSec;
    }
}

function setRowColor(row,ddl) {

}

function getDiffDay(today,ddl) {
    var toadyDate = new Date(today);
    var ddlDate = new Date(ddl);
}

function deleteButton() {

    var table = document.getElementById("listTable");
    var rows = table.rows;
    for(var i = 1; i < rows.length; i++) {
        var checkbox = rows[i].cells[0].firstElementChild;
        if(checkbox.checked == true) {
            deleteLines[deleteLines.length] = i;
        }
    }
    var tipText = document.getElementById("tipText2");

    if(deleteLines.length == 0) {
        tipText.innerText = "Hasn't choose any lines.";
    }
    else {
        tipText.innerText = "Confirm Delete these lines?\n";
        tipText.innerText += "Click OK to delete.";
    }
    $('#myModal2').modal('show');
}


function deleteRow() {
    if(deleteLines.length  == 0)
        return ;

    var table = document.getElementById("listTable");
    var rows = table.rows;

    for(i = 0; i < deleteLines.length;i++) {
        var ddl = rows[deleteLines[i]].cells[2].innerText.substr(0,10);
        var name = rows[deleteLines[i]].cells[3].innerText;
        if(i == deleteLines.length - 1)
            deleteOneInDB(ddl,name,deleteLines[i],true);
        else deleteOneInDB(ddl,name,deleteLines[i],false);
    }
}


function deleteOneInDB(taskDDL,taskName,line,update) {
    $.post("../php/deleteTask.php",
        {
            email : email,
            containername : containername,
            name: taskName,
            ddl : taskDDL
        },
        function(data){
            var obj = JSON.parse(data);
            if(obj.type == 1) {
                successfulDelete[successfulDelete.length] = line;
            }
            else {
                failDelete[failDelete.length] = line;
            }

            //判断在删除完最后一个勾选的task之后再更新表格
            //防止表格的更新在异步删除数据的操作之前
            if(update == true) {
                var tipText = document.getElementById("tipText");
                tipText.innerText = "Successfully delete " + successfulDelete.length + " tasks.\n";
                if(failDelete.length > 0) {
                    tipText.innerText += "Fail to delete ";
                    for(var j = 0; j < failDelete.length;j++) {
                        tipText.innerText += "[line " + failDelete[j] + "] ";
                    }
                    tipText.innerText += ".";
                }
                $('#myModal2').modal('hide');
                //$('#myModal').modal('show');  //提示删除了多少行

                deleteLines = [];
                successfulDelete = [];
                failDelete = [];

                clearTable();
                fillTable();
            }
        }
    );
}

function clearTable() {
    //$("#listTable").find("tr:not(:first)").empty("");
    var table=document.getElementById("listTable");
    var len=table.rows.length;
    for(var i=len - 1;i>0;i--){
        table.deleteRow(i);
    }
}

function addTask() {
    window.location = "../UI/addTask.html";
}

function modify() {

    var table = document.getElementById("listTable");
    var rows = table.rows;
    var line = 0;
    for(var i = 1; i < rows.length; i++) {
        var checkbox = rows[i].cells[0].firstElementChild;
        if(checkbox.checked == true) {
            line = i;
            break;
        }
    }
    if(line == 0) {
        //显示提示信息
        $("#modifyButton").popover("show");
    }
    else {
        $("#modifyButton").popover("destroy");

        var ddl = document.getElementById("inputDDL");
        var time = document.getElementById("inputTime");
        var name = document.getElementById("inputTaskName");
        var description = document.getElementById("inputDescription");

        ddl.value = showData[rows[i].datanum].taskDDL;
        time.value = showData[rows[i].datanum].taskTime;
        name.value = showData[rows[i].datanum].taskName;
        description.value = showData[rows[i].datanum].taskDescription;

        $('#modifyModal').modal('show');
    }
}

function modifyDatabase() {
    var ddl = document.getElementById("inputDDL").value;
    var time = document.getElementById("inputTime").value;
    var name = document.getElementById("inputTaskName").value;
    var description = document.getElementById("inputDescription").value;
    var tip = document.getElementById("tipText");

    $.post("../php/modifyTask.php",
    {
        name: name,
        ddl : ddl,
        time : time,
        description : description,
        email:email,
        containername:containername
    },
    function(data){
        var obj = JSON.parse(data);
        if(obj.type == 0) {
            document.getElementById("tipText").setAttribute("class", "modal-body has-error");
            tip.innerHTML = "Fail to modify ddl " + name + ". This taskName and time has existed.";
        }
        else if(obj.type == 1) {
            document.getElementById("tipText").setAttribute("class","modal-body has-success");
            tip.innerHTML = "modify task " + name + " successfully!";
        }
        else {
            tip.innerHTML = "The return data is " + obj.type;
        }
        $('#modifyModal').modal('hide');
        $('#myModal').modal('show');

        clearTable();
        fillTable();
    });

}
//
// $(function () {
//     $("[data-toggle='popover']").popover();
// });


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
