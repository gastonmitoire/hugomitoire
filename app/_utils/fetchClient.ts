export const fetchClient = (url: string, options: {}): Promise<any> => {
  const defaultOptions = {
    next: {
      revalidate: 0,
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const formatedUrl = process.env.NEXT_PUBLIC_API_URL + "/api" + url;

  return fetch(formatedUrl, mergedOptions)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((err) => Promise.reject(err));
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
