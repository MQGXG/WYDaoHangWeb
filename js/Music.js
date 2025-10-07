window.addEventListener('load', function() {
    // 初始化音乐列表、当前列表索引、当前音乐索引和循环模式
    const musicLists = [{
    	name: '纯音乐库',
    	musics: [{
    			name: '风吹散落叶',
    			url: 'Music/风吹散落叶-袁小葳&C.D.mp3'
    		},
    		{
    			name: '葬花',
    			url: 'Music/葬花.mp3'
    		},
    		{
    			name: '我和你-皮卡丘多多',
    			url: 'Music/我和你-皮卡丘多多.mp3'
    		}
    	]
    }];
    let currentListIndex = 0; // 当前选中的音乐列表索引
    let currentMusicIndex = 0; // 当前选中的音乐索引
    let loopMode = 'list'; // 音乐播放循环模式，'list' 表示列表循环，'single' 表示单曲循环
    
    // 获取页面中的元素
    const audioPlayer = document.getElementById('audio-player');
    const musicListSelect = document.getElementById('music-list-select');
    const musicContainer = document.getElementById('music-container');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playPauseImg = document.getElementById('play-pause-img');
    const playImgSrc = './images/播放.png'; // 播放状态的图片路径
    const pauseImgSrc = './images/暂停.png'; // 暂停状态的图片路径
    // 显示所有音乐列表
    function displayMusicLists() {
    	musicListSelect.innerHTML = ''; // 清空音乐列表选择元素
    	musicLists.forEach((list, index) => { // 遍历音乐列表
    		const option = document.createElement('option'); // 创建选项元素
    		option.value = index; // 设置选项的值为列表索引
    		option.textContent = list.name; // 设置选项的文本为列表名称
    		musicListSelect.appendChild(option); // 将选项添加到选择元素中
    	});
    }
    
    // 显示当前音乐列表中的所有音乐
    function displayMusics() {
    	const musics = musicLists[currentListIndex].musics; // 获取当前列表的音乐
    	musicContainer.innerHTML = ''; // 清空音乐容器
    	musics.forEach((music, index) => { // 遍历音乐
    		const div = document.createElement('div'); // 创建一个div元素
    		div.textContent = music.name; // 设置div的文本为音乐名称
    		div.style.border = '1px solid #cae1ff'; // 设置边框样式
    		div.style.margin = '5px'; // 设置外边距
    		div.style.padding = '5px'; // 设置内边距
    		div.onclick = () => playMusic(index); // 为div添加点击事件，点击时播放音乐
    		musicContainer.appendChild(div); // 将div添加到音乐容器中
    	});
    }
    
    // 播放音乐
    function playMusic(index) {
    	currentMusicIndex = index; // 更新当前音乐索引
    	const music = musicLists[currentListIndex].musics[currentMusicIndex]; // 获取当前音乐
    	audioPlayer.src = music.url; // 设置音频播放器的源为音乐的URL
    	audioPlayer.play().catch(error => {
    		console.error('无法播放音乐:', error);
    	});
    	playPauseImg.src = pauseImgSrc; // 切换到暂停图片
    }
    // 播放下一首音乐
    function playNext() {
    	currentMusicIndex = (currentMusicIndex + 1) % musicLists[currentListIndex].musics.length; // 计算下一首音乐的索引
    	playMusic(currentMusicIndex); // 播放下一首音乐
    }
    
    // 播放上一首音乐
    function playPrevious() {
    	currentMusicIndex = (currentMusicIndex - 1 + musicLists[currentListIndex].musics.length) % musicLists[
    		currentListIndex].musics.length; // 计算上一首音乐的索引
    	playMusic(currentMusicIndex); // 播放上一首音乐
    }
    
    // 切换循环模式
    function toggleLoopMode() {
    	loopMode = loopMode === 'list' ? 'single' : 'list'; // 切换循环模式
    	//audioPlayer.loop = loopMode === 'single'; // 如果是单曲循环，设置音频播放器的loop属性为true
    
    	// 获取循环模式按钮
    	const loopModeBtn = document.getElementById('loop-mode-btn');
    	// 清空按钮内容
    	loopModeBtn.innerHTML = '';
    
    	// 创建图片元素
    	const img = document.createElement('img');
    
    	// 根据循环模式设置图片的src属性
    	if (loopMode === 'list') {
    		img.src = './images/列表循环.png'; // 替换为列表循环图片的路径
    		img.alt = '列表循环';
    	} else {
    		img.src = './images/单曲循环.png'; // 替换为单曲循环图片的路径
    		img.alt = '单曲循环';
    	}
    
    	// 将图片添加到按钮中
    	loopModeBtn.appendChild(img);
    
    	saveSettings();
    }
    
    
    // 以下为事件监听器，用于响应用户操作
    document.getElementById('change-bg-btn').addEventListener('click', () => {
    	document.getElementById('bg-image-input').click(); // 点击更换背景按钮时，触发文件输入的点击事件
    });
    
    document.getElementById('bg-image-input').addEventListener('change', (event) => {
    	const reader = new FileReader();
    	reader.onload = (e) => {
    		document.body.style.backgroundImage = `url('${e.target.result}')`; // 设置背景图片
    	};
    	reader.readAsDataURL(event.target.files[0]); // 读取文件内容
    });
    
    playPauseBtn.addEventListener('click', () => {
    	if (audioPlayer.paused) {
    		audioPlayer.play().catch(error => {
    			console.error('无法播放音乐:', error);
    		});
    		playPauseImg.src = pauseImgSrc; // 切换到暂停图片
    	} else {
    		audioPlayer.pause();
    		playPauseImg.src = playImgSrc; // 切换到播放图片
    	}
    });
    
    // 为下一首按钮添加点击事件监听器，点击时调用playNext函数
    document.getElementById('next-btn').addEventListener('click', playNext);
    
    // 为上一首按钮添加点击事件监听器，点击时调用playPrevious函数
    document.getElementById('prev-btn').addEventListener('click', playPrevious);
    
    // 为循环模式按钮添加点击事件监听器，点击时调用toggleLoopMode函数
    document.getElementById('loop-mode-btn').addEventListener('click', toggleLoopMode);
    
    // 为添加音乐列表按钮添加点击事件监听器
    document.getElementById('add-list-btn').addEventListener('click', () => {
    	// 获取用户输入的新列表名称
    	const newListName = document.getElementById('new-list-name').value;
    	// 如果输入了列表名称，则添加新列表到musicLists数组
    	if (newListName) {
    		musicLists.push({
    			name: newListName,
    			musics: []
    		});
    		// 更新音乐列表显示
    		displayMusicLists();
    		// 清空输入框
    		document.getElementById('new-list-name').value = '';
    	}
    });
    
    // 为删除音乐列表按钮添加点击事件监听器
    document.getElementById('delete-list-btn').addEventListener('click', () => {
    	// 如果音乐列表数组中不止一个列表，则删除当前选中的列表
    	if (musicLists.length > 1) {
    		musicLists.splice(currentListIndex, 1);
    		// 更新当前列表索引，确保不会超出数组范围
    		currentListIndex = Math.max(0, currentListIndex - 1);
    		// 更新音乐列表显示
    		displayMusicLists();
    		// 更新音乐显示
    		displayMusics();
    	}
    });
    
    // 为添加音乐按钮添加点击事件监听器
    document.getElementById('add-music-btn').addEventListener('click', function() {
    	// 触发隐藏的文件输入元素的点击事件，以便用户可以选择音乐文件
    	document.getElementById('add-music-input').click();
    });
    
    // 为文件输入元素添加变更事件监听器
    document.getElementById('add-music-input').addEventListener('change', function(event) {
    	// 获取用户选择的文件
    	const files = event.target.files;
    	// 遍历文件并添加到当前音乐列表中
    	for (let i = 0; i < files.length; i++) {
    		const file = files[i];
    		// 创建一个指向文件的URL
    		const url = URL.createObjectURL(file);
    		// 将音乐信息添加到当前音乐列表
    		musicLists[currentListIndex].musics.push({
    			name: file.name,
    			url: url
    		});
    	}
    	// 更新音乐显示
    	displayMusics();
    });
    
    // 为音乐列表选择元素添加变更事件监听器
    musicListSelect.addEventListener('change', () => {
    	// 更新当前列表索引为选择的列表的索引
    	currentListIndex = parseInt(musicListSelect.value);
    	// 更新音乐显示
    	displayMusics();
    });
    
    // 为音频播放器添加ended事件监听器，当音乐播放结束时触发
    audioPlayer.addEventListener('ended', () => {
    	// 如果循环模式是单曲循环，则重新播放当前音乐
    	if (loopMode === 'single') {
    		playMusic(currentMusicIndex);
    	} else {
    		// 否则，播放下一首音乐
    		playNext();
    	}
    });
    
    // 监听音频播放器的播放和暂停事件，以更新按钮图片
    audioPlayer.addEventListener('play', () => {
    	playPauseImg.src = pauseImgSrc;
    });
    audioPlayer.addEventListener('pause', () => {
    	playPauseImg.src = playImgSrc;
    });
    // 初始化播放器
    displayMusicLists(); // 显示音乐列表
    displayMusics(); // 显示音乐
});

