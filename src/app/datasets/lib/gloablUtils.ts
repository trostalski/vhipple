export const getFileTypeFromName = (fileName: string) => {
  const parts = fileName.split(".");
  return parts[parts.length - 1];
};
