export const fetchClient = (url: string, options: {}): Promise<any> => {
  const defaultOptions = {
    next: {
      revalidate: 3600,
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return fetch(process.env.NEXT_PUBLIC_API_URL + url, mergedOptions)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
};
