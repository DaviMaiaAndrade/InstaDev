export default function () {
  return {
    userData: localStorage.getItem('user') || {},
  };
}
