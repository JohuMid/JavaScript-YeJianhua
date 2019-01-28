window.onload = function () {
    //1.实现瀑布流
    waterfull("main", "box");

    //2.动态加载图片
    window.onscroll = function () {

        if (checkWillLoadImage()){
            //2.1造数据
            var dataArr = [
                {"src" : "pubu%20(3).png"},
                {"src" : "pubu%20(1).gif"},
                {"src" : "pubu%20(5).png"},
                {"src" : "pubu%20(6).png"},
                {"src" : "pubu%20(7).png"},
                {"src" : "pubu%20(8).png"},
                {"src" : "pubu%20(9).png"},
                {"src" : "pubu%20(10).png"},
                {"src" : "pubu%20(1).jpeg"},
                {"src" : "pubu%20(12).png"}
            ];
            //2.2创建元素
            for(var i = 0; i<dataArr.length;i++) {
                var newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);
                var newImg = document.createElement('img');
                newImg.src = 'images/'+dataArr[i].src;
                newPic.appendChild(newImg);
            }
            //2.3重新布局
            waterfull('main', 'box');
        }
    }


};

//瀑布流布局
function waterfull(parent, child) {
    //1.父盒子居中
    //1.1获取所有的盒子
    var allBox = $(parent).getElementsByClassName(child);
    //1.2获取子盒子的宽度
    var boxWidth = allBox[0].offsetWidth;
    console.log(boxWidth);
    //1.3获取屏幕的宽度
    var screenW = document.documentElement.clientWidth;
    //1.4求出列数
    var cols = parseInt(screenW / boxWidth);
    // console.log(cols);
    //1.5父盒子居中
    $(parent).style.width = cols * boxWidth + 'px';
    $(parent).style.margin = '0 auto';

    //2.子盒子的定位
    //2.1定义高度数组
    var heightArr = [],boxHeight;
    //2.2遍历子盒子
    for(var i = 0; i<allBox.length ; i++){
        //2.2.1每一个子盒子高度
        boxHeight = allBox[i].offsetHeight;
        //2.2.2取出第一行盒子的高度放入数组
        if(i < cols){
            heightArr.push(boxHeight);
        }else {
            //剩余行
            //1.取出最矮盒子高度
            var minBoxHeight = _.min(heightArr);
            //2.求出最矮盒子的索引

            var minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
            //3.子盒子定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            allBox[i].style.top = minBoxHeight + 'px';

            //4.更新高度
            heightArr[minBoxIndex] += boxHeight;



        }


    }

}

function getMinBoxIndex(arr, val) {
    for(var i = 0 ; i<arr.length ; i++){
        if(arr[i] === val){
            return i;
        }
    }
}

function $(id) {
    return typeof id === "string" ? document.getElementById(id):null;
}

function checkWillLoadImage() {
    //1.获取最后一个盒子
    var allBox = document.getElementsByClassName('box');
    var lastBox = allBox[allBox.length-1];

    //2.求出最后一个盒子自身高度的一半
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    //3.求出屏幕的高度
    var screenW = document.body.clientHeight || document.documentElement.clientHeight;

    //4.页面偏离浏览器的高度
    var scrollTop = scroll().top;

    return lastBoxDis <= screenW + scrollTop;

}