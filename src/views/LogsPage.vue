<template>
  <div class="btn-group" role="group" aria-label="Basic example">
    <button
      type="button"
      @click="addToActivity(activity)"
      class="btn btn-secondary"
      :class="{ active: selectedActivities.includes(activity) }"
      v-for="activity in activities"
      :key="activity"
    >
      {{ activity }}
    </button>
  </div>
  <div class="btn-group" role="group" aria-label="Basic example">
    <button
      type="button"
      @click="addToType(type)"
      class="btn btn-secondary"
      :class="{ active: selectedTypes.includes(type) }"
      v-for="type in types"
      :key="type"
    >
      {{ type }}
    </button>
  </div>

  <div class="btn-group" role="group" aria-label="Basic example">
    <button
      type="button"
      @click="addToOrder(order)"
      class="btn btn-secondary"
      :class="{ active: selectedOrders.includes(order) }"
      v-for="order in orders"
      :key="order"
    >
      {{ order }}
    </button>
  </div>

  <table>
    <thead>
      <tr>
        <th>type</th>
        <th>data</th>
        <th>created_at</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="log in logs" :key="log.id">
        <td>{{ log.type }}</td>
        <td>{{ log.data }}</td>
        <td>{{ log.created_at }}</td>
      </tr>
    </tbody>
  </table>
  <div>
    <span></span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDevStore } from '@/stores/dev'

const route = useRoute()
const authStore = useAuthStore()
const logs = ref([])
const activities = ['*', 'create', 'update', 'delete']
const types = ['*', 'message', 'user', 'forum']
const orders = ['15', '30', '50', '100']
const selectedOrders = ref('15')
const selectedActivities = ref('*')
const selectedTypes = ref('*')
const currentPage = 1
const TotalRows = ref(15)
const TotalPage = parseInt(TotalRows.value / selectedOrders.value) + 1
const PageInfo = ref()

const addToActivity = function (activity) {
  selectedActivities.value = activity
  fetchLogs()
}

const addToType = function (type) {
  selectedTypes.value = type
  fetchLogs()
}

const addToOrder = function (order) {
  selectedOrders.value = order
  fetchLogs()
}

const fetchLogs = async () => {
  const logId = route.params.id
  try {
    const response = await fetch(
      `${useDevStore().host}/logs/${logId}?activity=${selectedActivities.value}&type=${selectedTypes.value}&order=${selectedOrders.value}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch logs')
    }

    const data = await response.json()
    logs.value = data.logs
    TotalRows.value = data.count
    PageInfo.value = data
  } catch (error) {
    logs.value = []
    console.error('Error fetching logs:', error)
  }
}

onMounted(() => {
  fetchLogs()
})
</script>

<style>
header {
  display: none;
}
footer {
  display: none;
}

.btn-group {
  margin: 1rem 0;
  gap: 0.5rem;
}

.btn-group .btn {
  border-radius: 4px;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.btn-group .btn.active {
  background-color: #4a5568;
  color: white;
}

.btn-group .btn:hover {
  background-color: #718096;
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

thead {
  background-color: #f7fafc;
}

th {
  text-align: left;
  padding: 1rem;
  font-weight: 600;
  color: #4a5568;
  border-bottom: 2px solid #e2e8f0;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: #f7fafc;
}
</style>
