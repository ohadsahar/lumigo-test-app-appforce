interface DateProps {
  day: number;
  month: string;
  year: number;
  currentDay: string;
}

export const useDate = () => {
  const today = new Date(Date.now());
  const convertedDate: DateProps = {
    day: today.getDate(),
    month: today.toLocaleString("default", { month: "long" }),
    year: today.getFullYear(),
    currentDay: today.toLocaleString("default", { weekday: "long" }),
  };
  return { convertedDate };
};
