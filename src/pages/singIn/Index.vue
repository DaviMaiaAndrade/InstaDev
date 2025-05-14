<template>
  <q-page class="flex flex-center column justify-center q-px-md">
    <q-img class="logo q-mb-lg" src="../../../src/assets/instadev-logo.svg" />
    <q-input filled v-model="text" label="E-mail ou usuário" class="full-width q-mb-md" />
    <q-input filled v-model="text" label="Password" class="full-width" />
    <q-btn color="primary" label="Primary" />
    <a class="q-mt-md link" href="">Forgot password?</a>
    <div class="flex row">
      <q-img class="facebook-icon" src="../../../src/assets/facebook-logo.svg"></q-img>
      <a href="" class="link q-ml-xs">Log in with Facebook</a>
    </div>
    <div class="full-width">
      <q-separator />
      or
      <q-separator />
    </div>
    <div>Dont't have an account? <a href="">Sing up.</a></div>
    <q-separator />
    Instagram ot Facebook
  </q-page>
</template>

<script>
export default {
  name: 'SingIn',
  data() {
    return {
      text: '',
    }
  },
}
</script>
