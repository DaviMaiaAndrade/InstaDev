import Vue from 'vue'

const vm = new Vue({})

export async function makeLogin({ commit }, body) {
  const { credential, password } = body
  const formattedCredential = {}

  if (credential.includes('@')) {
    formattedCredential.email = credential
  } else {
    formattedCredential.user_name = credential
  }

  try {
    const { data } = await vm.$axios.post('/auth', {
      ...formattedCredential,
      password,
    })

    commit('setToken', data.token)
    return data
  } catch {
    vm.$q.notify({
      type: 'negative',
      message: 'Verifique as credenciais',
      position: 'top',
      icon: 'warning',
    })
    return false
  }
}
