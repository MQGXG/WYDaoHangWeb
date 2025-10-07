document.addEventListener('DOMContentLoaded', () => {
	// 获取页面元素
	const noteContainer = document.getElementById('note-container');
	const noteContent = document.getElementById('note-content');
	const addNoteButton = document.getElementById('add-note');
	const noteColor = document.getElementById('note-color');
	const textColor = document.getElementById('text-color');
	const noteShape = document.getElementById('note-shape');

	// 从localStorage加载便签
	const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
	savedNotes.forEach(createNote); // 遍历每个已保存的便签并创建

	// 添加便签按钮的点击事件
	addNoteButton.addEventListener('click', () => {
		const content = noteContent.value.trim(); // 获取输入内容并去除空格
		if (content) {
			const note = {
				content: content, // 便签内容
				color: noteColor.value, // 便签背景颜色
				textColor: textColor.value, // 文字颜色
				shape: noteShape.value, // 便签形状
				x: Math.random() * (noteContainer.clientWidth - 100), // 随机位置
				y: Math.random() * (noteContainer.clientHeight - 100)
			};

			createNote(note); // 创建便签
			saveNotes(); // 保存便签到localStorage
			noteContent.value = ''; // 清空输入框
		}
	});

	// 创建便签的函数
	function createNote(note) {
		const noteElement = document.createElement('div'); // 创建便签元素
		noteElement.classList.add('note', note.shape); // 添加便签样式和形状
		noteElement.style.backgroundColor = note.color; // 设置背景颜色
		noteElement.style.color = note.textColor; // 设置文字颜色
		noteElement.textContent = note.content; // 设置便签内容
		noteElement.style.left = `${note.x}px`; // 设置便签位置
		noteElement.style.top = `${note.y}px`;
		// 设置默认高度和宽度
		noteElement.style.width = '250px'; // 默认宽度
		noteElement.style.height = '200px'; // 默认高度
		// 右键点击事件处理
		noteElement.addEventListener('contextmenu', (e) => {
			e.preventDefault(); // 阻止默认的右键菜单
			if (confirm('确定要删除这个便签吗？')) { // 显示删除确认对话框
				noteElement.remove(); // 从页面移除便签
				saveNotes(); // 保存更新后的便签列表
			}
		});

		noteContainer.appendChild(noteElement); // 将便签添加到容器中
		makeDraggable(noteElement); // 使便签可拖动
	}

	// 保存便签到localStorage
	function saveNotes() {
		const notes = Array.from(noteContainer.children).map(note => {
			return {
				content: note.textContent, // 获取便签内容
				color: note.style.backgroundColor, // 获取背景颜色
				textColor: note.style.color, // 获取文字颜色
				shape: note.classList.contains('rounded') ? 'rounded' : note.classList.contains(
						'square') ? 'square' : note.classList.contains('rectangle') ? 'rectangle' :
					'hexagon', // 获取形状
				x: note.offsetLeft, // 获取便签位置
				y: note.offsetTop
			};
		});
		localStorage.setItem('notes', JSON.stringify(notes)); // 将便签信息保存到localStorage
	}

	// 使便签可拖动的函数
	function makeDraggable(element) {
		let isDragging = false;
		let offsetX, offsetY;

		element.addEventListener('mousedown', (e) => {
			isDragging = true;
			offsetX = e.clientX - element.offsetLeft; // 计算鼠标与便签左上角的偏移量
			offsetY = e.clientY - element.offsetTop;
			element.style.zIndex = 100; // 设置便签的层级
		});

		document.addEventListener('mousemove', (e) => {
			if (isDragging) {
				const x = e.clientX - offsetX; // 计算便签的新位置
				const y = e.clientY - offsetY;
				element.style.left = `${x}px`;
				element.style.top = `${y}px`;
			}
		});

		document.addEventListener('mouseup', () => {
			isDragging = false;
			element.style.zIndex = ''; // 恢复便签的层级
			saveNotes(); // 保存便签位置
		});
	}
});

