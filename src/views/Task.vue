<template>
  <div class="card" v-if="openedTask">
    <h2>{{ openedTask.title }}</h2>
    <p>
      <strong>Статус</strong>: <app-status :status="openedTask.status"></app-status>
    </p>
    <p><strong>Дэдлайн</strong>: {{ openedTask.date}}</p>
    <p><strong>Описание</strong>: {{ openedTask.desc }}</p>
    <div>
      <button class="btn" @click="changeStatus('Выполняется')">Взять в работу</button>
      <button class="btn primary" @click="changeStatus('Завершён')">Завершить</button>
      <button class="btn danger" @click="changeStatus('Отменён')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{linkId}}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
export default {
  components: {AppStatus},
  setup(){
    const store = useStore()
    const route = useRoute()
    const linkId = +route.params.taskId
    const openedTask = store.state.tasks.find((t)=> t.id === linkId)

    function changeStatus(stat) {
      store.dispatch('updateStatusAction', {
        id: openedTask.id,
        name: openedTask.name,
        newStatus: stat
      })
    }

    return {
      openedTask,
      linkId,
      changeStatus
    }
  }
}
</script>

<style scoped>

</style>