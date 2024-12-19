<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <head>
    meta
  </head>
  <header>
    <nav class="navbar bg-primary navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          <img
            src="@/assets/logo.svg"
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          />
          New Rise
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/" active-class="active">Главная</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about">О нас</RouterLink>
            </li>
            <li class="nav-item dropdown">
              <RouterLink
                class="nav-link dropdown-toggle"
                to="/forum"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Форум
              </RouterLink>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink class="dropdown-item" to="/forum">Главная</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/forum/chat/3">Устав</RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/forum/suggestions">Предложения</RouterLink>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink class="dropdown-item" to="/forum/chat/2">Правила</RouterLink>
                </li>
              </ul>
            </li>
          </ul>
          <div class="d-flex gap-2">
            <template v-if="!authStore.isAuthenticated()">
              <RouterLink to="/registration" class="btn btn-outline-light">Регистрация</RouterLink>
              <RouterLink to="/login" class="btn btn-outline-light">Войти</RouterLink>
            </template>
            <template v-else>
              <RouterLink to="/profile" class="btn btn-outline-light">Профиль</RouterLink>
              <button @click="authStore.clearToken" class="btn btn-outline-light">Выйти</button>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>

  <footer class="footer mt-auto py-4 bg-primary text-light">
    <div class="container">
      <div class="row gy-4">
        <div class="col-md-4">
          <h5>О нас</h5>
          <p>New Rise - ролевой сервер на базе игры Garry's Mod во вселенной Star Wars</p>
        </div>
        <div class="col-md-4">
          <h5>Ссылки</h5>
          <ul class="list-unstyled">
            <li><RouterLink to="/rules" class="text-light">Правила</RouterLink></li>
            <li><RouterLink to="/about" class="text-light">О нас</RouterLink></li>
            <li><RouterLink to="/forum" class="text-light">Форум</RouterLink></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Контакты</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-light">Discord</a></li>
            <li><a href="#" class="text-light">Steam</a></li>
            <li><a href="#" class="text-light">VK</a></li>
          </ul>
        </div>
      </div>
      <hr class="bg-light" />
      <div class="text-center">
        <span>&copy; 2024 New Rise. Все права защищены.</span>
      </div>
    </div>
  </footer>
</template>

<style>
/* Base styles */
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

/* Navigation styles */
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.nav-link {
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #e9ecef !important;
}

/* Footer styles */
.footer {
  position: block;
  bottom: 0;
  width: 100%;
  margin-top: auto;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer h5 {
  margin-bottom: 1rem;
  font-weight: bold;
}

.footer ul li {
  margin-bottom: 0.5rem;
}

.footer a {
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.footer a:hover {
  opacity: 0.8;
}
</style>
