interface FormattedDate {
  day: string;
  hour: string;
}

function dateToObject(date: Date): FormattedDate | "" {
  if (!date) {
    return "";
  }

  const today = new Date();
  const dateToCompare = new Date(date);

  if (today.getDate() === dateToCompare.getDate()) {
    return {
      day: "Aujourd'hui",
      hour: dateToCompare.toLocaleString("fr-FR", {
        hour: "numeric",
        minute: "numeric",
      }),
    };
  }

  today.setDate(today.getDate() - 1);
  if (today.getDate() === dateToCompare.getDate()) {
    return {
      day: "Hier",
      hour: dateToCompare.toLocaleString("fr-FR", {
        hour: "numeric",
        minute: "numeric",
      }),
    };
  }

  return {
    day: dateToCompare.toLocaleString("fr-FR", { weekday: "long" }),
    hour: dateToCompare.toLocaleString("fr-FR", {
      hour: "numeric",
      minute: "numeric",
    }),
  };
}

export function formatDate(date: Date) {
  const dateToCompare = dateToObject(date);
  if (typeof dateToCompare === "object") {
    if (dateToCompare.day === "Aujourd'hui") {
      return dateToCompare.hour;
    }
    return dateToCompare.day;
  } else {
    return dateToCompare;
  }
}

export function formatDateInHour(date: Date) {
  const dateToCompare = dateToObject(date);
  if (typeof dateToCompare === "object") {
    return dateToCompare.hour;
  } else {
    return dateToCompare;
  }
}