import { Central as Layout } from "@/layouts";
import "./ViewTimetable.style.scss";
import { Timetable, Days } from "@/components";

function ViewTimetable() {
  const TEMP_EVENTS = [
    {
      label: "COMP 1405",
      startTime: "10:00",
      endTime: "12:00",
      days: [Days.Monday, Days.Wednesday, Days.Friday],
    },
    {
      label: "COMP 1406",
      startTime: "14:30",
      endTime: "16:00",
      days: [Days.Tuesday, Days.Thursday],
    },
    {
      label: "COMP 2401",
      startTime: "13:00",
      endTime: "15:30",
      days: [Days.Tuesday],
    },
  ];
  return (
    <Layout title={"Student Timetable"}>
      <Timetable events={TEMP_EVENTS} />
    </Layout>
  );
}

export default ViewTimetable;
