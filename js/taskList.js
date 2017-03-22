/**
 * Created by 泰佑 on 2017/3/4.
 */
var showData;
var successfulDelete = [];  //记录成功删除的行号
var failDelete = [];        //记录没有成功删除的行，一般不存在
var deleteLines = [];       //记录准备删除的行号

window.onload = function () {
   fillTable();
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
        newRow.insertCell().innerHTML = data[i].taskDDL + " " + data[i].taskTime;
        newRow.insertCell().innerHTML = data[i].taskName;
        newRow.insertCell().innerHTML = data[i].taskDescription;
        num++;
    }

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
    // for(var i = 1; i < rows.length; i++) {
    //     var checkbox = rows[i].cells[0].firstElementChild;
    //     if(checkbox.checked == true) {
    //         var ddl = rows[i].cells[2].innerText.substr(0,10);
    //         var name = rows[i].cells[3].innerText;
    //         deleteOneInDB(ddl,name,i);
    //     }
    // }

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