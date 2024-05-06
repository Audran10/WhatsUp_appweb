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
  const locale = localStorage.getItem('locale');
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const dateToCompare = new Date(date);

  if (isSameDay(dateToCompare, today)) {
    return formatDateInHour(dateToCompare);
  } else if (isSameDay(dateToCompare, yesterday)) {
    return locale === 'fr' ? 'Hier' : 'Yesterday';
  } else if (dateToCompare.getTime() > lastWeek.getTime()) {
    if (locale === 'fr') {
      return dateToCompare.toLocaleString('fr-FR', { weekday: 'long' });
    } else {
      return dateToCompare.toLocaleString('en-EN', { weekday: 'long' });
    }
  } else {
    if (locale === 'fr') {
      return dateToCompare.toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
    } else {
      return dateToCompare.toLocaleString('en-EN', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }
}

export function formatConversationDate(date: Date) {
  const locale = localStorage.getItem('locale');
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const dateToCompare = new Date(date);

  if (isSameDay(dateToCompare, today)) {
    return locale === 'fr' ? "Aujourd'hui" : 'Today';
  } else if (isSameDay(dateToCompare, yesterday)) {
    return locale === 'fr' ? 'Hier' : 'Yesterday';
  } else if (dateToCompare.getTime() > lastWeek.getTime()) {
    if (locale === 'fr') {
      return dateToCompare.toLocaleString('fr-FR', { weekday: 'long' });
    } else {
      return dateToCompare.toLocaleString('en-EN', { weekday: 'long' });
    }
  } else if (dateToCompare.getFullYear() === today.getFullYear()) {
    if (locale === 'fr') {
      return dateToCompare.toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
      });
    } else {
      return dateToCompare.toLocaleString('en-EN', {
        month: 'long',
        day: 'numeric',
      });
    }
  } else {
    if (locale === 'fr') {
      return dateToCompare.toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } else {
      return dateToCompare.toLocaleString('en-EN', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }

  return '';
}
export function formatDateComplete(date: Date) {
  const dateToCompare = new Date(date);
  return `${dateToCompare.getDate()} ${dateToCompare.toLocaleString('fr-FR', {
    month: 'long',
  })} ${dateToCompare.getFullYear()} à ${formatDateInHour(dateToCompare)}`;
}
