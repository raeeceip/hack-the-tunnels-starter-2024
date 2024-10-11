export const fetchScheduledEvents = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ROOT}/api/v1/scheduledEvents`,
  );
  const json = await response.json();
  return json;
};
