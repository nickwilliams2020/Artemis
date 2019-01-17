<template>
    <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h2 class="title"> Your Tasks</h2>
        </div>
      </div>
    </section>
    <section class="section">
        <div class="todo-container container">
            <header class="current-date">
                 <div class="today"><span>{{ date.dayName }}</span></div>
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
                <li class="task-container" v-for="(task, idx) in tasks" :key="idx" :class="{ checked: !task.state }">
                <p class="task">{{ task.name }}</p>
                    <vs-button color="success" type="border" @click="checkTask">Complete</vs-button>
                </li>
            </ul>
            </main>
            <button class="add-task-btn" v-on:click="activePrompt=true">
            <span>+</span>
            </button>
            <vs-prompt
                @vs-cancel="task=''"
                @vs-accept="acceptAlert"
                @vs-close="close"
                :vs-active.sync="activePrompt"
                vs-title="New Task"
                vs-accept-text="Add"
                vs-color="success">
                <div class="con-exemple-prompt">
                    What do you need to do?
                    <vs-input  placeholder="New Task..." vs-placeholder="New Task..." v-model="task"/>
                </div>
            </vs-prompt>
        </div>
    </section>
        
    </div>
   
</template>

<script>
import moment from 'moment'
export default {
    name: 'Todo',
    data() {
        return {
            activePrompt: false,
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
    mounted() {
        this.getCurrentDay()
    },
    methods: {
        acceptAlert(){
            this.addTask(this.task);
            this.$vs.notify({
                color:'success',
                title:'Task Added',
                text:'You\'ve got this!'
            })
        },
        close() {
            this.$vs.notify({
                color:'danger',
                title:'Canceled',
                text:''
            })
        },
        getCurrentDay() {
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
        addTask(inputTask) {
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
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .con-exemple-prompt {
        padding: 10px;
        padding-bottom: 0px;
       
    }
    .vs-input {
            width: 100%;
            margin-top: 10px;
    }

    .welcome-lading {
        width: 100%;
        height: 100%;
    }

    /* body {
        background-color: var(--body-bkg);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        color: var(--text-color);
    } */

    .todo-container {
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.18);
        height: 36em; 
        padding: 2em;
        position: relative;
        width: 40em;
    }

    ul {
        list-style: none;
    }

    p {
        margin: 0;
    }

    .todo-container {
        background-color: var(--todo-bkg);
    }

    header {
        align-items: center;
        display: flex;
        justify-content: space-between;
    }

    header .date {
        display: flex;
        justify-content: space-between;
        width: 22%;
    }

    header .date .day-number {
        font-size: 2em;
        font-weight: bold;
        line-height: 1em;
    }

    header .date .month-year-wrapper {
        align-items: center;
        display: flex;
        flex-direction: column;
        font-size: .8em;
    }

    header .date .month-year-wrapper .month {
        font-weight: bold;
    }

    header .today {
        font-weight: 100;
    }

    /*TODO BODY*/
    main.todo-list {
        margin-top: 1em;
    }

    main.todo-list .tasks-container {
        overflow-y: auto;
        max-height: 260px;
    }

    main.todo-list .tasks-container li.task-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .7em;
    }

    li.task-container.checked p {
        color: var(--text-unselected-color);
        text-decoration: line-through;
        transition: all 500ms ease-in-out;
    }

    li.task-container.checked input {
        border-color: var(--control-color);
        transition: all 500ms ease-in-out;
    }

    input[type="radio"] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        
        border: 3px solid var(--text-unselected-color);
        border-radius: 50%;
        cursor: pointer;
        width: 25px;
        height: 25px;
        outline: none;
    }

    button.add-task-btn {
        background-color: var(--control-color);
        border: none;
        border-radius: 50%;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.18);
        cursor: pointer;
        height: 90px;
        width: 90px;
        position: absolute;
        bottom: -45px;
        left: calc(300px - 45px);
        outline: none;
        transition: 200ms ease-in-out;
    }

    button.add-task-btn span {
        font-size: 3em;
        font-weight: bold;
        color: #46BE8B;
        font-family: none;
    }

    button.add-task-btn:active {
        transform: scale(.9);
    }
</style>