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
      return this.tasks.filter(task => task.status === 'Pending');
    },
    _getDoneTasks(){
      return this.tasks.filter(task => task.status === 'Done');
    },
    _getFavouriteTasks(){
      return this.tasks.filter(task => task.favourite === true);
    },
    _getFlaggedTasks(){
      return this.tasks.filter(task => task.flag === true);
    },
    _getTotalTasksCount(){
      return this.tasks.length;
    },
    _getPendingTasksCount(){      
      return this._getPendingTasks().length;
    },
    _getDoneTasksCount(){
      return this._getDoneTasks().length;
    },
    _geFavouriteTasksCount(){
      return this._getFavouriteTasks().length;
    },
    _getFlaggedTasksCount(){
      return this._getFlaggedTasks().length;
    }
  }
})