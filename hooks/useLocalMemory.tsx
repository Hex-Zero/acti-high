export function getListData(ListId: string): any[] {
  return JSON.parse(window.localStorage?.getItem(ListId) || "[]");
}

export function setListData(listId: string, list: any[]) {
  window.localStorage?.setItem(listId, JSON.stringify(list));
}

export function removeItems(listId: string, items: any[]) {
  const list = getListData(listId);
  const newList = list.filter((item) => !items.includes(item));
  setListData(listId, newList);
  return newList;
}

export function addItems(listId: string, items: any[]) {
  const list = getListData(listId);
  const newList = list.concat(items);
  setListData(listId, newList);
  return newList;
}
