<script setup>
  import { useDevStore } from '@/stores/dev.js'

  async function GetData() {
    try {
      const response = await fetch(`${useDevStore().host}/CFCUXUI/stats`, { method: 'POST' });
      let data = await response.json();
      console.log(data)
    } catch (err) {
      console.error('Ошибка при загрузке сообщений:', err);
    }
  }

  GetData()
</script>

<template>

</template>

<style scoped>

</style>
