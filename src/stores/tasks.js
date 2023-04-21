import { defineStore } from 'pinia'

export default defineStore('tasks', {
  state() {
    return {
      tasks: [
        {
          title: 'Task num 1',
          status: 'Pending',
          user: 'AA',
          date: '20/04/2023',
          flag: true,
          favourite: true
        },
        {
          title: 'Task num 2',
          status: 'Done',
          user: 'AB',
          date: '23/04/2023',
          flag: false,
          favourite: true
        },
        {
          title: 'Task num 3',
          status: 'Pending',
          user: 'AC',
          date: '28/04/2023',
          flag: false,
          favourite: false
        },
        {
          title: 'Task num 4',
          status: 'Done',
          user: 'AD',
          date: '22/04/2023',
          flag: false,
          favourite: true
        },
        {
          title: 'Task num 5',
          status: 'Done',
          user: 'AE',
          date: '26/04/2023',
          flag: false,
          favourite: false
        },
        {
          title: 'Task num 6',
          status: 'Done',
          user: 'AE',
          date: '26/04/2023',
          flag: false,
          favourite: true
        }
      ],
      pendingTasks: [],
      doneTasks: [],
      favouriteTasks: [],
      flaggedTasks: [],
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
    _getFavouriteTasks(){
      this.favouriteTasks = this.tasks.filter(task => task.favourite === true);
    },
    _getFlaggedTasks(){
      this.doneTasks = this.tasks.filter(task => task.flag === true);
    },
    _getTotalTasksCount(){
      return this.tasks.length;
    },
    _getPendingTasksCount(){
      this._getPendingTasks();
      return this.pendingTasks.length;
    },
    _getDoneTasksCount(){
      this._getDoneTasks();
      return this.doneTasks.length;
    },
    _geFavouriteTasksCount(){
      this._getFavouriteTasks();
      return this.favouriteTasks.length;
    },
    _getFlaggedTasksCount(){
      this._getFlaggedTasks();
      return this.flaggedTasks.length;
    }
  }
})