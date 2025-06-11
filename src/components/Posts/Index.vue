<template>
  <div class="full-width q-pb-xl">
    <div class="column full-width" v-for="item in posts" :key="item.id">
      <div class="row justify-between items-center full-width">
        <div class="row items-center">
          <q-avatar size="28px" class="q-mx-md">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="column">
            <strong>{{ item.user.user_name }}</strong>
            <span>Tokyo, Japan</span>
          </div>
        </div>
        <q-icon
          class="q-mr-md cursor-pointer"
          name="fas fa-ellipsis-h"
          size="15px"
          color="dark-items"
        >
          <q-menu anchor="top right" self="top left">
            <q-list style="min-width: 100px">
              <q-item
                clickable
                @click="deletePost(item.id)"
                v-close-popup
                v-if="item.user.id === userData.id"
              >
                <q-item-section>Excluir post</q-item-section>
              </q-item>
              <q-item clickable v-close-popup v-else>
                <q-item-section>Deixar de seguir</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-icon>
      </div>
      <q-img
        class="q-mt-sm cursor-pointer"
        :src="item.image"
        :ratio="1"
        @click="addLikeInPost(item.id)"
      >
        <q-icon
          v-if="animationClass !== ''"
          :class="animationClass"
          class="absolute-center"
          name="fas fa-heart"
          color="white"
        />
      </q-img>
      <div class="row justify-between q-mx-sm q-my-md">
        <div>
          <q-img class="q-mr-md" width="24px" src="../../assets/heart.svg"></q-img>
          <q-img class="q-mr-md" width="22px" src="../../assets/comment.svg"></q-img>
          <q-img class="q-mr-md" width="25px" src="../../assets/direct.svg"></q-img>
        </div>
        <q-icon class="q-mr-xl" name="fas fa-ellipsis-h" size="20px" color="dark-items"></q-icon>
        <q-img width="20px" src="../../assets/save-post.svg"></q-img>
      </div>
      <div class="row items-center q-mb-xs" v-if="item.number_likes">
        <q-avatar size="17px" class="q-ml-sm q-mr-xs">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        Liked by
        <strong> {{ item.user.user_name }} </strong> and
        <strong>{{ item.number_likes }} others</strong>
      </div>
      <div class="q-mx-sm q-mb-lg">
        <strong>{{ item.user.user_name }}</strong> {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['items'],
  data() {
    return {
      animationClass: '',
      countClicks: 0,
      token: this.$store.getters['auth/getJWT'],
      postId: 0,
      posts: this.items,
    }
  },
  computed: {
    userData() {
      return this.$store.getters['user/getUserData']
    },
  },
  watch: {
    items() {
      this.posts = this.items
    },
    async countClicks() {
      setTimeout(() => {
        if (this.countClicks !== 2) {
          this.countClicks = 0
        }
      }, 1000)

      if (this.countClicks === 2) {
        this.animationClass = 'animate-like'

        setTimeout(() => {
          this.animationClass = ''
        }, 600)

        await this.$store.dispatch('posts/addLikeInPost', {
          token: this.token,
          postId: this.postId,
        })

        this.incrementPostLike()
        this.countClicks = 0
      }
    },
  },
  methods: {
    async addLikeInPost(postId) {
      this.countClicks += 1
      this.postId = postId
    },
    incrementPostLike() {
      const localAllPosts = [...this.items]
      const findPost = localAllPosts.find((item) => item.id === this.postId)

      findPost.number_likes += 1

      this.posts = localAllPosts
      this.postId = 0
    },
    deletePost(id) {
      this.$q
        .dialog({
          title: 'Excluir Post',
          message: 'Confirma a exclusão do Post?',
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          await this.$store.dispatch('posts/deletePost', { token: this.token, postId: id })

          const localAllPosts = [...this.items]

          const postIndex = localAllPosts.findIndex((item) => item.id === id)

          localAllPosts.splice(postIndex, 1)

          this.posts = localAllPosts
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.animate-like {
  animation-duration: 500ms;
  animation-name: liked;
}

@keyframes liked {
  from {
    font-size: 45px;
  }
  10% {
    font-size: 48px;
  }
  75% {
    font-size: 75px;
  }
  90% {
    font-size: 73px;
  }
  to {
    font-size: 0px;
  }
}
</style>
