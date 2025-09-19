import { EVENT_TYPES, UI_CONSTANTS } from './constants';

/**
 * Event Manager for handling blockchain events and notifications
 */
export class EventManager {
  constructor() {
    this.events = [];
    this.listeners = [];
  }

  /**
   * Add a new event to the event log
   * @param {string} type - Event type
   * @param {Object} data - Event data
   * @returns {Object} Created event
   */
  addEvent(type, data) {
    const event = {
      id: Date.now() + Math.random(),
      type,
      data,
      timestamp: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    };

    this.events = [event, ...this.events.slice(0, UI_CONSTANTS.MAX_EVENTS_DISPLAY - 1)];
    
    // Notify listeners
    this.listeners.forEach(listener => listener(this.events));
    
    return event;
  }

  /**
   * Subscribe to event updates
   * @param {Function} callback - Callback function to call when events update
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  /**
   * Get all events
   * @returns {Array} Array of events
   */
  getEvents() {
    return this.events;
  }

  /**
   * Get events by type
   * @param {string} type - Event type to filter by
   * @returns {Array} Filtered events
   */
  getEventsByType(type) {
    return this.events.filter(event => event.type === type);
  }

  /**
   * Clear all events
   */
  clearEvents() {
    this.events = [];
    this.listeners.forEach(listener => listener(this.events));
  }

  /**
   * Get event statistics
   * @returns {Object} Event statistics
   */
  getStatistics() {
    const stats = {
      total: this.events.length,
      byType: {}
    };

    Object.values(EVENT_TYPES).forEach(type => {
      stats.byType[type] = this.getEventsByType(type).length;
    });

    return stats;
  }
}

// Create a singleton instance
export const eventManager = new EventManager();

/**
 * Setup blockchain event listeners
 * @param {Object} contracts - Contract instances
 * @param {EventManager} eventManager - Event manager instance
 */
export const setupBlockchainEventListeners = (contracts, eventManager) => {
  const { voter, candidate, generalElections } = contracts;

  // Voter events
  if (voter) {
    voter.on('VoterRegistered', (voterAddress, name, constituencyId) => {
      eventManager.addEvent(EVENT_TYPES.VOTER_REGISTERED, {
        voterAddress,
        name,
        constituencyId: constituencyId.toString()
      });
    });

    voter.on('VoterVerified', (voterAddress, isVerified) => {
      eventManager.addEvent(EVENT_TYPES.VOTER_VERIFIED, {
        voterAddress,
        isVerified
      });
    });
  }

  // Candidate events
  if (candidate) {
    candidate.on('CandidateRegistered', (candidateAddress, name, constituencyId) => {
      eventManager.addEvent(EVENT_TYPES.CANDIDATE_REGISTERED, {
        candidateAddress,
        name,
        constituencyId: constituencyId.toString()
      });
    });

    candidate.on('CandidateVerified', (candidateAddress, isVerified) => {
      eventManager.addEvent(EVENT_TYPES.CANDIDATE_VERIFIED, {
        candidateAddress,
        isVerified
      });
    });
  }

  // Vote events
  if (generalElections) {
    generalElections.on('VoteCast', (voterAddress, voterId, candidateId, constituencyId) => {
      eventManager.addEvent(EVENT_TYPES.VOTE_CAST, {
        voterAddress,
        voterId: voterId.toString(),
        candidateId: candidateId.toString(),
        constituencyId: constituencyId.toString()
      });
    });
  }

  // Return cleanup function
  return () => {
    if (voter) {
      voter.removeAllListeners();
    }
    if (candidate) {
      candidate.removeAllListeners();
    }
    if (generalElections) {
      generalElections.removeAllListeners();
    }
  };
};