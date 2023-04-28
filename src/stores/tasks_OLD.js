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
    }
  },
  actions: {
    _addTask(newTask){
      this.tasks.push(newTask);
    },
    _getSingleTask(taskUrl) {
      return this.tasks.filter(task => task.url === taskUrl)[0];
    },
    _getTasksBy(property) { // --> TIENE QUE REEMPLAZAR LOS GET PENDING TASKS Y GET DONE TASKS
      if(property === 'Pending'){
        this.pendingTasks = this.tasks.filter(task => task.status === property);
      }
      if(property === 'Done'){
        this.doneTasks = this.tasks.filter(task => task.status === 'Done');
      }
    }
  }
})