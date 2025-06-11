import Vue from 'vue'

const vm = new Vue({})

export async function listAllPosts(_, params) {
  const { token } = params

  try {
    const { data } = await vm.$axios.get('/posts', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return data
  } catch {
    vm.$q.notify({
      type: 'negative',
      message: 'Falha ao carregar posts!',
      position: 'top',
      icon: 'warning',
    })
    return false
  }
}

export async function listMyPosts(_, params) {
  const { token } = params

  try {
    const { data } = await vm.$axios.get('/posts/my-posts', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return data
  } catch {
    vm.$q.notify({
      type: 'negative',
      message: 'Falha ao carregar posts!',
      position: 'top',
      icon: 'warning',
    })
    return false
  }
}

export async function addLikeInPost(_, params) {
  const { token, postId } = params

  try {
    await vm.$axios.put(
      `/posts/add-like/${postId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return true
  } catch {
    vm.$q.notify({
      type: 'negative',
      message: 'Falha ao efetuar o like!',
      position: 'top',
      icon: 'warning',
    })
    return false
  }
}

export async function deletePost(_, params) {
  const { token, postId } = params

  try {
    await vm.$axios.delete(`/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return true
  } catch {
    vm.$q.notify({
      type: 'negative',
      message: 'Falha excluir o Post!',
      position: 'top',
      icon: 'warning',
    })
    return false
  }
}
