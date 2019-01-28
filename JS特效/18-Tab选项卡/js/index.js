window.onload = function () {
//    获取标签
    var allLis = $('tab_header').getElementsByTagName('li');
    var allDom = $('tab_content').getElementsByClassName('dom');
    for(var i = 0; i<allLis.length ; i++){

        allLis[i].index = i;

        allLis[i].onmouseover = function () {

            for(var j = 0 ; j<allLis.length ; j++){
                allLis[j].className = 'none';
                allDom[j].style.display = 'none';
            }
            this.className = 'selected';
            allDom[this.index].style.display = 'block';
        };
    }
    /*btns[i].index = i+1;
      btns[i].onclick = function () {
         alert("你点击了按钮" + this.index);
    }*/
};

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}