import { Central as Layout } from "@/layouts";
import { Section } from "./Section";
import { SearchSection } from "./SearchSection";
import { ResultsSection } from "./ResultsSection";
import { TimetableSection } from "./TimetableSection";
import { useState } from "react";
import { ServiceAPI } from "@/infrastructure";
import { ScheduledEvent } from "@/infrastructure/ServiceAPI";
import { WorksheetSection } from "./WorksheetSection";
import { useAccountContext } from "@/context";
import { useNavigate } from "react-router-dom";
import { scheduledEventToCalendarBlock } from "@/utils";
import "./BuildTimetable.style.scss";

function BuildTimetable() {
  const { jwt } = useAccountContext();
  const [scheduledEvents, setScheduledEvents] = useState<ScheduledEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<ScheduledEvent[]>([]);
  const [timetableName, setTimetableNames] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [recommendations, setRecommendations] = useState<ScheduledEvent[]>([]);
  
  const navigate = useNavigate();

  const fetchScheduledEvents = async () => {
    const result = await ServiceAPI.fetchScheduledEvents();
    setScheduledEvents(result);
  };

  const createTimetable = async () => {
    const result = await ServiceAPI.createTimetable(
      timetableName,
      selectedEvents.map((event) => event.id.toString()),
      jwt,
    );

    navigate(`/timetables/${result.data.id}`);
  };

  const addEvent = (event: ScheduledEvent) => {
    setSelectedEvents([...selectedEvents, event]);
  };

  const removeEvent = (event: ScheduledEvent) => {
    setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));
  };

  const requestRecommendation = async () => {
    const result = await ServiceAPI.fetchRecommendations(day, startTime, endTime);
    setRecommendations(result);
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
              createTimetable={createTimetable}
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
        <form className="timetable-form">
          <label htmlFor="timetable_name">Timetable Name:</label>
          <input onChange={(e) => setTimetableNames(e.target.value)} type="text" id="timetable_name" name="timetable_name" />
        </form>
        <Section title="Request Course Recommendation">
          <div className="recommendation-form">
            <label htmlFor="day">Day:</label>
            <input onChange={(e) => setDay(e.target.value)} type="text" id="day" name="day" placeholder="e.g., Monday" />
            
            <label htmlFor="startTime">Start Time:</label>
            <input onChange={(e) => setStartTime(e.target.value)} type="time" id="startTime" name="startTime" />
            
            <label htmlFor="endTime">End Time:</label>
            <input onChange={(e) => setEndTime(e.target.value)} type="time" id="endTime" name="endTime" />
            
            <button onClick={requestRecommendation}>Get Recommendations</button>
          </div>
          <div id="recommendations" className="recommendations">
            {recommendations.map((course) => (
              <p key={course.id}>{course.course.title}</p>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}

export default BuildTimetable;