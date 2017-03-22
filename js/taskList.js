/**
 * Created by 泰佑 on 2017/3/4.
 */
var showData;
var successfulDelete = [];  //记录成功删除的行号
var failDelete = [];        //记录没有成功删除的行，一般不存在
var deleteLines = [];       //记录准备删除的行号

window.onload = function () {
    fillTable();
    setInterval("setRemainingTime()",1000);
};


function fillTable() {
    $.post("../php/taskList.php",
        function(data){
            showData = JSON.parse(data);
            addDataTable(showData);
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
        newRow.insertCell().innerHTML = data[i].taskDescription;

        num++;
    }

}

function setRemainingTime() {
    var table = document.getElementById("listTable");
    var rows = table.rows;
    for(var i = 1; i < rows.length ;i++) {
        rows[i].cells[4].innerHTML = getRemainingTime(rows[i].cells[2].innerText.substr(0,10),rows[i].cells[2].innerText.substr(11,5));
    }
}

function getRemainingTime(date,time) {
    var todayDate = new Date();
    var DDLDate = new Date(date);
    DDLDate.setHours( time.substr(0,2) );
    DDLDate.setMinutes( time.substr(3,2) );
    var diff = DDLDate.getTime() - todayDate.getTime();
    if(diff <= 0)
        return "00d 00h 00m 00s";
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
        return diffDay + "d " + diffHour + "h " + diffMin + "m " + diffSec + "s";
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

    if(deleteLines.length > 0) {
        tipText.innerText = "Hasn't choose any lines.";
    }
    else {
        tipText.innerText = "Confirm Delete these lines?\n";
        tipText.innerText += "Click ok to delete.";
    }
    $('#myModal2').modal('show');
}


function deleteRow() {
    $('#myModal2').modal('hide');
    if(deleteLines.length  == 0)
        return ;

    var table = document.getElementById("listTable");
    var rows = table.rows;

    for(i = 0; i < deleteLines.length;i++) {
        var ddl = rows[deleteLines[i]].cells[2].innerText.substr(0,10);
        var name = rows[deleteLines[i]].cells[3].innerText;
        deleteOneInDB(ddl,name,deleteLines[i]);
    }

    var tipText = document.getElementById("tipText");
    tipText.innerText = "Successfully delete " + successfulDelete.length + " tasks.\n";
    if(failDelete.length > 0) {
        tipText.innerText += "Fail to delete ";
        for(var j = 0; j < failDelete.length;j++) {
            tipText.innerText += "[line " + failDelete[j] + "] ";
        }
        tipText.innerText += ".";
    }

    $('#myModal').modal('show');

    deleteLines = [];
    successfulDelete = [];
    failDelete = [];

    clearTable();
    fillTable();

}




function deleteOneInDB(taskDDL,taskName,line) {
    $.post("../php/deleteTask.php",
        {
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
        }
    );
}

function clearTable() {
    $("#listTable").find("tr:not(:first)").empty("");
}

function addTask() {
    window.location = "../UI/addTask.html";
}

// function getCurrentDate() {
//     var date = new Date();
//     var year = date.getFullYear();
//     var month = date.getMonth() + 1;
//     if(month < 10)
//         month = "0" + month;
//     var day = date.getDate();
//     if(day < 10)
//         day = "0" + day;
//     return year + "-" + month + "-" + day;
// }