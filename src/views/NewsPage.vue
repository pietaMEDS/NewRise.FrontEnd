<script setup>
import { useContextAditionsActionsStore } from '@/stores/contextFunctions'
import { onMounted, onUnmounted, ref } from 'vue'
import * as bootstrap from 'bootstrap'
import { useAuthStore } from '@/stores/auth.js'


const contextActionsStore = useContextAditionsActionsStore()
const authStore = useAuthStore()
const pageActions = [
  // {
  //   name: 'Additional function',
  //   action: async function () {
  //     console.log('Ha Ha Easy')
  //   },
  // },
]

onUnmounted(() => {
  contextActionsStore.setAction(null)
})

</script>

<template>
  <h1>
    Новости проекта
  </h1>

  <div class="dashboard">
    <div class="dashboard-menu">
      <div>Profile block [name, level, Design]</div>
      <div>Forum block [split:[main, topic]]</div>
      <div>404:No block found</div>
      <div>Server-information block:[status, map, online]</div>
<!--      <div :style="{background-image:url('https://i.imgur.com/Drm3hDc.png')}`">Events block [name, image, waiting, time]</div>-->
    </div>
  </div>

  <div class="news-block">
    <ul class="pinned">
      <li>
        Pinned news
      </li>
    </ul>

    <ul class="common-news">
      <li>
        news
      </li>
    </ul>
  </div>
</template>

<style scoped>

.dashboard {
  width: 60vw;
}

/* Основные стили для контейнера dashboard */
.dashboard-menu {
  margin-right: 6vw;
  margin-left: 6vw;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  gap: 20px; /* Расстояние между блоками */
  padding: 20px; /* Отступы внутри контейнера */
  background-color: #f4f4f4; /* Цвет фона */
  border-radius: 10px; /* Скругление углов */
  font-family: Arial, sans-serif; /* Шрифт */
}

/* Стили для внутренних блоков */
.dashboard-menu > div {
  background-color: #ffffff; /* Цвет фона блока */
  border-radius: 8px; /* Скругление углов */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Тень */
  text-align: center; /* Выравнивание текста по центру */
  font-size: 16px; /* Размер текста */
  color: #333; /* Цвет текста */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Анимация при наведении */
}

/* Эффект при наведении на блок */
.dashboard-menu > div:hover {
  transform: translateY(-5px); /* Сдвиг блока вверх */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Увеличение тени */
}

.dashboard-menu > div:nth-child(1) { /* profile block */
  background-color: #e3f2fd;
}

.dashboard-menu > div:nth-child(2) {/* Forum block */
  background-color: #fff3e0;
}

.dashboard-menu > div:nth-child(3) {/* - block */
  background-color: #fbe9e7;
}

.dashboard-menu > div:nth-child(4) {/* Server-information block */
  background-color: #e8f5e9;
}

.dashboard-menu > div:nth-child(5) {/* Events block */
  grid-area: 1 / 3 / 3;
  background-color: #f3e5f5;
}
</style>
