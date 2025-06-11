export function setUserData(state, data) {
  const stringifyData = JSON.stringify(data);

  state.userData = stringifyData;
  localStorage.setItem('user', stringifyData);
}
