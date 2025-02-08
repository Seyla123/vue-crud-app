<script>
export default {
  data(){
    return {
      name:"seav seyla",
      tasks:["task1","task2","task3"],
      status:"pending",
      googleLink:'https://google.com'
    }
  }
}
</script>
<template>
  <header>
    <p>Hello <span>{{ name }}</span></p>
    <h1>
      This Task 
    </h1>
    <div>
      <p v-for="task in tasks" :key="task">{{ task }}</p>
    </div>
    <p v-if="status==='pending'">User is pending</p>
    <p v-else-if="status==='active'">User is active</p>
    <p v-else>User is Inactive</p>

    <a :href="googleLink">google</a>

  </header>
</template>
<style scoped>
p {
  color: red;
}
span {
  color: blue;
}
</style>

