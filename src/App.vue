<script lang="ts" setup>
import HeaderLayout from '@/features/header/HeaderLayout.vue'
import CardsList from '@/features/cards/CardsList.vue'
import SyncLayout from '@/features/sync/SyncLayout.vue'
</script>

<template>
  <SyncLayout>
    <HeaderLayout />
    <CardsList />
  </SyncLayout>
</template>
