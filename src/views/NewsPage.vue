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
  <h1>Новости проекта</h1>

  <div class="dashboard">
    <div class="dashboard-menu">
      <div>
        <span>Профиль</span>
        <div class="profile-name"></div>
      </div>
      <div class="forum-main">
        <span>Форум</span>
      </div>
      <div class="IDFK">404:No block found</div>
      <div class="server-info">
        <div class="server-status"></div>
        <div class="server-map">map</div>
        <div class="server-online">online</div>
      </div>
      <div
        class="event-info"
        :style="{
          'background-image': `url('http://localhost:5174/event.svg')`,
          'background-position': 'center',
          'background-size': 'cover',
          'min-height': '25vh',
        }"
      >
        <div class="event-name">Name</div>
        <div class="event-waiting" style="align-self: end">waiting</div>
        <div class="event-time" style="align-self: end">time</div>
      </div>
    </div>
  </div>

  <div class="news-block">
    <ul class="pinned">
      <li>
        <h3>Name</h3>
        <div>Text</div>
      </li>
    </ul>

    <ul class="common-news">
      <li>
        <h3>Name</h3>
        <div>Text</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dashboard {
  width: 60vw;
}

.dashboard-menu {
  margin-right: 6vw;
  margin-left: 6vw;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  gap: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

.dashboard-menu > div {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 16px;
  color: white;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.dashboard-menu > div:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.dashboard-menu > div:nth-child(1) {
  /* profile block */
  background-image: url('http://localhost:5174/profile.svg');
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.dashboard-menu > div:nth-child(2) {
  /* Forum block */
  background-image: url('http://localhost:5174/forum.svg');
  background-position: center;
  background-size: cover;
}

.dashboard-menu > div:nth-child(3) {
  /* IDFK block */
  background-image: url('http://localhost:5174/IDFK.svg');
  background-position: center;
  background-size: cover;
}

.dashboard-menu > div:nth-child(4) {
  /* Server-information block */
  background-image: url('http://localhost:5174/server.svg');
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: space-around;
}

.dashboard-menu > div:nth-child(5) {
  /* Events block */
  grid-area: 1 / 3 / 3;
  display: flex;
  justify-content: space-around;
}

.news-block {
  width: min(90%);
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.news-block ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.news-block li {
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.news-block h3 {
  margin: 0 0 5px;
  font-size: 18px;
  font-weight: bold;
}

.news-block .pinned li {
  background-color: #4e58c6ff;
  color: white;
  font-weight: bold;
}

.news-block .common-news li {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.news-block li:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
}

</style>
