export const generateRandomSearchTerm = () => {
  // prettier-ignore
  const queries = ["여행", "음악", "요리", "영화", "게임", "자연", "기술", "코딩"];
  const randomIndex = Math.floor(Math.random() * queries.length);
  return queries[randomIndex];
};

export const debounce = (fn, ms) => {
  let timer;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};
