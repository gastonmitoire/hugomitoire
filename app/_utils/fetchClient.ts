export const fetchClient = (url: string, options: {}): Promise<any> => {
  const defaultOptions = {};

  const mergedOptions = { ...defaultOptions, ...options };

  const checkIfJson = (res: Response) => {
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return res.json();
    }

    return res;
  };

  return fetch(process.env.NEXT_PUBLIC_API_URL + url, mergedOptions)
    .then((res) => {
      if (res.ok) {
        return checkIfJson(res);
      }

      throw new Error("Network response was not ok.");
    })
    .catch((err) => {
      throw err;
    });
};
