<script setup lang="ts">
const { ui } = useVerticalNavigationUI()
const links = useDashboardTopAsideLinks()
</script>

<template>
  <div class="flex-grow">
    <UVerticalNavigation :links="links" :ui="ui" />
  </div>
</template>
