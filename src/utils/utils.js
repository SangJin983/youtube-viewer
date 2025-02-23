export const getRandomYouTubeSearchTopic = () => {
  // prettier-ignore
  const queries = ["여행", "음악", "요리", "영화", "게임", "자연", "기술", "코딩"];
  const randomIndex = Math.floor(Math.random() * queries.length);
  return queries[randomIndex];
};

export const getRandomIndices = (min, max, size = 1) => {
  const result = new Set();

  while (result.size < size) {
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    result.add(randomIndex);
  }

  return Array.from(result);
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

export const throttle = (
  fn,
  wait,
  options = { leading: true, trailing: false }
) => {
  let lastCallTime = 0;
  let timer;

  return (...args) => {
    const now = Date.now();
    const remainingTime = wait - (now - lastCallTime);

    if (remainingTime <= 0) {
      if (options.leading) {
        fn(...args);
      }
      lastCallTime = now;
      return;
    }
    if (options.trailing) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
        lastCallTime = now;
      }, remainingTime);
    }
    return;
  };
};
