import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      tasks: []
    }
  },
  mutations: {
      addTask(state, newTask) {
        state.tasks.push(newTask)
        console.log(new Date())
      },
      updateStatus(state, payload) {
        state.tasks.find((t)=> t.name === payload.name).status = payload.newStatus
      },
      loadFromDb(state, payload) {
        state.tasks = payload
      }
  },
  actions: {
    async updateStatusAction({commit}, payload) {
      const response = await fetch(`https://freelance-a3b9d-default-rtdb.europe-west1.firebasedatabase.app/tasks/${payload.name}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: payload.newStatus
        })
      })
      const newStatus = await response.json()
      commit('updateStatus', payload)
    },
    async createNewTask({commit}, payload) {
      const response = await fetch('https://freelance-a3b9d-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      commit('addTask', {
        name: data.name,
        ...payload,
      })
    },
    async loadDb({commit}) {
      const response = await fetch('https://freelance-a3b9d-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()

      let db = []
      if(data) {
        db = Object.keys(data).map(key=> {
          return {
            name: key,
            ...data[key]
          }
        })
      } else {
        db = []
      }
      commit('loadFromDb', db)
    },

  },
  getters: {
      tasks(state) {
        return state.tasks
      },
  }
})
