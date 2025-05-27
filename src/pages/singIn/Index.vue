<template>
  <q-page class="flex flex-center column justify-center q-px-md">
    <q-icon
      name="fas fa-chevron-left"
      size="23px"
      class="absolute-left q-ma-lg"
      color="grey"
    ></q-icon>
    <div class="full-width column items-center justify-center">
      <q-img class="logo q-mb-lg" src="../../../src/assets/instadev-logo.svg" />
      <q-form class="full-width" @submit="onSubmit">
        <q-input filled v-model="credential" label="E-mail ou usuário" class="full-width q-mb-md" />
        <q-input filled v-model="password" label="Password" type="password" class="full-width" />

        <div class="column items-end full-width">
          <a class="q-mt-md link" href="">Forgot password?</a>
        </div>

        <q-btn
          type="submit"
          color="primary"
          :disable="!credential || !password"
          label="Log in"
          class="sign-in-button full-width q-mt-lg"
        />
      </q-form>

      <div class="flex full-width row items-center justify-center q-mt-xl">
        <q-img class="facebook-icon" src="../../../src/assets/facebook-logo.svg"></q-img>
        <a href="" class="link q-ml-xs">Log in with Facebook</a>
      </div>

      <div class="full-width row items-center justify-center q-my-xl">
        <q-separator class="separator" inset />
        OR
        <q-separator class="separator" inset />
      </div>

      <div class="full-width row items-center justify-center">
        <span class="text-black-opacity"> Don’t have an account? </span>
        <a href="#" @click="signUp" class="link q-ml-xs"> Sign up. </a>
      </div>
    </div>
    <div class="full-width column items-center absolute-bottom">
      <q-separator class="full-width" />
      <div class="q-my-lg">
        <span class="text-black-opacity">Instagram от Facebook</span>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      credential: '',
      password: '',
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.$store.dispatch('auth/makeLogin', {
        credential: this.credential,
        password: this.password,
      })
      await this.loadProfileData(result.token)

      if (result) {
        this.$router.push({ path: 'main' })
      }
    },
    async loadProfileData(token) {
      await this.$store.dispatch('user/getUserProfile', { token })
    },
    signUp() {
      this.$router.push({ path: 'sign-up' })
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  height: 49px;
  width: 182px;
}
.sign-in-button {
  height: 44px;
  border-radius: 5px;
  background-color: $instablue;
}
.facebook-icon {
  height: 17px;
  width: 17px;
}
.separator {
  width: 35%;
}
</style>
