 // Convert and format the createdAt date
 export const formatDate = (dateString: string) => {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    const date = new Date(dateString).toLocaleDateString("ar-EG");
    const time = new Date(dateString).toLocaleTimeString("ar-EG");

    return `${date} - ${time}`; // Concatenate date and time with a hyphen
  };