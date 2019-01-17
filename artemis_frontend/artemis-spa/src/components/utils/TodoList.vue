<template>

    <div class="todo-container">
        <header class="current-date">
            <div class="date">
                <span class="day-number">{{ date.dayNum }}</span>
                <div class="month-year-wrapper">
                <span class="month">{{ date.month }}</span>
                <span class="year">{{ date.year }}</span>
                </div>
            </div>
            <div class="today"><span>{{ date.dayName }}</span></div>
        </header>
        <main class="todo-list">
        <ul class="tasks-container">
            <li class="task-container" v-for="task in tasks" v-bind:key="task" :class="{ checked: !task.state }">
            <p class="task">{{ task.name }}</p>
            <input type="radio" v-on:click="checkTask" />
            </li>
        </ul>
        </main>
        <button class="add-task-btn" v-on:click="addTask">
        <span>+</span>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tasks: [],
            task: '',
            date: {
                dayNum: '',
                month: '',
                year: '',
                dayName: ''
            }
        }
    },
    mounted: function() {
        this.getCurrentDay()
    },
    methods: {
        getCurrentDay: function() {
        const today = new Date()
        let dayName = moment(today).format('dddd')
        
        let [ monthDay, year ] = moment().format('ll').split(',')
        let [ month, day ] = monthDay.split(' ')
        
        month = month.toUpperCase()
        dayName = dayName.toUpperCase()
        
        this.date.dayNum = day
        this.date.month = month
        this.date.year = year
        this.date.dayName = dayName
        },
        addTask() {
            const inputTask = prompt('Añade una tarea')
            if(inputTask) {
                var objTask = {
                    name: inputTask,
                    state: true
                }
                this.tasks.unshift(objTask)
            }
        },
        checkTask(e){
        const taskElement = e.target.parentNode
        taskElement.classList.toggle('checked')
        }
    },
    computed: {
    }
}
</script>

<style>

</style>