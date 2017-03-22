/**
 * Created by 泰佑 on 2017/3/4.
 */
window.onload = function () {

};


function submitInput() {
    var readySubmit = true;
    var DDL = document.getElementById("inputDDL").value;
    if(DDL == "") {
        document.getElementById("inputDDLGroup").setAttribute("class","form-group has-error");
        readySubmit = false;
    }
    else
        document.getElementById("inputDDLGroup").setAttribute("class","form-group has-success");

    var taskName = document.getElementById("inputTaskName").value;
    if(taskName == "") {
        document.getElementById("inputNameGroup").setAttribute("class","form-group has-error");
        readySubmit = false;
    }
    else
        document.getElementById("inputNameGroup").setAttribute("class","form-group has-success");

    var taskTime = document.getElementById("inputTime").value;
    var taskDescription = document.getElementById("inputDescription").value;

    var tip = document.getElementById("tipText");

    if(readySubmit == true) {

        $.post("../php/addTask.php",
            {
                name: taskName,
                ddl : DDL,
                time : taskTime,
                description : taskDescription
            },
            function(data){
                var obj = JSON.parse(data);
                if(obj.type == 0) {
                    document.getElementById("tipText").setAttribute("class", "modal-body has-error");
                    tip.innerHTML = "Fail to insert ddl " + taskName + ". This taskName and time has existed.";
                }
                else if(obj.type == 1) {
                    document.getElementById("tipText").setAttribute("class","modal-body has-success");
                    tip.innerHTML = "Insert task " + taskName + " successfully!";
                }
                else {
                    tip.innerHTML = "The return data is " + obj.type;
                }
                $('#myModal').modal('show');
            });
        clearInput();
    }
}

function resetColor() {
    document.getElementById("inputDDLGroup").setAttribute("class","form-group");
    document.getElementById("inputNameGroup").setAttribute("class","form-group");
    document.getElementById("tipText").setAttribute("class","modal-body");
}

function clearInput() {
    document.getElementById("inputDDL").value = "";
    document.getElementById("inputTaskName").value = "";
    document.getElementById("inputTime").value = "";
    document.getElementById("inputDescription").value = "";
    resetColor();
}

function checkInput() {
    var readyReturn = true;
    var DDL = document.getElementById("inputDDL").value;
    if(DDL == "") {
        document.getElementById("inputDDLGroup").setAttribute("class","form-group has-error");
        readyReturn = false;
    }
    else
        document.getElementById("inputDDLGroup").setAttribute("class","form-group");

    var name = document.getElementById("inputTaskName").value;
    if(name == "") {
        document.getElementById("inputNameGroup").setAttribute("class","form-group has-error");
        readyReturn = false;
    }
    else
        document.getElementById("inputNameGroup").setAttribute("class","form-group");

    return readyReturn;
}

