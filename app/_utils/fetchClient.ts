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
      }

      throw new Error("Network response was not ok.");
    })
    .catch((err) => {
      console.log(formatedUrl, "FORMATED URL");
      throw err;
    });
};
