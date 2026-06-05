export const TOPICS = [
  { id: 'Campus', label: 'Campus', color: '#4F46E5', description: 'University news and updates' },
  { id: 'Sports', label: 'Sports', color: '#059669', description: 'Games, teams, and results' },
  { id: 'Events', label: 'Events', color: '#D97706', description: 'Concerts, fairs, and meetups' },
  { id: 'Alerts', label: 'Alerts', color: '#DC2626', description: 'Urgent notices and closures' },
];

export const TOPIC_IDS = TOPICS.map((t) => t.id);

export function defaultSubscriptions() {
  return TOPIC_IDS.reduce((acc, id) => {
    acc[id] = id === 'Campus' || id === 'Alerts';
    return acc;
  }, {});
}
