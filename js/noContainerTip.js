/**
 * Created by 泰佑 on 2017/4/8.
 */

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
    var l = document.getElementById("tipdiv");
    var height = window.innerHeight;
    var lHeight = l.clientHeight;
    var style = "padding-top: " + Math.floor((height - lHeight) / 2 - 100)  + "px;";
    l.setAttribute("style",style);

}


window.onload = function () {
    setLocation();
};
