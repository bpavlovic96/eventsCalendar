import dayjs from "dayjs";
import styles from "./Calendar.module.css";
import { useCallback, useState } from "react";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(dayjs().startOf("month"));

  const renderHeader = () => {
    const daysInWeek = [];
    for (let i = 0; i < 7; i++) {
      daysInWeek.push(dayjs().weekday(i).format("dddd"));
    }
    return daysInWeek;
  };

  const renderDays = useCallback(() => {
    const currentDay = currentMonth.clone().startOf("month");
    const firstDayInMonth = currentMonth.clone().startOf("month");

    const totalDays = firstDayInMonth.daysInMonth();
    const weeksInMonth = Math.ceil((totalDays + firstDayInMonth.weekday()) / 7);
    const daysInMonth = [];

    for (let i = 0; i < weeksInMonth; i++) {
      const daysInWeek = [];
      for (let j = 0; j < 7; j++) {
        const day = currentDay.add(i, "week").weekday(j);
        daysInWeek.push(day);
      }

      daysInMonth.push(daysInWeek);
    }
    return daysInMonth;
  }, [currentMonth]);

  const goNextMonth = () => {
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  };

  const goPrevMonth = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  };

  return (
    <div>
      <button onClick={goPrevMonth}>Prev</button>
      <button onClick={goNextMonth}>Next</button>
      <p>{currentMonth.format("MMMM YYYY")}</p>
      <table>
        <thead>
          <tr className={styles.header}>
            {renderHeader().map((day) => {
              return <th key={day}>{day}</th>;
            })}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {renderDays().map((week) => {
            return (
              <tr>
                {week.map((dayInWeek) => {
                  return <td key={dayInWeek.toISOString()}>{dayInWeek.format("D")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
