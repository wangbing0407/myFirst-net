<template>
  <div>
    <Sum />
    <Person />
  </div>
</template>

<script>
import Sum from './store_case/Sum.vue'
import Person from './store_case/Person.vue'
export default {
  name: 'sum',
  data() {
    return {

    }
  },
  components:{
    Sum,
    Person
  }
}
</script>

<style>

</style>