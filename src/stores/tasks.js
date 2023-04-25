import { defineStore } from 'pinia'

export default defineStore('tasks', {
  state() {
    return {
      tasks: [
        {
          title: 'Task num 1',
          status: 'Pending',
          description: '',
          user: 'AA',
          date: '20/04/2023',
          flag: true,
          favourite: true,
          url: 'task_num_1'
        },
        {
          title: 'Task num 2',
          status: 'Done',
          description: '',
          user: 'AB',
          date: '23/04/2023',
          flag: false,
          favourite: true,
          url: 'task_num_2'
        },
        {
          title: 'Task num 3',
          status: 'Pending',
          description: '',
          user: 'AC',
          date: '28/04/2023',
          flag: false,
          favourite: false,
          url: 'task_num_3'
        },
        {
          title: 'Task num 4',
          status: 'Done',
          description: '',
          user: 'AD',
          date: '22/04/2023',
          flag: false,
          favourite: true,
          url: 'task_num_4'
        },
        {
          title: 'Task num 5',
          status: 'Done',
          description: '',
          user: 'AE',
          date: '26/04/2023',
          flag: false,
          favourite: false,
          url: 'task_num_5'
        },
        {
          title: 'Task num 6',
          status: 'Done',
          description: '',
          user: 'AE',
          date: '26/04/2023',
          flag: false,
          favourite: true,
          url: 'task_num_6'
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
    _getSingleTask(taskUrl) {
      return this.tasks.filter(task => task.url === taskUrl)[0];
    },
    _getPendingTasks(){
      this.pendingTasks = this.tasks.filter(task => task.status === 'Pending');
      // return this.tasks.filter(task => task.status === 'Pending');
    },
    _getDoneTasks(){
      this.doneTasks = this.tasks.filter(task => task.status === 'Done');
      // return this.tasks.filter(task => task.status === 'Done');
    },
    _getfavouritesTasks(){
      return this.tasks.filter(task => task.favourites === true);
    },
    _getFlaggedTasks(){
      return this.tasks.filter(task => task.flag === true);
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
    _getFavouritesTasksCount(){
      return this._getfavouritesTasks().length;
    },
    _getFlaggedTasksCount(){
      return this._getFlaggedTasks().length;
    }
  }
})