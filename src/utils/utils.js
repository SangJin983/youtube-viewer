export const getRandomQuery = () => {
  // prettier-ignore
  const queries = ["여행", "음악", "요리", "영화", "게임", "자연", "기술", "코딩"];
  const randomIndex = Math.floor(Math.random() * queries.length);
  return queries[randomIndex];
};

export const debounce = (fn, ms) => {
  const timers = new WeakMap();

  return (...args) => {
    if (timers.has(fn)) {
      clearTimeout(timers.get(fn));
    }
    const timer = setTimeout(() => {
      fn(...args);
      timers.delete(fn);
    }, ms);
    timers.set(fn, timer);
  };
};
