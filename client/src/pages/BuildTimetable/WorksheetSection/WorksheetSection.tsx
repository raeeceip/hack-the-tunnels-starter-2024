import "./WorksheetSection.style.scss";

interface WorksheetSectionProps {
  scheduledEvents: any[];
  addEvent: (event: any) => void;
}

function WorksheetSection({
  scheduledEvents,
  addEvent,
}: WorksheetSectionProps) {
  return (
    <div className="WorksheetSection">
      <div className="WorksheetSection__topbar">
        <div className="WorksheetSection__topbar__item WorksheetSection__crn">
          CRN
        </div>
        <div className="WorksheetSection__topbar__item WorksheetSection__subject">
          Subject
        </div>
        <div className="WorksheetSection__topbar__item WorksheetSection__section">
          Section
        </div>
        <div className="WorksheetSection__topbar__item WorksheetSection__title">
          Title
        </div>
        <div className="WorksheetSection__topbar__item WorksheetSection__credit">
          Credits
        </div>
        <div className="WorksheetSection__topbar__item WorksheetSection__type">
          Schedule
        </div>
        <div className="WorksheetSection__topbar__item WorksheetSection__instructor">
          Instructor
        </div>
      </div>
      <div className="WorksheetSection__results">
        {scheduledEvents.map((event, index) => (
          <div
            key={index}
            className={`WorksheetSection__result ${
              index % 2 === 0
                ? "WorksheetSection__result--gray"
                : "WorksheetSection__result--light-gray"
            }`}
          >
            <div className="WorksheetSection__result__topbar">
              <div className="WorksheetSection__crn">
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  {event.crn}
                </a>
              </div>
              <div className="WorksheetSection__subject">
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  {event.course.subjectCode} {event.course.courseCode}
                </a>
              </div>
              <div className="WorksheetSection__section">{event.section}</div>
              <div className="WorksheetSection__title">
                <a href={event.url} target="_blank" rel="noopener noreferrer">
                  {event.course.shortTitle}
                </a>
              </div>
              <div className="WorksheetSection__credit">{event.credit}</div>
              <div className="WorksheetSection__type">{event.type}</div>
              <div className="WorksheetSection__instructor">
                {event.instructor}
              </div>
            </div>
            <div>
              <b>Days:</b> {event.days}, <b>Time:</b> {event.startTime} -{" "}
              {event.endTime}
            </div>
            <div>
              <b>Section Information:</b> {event.description}
            </div>
            <button onClick={() => addEvent(event)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorksheetSection;
