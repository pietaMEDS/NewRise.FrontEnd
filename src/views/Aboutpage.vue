<script setup>
import { useContextAditionsActionsStore } from '@/stores/contextFunctions'
import { onMounted, onUnmounted, ref } from 'vue'
import * as bootstrap from 'bootstrap'

const carousel = ref(null)

const contextActionsStore = useContextAditionsActionsStore()

const pageActions = [
  {
    name: 'Additional function',
    action: async function () {
      console.log('Ha Ha Easy')
    },
  },
]

contextActionsStore.setAction(pageActions)

onMounted(() => {
  // Initialize Bootstrap carousel with enhanced options
  carousel.value = document.getElementById('carouselMain')
  if (carousel.value) {
    new bootstrap.Carousel(carousel.value, {
      interval: 5000,
      wrap: true,
      pause: 'hover',
      keyboard: true,
      touch: true,
    })
  }
})

onUnmounted(() => {
  contextActionsStore.setAction(null)
})
</script>

<template>
  <div class="hero position-relative">
    <div class="backimage position-absolute w-100 h-100"></div>
    <div class="container py-5 position-relative">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center">
          <h1 class="display-4 mb-4 text-shadow"><strong>New Rise</strong></h1>
          <p class="lead text-shadow">
            Ролевой сервер на базе игры Garry's Mod, посвящённый периоду Войн Клонов вселенной Star
            Wars
          </p>

          <h2 class="title mt-5 mb-4 text-shadow">Твой любимый классический CWRP</h2>

          <p class="mb-4 text-shadow">
            Примерь на себя образ солдата-клона Великой Армии Республики. Прими участие в сражениях
            с дроидами Конфедерации бок о бок с культовыми персонажами саги или создай свою
            оригинальную историю совместно с мастерами игровых событий.
          </p>
          <p class="h4 mb-5 text-shadow">На New Rise рождаются новые истории!</p>
        </div>
      </div>
    </div>
  </div>

  <div class="container my-5">
    <div id="carouselMain" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <ul class="carousel-indicators">
        <li data-bs-target="#carouselMain" data-bs-slide-to="0" class="active"></li>
        <li data-bs-target="#carouselMain" data-bs-slide-to="1"></li>
        <li data-bs-target="#carouselMain" data-bs-slide-to="2"></li>
      </ul>
      <div class="carousel-inner rounded-lg shadow-lg">
        <div class="carousel-item active">
          <img src="@/assets/backimage.png" alt="Clone troopers in battle" class="d-block w-100" />
          <div class="carousel-caption d-none d-md-block">
            <h3 class="text-shadow">Эпические сражения</h3>
            <p class="lead text-shadow">Участвуйте в масштабных битвах Войн Клонов</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="@/assets/backimage.png" alt="Republic capital ship" class="d-block w-100" />
          <div class="carousel-caption d-none d-md-block">
            <h3 class="text-shadow">Огромный флот</h3>
            <p class="lead text-shadow">Управляйте мощными кораблями Республики</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="@/assets/backimage.png" alt="Clone trooper squad" class="d-block w-100" />
          <div class="carousel-caption d-none d-md-block">
            <h3 class="text-shadow">Командная игра</h3>
            <p class="lead text-shadow">Сражайтесь плечом к плечу с братьями-клонами</p>
          </div>
        </div>
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselMain"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselMain"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.backimage {
  background-image: url('@/assets/backimage.png');
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
  top: 0;
  left: 0;
  z-index: 0;
}

.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  color: white;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 1.5rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(4px);
}

.carousel-caption h3 {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.carousel-caption p {
  font-size: 1.3rem;
  margin-bottom: 0;
}

.carousel-item {
  transition: transform 0.6s ease-in-out;
}

.carousel-item img {
  height: 600px;
  object-fit: cover;
  filter: brightness(0.9);
  transition: filter 0.3s ease;
}

.carousel-item:hover img {
  filter: brightness(1);
}

.carousel-control-prev,
.carousel-control-next {
  width: 5%;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  opacity: 1;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

@media (max-width: 768px) {
  .carousel-item img {
    height: 400px;
  }

  .carousel-caption h3 {
    font-size: 1.75rem;
  }

  .carousel-caption p {
    font-size: 1.1rem;
  }
}
</style>
