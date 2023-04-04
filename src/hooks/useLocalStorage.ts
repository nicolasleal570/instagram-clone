export function useLocalStore<T>(key: string) {
  const getData = () => {
    const rawData = localStorage.getItem(key);
    if (!rawData) {
      return Promise.resolve(undefined);
    }

    const data = JSON.parse(rawData) as T;
    return Promise.resolve(data);
  };

  const setData = (data: T) => {
    const newData = localStorage.setItem(key, JSON.stringify(data));

    return Promise.resolve(newData);
  };

  return {
    getData,
    setData,
  };
}
