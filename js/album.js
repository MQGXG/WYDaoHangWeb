// 当文档内容完全加载完成后，执行以下匿名函数
document.addEventListener('DOMContentLoaded', function() {

    // 定义一个名为 variableImage 的函数
    function variableImage() {
        // 创建一个空数组来存储已经选择的图片编号，确保不会有重复的图片被选中
        var selectedFrames = [];

        // 循环12次，对应页面上的12个图片元素
        for (var i = 0; i < 12; i++) {
            var NowFrame;

            // 使用 do-while 循环来生成一个0到13之间的随机整数，代表图片帧数
            // 这个循环会持续进行，直到生成一个未被选中的随机数
            do {
                NowFrame = parseInt(Math.random() * 13); // 假设有13张图片
            } while (selectedFrames.includes(NowFrame)); // 检查 NowFrame 是否已存在于 selectedFrames 数组中

            // 将新选择的图片编号添加到数组中，以便跟踪哪些图片已经被选中
            selectedFrames.push(NowFrame);

            // 随机选择图片的扩展名，这里假设所有图片都有.jpg和.png两种格式
            // Math.random() 生成一个0到1之间的随机数，如果小于0.5，则选择 'jpg'，否则选择 'png'
            var extension = Math.random() < 0.5 ? 'jpg' : 'png';

            // 设置对应图片元素的 src 属性，使其指向随机选择的图片
            // 使用字符串拼接来构造图片的完整路径，包括文件名和扩展名
            document.getElementById("showImage" + i).src = "PhotoWall/" + NowFrame + "." + extension;
        }
    }

    // 调用 variableImage 函数，开始执行图片随机分配操作
    variableImage();
});
