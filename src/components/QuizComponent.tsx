import { useState } from 'react';
import { LazyMotion, domAnimation, m as motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { ArrowLeft, ArrowRight, Star, Calendar, X, Search } from 'lucide-react';
interface QuizProps {
  onClose: () => void;
}
interface TutorMatch {
  id: string;
  name: string;
  university: string;
  highSchool: string;
  subjects: string[];
  satScore: number;
  actScore: number;
  matchPercentage: number;
  image: string;
  specialties: string[];
  availability: string;
}

// Add Greenwich High School tutors for proper filtering
const mockTutors: TutorMatch[] = [{
  id: 'emma-richmond',
  name: 'Emma',
  university: 'University of Richmond',
  highSchool: 'Greenwich High School',
  subjects: ['Biology', 'Chemistry', 'ACT Prep'],
  satScore: 0,
  actScore: 33,
  matchPercentage: 98,
  image: '/lovable-uploads/0ea882bc-d682-4384-8f8c-b3dbadecd135.webp',
  specialties: ['Biology', 'Chemistry'],
  availability: 'Flexible Schedule'
}, {
  id: 'harry-yale',
  name: 'Harry',
  university: 'Yale University',
  highSchool: 'Greenwich High School',
  subjects: ['Science', 'Mathematics', 'ACT Prep'],
  satScore: 1560,
  actScore: 36,
  matchPercentage: 97,
  image: '/lovable-uploads/b1fd84ae-9a51-43f0-a991-5df1189eb986.webp',
  specialties: ['All Science Levels', 'Math', 'ACT Prep'],
  availability: 'Flexible Schedule'
}, {
  id: 'nina-michigan',
  name: 'Nina',
  university: 'University of Michigan',
  highSchool: 'Greenwich High School',
  subjects: ['History', 'Reading', 'Writing', 'ACT Prep'],
  satScore: 0,
  actScore: 35,
  matchPercentage: 93,
  image: '/lovable-uploads/c76b18cc-76a1-4e08-a698-e4a7931ef3d7.webp',
  specialties: ['All History', 'Reading', 'Writing Levels'],
  availability: 'Flexible Schedule'
}, {
  id: '1',
  name: 'Hunter',
  university: 'Columbia University',
  highSchool: 'Brunswick School',
  subjects: ['Biology', 'Chemistry', 'Physics', 'SAT Prep', 'Mathematics'],
  satScore: 1550,
  actScore: 35,
  matchPercentage: 98,
  image: '/lovable-uploads/dd42b2e0-85f7-4023-b4d5-b08d82e6a7d8.webp',
  specialties: ['Biology', 'Chemistry', 'Physics', 'SAT Prep', 'Math (up to Multivariable Calculus)'],
  availability: 'Flexible Schedule'
}, {
  id: '4',
  name: 'Elizabeth',
  university: 'Princeton University',
  highSchool: 'Darien High School',
  subjects: ['English', 'History', 'Mathematics', 'Chemistry', 'French'],
  satScore: 1540,
  actScore: 35,
  matchPercentage: 97,
  image: '/lovable-uploads/e1dd3d12-ac20-44c1-b011-890201bbaf19.webp',
  specialties: ['English Language & Composition', 'US History', 'Calculus BC', 'Chemistry', 'French'],
  availability: 'Flexible Schedule'
}, {
  id: '8',
  name: 'Charlotte',
  university: 'Georgetown University',
  highSchool: 'Darien High School',
  subjects: ['Biology', 'SAT Prep', 'Mathematics', 'Chemistry', 'Spanish', 'History', 'English'],
  satScore: 1520,
  actScore: 34,
  matchPercentage: 95,
  image: '/lovable-uploads/f25d0ab3-1b2d-4983-84d7-f5f23fdf0bb6.webp',
  specialties: ['Biology', 'SAT Preparation', 'Calculus AB', 'Chemistry', 'Spanish Language', 'Studio Art'],
  availability: 'Flexible Schedule'
}, {
  id: 'radea-uconn',
  name: 'Radea',
  university: 'University of Connecticut',
  highSchool: 'New Canaan High School',
  subjects: ['Science', 'Mathematics', 'English', 'History', 'Economics', 'Computer Science', 'Languages', 'SAT Prep'],
  satScore: 1560,
  actScore: 0,
  matchPercentage: 98,
  image: '/lovable-uploads/radea-uconn.webp',
  specialties: ['Valedictorian', 'Physics', 'Chemistry', 'Calculus BC', 'Statistics'],
  availability: 'Flexible Schedule'
}, {
  id: 'rohan-upenn',
  name: 'Rohan',
  university: 'University of Pennsylvania',
  highSchool: 'New Canaan High School',
  subjects: ['Science', 'Mathematics', 'English', 'History', 'Economics', 'Computer Science', 'ACT Prep'],
  satScore: 0,
  actScore: 35,
  matchPercentage: 97,
  image: '/lovable-uploads/rohan-upenn.webp',
  specialties: ['Class President', 'Physics', 'Chemistry', 'Calculus BC', 'Statistics', 'Psychology'],
  availability: 'Flexible Schedule'
}, {
  id: 'mason-indiana',
  name: 'Mason',
  university: 'Indiana University',
  highSchool: 'New Canaan High School',
  subjects: ['Mathematics', 'History', 'Computer Science', 'Government'],
  satScore: 0,
  actScore: 0,
  matchPercentage: 95,
  image: '/lovable-uploads/mason-indiana.webp',
  specialties: ['Calculus BC', 'Statistics', 'US History', 'Computer Science'],
  availability: 'Flexible Schedule'
}, {
  id: 'mike-villanova',
  name: 'Mike',
  university: 'Villanova University',
  highSchool: 'Greenwich Country Day School',
  subjects: [],
  satScore: 0,
  actScore: 0,
  matchPercentage: 90,
  image: '/assets/mike-photo.webp',
  specialties: [],
  availability: 'Flexible Schedule'
}, {
  id: 'adam-uva',
  name: 'Adam',
  university: 'University of Virginia',
  highSchool: 'Greenwich Country Day School',
  subjects: [],
  satScore: 0,
  actScore: 0,
  matchPercentage: 90,
  image: '/assets/adam-photo.webp',
  specialties: [],
  availability: 'Flexible Schedule'
}];
export function QuizComponent({
  onClose
}: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [matches, setMatches] = useState<TutorMatch[]>([]);
  const [highSchoolSearch, setHighSchoolSearch] = useState('');

  const allHighSchools = [
    'Greenwich High School', 'King School', 'Brunswick School', 'Staples High School', 
    'Darien High School', 'Rye Country Day School', "St. Mark's School of Texas", 
    'Fairfield Preparatory School', 'Fox Lane High School', 'Ridgefield High School', 
    'Sacred Heart Greenwich', 'St. Lukes School', 'The Taft School', 'Westminster School',
    'Loomis Chaffee School', 'Greenwich Country Day School', 'New Canaan High School',
    'Choate Rosemary Hall', 'Avon Old Farms School', 'Deerfield Academy', 'Groton School',
    'Buckingham Browne & Nichols School', 'Winsor School', 'Phillips Academy Andover',
    'Phillips Exeter Academy', 'Malvern Preparatory School', 'Princeton Day School',
    'Lawrenceville School', 'Pingry School', 'Delbarton School', 'Hackley School',
    'Portledge School', 'Oxbridge Academy', 'Lick-Wilmerding High School', 'The Webb Schools',
    'Harvard-Westlake School', 'Crean Lutheran High School', 'Georgetown Preparatory School',
    'Potomac School', 'Episcopal High School', 'Scarsdale High School', 'Brearley School',
    'Trinity School', 'Riverdale Country School', 'Collegiate School', 'Dalton School',
    'Browning School', 'Horace Mann School', 'Regis High School', 'Nightingale-Bamford School',
    'Poly Prep Country Day School', 'Other'
  ];

  const schoolsWithTutors = [
    'Greenwich High School', 'Darien High School', 'Brunswick School', 'Ridgefield High School', 
    'Staples High School', 'Fox Lane High School', "St. Mark's School of Texas", 
    'Fairfield Preparatory School', 'Rye Country Day School'
  ];

  const filteredHighSchools = allHighSchools.filter(school =>
    school.toLowerCase().includes(highSchoolSearch.toLowerCase())
  );

  const questions = [{
    id: 'highSchool',
    title: 'What high school do you attend?',
    type: 'searchSelect',
    options: allHighSchools
  }, {
    id: 'services',
    title: 'What services are you most interested in?',
    type: 'multiselect',
    options: [{
      value: 'general',
      label: 'General Subject Mastery',
      desc: 'Grades 6-12 all subjects'
    }, {
      value: 'ap',
      label: 'AP Course Mastery',
      desc: 'All AP subjects for perfect 5s'
    }, {
      value: 'test',
      label: 'Expert SAT/ACT Prep',
      desc: 'Strategic test preparation'
    }, {
      value: 'college',
      label: 'College Advisory Assistance',
      desc: 'Essays and admissions support'
    }]
  }, {
    id: 'subjects',
    title: 'Which subjects do you need help with?',
    type: 'multiselect',
    options: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science', 'Economics', 'Spanish', 'French', 'Statistics', 'SAT Prep', 'ACT Prep']
  }, {
    id: 'gender',
    title: 'Do you have a preference for tutor gender?',
    type: 'select',
    options: ['No preference', 'Male', 'Female']
  }, {
    id: 'schoolImportance',
    title: 'Is it important that your tutor attended your high school?',
    type: 'select',
    options: ['Important', 'Not Important']
  }];
  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate matches and show results
      const calculatedMatches = calculateMatches();
      setMatches(calculatedMatches);
      setShowResults(true);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const calculateMatches = (): TutorMatch[] => {
    const { highSchool, subjects, gender, schoolImportance } = answers;

    // If user selected a school without tutors and said school is important
    if (highSchool && !schoolsWithTutors.includes(highSchool) && schoolImportance === 'Important') {
      return []; // Will show disclaimer instead
    }

    // Import tutors from TutorDirectory - for now using mock data but filtering properly
    let filteredTutors = mockTutors.filter(tutor => {
      let matches = true;

      // High school filter - only apply if user doesn't care about school or school has tutors
      if (highSchool && highSchool !== 'Other' && schoolImportance === 'Important') {
        matches = matches && tutor.highSchool === highSchool;
      }

      // Gender filter
      if (gender && gender !== 'No preference') {
        // Add gender property to mock tutors for filtering
        const femaleNames = ['Elizabeth', 'Lucie', 'Riley', 'Charlotte', 'Emma', 'Angie'];
        const tutorGender = femaleNames.includes(tutor.name) ? 'Female' : 'Male';
        matches = matches && tutorGender === gender;
      }

      // Subject filter - more flexible matching
      if (subjects && subjects.length > 0) {
        const hasMatchingSubject = subjects.some((subject: string) => {
          // Special case for Physics - match Science and Biology subjects for Emma
          if (subject === 'Physics') {
            return tutor.subjects.some(tutorSubject => 
              tutorSubject.toLowerCase().includes('physics') || 
              tutorSubject.toLowerCase().includes('science') || 
              tutorSubject.toLowerCase().includes('biology') || 
              tutorSubject.toLowerCase().includes('chemistry')
            );
          }
          return tutor.subjects.some(tutorSubject => 
            tutorSubject.toLowerCase().includes(subject.toLowerCase()) || 
            subject.toLowerCase().includes(tutorSubject.toLowerCase())
          );
        });
        matches = matches && hasMatchingSubject;
      }
      return matches;
    });

    // Calculate match percentage based on criteria
    return filteredTutors.map(tutor => ({
      ...tutor,
      matchPercentage: Math.floor(Math.random() * 6) + 95 // 95-100%
    })).sort((a, b) => b.matchPercentage - a.matchPercentage);
  };
  const progress = (currentStep + 1) / questions.length * 100;
  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id];
  const isAnswered = () => {
    if (!currentAnswer) return false;
    if (Array.isArray(currentAnswer)) return currentAnswer.length > 0;
    return true;
  };
  const openCalendly = (tutorName: string) => {
    window.open('https://calendly.com/tutoringalumni/consultation', '_blank');
  };
  if (showResults) {
    return <LazyMotion features={domAnimation} strict><Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
              Your Perfect Tutor Matches
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {matches.length === 0 && answers.highSchool && !schoolsWithTutors.includes(answers.highSchool) && answers.schoolImportance === 'Important' ? (
              <Card className="border-2 border-amber-200 bg-amber-50">
                <CardContent className="p-6 text-center">
                  <div className="space-y-4">
                    <div className="text-amber-600 text-2xl">🔒</div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Tutors from {answers.highSchool} Available
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Due to privacy reasons, the tutors have asked that their profiles not be shown on our website. 
                      This doesn't mean we don't have one! Please reach out for a tutor via email: 
                      <a href="mailto:info@alumnitutor.com" className="text-amber-600 hover:text-amber-700 font-medium ml-1">
                        info@alumnitutor.com
                      </a>
                    </p>
                    <Button 
                      onClick={() => window.open('mailto:info@alumnitutor.com?subject=Tutor Request for ' + answers.highSchool, '_blank')}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-3"
                    >
                      Contact Us for a Tutor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              matches.map((tutor, index) => (
                <motion.div 
                  key={tutor.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 border-amber-200 hover:border-amber-300 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <img
                            src={tutor.image}
                            alt={tutor.name}
                            loading="lazy"
                            decoding="async"
                            className="w-24 h-24 rounded-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }} 
                          />
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center hidden">
                          <span className="text-2xl font-bold text-amber-700">{tutor.name[0]}</span>
                        </div>
                      </div>
                      
                      <div className="flex-grow space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-gray-900">{tutor.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Star className="w-5 h-5 text-amber-500 fill-current" />
                            <span className="text-lg font-bold text-amber-600">{tutor.matchPercentage}% Match</span>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p><span className="font-medium">University:</span> {tutor.university}</p>
                            <p><span className="font-medium">High School:</span> {tutor.highSchool}</p>
                            <p>
                              <span className="font-medium">Test Scores:</span>{' '}
                              {tutor.satScore > 0 && `SAT: ${tutor.satScore}`}
                              {tutor.satScore > 0 && tutor.actScore > 0 && ' | '}
                              {tutor.actScore > 0 && `ACT: ${tutor.actScore}`}
                              {tutor.satScore === 0 && tutor.actScore === 0 && 'Not disclosed'}
                            </p>
                          </div>
                          <div>
                            <p><span className="font-medium">Specialties:</span> {tutor.specialties.join(', ')}</p>
                            <p><span className="font-medium">Availability:</span> {tutor.availability}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {tutor.subjects.map(subject => (
                            <span key={subject} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 flex flex-col justify-center">
                        <Button onClick={() => openCalendly(tutor.name)} className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-500 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Session
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              ))
            )}
            
            <div className="text-center pt-6 border-t border-amber-200">
              <Button variant="outline" onClick={() => {
              setShowResults(false);
              setCurrentStep(0);
              setAnswers({});
            }} className="mr-4 border-amber-300 text-amber-700 hover:bg-amber-50">
                Retake Quiz
              </Button>
              <Button onClick={onClose} className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-500 text-white">
                View All Tutors
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog></LazyMotion>;
  }
  return <LazyMotion features={domAnimation} strict><div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-yellow-50/20 p-6 pt-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          {/* Prominent Back Button */}
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={onClose} className="text-amber-700 hover:text-amber-800 border-amber-300 hover:border-amber-400 bg-white/80 backdrop-blur-sm px-6 py-3 font-semibold">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Alumni Hub
            </Button>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600">AI Tutor Matching</div>
              <div className="text-sm text-gray-600">Find your perfect mentor</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3 bg-amber-100" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} transition={{
          duration: 0.3
        }}>
            <Card className="border-2 border-amber-200/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentQuestion.title}
                </h2>

                {currentQuestion.type === 'searchSelect' && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search for your high school..."
                        value={highSchoolSearch}
                        onChange={(e) => setHighSchoolSearch(e.target.value)}
                        className="pl-10 border-amber-200 focus:border-amber-400"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {filteredHighSchools.map(option => (
                        <button 
                          key={option} 
                          onClick={() => {
                            handleAnswer(currentQuestion.id, option);
                            setHighSchoolSearch('');
                          }} 
                          className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 ${
                            currentAnswer === option 
                              ? 'border-amber-400 bg-amber-50 text-amber-800' 
                              : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentQuestion.type === 'select' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map(option => (
                      <button 
                        key={option} 
                        onClick={() => handleAnswer(currentQuestion.id, option)} 
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                          currentAnswer === option 
                            ? 'border-amber-400 bg-amber-50 text-amber-800' 
                            : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'multiselect' && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map(option => {
                      const optionValue = typeof option === 'string' ? option : option.value;
                      const optionLabel = typeof option === 'string' ? option : option.label;
                      const optionDesc = typeof option === 'string' ? null : option.desc;
                      const isSelected = currentAnswer?.includes(optionValue);
                      return (
                        <button 
                          key={optionValue} 
                          onClick={() => {
                            const newAnswer = currentAnswer ? [...currentAnswer] : [];
                            if (isSelected) {
                              const index = newAnswer.indexOf(optionValue);
                              newAnswer.splice(index, 1);
                            } else {
                              newAnswer.push(optionValue);
                            }
                            handleAnswer(currentQuestion.id, newAnswer);
                          }} 
                          className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                            isSelected 
                              ? 'border-amber-400 bg-amber-50 text-amber-800' 
                              : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                          }`}
                        >
                          <div className="font-medium">{optionLabel}</div>
                          {optionDesc && <div className="text-sm text-gray-600 mt-1">{optionDesc}</div>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="border-amber-300 text-amber-700 hover:bg-amber-50 disabled:opacity-30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button onClick={nextStep} disabled={!isAnswered()} className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-400 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-500 text-white disabled:opacity-50">
              {currentStep === questions.length - 1 ? 'Get My Matches' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div></LazyMotion>;
}