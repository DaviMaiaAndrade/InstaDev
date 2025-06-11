<template>
  <q-drawer
    side="right"
    v-model="open"
    show-if-above
    bordered
    class="menu-drawer"
    @hide="hide"
    content-class="bg-grey-3"
  >
    <div class="container-items">
      <div class="q-pl-md q-pt-xl">
        <span>{{ user?.user_name || 'Usuário' }}</span>

        <div v-for="item in menuItems" :key="item.label" class="q-mt-lg flex items-center">
          <q-img :src="item.icon" width="24px" class="q-mr-sm" />
          <span>{{ item.label }}</span>
        </div>
      </div>

      <div class="q-pa-sm">
        <div class="q-mt-lg flex items-center">
          <q-img width="24px" class="q-mr-sm" src="../../../src/assets/settings.svg" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  </q-drawer>
</template>

<script>
export default {
  name: 'MenuDrawer',
  props: {
    drawerRight: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      user: null,
      menuItems: [
        { label: 'Archive', icon: require('src/assets/archive.svg') },
        { label: 'Your Activity', icon: require('src/assets/activity.svg') },
        { label: 'Nametag', icon: require('src/assets/name-tag.svg') },
        { label: 'Saved', icon: require('src/assets/saved.svg') },
        { label: 'Close Friends', icon: require('src/assets/close-friends.svg') },
        { label: 'Discover People', icon: require('src/assets/discover-people.svg') },
        { label: 'Open Facebook', icon: require('src/assets/open-facebook.svg') },
      ],
    }
  },
  watch: {
    drawerRight(val) {
      this.open = val
    },
  },
  mounted() {
    this.open = this.drawerRight
    this.loadProfileData()
  },
  methods: {
    hide() {
      this.$emit('close')
    },
    loadProfileData() {
      try {
        const user = this.$store?.getters?.['user/getUserData']
        if (user) {
          this.user = user
        } else {
          console.warn('Dados do usuário não encontrados no Vuex')
        }
      } catch (e) {
        console.error('Erro ao carregar dados do usuário:', e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container-items {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
