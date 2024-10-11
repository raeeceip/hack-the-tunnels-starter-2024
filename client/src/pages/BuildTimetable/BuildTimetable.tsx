import { Central as Layout } from "@/layouts";
import { Section } from "./Section";
import { SearchSection } from "./SearchSection";
import { WorksheetSection } from "./WorksheetSection";
import { TimetableSection } from "./TimetableSection";
import { useState } from "react";
import { ServiceAPI } from "@/infrastructure";
import { CalendarBlock, Days } from "@/components";
import "./BuildTimetable.style.scss";

function BuildTimetable() {
  const [scheduledEvents, setScheduledEvents] = useState<any[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<CalendarBlock[]>([]);

  const fetchScheduledEvents = async (): Promise<any> => {
    const result = await ServiceAPI.fetchScheduledEvents();
    setScheduledEvents(result.data);
  };

  const addCalendarBlock = (event: any) => {
    const adjustTime = (time: string): string => {
      const [hours, minutes] = time.split(":").map(Number);
      const adjustedMinutes = minutes < 30 ? "00" : "30";
      return `${hours.toString().padStart(2, "0")}:${adjustedMinutes}`;
    };

    let newStartTimeString = event.startTime;
    let newEndTimeString = event.endTime;

    if (!event.startTime.includes("NA") && !event.endTime.includes("NA")) {
      newStartTimeString = adjustTime(event.startTime);
      newEndTimeString = adjustTime(event.endTime);
    }

    const dayMap = {
      Mon: Days.Monday,
      Tue: Days.Tuesday,
      Wed: Days.Wednesday,
      Thu: Days.Thursday,
      Fri: Days.Friday,
      Sat: Days.Saturday,
      Sun: Days.Sunday,
    };

    const calendarBlock = {
      label: `${event.course.subjectCode} ${event.course.courseCode} ${event.section}`,
      // days: event.days.split(",").map((day) => day.trim()),
      days: event.days.split(",").map((day) => dayMap[day.trim()]),
      startTime: newStartTimeString,
      endTime: newEndTimeString,
    };

    setSelectedEvents([...selectedEvents, calendarBlock]);
  };

  return (
    <Layout title={"My Course Worksheet"}>
      <div className="BuildTimetable">
        <Section title="Search">
          <SearchSection onSearch={fetchScheduledEvents} />
        </Section>
        {scheduledEvents.length > 0 && (
          <Section title="Worksheet">
            <WorksheetSection
              scheduledEvents={scheduledEvents}
              addEvent={addCalendarBlock}
            />
          </Section>
        )}
        <Section title="Draft Timetable">
          <TimetableSection selectedEvents={selectedEvents} />
        </Section>
      </div>
    </Layout>
  );
}

export default BuildTimetable;
