/*
    获取滚动的头部距离和左边距离
    scroll().top
        scroll().left

     */
function scroll() {
    if (window.pageYOffset !== null){
        return{
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    }else if(document.compatMode === 'CSS1Compat'){
        //w3c
        return{
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }else {
        return{
            top: body.scrollTop,
            left: body.scrollLeft
        }

    }
}

function show(obj) {
    return obj.style.display = 'block';
}

function hide(obj) {
    return obj.style.display = 'none';
}

function $(id) {
    return typeof id === "string" ? document.getElementById(id):null;
}
/*
获取屏幕的宽度和高度
 */
function client() {
    if (window.innerWidth){
        return {
            width : window.innerWidth,
            height :window.innerHeight
        }
    }else if (document.compatMode ==="CSS1Compat"){
        return{
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight

        }

    }
    return{
        width:document.body.clientWidth,
        height:document.body.clientHeight

    }
}

/*
        匀速动画的封装函数
        元素string 目标值string 不长number
     */

function constant(ele, target, speed) {
    //1.清除定时器
    clearInterval(ele.timer);

    //2.0判断方向
    var dir = ele.offsetLeft < target ? speed : -speed;

    //2.设置定时器
    ele.timer = setInterval(function () {
        ele.style.left = ele.offsetLeft + dir + 'px';

        if (Math.abs(target - ele.offsetLeft) < Math.abs(dir)){
            clearInterval(ele.timer);

            ele.style.left = target + 'px';

        }

    },20);


}
