import dayjs from "dayjs";
import styles from "./Calendar.module.css";
import { useCallback, useState } from "react";
import DayCell from "../DayCell/DayCell";
import useEvents from "../../hooks/useEvents";
import EventModal from "../EventModal/EventModal";
import Loader from "../Loader/Loader";

export type Author = {
  name: string;
  email: string;
  date: string;
};

export type Commit = {
  author: Author;
  message: string;
};

export type Event = {
  commit: Commit;
  sha: string;
};

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(dayjs().startOf("month"));
  const { events, loading } = useEvents({ currentMonth });
  const [doubleClickedEvent, setDoubleClickedEvent] = useState<Event | null>(null);
  const [activeEventId, setActiveEventId] = useState<string>();
  console.log(loading);
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
    <div className={styles.calendarWrapper}>
      <div className={styles.navigationBar}>
        <span className={styles.displayDate}>{currentMonth.format("MMMM YYYY")}</span>
        <div className={styles.navigation}>
          <button className={styles.button} onClick={goPrevMonth}>
            Prev
          </button>
          <button className={styles.button} onClick={goNextMonth}>
            Next
          </button>
        </div>
      </div>
      <Loader loading={loading}>
        <table className={styles.calendar}>
          <thead className={styles.headerMain}>
            <tr className={styles.header}>
              {renderHeader().map((day) => {
                return (
                  <th className={styles.headerDay} key={day}>
                    {day}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={styles.body}>
            {renderDays().map((week) => {
              return (
                <tr className={styles.week} key={week[0].week()}>
                  {week.map((dayInWeek) => {
                    return (
                      <DayCell
                        day={dayInWeek}
                        key={dayInWeek.toISOString()}
                        events={events}
                        setDoubleClickedEvent={setDoubleClickedEvent}
                        setActiveEventId={setActiveEventId}
                        activeEventId={activeEventId}
                        currentMonth={currentMonth}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Loader>
      <EventModal
        event={doubleClickedEvent}
        onClose={() => setDoubleClickedEvent(null)}
        isOpen={doubleClickedEvent !== null}
      />
    </div>
  );
}

export default Calendar;
