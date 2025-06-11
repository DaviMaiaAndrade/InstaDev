import Vue from 'vue'

const vm = new Vue({})

export async function uploadFile(_, params) {
  const { token, formData } = params

  try {
    vm.$q.loading.show()
    const { data } = await vm.$axios.post('/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multpart/form-data',
      },
    })

    return data
  } catch {
    vm.$q.notify({
      type: 'negative',
      message: 'Falha ao realizar o upload!',
      position: 'top',
      icon: 'warning',
    })
    return false
  } finally {
    vm.$q.loading.hide()
  }
}
