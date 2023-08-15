const getValueColor = (value: string) => {
  switch (value) {
    case "Pending":
      return "#F87E0D";
    case "Approved":
      return "#277314";
    case "Reproved":
      return "#D64D4D";
    default:
      return "black";
  }
};

export { getValueColor };
