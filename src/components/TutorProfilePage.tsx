import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { tutorDatabase, schoolNameToSlug, slugToSchoolName, tutorNameToSlug } from './TutorDirectory';
import { useEffect, useMemo } from 'react';

// State mapping for high schools
const schoolToStateMapping: { [key: string]: string } = {
  'Greenwich High School': 'CT',
  'Greenwich Academy': 'CT',
  'Greenwich Country Day School': 'CT',
  'King School': 'CT',
  'Brunswick School': 'CT',
  'Staples High School': 'CT',
  'Darien High School': 'CT',
  'Fairfield Preparatory School': 'CT',
  'Ridgefield High School': 'CT',
  'Sacred Heart Greenwich': 'CT',
  "St. Luke's School": 'CT',
  'New Canaan High School': 'CT',
  'Rye Country Day School': 'NY',
  'Fox Lane High School': 'NY',
  'Hackley School': 'NY',
  "St. Mark's School of Texas": 'TX',
};

export function TutorProfilePage() {
  const { schoolSlug, tutorSlug } = useParams<{ schoolSlug: string; tutorSlug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tutorSlug]);

  const tutor = tutorDatabase.find(t => {
    const tSchoolSlug = schoolNameToSlug(t.highSchool);
    const tNameSlug = tutorNameToSlug(t.name);
    return tSchoolSlug === schoolSlug && tNameSlug === tutorSlug;
  });

  useEffect(() => {
    if (tutor) {
      document.title = `${tutor.name} - Alumni Tutor | Alumni Tutoring`;
      document.querySelector('meta[name="description"]')?.setAttribute('content', `${tutor.name} is an alumni tutor from ${tutor.highSchool} attending ${tutor.university}. Book a session with Alumni Tutoring.`);
    } else {
      document.title = "Tutor Profile | Alumni Tutoring";
    }
  }, [tutor]);

  const { filteredTutors } = useMemo(() => {
    const stateFilter = searchParams.get('state');
    const universityFilter = searchParams.get('university');
    const apFilter = searchParams.get('ap');
    const genderFilter = searchParams.get('gender');
    const schoolFilter = searchParams.get('school');

    if (!stateFilter && !universityFilter && !apFilter && !genderFilter && !schoolFilter) {
      return { filteredTutors: tutorDatabase };
    }

    let filtered = tutorDatabase;
    if (stateFilter) filtered = filtered.filter(t => schoolToStateMapping[t.highSchool] === stateFilter);
    if (universityFilter) filtered = filtered.filter(t => t.university === universityFilter);
    if (apFilter) filtered = filtered.filter(t => t.apScores.includes(apFilter));
    if (genderFilter) filtered = filtered.filter(t => t.gender === genderFilter);
    if (schoolFilter) filtered = filtered.filter(t => t.highSchool === schoolFilter);

    return { filteredTutors: filtered };
  }, [searchParams]);

  const { currentIndex, prevTutor, nextTutor } = useMemo(() => {
    if (!tutor) return { currentIndex: -1, prevTutor: null, nextTutor: null };
    const idx = filteredTutors.findIndex(t => t.id === tutor.id);
    return {
      currentIndex: idx,
      prevTutor: idx > 0 ? filteredTutors[idx - 1] : null,
      nextTutor: idx < filteredTutors.length - 1 ? filteredTutors[idx + 1] : null
    };
  }, [tutor, filteredTutors]);

  const navigateToTutor = (targetTutor: typeof tutor) => {
    if (!targetTutor) return;
    const targetSchoolSlug = schoolNameToSlug(targetTutor.highSchool);
    const targetNameSlug = tutorNameToSlug(targetTutor.name);
    const queryString = searchParams.toString();
    navigate(`/alumnitutors/${targetSchoolSlug}/${targetNameSlug}${queryString ? `?${queryString}` : ''}`);
  };

  if (!tutor) {
    return (
      <div className="min-h-screen bg-white pt-28 px-6">
        <div className="max-w-2xl mx-auto text-center py-20">
          <h1 className="text-[28px] font-serif font-bold text-[#1D1D1F] mb-3">Tutor Not Found</h1>
          <p className="text-[15px] text-[#86868B] mb-8">The tutor you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/alumnitutors')}
            className="inline-flex items-center gap-2 text-[15px] font-medium text-[#1D1D1F] hover:text-[#86868B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Tutors
          </button>
        </div>
      </div>
    );
  }

  const showNavigation = filteredTutors.length > 1 && (prevTutor || nextTutor);

  // Build stats
  const statPills: { value: string; label: string }[] = [];
  if (tutor.satScore > 0) statPills.push({ value: String(tutor.satScore), label: 'SAT' });
  if (tutor.actScore > 0) statPills.push({ value: String(tutor.actScore), label: 'ACT' });
  if (tutor.apScores.length > 0) statPills.push({ value: String(tutor.apScores.length), label: 'AP 5s' });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section — The Baseball Card */}
      <section className="relative pt-28 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F7] via-white to-white" />

        <div className="relative max-w-2xl mx-auto px-6">
          {/* Back + Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/alumnitutors')}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Tutors
            </button>

            {showNavigation && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => prevTutor && navigateToTutor(prevTutor)}
                  disabled={!prevTutor}
                  className="p-2 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-[13px] text-[#86868B]">{currentIndex + 1} of {filteredTutors.length}</span>
                <button
                  onClick={() => nextTutor && navigateToTutor(nextTutor)}
                  disabled={!nextTutor}
                  className="p-2 rounded-full text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* The Card */}
          <div className="bg-white/50 backdrop-blur-xl border border-[#E5E5EA]/40 rounded-[28px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
            {/* Photo */}
            <div className="aspect-[3/3] w-full overflow-hidden">
              <img
                src={tutor.image}
                alt={tutor.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_15%]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            {/* Frosted glass info panel */}
            <div className="relative -mt-12 mx-4 mb-6">
              <div className="bg-white/60 backdrop-blur-xl border border-[#E5E5EA]/40 rounded-[20px] p-6 md:p-8">
                {/* Name */}
                <div className="text-center">
                  <h1 className="text-[28px] md:text-[34px] font-serif font-bold text-[#1D1D1F]">{tutor.name}</h1>

                  {/* School logos row */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4">
                    {tutor.highSchoolLogo && (
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={tutor.highSchoolLogo} alt="" loading="lazy" decoding="async" className="w-12 h-12 flex-shrink-0 rounded-[8px] border border-[#E5E5EA]/40 bg-white/80 p-1 object-contain" />
                        <div className="text-left min-w-0">
                          <p className="text-[11px] text-[#AEAEB2] uppercase tracking-wide">High School</p>
                          <p className="text-[15px] font-medium text-[#1D1D1F] leading-tight">{tutor.highSchool}</p>
                        </div>
                      </div>
                    )}

                    {tutor.highSchoolLogo && tutor.collegeLogo && (
                      <div className="hidden sm:block w-px h-10 bg-[#E5E5EA]/40" />
                    )}
                    {tutor.highSchoolLogo && tutor.collegeLogo && (
                      <div className="sm:hidden w-16 h-px bg-[#E5E5EA]/40" />
                    )}

                    {tutor.collegeLogo && (
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={tutor.collegeLogo} alt="" loading="lazy" decoding="async" className="w-12 h-12 flex-shrink-0 rounded-[8px] border border-[#E5E5EA]/40 bg-white/80 p-1 object-contain" />
                        <div className="text-left min-w-0">
                          <p className="text-[11px] text-[#AEAEB2] uppercase tracking-wide">College</p>
                          <p className="text-[15px] font-medium text-[#1D1D1F] leading-tight">{tutor.university}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats row — frosted glass pills */}
                {statPills.length > 0 && (
                  <div className="flex items-center justify-center gap-3 mt-6">
                    {statPills.map((s) => (
                      <div key={s.label} className="bg-white/50 backdrop-blur-sm border border-[#E5E5EA]/40 rounded-full px-4 py-2 text-center">
                        <p className="text-[18px] font-serif font-bold text-[#1D1D1F] leading-none">{s.value}</p>
                        <p className="text-[11px] text-[#86868B] mt-0.5 uppercase tracking-wide">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Availability */}
                <div className="flex items-center justify-center gap-1.5 mt-5">
                  <span className="w-2 h-2 rounded-full bg-[#34C759]" />
                  <span className="text-[14px] text-[#86868B]">Available for sessions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail sections */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        {/* Bio */}
        <div className="mb-10">
          <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium mb-3">About</p>
          <p className="text-[15px] text-[#1D1D1F] leading-[1.7]">{tutor.bio}</p>
        </div>

        {/* AP Scores */}
        {tutor.apScores.length > 0 && (
          <div className="mb-10">
            <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium mb-3">
              Perfect AP 5s · {tutor.apScores.length} Exams
            </p>
            <div className="flex flex-wrap gap-2">
              {tutor.apScores.map((ap) => (
                <span
                  key={ap}
                  className="px-3.5 py-1.5 bg-[#F5F5F7] text-[13px] font-medium text-[#1D1D1F] rounded-full"
                >
                  {ap}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center">
          <div className="rounded-full bg-[#F0F0F5]/60 backdrop-blur-sm border border-[#D1D1D6]/50 shadow-[0_1px_12px_rgba(0,0,0,0.04)] p-1.5 inline-flex">
            <button
              onClick={() => window.open('https://calendly.com/tutoringalumni/consultation', '_blank')}
              className="relative overflow-hidden bg-[#0A1628] text-white rounded-full h-11 px-7 text-[15px] font-medium shadow-[0_2px_12px_rgba(10,22,40,0.3)] hover:bg-[#0D1D33] transition-all duration-200 flex items-center gap-2"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
              <span className="relative z-10">Book a Session with {tutor.name}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
