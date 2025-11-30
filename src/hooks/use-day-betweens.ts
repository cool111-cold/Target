export const daysBetween = (dateString: string) => {
    const [day, month, year] = dateString.split(".").map(Number);
    const savedDate = new Date(year, month - 1, day);
  
    const today = new Date();
  
    savedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    const diffMs = today.getTime() - savedDate.getTime();
    return diffMs / (1000 * 60 * 60 * 24);
  };
  