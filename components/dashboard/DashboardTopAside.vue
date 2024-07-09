<script setup lang="ts">
const { ui } = useVerticalNavigationUI()
const links = await useDashboardTopAsideLinks()
</script>

<template>
  <div class="flex-grow">
    <UVerticalNavigation :links="links" :ui="ui" />
  </div>
</template>
