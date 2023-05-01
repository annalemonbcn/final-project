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
          is_flagged: newTask.is_flagged
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
    async _markAsDone(task_id) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: true })
        .eq('id', task_id)
        .select()

      if (error) {
        console.error(error)
        return
      }

      // Update local state
      const taskToUpdate = this.tasks.find((task) => task.id === task_id)
      this.tasks = this.tasks.filter((task) => task.id !== taskToUpdate.id)
      this.tasks.push(data[0])
      console.log(this.tasks)
    },
    async _markAsFlag(task_id) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_flagged: true })
        .eq('id', task_id)
        .select()

      if (error) {
        console.error(error)
        return
      }

      // Update local state
      const taskToUpdate = this.tasks.find((task) => task.id === task_id)
      this.tasks = this.tasks.filter((task) => task.id !== taskToUpdate.id)
      this.tasks.push(data[0])
      console.log(this.tasks)
    },
    async _updateTask(task) {
      console.log(task);
      const { data, error } = await supabase
        .from('tasks')
        .update({
          title: task.title,
          user_id: task.user_id,
          is_complete: task.is_complete,
          url: task.url,
          limit_date: task.limit_date,
          description: task.description,
          is_flagged: task.is_flagged,
        })
        .eq('id', task.id)
        .select()

      if(error){
        console.error(error)
        return
      }

      // Update local state
      const taskToUpdate = this.tasks.find((task) => task.id === task.id)
      this.tasks = this.tasks.filter((task) => task.id !== taskToUpdate.id)
      this.tasks.push(data[0])
    }
  }
})
