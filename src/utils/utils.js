export const getRandomYouTubeSearchTopic = () => {
  // prettier-ignore
  const queries = ["여행", "음악", "요리", "영화", "게임", "자연", "기술", "코딩"];
  const randomIndex = Math.floor(Math.random() * queries.length);
  return queries[randomIndex];
};

export const debounce = (fn, delayTime) => {
  let timer;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delayTime);
  };
};

export const throttle = (fn, wait) => {
  let lastCallTime = 0;
  let timer;

  return (...args) => {
    const now = Date.now();
    const remainingTime = wait - (now - lastCallTime);

    if (remainingTime <= 0) {
      clearTimeout(timer);
      fn(...args);
      lastCallTime = Date.now();
      return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      lastCallTime = Date.now();
    }, remainingTime);
  };
};
