export const searchList = JSON.parse(localStorage.getItem('searchList')) || [];

export function addToList(countryName) {
  searchList.unshift(countryName);
  saveToStorage();
  console.log(searchList);
};

function saveToStorage() {
  localStorage.setItem('searchList', JSON.stringify(searchList));
}