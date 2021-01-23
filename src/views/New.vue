<template>
  <form class="card" @submit.prevent="setNewTask">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date"  id="date" v-model="date">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="desc"></textarea>
    </div>

    <button class="btn primary" :disabled="isEmpty">Создать</button>
  </form>
</template>


<script>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
  export default {
    setup() {
      const store = useStore()
      const router = useRouter()
      const title = ref('')
      const date = ref('')
      const desc = ref('')
      const isEmpty = computed(()=> {
        return title.value === '' || date.value === '' || desc.value === ''
      })


      function setNewTask() {
        store.dispatch('createNewTask', {
          id: Date.now(),
          status: new Date(date.value) < new Date() ? 'Отменён' : 'Активен',
          title: title.value,
          date: date.value,
          desc: desc.value
        })
        router.replace('/')
      }

      return {
        title,
        date,
        desc,
        setNewTask,
        isEmpty,
        store
      }
    }
  }
</script>