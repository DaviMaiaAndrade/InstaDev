export function setToken(state, token) {
  state.token = token;
  localStorage.setItem('token', token);
}
