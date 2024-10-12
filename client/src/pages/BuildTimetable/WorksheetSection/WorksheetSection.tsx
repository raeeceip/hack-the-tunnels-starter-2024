import { ScheduledEvent } from "@/infrastructure/ServiceAPI";
import "./WorksheetSection.style.scss";
interface WorksheetSectionProps {
  selectedEvents: ScheduledEvent[];
  removeEvent: (event: ScheduledEvent) => void;
}

function WorksheetSection({
  selectedEvents,
  removeEvent,
}: WorksheetSectionProps) {
  return (
    <div className="WorksheetSection">
      <table>
        <thead>
          <tr>
            <th>Remove</th>
            <th>Status</th>
            <th>CRN</th>
            <th>Course</th>
            <th>Title</th>
            <th>Meeting Time</th>
            <th>Credits</th>
            <th>Warnings</th>
          </tr>
        </thead>
        <tbody>
          {selectedEvents.map((event, index) => (
            <tr key={index}>
              <td>
                <button
                  onClick={() => {
                    removeEvent(event);
                  }}
                >
                  Remove
                </button>
              </td>
              <td>unavailable</td>
              <td>{event.crn}</td>
              <td>
                {event.course.subjectCode} {event.course.courseCode}{" "}
                {event.section}
              </td>
              <td>{event.course.shortTitle}</td>
              <td>
                {event.days} {event.startTime} - {event.endTime}
              </td>
              <td>{event.credit}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorksheetSection;
