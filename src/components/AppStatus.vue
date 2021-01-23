<template>
  <span :class="['badge', classType]">{{status}}</span>
</template>

<script>
import {computed, onMounted} from 'vue'
 export default {
   props: ['status'],
   setup(props) {
     const classType = computed(()=> {
       if(props.status === 'Активен' || props.status === 'Завершён') {
         return 'primary'
       } else if (props.status === 'Выполняется') {
         return 'warning'
       } else if (props.status === 'Отменён') {
         return 'danger'
       }
     })
     return {
       classType
     }
   }
 }
</script>