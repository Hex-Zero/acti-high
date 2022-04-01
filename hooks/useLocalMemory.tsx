export function getListData(ListId: string): any[] {
  return JSON.parse(localStorage.getItem(ListId) || "[]");
}

export function setListData(listId: string, list: any[]) {
  window.localStorage?.setItem(listId, JSON.stringify(list));
}
