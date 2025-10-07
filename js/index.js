window.addEventListener('load', function() {
	// 获取主题切换按钮、导航栏、太阳和月亮图标的DOM元素
	const themeToggle = document.getElementById('theme-toggle'); // 主题切换按钮
	const sidebar = document.getElementById('sidebar'); // 左侧导航栏
	const sunIcon = document.getElementById('sun-icon'); // 太阳图标
	const moonIcon = document.getElementById('moon-icon'); // 月亮图标

	// 监听主题切换按钮的点击事件
	themeToggle.addEventListener('click', () => {
		// 切换页面的“黑夜模式”类，控制页面颜色主题
		document.body.classList.toggle('dark-mode');

		// 切换太阳和月亮图标的显示状态
		sunIcon.style.display = sunIcon.style.display === 'none' ? 'inline' : 'none';
		moonIcon.style.display = moonIcon.style.display === 'none' ? 'inline' : 'none';
	});

	// 监听导航栏的点击事件，实现导航栏的伸缩功能
	sidebar.addEventListener('click', () => {
		// 切换导航栏的折叠/展开状态
		sidebar.classList.toggle('collapsed');
	});

});