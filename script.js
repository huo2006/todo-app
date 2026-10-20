// 获取元素
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 从本地读取任务
let taskArr = JSON.parse(localStorage.getItem('taskList')) || [];

// 渲染任务列表
function render() {
    taskList.innerHTML = '';
    taskArr.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${item.done ? 'checked' : ''} data-index="${index}">
            <span class="task-text ${item.done ? 'done' : ''}">${item.content}</span>
            <button class="del-btn" data-index="${index}">删除</button>
        `;
        taskList.appendChild(li);
    })
    // 保存到本地存储
    localStorage.setItem('taskList', JSON.stringify(taskArr));
}

// 添加任务
function addTask() {
    const val = taskInput.value.trim();
    if(!val) return;
    taskArr.push({
        content: val,
        done: false
    })
    taskInput.value = '';
    render();
}

// 添加按钮点击
addBtn.addEventListener('click', addTask);
// 回车添加任务
taskInput.addEventListener('keydown', e=>{
    if(e.key === 'Enter') addTask();
})

// 事件委托：勾选完成 / 删除
taskList.addEventListener('click', e=>{
    const idx = Number(e.target.dataset.index);
    if(e.target.classList.contains('checkbox')){
        taskArr[idx].done = e.target.checked;
        render();
    }
    if(e.target.classList.contains('del-btn')){
        taskArr.splice(idx,1);
        render();
    }
})

// 页面初始化渲染
render();
