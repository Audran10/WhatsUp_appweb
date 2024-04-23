export const formatText = (text: string): string => {
  if (text.length > 55) {
    return text.slice(0, 55) + "...";
  }
  return text;
};