<template>
  <div id="signin">
    <UContainer class="flex justify-center items-center h-screen">
      <slot />
    </UContainer>
  </div>
</template>

<style lang="css">
#signin {
  background-image: url('/background.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
