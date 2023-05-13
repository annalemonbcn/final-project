import { defineStore } from 'pinia'
import supabase from '../supabase/index'

export default defineStore('tasks', {
  state() {
    return {
      tasks: []
    }
  },
  getters: {
    getTaskById: (state) => {
      return (taskUrl) => {
        return state.tasks.filter((task) => task.id === Number(taskUrl))[0]}
    },
    completedTasks: (state) => {
      return state.tasks.filter((task) => task.is_complete)
    },
    pendingTasks: (state) => {
      return state.tasks.filter((task) => !task.is_complete)
    }
  },
  actions: {
    async _fetchTasks() {
      const { data, error } = await supabase.from('tasks').select()

      if (error) {
        throw error
      }

      this.tasks = data
    },
    async _addNewTask(newTask) {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: newTask.title,
          user_id: newTask.user_id,
          is_complete: newTask.is_complete,
          limit_date: newTask.limit_date,
          description: newTask.description,
          is_flagged: newTask.is_flagged
        })
        .select()

      if (error) {
        throw error
      }

      // Update local state
      this.tasks.push(data[0])
    },
    async _alternateDone(task_id, is_complete) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: !is_complete })
        .eq('id', task_id)
        .select()

      if (error) {
        throw error
      }

      // Update local state
      const taskToUpdate = this.tasks.find((task) => task.id === task_id)
      this.tasks = this.tasks.filter((task) => task.id !== taskToUpdate.id)
      this.tasks.push(data[0])
    },
    async _alternateFlag(task_id, is_flagged) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_flagged: !is_flagged })
        .eq('id', task_id)
        .select()

      if (error) {
        throw error
      }

      // Update local state
      const taskToUpdate = this.tasks.find((task) => task.id === task_id)
      this.tasks = this.tasks.filter((task) => task.id !== taskToUpdate.id)
      this.tasks.push(data[0])
    },
    async _updateTask(task_id, task) {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          title: task.title,
          limit_date: task.limit_date,
          description: task.description,
        })
        .eq('id', task_id)
        .select()

      if (error) {
        throw error
      }

      // Update local state
      const taskToUpdate = this.tasks.findIndex((task) => task.id === task_id)
      this.tasks[taskToUpdate].title = task.title;
      this.tasks[taskToUpdate].limit_date = task.limit_date;
      this.tasks[taskToUpdate].description = task.description;
    },
    async _deleteTask(task_id) {
      const { error } = await supabase.from('tasks').delete().eq('id', task_id)

      if (error) {
        throw error
      }

      // Update local state
      const taskToDelete = this.tasks.find(task => task.id === task_id)
      this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id)
    }
  }
})