<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  color: #d9534f;
}
p {
  font-size: 18px;
  color: #333;
}
.button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #0275d8;
  text-decoration: none;
  border-radius: 5px;
}
.button:hover {
  background-color: #025aa5;
}
</style>

<template>
  <div class="container">
    <h1>Ошибка 423</h1>
    <p>Доступ к этому ресурсу временно заблокирован.</p>
    <p>Попробуйте позже или свяжитесь с администратором.</p>
    <a href="/" class="button">На главную</a>
  </div>
</template>

<script setup lang="ts"></script>
