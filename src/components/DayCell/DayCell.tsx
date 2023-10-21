import dayjs from "dayjs";
import styles from "./DayCell.module.css";
import { Event } from "../Calendar/Calendar";

type DayCellProps = {
  day: dayjs.Dayjs;
  events?: Event[];
  setDoubleClickedEvent: (event: Event | null) => void;
  setActiveEventId: (id: string) => void;
  activeEventId: string | undefined;
  currentMonth: dayjs.Dayjs;
};

function DayCell({ day, events, setDoubleClickedEvent, setActiveEventId, activeEventId, currentMonth }: DayCellProps) {
  const todayEvents = events
    ?.filter((event) => {
      const eventDate = dayjs(event.commit.author.date);
      return day.isSame(eventDate, "date");
    })
    .sort((a, b) => {
      if (a.commit.author.date > b.commit.author.date) {
        return 1;
      } else if (b.commit.author.date > a.commit.author.date) {
        return -1;
      }
      return 0;
    });

  const handleEventDoubleClick = (event: Event) => {
    setDoubleClickedEvent(event);
  };

  const isInCurrentMonth = dayjs(currentMonth).isSame(day, "month");

  return (
    <td className={styles.dayCell}>
      <span className={`${styles.day} ${!isInCurrentMonth ? styles.inactiveMonth : ""}`}>{day.format("D")}</span>
      <div className={styles.eventsContainer}>
        {todayEvents?.map((todayEvent) => {
          const isActive = activeEventId === todayEvent.sha;
          return (
            <div
              key={todayEvent.sha}
              className={`${styles.event} ${isActive ? styles.active : ""}`}
              onDoubleClick={() => handleEventDoubleClick(todayEvent)}
              onClick={() => setActiveEventId(todayEvent.sha)}
            >
              <span className={styles.eventName}>{todayEvent.commit.author.name}</span>
              <span className={styles.eventMessage}>{todayEvent.commit.message}</span>
              <span className={styles.eventHours}>{dayjs(todayEvent.commit.author.date).format("HH:mm")}</span>
            </div>
          );
        })}
      </div>
    </td>
  );
}

export default DayCell;
