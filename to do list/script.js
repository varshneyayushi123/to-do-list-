document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const timeInput = document.getElementById('todo-time');
    const list = document.getElementById('todo-list');
    const doneCount = document.getElementById('done-count');
    const totalCount = document.getElementById('total-count');
    const progressBar = document.querySelector('.progress-bar');
    const RADIUS = 34;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    if (progressBar) {
        progressBar.setAttribute('stroke-dasharray', CIRCUMFERENCE);
        progressBar.setAttribute('stroke-dashoffset', CIRCUMFERENCE);
    }
    function updateProgress() {
        const total = list.children.length;
        const done = Array.from(list.children).filter(li => li.classList.contains('completed')).length;
        doneCount.textContent = done;
        totalCount.textContent = total;
        let percent = total === 0 ? 0 : done / total;
        let offset = CIRCUMFERENCE * (1 - percent);
        if (progressBar) progressBar.setAttribute('stroke-dashoffset', offset);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const task = input.value.trim();
        const time = timeInput.value;
        if (task) {
            addTask(task, time);
            input.value = '';
            timeInput.value = '';
            updateProgress();
        }
    });

    function addTask(task, time) {
        const li = document.createElement('li');
        // Create checkmark button
        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';
        checkmark.innerHTML = `<svg width="14" height="14" viewBox="0 0 20 20"><polyline points="4,11 8,15 16,6" style="fill:none;stroke:#ff6f91;stroke-width:2" /></svg>`;
        checkmark.onclick = function() {
            li.classList.toggle('completed');
            updateProgress();
        };
        li.appendChild(checkmark);
        // Task text
        const taskText = document.createElement('span');
        taskText.textContent = task;
        li.appendChild(taskText);
        // Time (if provided)
        if (time) {
            const timeSpan = document.createElement('span');
            timeSpan.textContent = ' [' + time + ']';
            timeSpan.style.color = '#ff6f91';
            timeSpan.style.fontSize = '0.95em';
            timeSpan.style.marginLeft = '0.5em';
            li.appendChild(timeSpan);
        }
        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className = 'delete-btn';
        delBtn.onclick = function() {
            li.style.animation = 'fadeOutTask 0.4s forwards';
            setTimeout(() => {
                list.removeChild(li);
                updateProgress();
            }, 350);
        };
        li.appendChild(delBtn);
        // Animation for new task
        li.style.animation = 'fadeInTask 0.5s';
        list.appendChild(li);
        updateProgress();
    }

    // Add fadeOut animation
    const style = document.createElement('style');
    style.innerHTML = `@keyframes fadeOutTask { from { opacity: 1; height: 40px; } to { opacity: 0; height: 0; margin: 0; padding: 0; } }`;
    document.head.appendChild(style);
}); 