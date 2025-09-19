import React from 'react';

const EventLog = ({ events }) => {
  return (
    <div className="glass-panel">
      <h3 className="panel-title">Event Log</h3>
      <div className="event-log glass-scrollable">
        {events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>No events recorded yet</p>
            <p className="empty-note">
              Events will appear here as you interact with the voting system.
            </p>
          </div>
        ) : (
          <div className="event-list">
            {events.map((event, index) => (
              <div key={index} className="event-item glass-event">
                <div className="event-header">
                  <span className="event-type">{event.type}</span>
                  <span className="event-timestamp">{event.timestamp}</span>
                </div>
                <div className="event-data">
                  {Object.entries(event.data).map(([key, value]) => (
                    <div key={key} className="event-detail">
                      <span className="detail-key">{key}:</span>
                      <span className="detail-value">
                        {typeof value === 'string' && value.startsWith('0x') 
                          ? `${value.slice(0, 10)}...`
                          : String(value)
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {events.length > 0 && (
        <div className="event-summary">
          <span className="summary-text">
            Total Events: <strong>{events.length}</strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default EventLog;