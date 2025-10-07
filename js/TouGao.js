window.onload = function() {
    // 获取页面中id为'websiteIcon'的文件输入元素
    document.getElementById('websiteIcon').addEventListener('change', function(event) {
        // 创建一个新的FileReader对象，用于读取文件内容
        var reader = new FileReader();

        // 当文件读取完成时，执行以下函数
        reader.onload = function(e) {
            // 获取页面中id为'previewIcon'的图片元素
            var previewIcon = document.getElementById('previewIcon');
            
            // 将读取到的文件内容设置为图片元素的src属性，从而显示图片
            previewIcon.src = e.target.result;
            
            // 设置图片元素的display属性为'block'，使其可见
            previewIcon.style.display = 'block';
        };

        // 读取用户选择的文件，将其转换为DataURL
        reader.readAsDataURL(event.target.files[0]);
    });
};
