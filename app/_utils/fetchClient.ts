export const fetchClient = (url: string, options: {}): Promise<any> => {
  const defaultOptions = {};

  const mergedOptions = { ...defaultOptions, ...options };

  return fetch(process.env.NEXT_PUBLIC_API_URL + url, mergedOptions)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Network response was not ok.");
    })
    .catch((err) => {
      throw err;
    });
};
