export const convertToTitleCase = (input) => {
    if (typeof input !== "string") return "";
    const words = input.split("_");
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };