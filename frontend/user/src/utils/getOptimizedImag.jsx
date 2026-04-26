export const getOptimizedImage = (url) => {
  if (!url) return "";

  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_800/"
  );
};