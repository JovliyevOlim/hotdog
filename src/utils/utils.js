export function setItems(key,items) {
    localStorage.setItem(key, JSON.stringify(items));
}
export function getItems(key) {
    const item = JSON.parse(localStorage.getItem(key));
    return item;
}
export function removeItem(key) {
    localStorage.removeItem(key);
}