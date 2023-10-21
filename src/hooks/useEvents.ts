import dayjs from "dayjs";
import { useEffect, useState } from "react";

type UseEventsProps = {
  currentMonth: dayjs.Dayjs;
};

const useEvents = ({ currentMonth }: UseEventsProps) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const since = currentMonth.startOf("month").toISOString();
    const until = currentMonth.endOf("month").toISOString();
    setLoading(true);
    fetch(`https://api.github.com/repos/facebook/react/commits?since=${since}&until=${until}&per_page=${50}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [currentMonth]);

  return { events, loading };
};

export default useEvents;
