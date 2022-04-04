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

export function updatePriorityTotals(listId: string, multiplier: number = 1) {
  const list = getListData(listId);
  list.map((item) => {
    item.priorityTotal = item.priority * (multiplier + 1);
    return item;
  });
  setListData(listId, list);
  return list;
}

export function setLastCheckDate(date: Date = new Date()) {
  window.localStorage?.setItem("lastCheckDate", JSON.stringify(date));
}

export function getLastCheckDate(): Date {
  const getDate = JSON.parse(
    window.localStorage?.getItem("lastCheckDate") || "null"
  );
  const date = new Date(getDate);
  return date ? new Date(date) : new Date();
}

export function minuteSinceLastCheck(): number {
  const lastCheckDate = getLastCheckDate();
  const now = new Date();
  const diff = now.getTime() - lastCheckDate.getTime();
  const minute = Math.floor(diff / (1000 * 60 * 1));
  // setLastCheckDate(now);
  return minute;
}
