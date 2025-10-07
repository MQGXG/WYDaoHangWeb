window.onload = function() {

	let slideIndex = 0; // 当前显示的轮播图索引
	showSlides(); // 初始化显示轮播图
	
	// 显示轮播图的函数
	function showSlides() {
	    let slides = document.querySelectorAll('.carousel img'); // 获取所有轮播图图片
	    for (let i = 0; i < slides.length; i++) {
	        slides[i].style.display = "none";  // 隐藏所有图片
	    }
	    slideIndex++; // 递增索引
	    if (slideIndex > slides.length) {slideIndex = 1} // 如果超过数量则重置
	    slides[slideIndex - 1].style.display = "block";  // 显示当前图片
	    setTimeout(showSlides, 3000); // 每3秒切换一次
	}
	
	// 切换轮播图的函数
	function changeSlide(n) {
	    slideIndex += n - 1; // 根据按钮调整索引
	    if (slideIndex < 0) { slideIndex = 0; } // 防止索引小于0
	    if (slideIndex >= document.querySelectorAll('.carousel img').length) {
	        slideIndex = document.querySelectorAll('.carousel img').length - 1; // 防止超出索引
	    }
	    showSlides(); // 更新显示
	}
};