<template>
  <div class="full-width row justify-between">
    <q-img class="q-ml-sm camera" src="../../assets/camera.svg"></q-img>
    <q-img class="logo" src="../../assets/instadev-logo.svg"></q-img>
    <div>
      <q-img class="q-mr-lg" src="../../assets/reels.svg" width="28px"></q-img>
      <q-img class="q-mr-sm" src="../../assets/direct.svg" width="28px"></q-img>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
}
</script>

<style lang="scss" scoped>
.logo {
  width: 115px;
  height: 30px;
}
.camera {
  width: 29px;
  height: 26px;
}
.q-img {
  cursor: pointer;
}
</style>
