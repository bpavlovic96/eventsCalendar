import styles from "./EventModal.module.css";
import dayjs from "dayjs";
import { Event } from "../Calendar/Calendar";

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
};

function EventModal({ isOpen, onClose, event }: EventModalProps) {
  if (!isOpen || event === null) return null;
  return (
    <div className={styles.eventModalOverlay}>
      <div className={styles.eventModal}>
        <div className={styles.eventModalContent}>
          <h2 className={styles.eventModalHeader}>Event details</h2>
          <div>
            <span className={styles.eventSubName}>Name: </span>
            <span>{event.commit.author.name}</span>
          </div>
          <div>
            <span className={styles.eventSubName}>Message: </span>
            <span>{event.commit.message}</span>
          </div>
          <div>
            <span className={styles.eventSubName}>Date: </span>
            <span>{dayjs(event.commit.author.date).format("MM/DD/YYYY - HH:MM")}</span>
          </div>
          <button className={styles.button} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
