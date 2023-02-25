const DECIMAL_PLACES = 2;

export const partition = (array: [any], isValid: (elem: any) => boolean) => {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
};

export const formatAmount = (amount: number): string => amount.toFixed(DECIMAL_PLACES);

export const formatDateTimeString = (dateTime: string) => {
  const date = new Date(parseInt(dateTime))
  const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit' }).format(date);
  const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(date);
  const hourCycle = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: 'numeric', hour12: true }).format(date);
  return  `${weekday}, ${year} at ${hourCycle}`;
}