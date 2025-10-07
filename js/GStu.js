var index = 0;
window.onload = function () {
    setInterval(function () {
        var list = ['GS1.png','GS2.png','GS3.png','GS4.png','GS5.png'];
        //if (index < list.length) {
        //    document.getElementById('imgob').src = `Img/${list[index]}`;
        //    index = index + 1;
        //} else {
        //    index = 0;
        //}
        /*随机显示图片*/
        var num = Math.floor(Math.random() * list.length);
        console.log(num);
        document.getElementById('imgob').src = `./images/${list[num]}`;
    },6000)
   
}