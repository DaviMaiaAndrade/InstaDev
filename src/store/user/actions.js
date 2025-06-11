import Vue from 'vue'

const vm = new Vue({})

export async function userRegister(_, params) {
  try {
    await vm.$axios.post('/user', params)

    vm.$q.notify({
      type: 'positive',
      message: 'Usuário cadastrado com sucesso!',
      position: 'top',
      icon: 'warning',
    })

    return true
  } catch {
    vm.$q.notify({
      type: 'negative',
      message: 'Falha ao cadastrar usuário!',
      position: 'top',
      icon: 'warning',
    })
    return false
  }
}

export async function getUserProfile({ commit }, params) {
  const { token } = params

  try {
    const { data } = await vm.$axios.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    })

    commit('setUserData', data.user)
    return data.user
  } catch {
    vm.$q.notify({
      type: 'negative',
      message: 'Falha ao listar dados do usuário!',
      position: 'top',
      icon: 'warning',
    })
    return false
  }
}

export async function updateUserProfile({ dispatch }, params) {
  const { token, body } = params

  try {
    const { data } = await vm.$axios.put('/user', body, {
      headers: { Authorization: `Bearer ${token}` },
    })

    dispatch('getUserProfile', { token })

    vm.$q.notify({
      type: 'positive',
      message: data.message,
      position: 'top',
      icon: 'warning',
    })

    return data
  } catch {
    vm.$q.notify({
      type: 'negative',
      message: 'Falha ao alterar o usuário!',
      position: 'top',
      icon: 'warning',
    })
    return false
  }
}

export async function deleteUserProfile(_, params) {
  const { token } = params

  try {
    await vm.$axios.delete('/user', {
      headers: { Authorization: `Bearer ${token}` },
    })

    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return true
  } catch {
    vm.$q.notify({
      type: 'negative',
      message: 'Falha ao listar dados do usuário!',
      position: 'top',
      icon: 'warning',
    })
    return false
  }
}
