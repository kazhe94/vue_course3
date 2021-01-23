<template>
  <h1 class="text-white center" v-if="tasks.length === 0">Задач пока нет</h1>
  <template v-else>
    <loader v-if="loading"></loader>
    <h3 class="text-white">Всего активных задач: {{activeTasks.length}}</h3>
    <keep-alive>
      <div class="card"
           v-for="task in tasks"
           :key="task.id"
      >
        <h2 class="card-title">
          {{ task.title }}
          <app-status :status="task.status"></app-status>
        </h2>
        <p>
          <strong>
            <small>
              {{task.date}}
            </small>
          </strong>
        </p>
        <button class="btn primary" @click="$router.push('/task/' + task.id)">Посмотреть</button>
      </div>
    </keep-alive>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from 'vuex'
import {onMounted, computed, ref, isRef} from 'vue'
import Loader from "@/components/Loader";

export default {
  setup() {
    const store = useStore()
    const loading = ref(true)
    const tasks = computed(()=> store.getters.tasks)
    const activeTasks = computed(()=> {
      return tasks.value.filter((t)=> t.status === 'Активен')
    })

    onMounted(async ()=> {
      await store.dispatch('loadDb')
      loading.value = false
    })
    return {
      tasks,
      activeTasks,
      loading
    }
  },
  components: {AppStatus, Loader}
}
</script>
