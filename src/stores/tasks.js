import { defineStore } from 'pinia'

export default defineStore('tasks', {
  state() {
    return {
      tasks: [
        {
          title: 'Task num 1',
          status: 'Pending',
          user: 'AA',
          date: '20/04/2023'
        },
        {
          title: 'Task num 2',
          status: 'Done',
          user: 'AB',
          date: '23/04/2023'
        },
        {
          title: 'Task num 3',
          status: 'Pending',
          user: 'AC',
          date: '28/04/2023'
        },
        {
          title: 'Task num 4',
          status: 'Done',
          user: 'AD',
          date: '22/04/2023'
        },
        {
          title: 'Task num 5',
          status: 'Done',
          user: 'AE',
          date: '26/04/2023'
        }
      ],
      pendingTasks: [],
      doneTasks: []
    }
  },
  actions: {
    _addTask(newTask){
      this.tasks.push(newTask);
    },
    _removeTask(taskToRemove){
      this.tasks = this.tasks.filter(task => task.title !== taskToRemove.title);
    },
    _getPendingTasks(){
      this.pendingTasks = this.tasks.filter(task => task.status === 'Pending');
    },
    _getDoneTasks(){
      this.doneTasks = this.tasks.filter(task => task.status === 'Done');
    },

  }
})