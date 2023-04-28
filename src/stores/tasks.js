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

      this.tasks.push(data[0])
    }
  }
})
