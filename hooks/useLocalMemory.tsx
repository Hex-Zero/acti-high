export function getListData(ListId: string): any[] {
  return JSON.parse(window.localStorage?.getItem(ListId) || "[]");
}

export function setListData(listId: string, list: any[]) {
  window.localStorage?.setItem(listId, JSON.stringify(list));
}
