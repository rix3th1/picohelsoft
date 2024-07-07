<script setup lang="ts">
const { ui } = useVerticalNavigationUI()
const links = useDashboardBottomAsideLinks()
</script>

<template>
  <div class="mt-auto">
    <UVerticalNavigation :links="links" :ui="ui" />
  </div>
</template>
