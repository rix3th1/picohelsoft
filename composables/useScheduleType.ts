export function useScheduleType() {
  return useState('schedule-type', (): 'start' | 'end' | '' => '')
}
