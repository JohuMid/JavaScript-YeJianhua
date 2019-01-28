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

/**
 * 获取css样式值
 * @param obj
 * @param attr{string};
 * @returns {*}
 */

function getCSSValue(obj, attr) {
    if (obj.currentStyle){ //IE和opera
        return obj.currentStyle[attr];
    }else {
        return window.getComputedStyle(obj, null)[attr];
    }
}


function buffer(obj, json, fn) {


    clearInterval(obj.timer);

    var begin = 0, target = 0, speed =0;

    obj.timer = setInterval(function () {

        //1.2 立flag
        var flag = true;

        for (var k in json){



            if ("opacity" === k){
                begin = Math.round(parseFloat(getCSSValue(obj, k))*100||100);
                target = parseInt(json[k]*100);
            }else if("scrollTop" === k){
                begin = Math.ceil(obj.scrollTop);
                target = parseInt(json[k]);
            } else{
                begin = parseInt(getCSSValue(obj, k))||0;
                target = parseInt(json[k]);
            }


            //1.2.1获取初始值


            //1.2求出不长
            speed = (target- begin) *0.2;

            //1.3判断是否向上取整
            speed = (target > begin )?  Math.ceil(speed):Math.floor(speed);

            //1.4动起来
            if ("opacity" === k){
                obj.style.opacity =(begin+speed)/100;
                obj.style.filter = "alpha(Opacity : "+(begin+speed)+")";
            }else if("scrollTop" === k){
                obj.scrollTop = begin + speed;
            }
            else {
                obj.style[k] = begin + speed + "px";
            }

            // console.log(begin, target);

            //1.5判断
            if(begin === target){
                flag = false;
            }

        }
        if (!flag){
            clearInterval(obj.timer);

            //判断有没有回调函数
            if (fn){
                fn();
            }

        }

    }, 20)
}
