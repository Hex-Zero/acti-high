export function getListData(ListId: string): any[] {
  return JSON.parse(window.localStorage?.getItem(ListId) || "[]");
}

export function setListData(listId: string, list: any[]) {
  window.localStorage?.setItem(listId, JSON.stringify(list));
}

export function removeItems(listId: string, items: any[]) {
  const list = getListData(listId);
  const newList: any[] = [];

  if (list.length === items.length) {
    setListData(listId, []);
    return newList;
  }

  list.forEach((item) => {
    if (!items.find((i) => i.id === item.id)) {
      newList.push(item);
    }
  });
  setListData(listId, newList);
  return newList;
}

export function addItems(listId: string, items: any[]) {
  const list = getListData(listId);
  const newList = list.concat(items);
  setListData(listId, newList);
  return newList;
}
