export function isSameDay(date1: Date, date2: Date) {
  const date1ToCompare = new Date(date1);
  const date2ToCompare = new Date(date2);

  return (
    date1ToCompare.getFullYear() === date2ToCompare.getFullYear() &&
    date1ToCompare.getMonth() === date2ToCompare.getMonth() &&
    date1ToCompare.getDate() === date2ToCompare.getDate()
  );
}

export function formatDateInHour(date: Date) {
  const dateToCompare = new Date(date);
  return dateToCompare.toLocaleString('fr-FR', {
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function formatListConversationDate(date: Date) {
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const dateToCompare = new Date(date);

  if (isSameDay(dateToCompare, today)) {
    return formatDateInHour(dateToCompare);
  } else if (isSameDay(dateToCompare, yesterday)) {
    return 'Hier';
  } else if (dateToCompare.getTime() > lastWeek.getTime()) {
    return dateToCompare.toLocaleString('fr-FR', { weekday: 'long' });
  } else {
    return dateToCompare.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  }
}

export function formatConversationDate(date: Date) {
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const dateToCompare = new Date(date);

  if (isSameDay(dateToCompare, today)) {
    return "Aujourd'hui";
  } else if (isSameDay(dateToCompare, yesterday)) {
    return 'Hier';
  } else if (dateToCompare.getTime() > lastWeek.getTime()) {
    return dateToCompare.toLocaleString('fr-FR', { weekday: 'long' });
  } else if (dateToCompare.getFullYear() === today.getFullYear()) {
    return dateToCompare.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'long',
    });
  } else {
    return dateToCompare.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}

export function formatDateComplete(date: Date) {
  const dateToCompare = new Date(date);
  return `${dateToCompare.getDate()} ${dateToCompare.toLocaleString('fr-FR', {
    month: 'long',
  })} ${dateToCompare.getFullYear()} à ${formatDateInHour(dateToCompare)}`;
}
