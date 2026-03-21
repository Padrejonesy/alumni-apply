import { useEffect } from 'react';

import { TutorDirectory } from './TutorDirectory';

export function AlumniPage() {
  useEffect(() => {
    document.title = "Find Your Alumni Tutor | Alumni Tutoring";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Browse our roster of alumni tutors from top universities. Filter by high school, college, AP subject, and more to find the perfect match for your student.');
  }, []);

  return <TutorDirectory />;
}