<template>
  <div v-if="userVerified" class="admin-page">
    <nav class="navigation-menu">
      <ul>
        <li v-if="selectedTab.tabletabs" @click="selectedTab.tabletabs = null">
          <i class="bi bi-house-door"></i>
        </li>
        <li v-for="tab in tabs" v-bind:key="tab.id" @click="FetchData(tab)">{{ tab.name }}</li>
      </ul>
    </nav>
    <div class="content">
      <table v-if="selectedTab.tabletabs">
        <tr>
          <td v-for="tabItem in selectedTab.tabletabs" v-bind:key="tabItem.id">
            {{ tabItem.name }}
          </td>
          <td>Action</td>
        </tr>
        <tr v-for="item in tabData" v-bind:key="item.id">
          <td v-for="tabItem in selectedTab.tabletabs" v-bind:key="tabItem.id">
            {{ GetResourceData(item, tabItem) }}
          </td>
          <td class="actions-button">
            <button @click="OpenEditModal(item)" class="btn btn-warning">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button @click="OpenViewModal(item)" class="btn btn-primary">
              <i class="bi bi-eye"></i>
            </button>
            <button @click="OpenDeleteModal(item)" class="btn btn-danger">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </table>
      <div class="Statistic" v-else>
        <button @click="activityCtxRefresh"><i class="bi bi-arrow-clockwise"></i></button>
        <canvas id="Activity">{{ activityCtxRefresh() }} </canvas>
      </div>
    </div>

    <div v-if="selectedImageView" :style="'Z-index:' + (windowTop + 20)" class="image-viewer">
      <div class="windowImageView">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-search"></i> Image_View
              <span class="Headerusername"></span>
            </h5>
            <button type="button" class="window-close" @click="CloseImageView">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="modal-body">
            <img :src="selectedImageView" alt="ViewImage" />
          </div>
        </div>
        <div class="resetBtn">
          <button>Сбросить изображение</button>
        </div>
      </div>
    </div>
    <!--
/****************
 * DELETE MODEL *
 ****************/
 -->
    <div v-if="deleteData" class="deleteBack" :style="'z-index:' + windowTop + 60">
      <div class="modal-dialog CustModal" id="CustModal">
        <div class="modal-content" id="DID_NoId">
          <!--
        /*************************
        * DELETE USER TYPE HEADER *
        *************************/
-->
          <div class="modal-header" v-if="deleteData.type == 'user'">
            <h5 class="modal-title">
              <i class="bi bi-search"></i> Delete_User ->
              <span class="Headerusername">{{ deleteData.login }}</span>
            </h5>
            <button type="button" class="window-close" @click="deleteData = null">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <!--
        /*************************
        * DELETE ALL TYPE HEADER *
        *************************/
-->
          <div class="modal-header" v-else @mousedown="onMouseDown">
            <h5 class="modal-title">
              <i class="bi bi-search"></i> Edit ->
              <span class="Headerusername">{{ deleteData.typeName }} -> {{ deleteData.id }}</span>
            </h5>
            <button type="button" class="window-close" @click="deleteData = null">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <!--
        /*************************
        * DELETE USER TYPE BODY *
        *************************/
-->
          <div class="modal-body" v-if="deleteData.type == 'user'">
            <div class="user-info">
              <div class="user-avatar">
                <img v-if="deleteData.avatar" :src="deleteData.avatar.path" alt="User Avatar" />
                <img v-else src="/src/assets/users/default.png" alt="User Avatar" />
              </div>
              <div class="user-details">
                <h6>{{ deleteData.name }}</h6>
                <p>{{ deleteData.role.name }}</p>
                <div class="progress" v-if="deleteData.progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    :style="
                      'width:' +
                      deleteData.progress.current_xp / (deleteData.progress.max_xp * 0.01) +
                      '%'
                    "
                    :width="deleteData.progress.current_xp / (deleteData.progress.max_xp * 0.01)"
                    :aria-valuenow="deleteData.progress.current_xp"
                    aria-valuemin="0"
                    :aria-valuemax="deleteData.progress.max_xp"
                  ></div>
                </div>
                <div style="text-align: center">
                  <span v-if="deleteData.progress"
                    >{{ deleteData.progress.current_xp }}/{{ deleteData.progress.max_xp }} ({{
                      deleteData.progress.current_xp / (deleteData.progress.max_xp * 0.01)
                    }}%) {{ deleteData.rank.name }}</span
                  >
                  <span style="background-color: rgb(0 0 0 / 37%); padding: 2px" v-else>
                    Не имеет ранга
                  </span>
                </div>
              </div>
            </div>
            <div class="additional_info">
              <div class="email_container">
                <h5>
                  Email
                  <span v-if="deleteData.email_verified_at == null" class="NotVerified"
                    ><i class="bi bi-x" style="width: 1px"></i>not verified<i
                      class="bi bi-x"
                      style="width: 1px"
                    ></i></span
                  ><span v-else class="Verified"><i class="bi bi-check-lg"></i></span>
                </h5>
                {{ deleteData.email }}
              </div>
              <div>
                <h5>Created:</h5>
                {{ new Date(deleteData.created_at).toLocaleDateString() }}
              </div>
              <div>
                <h5>Updated:</h5>
                {{ new Date(deleteData.updated_at).toLocaleDateString() }}
              </div>
            </div>
            <hr />
            <h2 class="danger">Вы точно хотите удалить запись?</h2>
            <div class="actions">
              <button class="deleteBtn">Удалить</button>
              <button class="cancelBtn" @click="deleteData = null">Отмена</button>
            </div>
          </div>
          <!--
        /*************************
        * DELETE ALL TYPE BODY *
        *************************/
-->
          <div class="modal-body" v-else>
            <div v-for="(item, index) in deleteData" :key="index">
              <div v-if="index == 'id'"></div>
              <div v-if="index == 'text'" class="post-content">
                Сообщение:
                <p
                  class="post-content"
                  v-for="(postText, postTextIndex) in deleteData[index].split(`\n`)"
                  v-bind:key="postTextIndex"
                >
                  {{ postText }}
                </p>
              </div>
              <div v-if="index == 'status'">Status: {{ deleteData[index] }}</div>
              <div v-if="index == 'creator'">
                Creator: <span class="user"> {{ deleteData[index].name }} </span>
              </div>
              <div v-if="index == 'forum'">
                Форум: <span class="forum">{{ deleteData[index].name }}</span>
              </div>
              <div v-if="index == 'reaction'">
                <div v-if="deleteData[index]">
                  Ответ на: <span class="msgReact"> {{ deleteData[index].text }} </span>
                </div>
              </div>
              <div class="dates">
                <div v-if="index == 'created_at'">
                  Создано: {{ NormalizeDate(deleteData[index]) }}
                </div>
                <div v-if="index == 'updated_at'">
                  Изменено: {{ NormalizeDate(deleteData[index]) }}
                </div>
              </div>
            </div>
            <hr />
            <h2 class="danger">Вы точно хотите удалить запись?</h2>
            <div class="actions">
              <button class="deleteBtn">Удалить</button>
              <button class="cancelBtn" @click="deleteData = null">Отмена</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
      /***************
      * EDIT WINDOW *
      ***************/
-->
    <div
      v-for="(windowData, index) in editWindowsData"
      :key="index"
      class="modal-dialog CustModal"
      id="CustModal"
    >
      <div v-if="windowData != null" class="modal-content" :id="'EID_' + windowData.id + index">
        <!--
        /*************************
        * EDIT USER TYPE HEADER *
        *************************/
-->
        <div class="modal-header" v-if="windowData.type == 'user'" @mousedown="onMouseDown">
          <h5 class="modal-title">
            <i class="bi bi-pencil-square"></i> Edit_User ->
            <span class="Headerusername">{{ windowData.login }}</span>
          </h5>
          <button type="button" class="window-close" @click="editWindowsData[index] = null">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <!--
        /*************************
        * EDIT ALL TYPE HEADER *
        *************************/
-->
        <div class="modal-header" v-else @mousedown="onMouseDown">
          <h5 class="modal-title">
            <i class="bi bi-search"></i> Edit ->
            <span class="Headerusername">{{ windowData.typeName }} -> {{ windowData.id }}</span>
          </h5>
          <button type="button" class="window-close" @click="editWindowsData[index] = null">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <!--
        /*************************
        * EDIT USER TYPE BODY *
        *************************/
-->
        <div class="modal-body" v-if="windowData.type == 'user'">
          <form @submit.prevent="submitEditForm">
            <div class="user-info">
              <div class="user-avatar edit-avatar" @click="SelectImageView(windowData.avatar)">
                <img v-if="windowData.avatar" :src="windowData.avatar.path" alt="User Avatar" />
                <img v-else src="/src/assets/users/default.png" alt="User Avatar" />
                <i class="bi bi-pencil-fill hover-active"></i>
              </div>
              <div class="user-details">
                <h6><input type="text" v-model="windowData.name" placeholder="Name" /></h6>
                <p>
                  <span>Role:</span>
                  <select v-model="windowData.role.id">
                    <option v-for="role in rolesData" :key="role.id" :value="role.id">
                      {{ role.name }}
                    </option>
                  </select>
                </p>
                <div class="progress" v-if="windowData.progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    :style="
                      'width:' +
                      windowData.progress.current_xp / (windowData.progress.max_xp * 0.01) +
                      '%'
                    "
                    :width="windowData.progress.current_xp / (windowData.progress.max_xp * 0.01)"
                    :aria-valuenow="windowData.progress.current_xp"
                    aria-valuemin="0"
                    :aria-valuemax="windowData.progress.max_xp"
                  ></div>
                </div>
                <div style="text-align: center">
                  <span v-if="windowData.progress"
                    >{{ windowData.progress.current_xp }}/{{ windowData.progress.max_xp }} ({{
                      windowData.progress.current_xp / (windowData.progress.max_xp * 0.01)
                    }}%) {{ windowData.rank.name }}</span
                  >
                  <span style="background-color: rgb(0 0 0 / 37%); padding: 2px" v-else>
                    Не имеет ранга
                  </span>
                </div>
              </div>
            </div>
            <div class="additional_info">
              <div class="email_container">
                <h5>
                  Email
                  <span v-if="windowData.email_verified_at == null" class="NotVerified"
                    ><i class="bi bi-x" style="width: 1px"></i>not verified<i
                      class="bi bi-x"
                      style="width: 1px"
                    ></i></span
                  ><span v-else class="Verified"><i class="bi bi-check-lg"></i></span>
                </h5>
                <input type="email" v-model="windowData.email" placeholder="Email" />
              </div>
            </div>
            <div class="actions-buttons">
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
        <!--
        /*************************
        * EDIT ALL TYPE BODY *
        *************************/
-->
        <div class="modal-body" v-else>
          <div v-for="(item, index) in windowData" :key="index">
            <div v-if="index == 'id'"></div>
            <div v-if="index == 'text'" class="edit-post-content">
              Сообщение:
              <br />
              <textarea v-model="windowData.text"></textarea>
            </div>
            <div v-if="index == 'status'">Status: {{ windowData[index] }}</div>
            <div v-if="index == 'creator'">
              Creator: <span class="user"> {{ windowData[index].name }} </span>
            </div>
            <div v-if="index == 'forum'">
              Форум: <span class="forum">{{ windowData[index].name }}</span>
            </div>
            <div v-if="index == 'reaction'">
              <div v-if="windowData[index]">
                Ответ на: <span class="msgReact"> {{ windowData[index].text }} </span>
              </div>
            </div>
            <div class="dates">
              <div v-if="index == 'created_at'">
                Создано: {{ NormalizeDate(windowData[index]) }}
              </div>
              <div v-if="index == 'updated_at'">
                Изменено: {{ NormalizeDate(windowData[index]) }}
              </div>
            </div>
          </div>
        </div>
        <div class="resize-handle" @mousedown="onResizeMouseDown('EID_' + windowData.id + index)">
          <i class="bi bi-textarea-resize"></i>
        </div>
      </div>
    </div>
    <!--

/***************
 * VIEW WINDOW *
 ***************/
    -->
    <div
      v-for="(windowData, index) in viewWindowsData"
      :key="index"
      class="modal-dialog CustModal"
      id="CustModal"
      @click="windowToTop"
    >
      <div v-if="windowData != null" class="modal-content" :id="'VID_' + windowData.id + index">
        <!--
        /*************************
        * VIEW USER TYPE HEADER *
        *************************/
-->
        <div class="modal-header" v-if="windowData.type == 'user'" @mousedown="onMouseDown">
          <h5 class="modal-title">
            <i class="bi bi-search"></i> View_User ->
            <span class="Headerusername">{{ windowData.login }}</span>
          </h5>
          <button type="button" class="window-close" @click="viewWindowsData[index] = null">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <!--
        /*************************
        * VIEW All TYPE HEADER *
        *************************/
  -->
        <div class="modal-header" v-else @mousedown="onMouseDown">
          <h5 class="modal-title">
            <i class="bi bi-search"></i> View ->
            <span class="Headerusername">{{ windowData.typeName }} -> {{ windowData.id }}</span>
          </h5>
          <button type="button" class="window-close" @click="viewWindowsData[index] = null">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <!--
        /*************************
        * VIEW USER TYPE BODY *
        *************************/
-->
        <div class="modal-body" v-if="windowData.type == 'user'">
          <div class="user-info">
            <div class="user-avatar">
              <img v-if="windowData.avatar" :src="windowData.avatar.path" alt="User Avatar" />
              <img v-else src="/src/assets/users/default.png" alt="User Avatar" />
            </div>
            <div class="user-details">
              <h6>{{ windowData.name }}</h6>
              <p>{{ windowData.role.name }}</p>
              <div class="progress" v-if="windowData.progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="
                    'width:' +
                    windowData.progress.current_xp / (windowData.progress.max_xp * 0.01) +
                    '%'
                  "
                  :width="windowData.progress.current_xp / (windowData.progress.max_xp * 0.01)"
                  :aria-valuenow="windowData.progress.current_xp"
                  aria-valuemin="0"
                  :aria-valuemax="windowData.progress.max_xp"
                ></div>
              </div>
              <div style="text-align: center">
                <span v-if="windowData.progress"
                  >{{ windowData.progress.current_xp }}/{{ windowData.progress.max_xp }} ({{
                    windowData.progress.current_xp / (windowData.progress.max_xp * 0.01)
                  }}%) {{ windowData.rank.name }}</span
                >
                <span style="background-color: rgb(0 0 0 / 37%); padding: 2px" v-else>
                  Не имеет ранга
                </span>
              </div>
            </div>
          </div>
          <div class="additional_info">
            <div class="email_container">
              <h5>
                Email
                <span v-if="windowData.email_verified_at == null" class="NotVerified"
                  ><i class="bi bi-x" style="width: 1px"></i>not verified<i
                    class="bi bi-x"
                    style="width: 1px"
                  ></i></span
                ><span v-else class="Verified"><i class="bi bi-check-lg"></i></span>
              </h5>
              {{ windowData.email }}
            </div>
            <div>
              <h5>Created:</h5>
              {{ new Date(windowData.created_at).toLocaleDateString() }}
            </div>
            <div>
              <h5>Updated:</h5>
              {{ new Date(windowData.updated_at).toLocaleDateString() }}
            </div>
          </div>
          <div class="log-btn">
            <button @click="openLogs(windowData.id)">See logs</button>
          </div>
        </div>

        <!--
        /*************************
        * VIEW ALL TYPE BODY *
        *************************/
  -->
        <div class="modal-body" v-else>
          <div v-for="(item, index) in windowData" :key="index">
            <div v-if="index == 'id'"></div>
            <div v-if="index == 'text'" class="post-content">
              Сообщение:
              <p
                class="post-content"
                v-for="(postText, postTextIndex) in windowData[index].split(`\n`)"
                v-bind:key="postTextIndex"
              >
                {{ postText }}
              </p>
            </div>
            <div v-if="index == 'status'">Status: {{ windowData[index] }}</div>
            <div v-if="index == 'creator'">
              Creator: <span class="user"> {{ windowData[index].name }} </span>
            </div>
            <div v-if="index == 'forum'">
              Форум: <span class="forum">{{ windowData[index].name }}</span>
            </div>
            <div v-if="index == 'reaction'">
              <div v-if="windowData[index]">
                Ответ на: <span class="msgReact"> {{ windowData[index].text }} </span>
              </div>
            </div>
            <div class="dates">
              <div v-if="index == 'created_at'">
                Создано: {{ NormalizeDate(windowData[index]) }}
              </div>
              <div v-if="index == 'updated_at'">
                Изменено: {{ NormalizeDate(windowData[index]) }}
              </div>
            </div>
          </div>
        </div>
        <div class="resize-handle" @mousedown="onResizeMouseDown('VID_' + windowData.id + index)">
          <i class="bi bi-textarea-resize"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useDevStore } from '@/stores/dev'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { Chart, registerables } from 'chart.js'

const authStore = useAuthStore()
const userVerified = ref(false)
const router = useRouter()
const devStore = useDevStore()
const tabData = ref([])
const selectedTab = ref({})
const isDragging = ref(false)
const offset = ref({ x: 0, y: 0 })
const viewWindowsData = ref([])
const editWindowsData = ref([])
const windowTop = ref(10)
const rolesData = ref()
const selectedImageView = ref()
const deleteData = ref()
const draggableEl = ref()
const looptimerSearch = ref()

Chart.register(...registerables)

const tabs = [
  {
    name: 'Users',
    path: '/statistic/users',
    type: 'user',
    tabletabs: [
      {
        name: 'User',
        resource: 'name',
      },
      {
        name: 'Login',
        resource: 'login',
      },
      {
        name: 'Email',
        resource: 'email',
      },
      {
        name: 'Role',
        resource: 'role.name',
      },
    ],
  },
  {
    name: 'Messages',
    path: '/statistic/messages',
    type: 'all',
    tabletabs: [
      {
        name: 'Text',
        resource: 'text',
      },
      {
        name: 'Status',
        resource: 'status',
      },
      {
        name: 'Creator',
        resource: 'creator.login',
      },
    ],
  },
]

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const activityCtxRefresh = async () => {
  await delay(1000)
  const ctx = document.getElementById('Activity')

  const today = new Date()
  const lastWeek = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    lastWeek.push(
      date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' }),
    )
  }
  lastWeek.value = lastWeek.reverse()

  try {
    let response = await fetch(devStore.host + '/activitycount', {
      method: 'GET',
      body: JSON.stringify({ lastWeek }),
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    console.log(await response.data)
  } catch (e) {
    console.log(e)
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: lastWeek,
      datasets: [
        {
          label: '# Активности',
          data: [50, 2],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

const OpenDeleteModal = (item) => {
  item.type = selectedTab.value.type
  item.typeName = selectedTab.value.name
  deleteData.value = item
}

const NormalizeDate = (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const CloseImageView = () => {
  selectedImageView.value = null
}

const windowToTop = (event) => {
  const modal = event.target.closest('.CustModal')
  if (modal) {
    modal.style.zIndex = windowTop.value + 1
    windowTop.value += 1
  }
}

const GetResourceData = (item, tabItem) => {
  if (tabItem.resource.split('.').length == 1) {
    if (!item[tabItem.resource]) {
      return 'Загрузка...'
    }
    return item[tabItem.resource].length > 110
      ? item[tabItem.resource].slice(0, 110) + '...'
      : item[tabItem.resource]
  } else if (tabItem.resource.split('.').length > 1) {
    let resource = item
    tabItem.resource.split('.').forEach((resourceName) => {
      if (resource) {
        resource = resource[resourceName]
      } else {
        resource = 'Загрузка...'
      }
    })
    resource = resource.length > 20 ? resource.slice(0, 20) + '...' : resource
    return resource
  } else {
    return null
  }
}

const SelectImageView = (avatar) => {
  if (avatar != null) {
    selectedImageView.value = avatar.path
  } else {
    selectedImageView.value = '/src/assets/users/default.png'
  }
}

const FetchData = async (tab, path) => {
  selectedTab.value = tab
  const response = await fetch(devStore.host + tab.path, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
  })
  const data = await response.json()
  tabData.value = data.data.map((item) => item)
}

const adminCheck = async () => {
  try {
    const response = await fetch(devStore.host + '/admin/check', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    const data = await response.json()
    console.log(data.status)

    if (data.status === '200') {
      userVerified.value = true
    } else {
      router.push('/')
    }
  } catch (error) {
    console.error('Ошибка при проверке администратора:', error)
    router.push('/')
  }
}

const rolesFetch = async () => {
  try {
    const response = await fetch(devStore.host + '/roles', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })
    const data = await response.json()
    rolesData.value = data.data
  } catch (error) {
    console.error('Ошибка при получении ролей:', error)
  }
}

const OpenEditModal = (item) => {
  item.type = selectedTab.value.type
  item.typeName = selectedTab.value.name
  editWindowsData.value.push(item)
}

const OpenViewModal = (item) => {
  item.type = selectedTab.value.type
  item.typeName = selectedTab.value.name
  viewWindowsData.value.push(item)
}

const DragEvent = (event) => {
  if (isDragging.value) {
    const modal = draggableEl.value
    if (modal) {
      modal.style.left = `${event.clientX - offset.value.x}px`
      modal.style.top = `${event.clientY - offset.value.y}px`
    }
  }
}

const onMouseDown = (event) => {
  isDragging.value = true
  const modal = event.target.closest('.CustModal')
  draggableEl.value = modal
  modal.style.zIndex = windowTop.value + 50
  offset.value.x = event.clientX - modal.getBoundingClientRect().left
  offset.value.y = event.clientY - modal.getBoundingClientRect().top

  document.addEventListener('mousemove', DragEvent)
  document.addEventListener('mouseup', onMouseUp)
}

const onMouseUp = (event) => {
  const modal = draggableEl.value
  modal.style.zIndex = windowTop.value + 1
  isDragging.value = false
  windowTop.value = windowTop.value + 1
  document.removeEventListener('mousemove', DragEvent)
  document.removeEventListener('mouseup', onMouseUp)
}

const onResizeMouseDown = (index) => {
  const modal = document.querySelector('#' + index)
  const startX = event.clientX
  const startY = event.clientY
  const startWidth = modal.offsetWidth
  const startHeight = modal.offsetHeight

  const onMouseMove = (event) => {
    const newWidth = startWidth + (event.clientX - startX)
    const newHeight = startHeight + (event.clientY - startY)
    modal.style.width = `${newWidth}px`
    modal.style.height = `${newHeight}px`
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const openLogs = (id) => {
  window.open(`admin/logs/${id}`, '', `width=500,height=500`)
}

onMounted(async () => {
  await adminCheck()
  rolesFetch()
})
</script>

<style scoped>
.admin-page {
  min-height: 90vh;
  display: flex;
  justify-content: space-between;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.CustModal {
  position: absolute;
  top: 50;
  left: 50;
  align-items: center;
  z-index: 15;
}
.modal-body {
  overflow-x: scroll;
  border: 1px solid black;
  padding: 0 10px 0 10px;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
}

.modal-dialog {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: white;
}
.modal-content {
  align-items: center;
  height: -webkit-fill-available;
  width: 380px;
  height: 310px;
  min-width: 380px;
  min-height: 310px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  background: linear-gradient(180deg, royalblue, blue 160%);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: move;
}
.Headerusername {
  color: black;
}
.window-close {
  width: 8%;
  background-color: maroon;
  border: maroon 2px solid;
}

.user-info {
  display: flex;
  align-items: center;
  margin-top: 5%;
}

.user-avatar {
  margin-right: 15px;
}
.edit-avatar {
  transition-duration: 300ms;
}
.edit-avatar:hover {
  cursor: pointer;
}
.edit-avatar:hover img {
  filter: blur(2px) brightness(0.5);
}
.edit-avatar i {
  opacity: 0;
  transition: opacity 0.3s;
}

.edit-avatar:hover i {
  opacity: 1;
}

.user-details {
  width: -webkit-fill-available;
}

.user-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.progress {
  width: -webkit-fill-available;
  height: 20px;
  margin: 10px 0;
}

.progress-bar {
  background-color: green;
}

.NotVerified {
  font-size: 15px;
  color: red;
}
.Verified {
  font-size: 15px;
  color: green;
}
.additional_info {
  margin-top: 2%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.resize-handle {
  height: 17px;
  cursor: nwse-resize;
  position: absolute;
  bottom: 0;
  right: 0;
}

.actions-buttons {
  margin-top: 5%;
  text-align: center;
}

.hover-active {
  color: white;
  position: absolute;
  top: 25%;
  left: 14%;
  opacity: 0;
}

.image-viewer {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  align-items: center;
  justify-content: center;
}
.image-viewer img {
  position: relative;
}
.image-viewer .modal-body {
  background-color: white;
}
.image-viewer .modal-header {
  cursor: default;
}
.resetBtn button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
  margin-top: 4%;
}

.resetBtn button:hover {
  background-color: #0056b3;
}

.deleteBack {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  align-items: center;
  justify-content: center;
}

.deleteBack .modal-header {
  cursor: default;
}

.danger {
  color: red;
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 5%;
}

.deleteBtn {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.deleteBtn:hover {
  background-color: darkred;
}

.cancelBtn {
  background-color: gray;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancelBtn:hover {
  background-color: darkgray;
}

.navigation-menu {
  min-width: 10vw;
  color: white;
  background: linear-gradient(10deg, #0e473b, #2200fd 160%);
}
.navigation-menu li {
  margin-top: 10px;
  list-style-type: none;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: black 2px solid;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.navigation-menu li:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.content {
  width: 90%;
}

table {
  width: 100%; /* Full width of the container */
  border-collapse: collapse; /* Remove space between borders */
  margin-top: 20px; /* Space above the table */
}

td {
  padding: 12px; /* Padding inside table cells */
  border: 1px solid #ddd; /* Light gray border for cells */
  text-align: left; /* Align text to the left */
}

tr:nth-child(even) {
  background-color: #f2f2f2; /* Light gray background for even rows */
}

tr:hover {
  background-color: #e0e0e0; /* Slightly darker gray on row hover */
}

td:last-child {
  text-align: center; /* Center align the action buttons */
}

.btn {
  padding: 8px 12px; /* Padding for buttons */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s; /* Smooth background color transition */
}

.btn-warning {
  background-color: orange; /* Warning button color */
  color: white; /* White text color */
}

.btn-warning:hover {
  background-color: darkorange; /* Darker orange on hover */
}

.btn-primary {
  background-color: blue; /* Primary button color */
  color: white; /* White text color */
}

.btn-primary:hover {
  background-color: darkblue; /* Darker blue on hover */
}

.btn-danger {
  background-color: red; /* Danger button color */
  color: white; /* White text color */
}

.btn-danger:hover {
  background-color: darkred; /* Darker red on hover */
}

table .actions-button {
  display: flex;
  justify-content: space-evenly;
}

.modal-title {
  padding-left: 1%;
}

.post-content {
  background-color: #f9f9f9; /* Light background for post content */
  padding: 15px; /* Padding inside the post content */
  margin: 10px 0; /* Space above and below each post */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  font-size: 1em; /* Base font size */
  line-height: 1.5; /* Improved line height for readability */
}

.post-content p {
  margin: 0; /* Remove default margin for paragraphs */
  padding: 5px 0; /* Space between paragraphs */
}

.post-content h6 {
  font-weight: bold; /* Bold font for headings */
  margin-bottom: 10px; /* Space below headings */
  color: #333; /* Darker color for headings */
}

.edit-post-content {
  background-color: #f0f8ff; /* Light blue background for edit post content */
  border: 1px solid #b0c4de; /* Light steel blue border */
  border-radius: 5px; /* Rounded corners */
  padding: 15px; /* Padding inside the edit post content */
  margin: 10px 0; /* Space above and below each edit post */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  font-size: 1em; /* Base font size */
  line-height: 1.5; /* Improved line height for readability */
}

.edit-post-content h6 {
  font-weight: bold; /* Bold font for headings */
  margin-bottom: 10px; /* Space below headings */
  color: #333; /* Darker color for headings */
}

.edit-post-content textarea {
  width: 100%; /* Full width for the textarea */
  height: 100px; /* Set a height for the textarea */
  padding: 10px; /* Padding inside the textarea */
  border: 1px solid #ccc; /* Light gray border */
  border-radius: 4px; /* Rounded corners */
  resize: vertical; /* Allow vertical resizing only */
  font-size: 1em; /* Base font size */
  line-height: 1.5; /* Improved line height for readability */
}

.edit-post-content textarea:focus {
  border-color: #007bff; /* Change border color on focus */
  outline: none; /* Remove default outline */
}

.log-btn {
  margin-top: 5%;
  display: flex;
  justify-content: center;
}
</style>
