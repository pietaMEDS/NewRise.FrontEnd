<template>
  <header>
    <div id="wip">WIP | Version: SpecVersion / CFCUXUI@1.0.0</div>
    <span>Вариации дизайнов сделаны с использованием технологии LLM</span>
  </header>

  <div v-if="show" class="modal-overlay">
    <div class="modal-container">
      <h3>Спасибо за помощь</h3>
      <span>
        Этот опрос поможет мне улучшить интерфейс чата, сделав его более удобным и приятным.
        <br />
        Пожалуйста, укажите ваш email, чтобы мы могли учитывать ваше мнение.
      </span>
      <input
        v-model="email"
        type="email"
        style="text-align: center"
        placeholder="example@mail.com"
      />
      <div class="modal-actions">
        <button @click="submitEmail">Продолжить</button>
      </div>
    </div>
  </div>

  <div class="survey-container">
    <div v-if="currentDesignIndex < designs.length" class="design-view">
      <h2>Дизайн {{ currentDesignIndex + 1 }} из {{ designs.length }}</h2>
      <component :is="designs[currentDesignIndex].component" />

      <div v-if="!voteSubmitted && designs[currentDesignIndex].rate == null" class="controls">
        <button @click="vote(true)">👍 Лайк</button>
        <button @click="vote(false)">👎 Дизлайк</button>
      </div>
      <br>

      <div v-if="voteSubmitted || designs[currentDesignIndex].rate != null" class="results">
        <h3>Результаты голосования</h3>
        <p>👍 Лайков: {{ designs[currentDesignIndex].voteStats.likePercent }}% ({{ designs[currentDesignIndex].voteStats.likes }} голосов)</p>
        <p>👎 Дизлайков: {{ designs[currentDesignIndex].voteStats.dislikePercent }}% ({{ designs[currentDesignIndex].voteStats.dislikes }} голосов)</p>
        <button @click="Continue">Продолжить</button>
      </div>

      <div class="nav-buttons">
        <button @click="prevDesign" :disabled="currentDesignIndex === 0">Назад</button>
        <button @click="nextDesign" :disabled="currentDesignIndex >= designs.length - 1">Вперёд</button>
      </div>
    </div>

    <div v-else class="final-results">
      <h1>Опрос завершен</h1>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDevStore } from '@/stores/dev.js'
import ChatDesign1 from '@/components/CF_CUXUI/CF_CUXUI_Design1.vue'
import ChatDesign2 from '@/components/CF_CUXUI/CF_CUXUI_Design2.vue'
import ChatDesign3 from '@/components/CF_CUXUI/CF_CUXUI_Design3.vue'
import ChatDesign4 from '@/components/CF_CUXUI/CF_CUXUI_Design4.vue'
import ChatDesign5 from '@/components/CF_CUXUI/CF_CUXUI_Design5.vue'
import ChatDesign6 from '@/components/CF_CUXUI/CF_CUXUI_Design6.vue'
import { useNotificationsStore } from '@/stores/pushNotifications.js'

const DevStore = useDevStore()
const email = ref(null)
const show = ref(true)
const voteSubmitted = ref(false)
const designs = ref([
  { id: 1, name: 'ReportChat', component: ChatDesign1 },
  { id: 2, name: 'ForumChat', component: ChatDesign2 },
  { id: 3, name: 'LLM1', component: ChatDesign3 },
  { id: 4, name: 'LLM2', component: ChatDesign4 },
  { id: 5, name: 'Union', component: ChatDesign5 },
  { id: 6, name: 'Gta5', component: ChatDesign6 },
])

const currentDesignIndex = ref(0)
const voteStats = ref({ likes: 0, dislikes: 0, likePercent: 0, dislikePercent: 0 })

const submitEmail = () => {
  if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    useNotificationsStore().addNotification({ type: 'Error', message: 'Введите корректный email' })
    return
  }
  show.value = false
}

const vote = async (rate) => {
  try {
    const response = await fetch(`${DevStore.host}/CF_CUXUI`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        rate,
        name: designs.value[currentDesignIndex.value].name,
      }),
    })

    const data = await response.json()
    console.log('Ответ сервера:', data)

    designs.value[currentDesignIndex.value].rate = rate

    if (data.records) {
      const likes = data.records.filter((r) => r.rate === 1).length
      const dislikes = data.records.filter((r) => r.rate === 0).length
      const total = likes + dislikes

      designs.value[currentDesignIndex.value].voteStats = {
        likes,
        dislikes,
        likePercent: total ? Math.round((likes / total) * 100) : 0,
        dislikePercent: total ? Math.round((dislikes / total) * 100) : 0,
      }
    }
  } catch (e) {
    useNotificationsStore().addNotification({ type: "Error", message: "Произошла ошибка, попробуйте в следующий раз" });
  }

  voteSubmitted.value = true
}

const nextDesign = () => {
  if (currentDesignIndex.value < designs.value.length - 1) {
    voteSubmitted.value = false
    currentDesignIndex.value++
  }
}

const Continue = () => {
  voteSubmitted.value = false
  currentDesignIndex.value++
}

const prevDesign = () => {
  if (currentDesignIndex.value > 0) {
    voteSubmitted.value = false
    currentDesignIndex.value--
  }
}
</script>


<style scoped>
#wip{
  width: -webkit-fill-available;
  background-color: #5d0e13;
  color: white;
}

header {
  text-align: center;
}

.chat-container {
  border: #7265a4 4px solid;
  border-radius: 17px;
  padding: 20px;
}

.survey-container {
  text-align: center;
  padding: 20px;
}
.controls {
  margin-top: 20px;
}
button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}
button:hover {
  opacity: 0.8;
}
.results {
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
.modal-actions {
  margin-top: 15px;
}
button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
</style>
