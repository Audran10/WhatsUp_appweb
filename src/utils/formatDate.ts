interface FormattedDate {
  month: string;
  dayWeek: string;
  dayMonth: string;
  hour: string;
}

function dateToObject(date: Date): FormattedDate | '' {
  if (!date) {
    return '';
  }

  const today = new Date();
  const dateToCompare = new Date(date);

  if (today.getDate() === dateToCompare.getDate()) {
    return {
      month: dateToCompare.toLocaleString('fr-FR', { month: 'long' }),
      dayWeek: "Aujourd'hui",
      dayMonth: dateToCompare.toLocaleString('fr-FR', { day: 'numeric' }),
      hour: dateToCompare.toLocaleString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric',
      }),
    };
  }

  today.setDate(today.getDate() - 1);
  if (today.getDate() === dateToCompare.getDate()) {
    return {
      month: dateToCompare.toLocaleString('fr-FR', { month: 'long' }),
      dayWeek: 'Hier',
      dayMonth: dateToCompare.toLocaleString('fr-FR', { day: 'numeric' }),
      hour: dateToCompare.toLocaleString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric',
      }),
    };
  }

  return {
    month: dateToCompare.toLocaleString('fr-FR', { month: 'long' }),
    dayWeek: dateToCompare.toLocaleString('fr-FR', { weekday: 'long' }),
    dayMonth: dateToCompare.toLocaleString('fr-FR', { day: 'numeric' }),
    hour: dateToCompare.toLocaleString('fr-FR', {
      hour: 'numeric',
      minute: 'numeric',
    }),
  };
}

export function formatDateInHour(date: Date) {
  const dateToCompare = dateToObject(date);
  if (typeof dateToCompare === 'object') {
    return dateToCompare.hour;
  } else {
    return dateToCompare;
  }
}

export function formatListConversationDate(date: Date) {
  const dateToCompare = dateToObject(date);
  if (typeof dateToCompare === 'object') {
    if (dateToCompare.dayWeek === "Aujourd'hui") {
      return dateToCompare.hour;
    }
    return dateToCompare.dayWeek;
  } else {
    return dateToCompare;
  }
}

export function formatConversationDate(date: Date) {
  const dateObject: FormattedDate | '' = dateToObject(date);
  const todayObject: FormattedDate | '' = dateToObject(new Date());

  if (typeof dateObject === 'object' && typeof todayObject === 'object') {
    if (dateObject.dayWeek === "Aujourd'hui") {
      return dateObject.dayWeek;
    }

    if (dateObject.dayWeek === 'Hier') {
      return dateObject.dayWeek;
    }

    if (parseInt(todayObject.dayMonth) - parseInt(dateObject.dayMonth) >= 7) {
      return `${dateObject.dayWeek} ${dateObject.dayMonth} ${dateObject.month}`;
    }

    return dateObject.dayWeek;
  }

  return '';
}

export function formatDateComplete(date: Date) {
  const dateInfo: FormattedDate | '' = dateToObject(date);
  if (typeof dateInfo === 'object') {
    return `${dateInfo.dayMonth} ${dateInfo.month} à ${dateInfo.hour}`;
  } else {
    return dateInfo;
  }
}
