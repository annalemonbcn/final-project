import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore('tasks', {
  state() {
    return {
      tasks: []
    }
  },
  actions: {
    async _fetchTasks() {
      const { data, error } = await supabase.from('tasks').select()

      if (error) {
        console.error(error)
        return
      }

      console.log('all tasks from supabase -->', data)
      this.tasks = data
    },
    async _addNewTask(newTask) {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: newTask.title,
          user_id: newTask.user_id,
          is_complete: newTask.is_complete,
          url: newTask.url,
          limit_date: newTask.limit_date,
          description: newTask.description,
          is_flagged: newTask.is_flagged,
          is_favourite: newTask.is_favourite
        })
        .select()

      if (error) {
        console.error(error)
        return
      }

      // Update local state
      this.tasks.push(data[0])
    },
    _getSingleTask(url) {
      return this.tasks.filter((task) => task.url === url)[0]
    },
    async _markTaskDone(task_id) {
      const { data, error } = await supabase
        .from('tasks')
        .update(
          { is_complete: true }
          )
        .eq('id', task_id)
        .select()

      if (error) {
        console.error(error)
        return
      }

      // console.log(data[0])
        
      // Update local state
      const taskToUpdate = this.tasks.find(task => task.id === task_id);
      this.tasks = this.tasks.filter(task => task.id !== taskToUpdate.id);
      this.tasks.push(data[0]);
      console.log(this.tasks)
    }
  }
})
