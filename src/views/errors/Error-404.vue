<template>
  <div class="not-found-container">
    <h1>404</h1>
    <p>Упс! Страница не найдена.</p>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  color: #333;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: #007bff;
}

p {
  font-size: 1.5rem;
  margin: 10px 0;
}

router-link {
  font-size: 1.2rem;
  color: #007bff;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
