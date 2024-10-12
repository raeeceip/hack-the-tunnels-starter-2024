import { Central as Layout } from "@/layouts";
import { Section } from "./Section";
import { SearchSection } from "./SearchSection";
import { ResultsSection } from "./ResultsSection";
import { TimetableSection } from "./TimetableSection";
import { useState } from "react";
import { ServiceAPI } from "@/infrastructure";
import { CalendarBlock, Days } from "@/components";
import { ScheduledEvent } from "@/infrastructure/ServiceAPI";
import "./BuildTimetable.style.scss";
import { WorksheetSection } from "./WorksheetSection";

function BuildTimetable() {
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<ScheduledEvent[]>([]);

  const fetchScheduledEvents = async () => {
    const result = await ServiceAPI.fetchScheduledEvents();
    setScheduledEvents(result);
  };

  const addEvent = (event: ScheduledEvent) => {
    setSelectedEvents([...selectedEvents, event]);
  };

  const removeEvent = (event: ScheduledEvent) => {
    setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));
  };

  const scheduledEventToCalendarBlock = (
    event: ScheduledEvent,
  ): CalendarBlock => {
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
      days: event.days.split(",").map((day) => dayMap[day.trim()]),
      startTime: newStartTimeString,
      endTime: newEndTimeString,
    };

    return calendarBlock;
  };

  return (
    <Layout title={"My Course Worksheet"}>
      <div className="BuildTimetable">
        <Section title="Search">
          <SearchSection onSearch={fetchScheduledEvents} />
        </Section>
        {scheduledEvents.length > 0 && (
          <Section title="Results">
            <ResultsSection
              scheduledEvents={scheduledEvents}
              addEvent={addEvent}
            />
          </Section>
        )}
        {selectedEvents.length > 0 && (
          <Section title="Worksheet">
            <WorksheetSection
              selectedEvents={selectedEvents}
              removeEvent={removeEvent}
            />
          </Section>
        )}
        <Section title="Draft Timetable">
          <TimetableSection
            selectedEvents={selectedEvents.map((event: ScheduledEvent) =>
              scheduledEventToCalendarBlock(event),
            )}
          />
        </Section>
      </div>
    </Layout>
  );
}

export default BuildTimetable;
