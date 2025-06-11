<template>
  <div class="full-width row justify-around">
    <q-img @click="goTo('main')" width="24px" src="../../assets/house.svg"></q-img>
    <q-img width="30px" src="../../assets/search.svg"></q-img>
    <q-img width="30px" src="../../assets/add.svg"></q-img>
    <q-img width="34px" src="../../assets/heart.svg"></q-img>
    <q-avatar size="28px" class="cursor-pointer" @click="goTo('my-area')">
      <img
        :src="
          user.avatar ||
          'https://static.wikia.nocookie.net/caramella-girls/images/9/99/Blankpfp.png'
        "
      />
    </q-avatar>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  data() {
    return {
      user: {},
    }
  },
  mounted() {
    this.loadProfileData()
  },
  computed: {
    dataUser() {
      return this.$store.state.user.userData
    },
  },
  watch: {
    dataUser() {
      this.loadProfileData()
    },
  },
  methods: {
    goTo(route) {
      this.$router.push({ path: route })
    },
    loadProfileData() {
      this.user = this.$store.getters['user/getUserData']
    },
  },
}
</script>

<style lang="scss" scoped>
.q-img {
  cursor: pointer;
}
</style>
