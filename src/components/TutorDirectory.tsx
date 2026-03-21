import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { supabase } from '@/lib/supabase-tab-client';
import rhoadesPhoto from '@/assets/rhoades-photo.webp';
import luciePhoto from '@/assets/lucie-photo.webp';
import kaiPhoto from '@/assets/kai-photo.webp';
import michaelPhoto from '@/assets/michael-photo.webp';
import rileyPhoto from '@/assets/riley-photo.webp';
import radeaPhoto from '@/assets/radea-photo.webp';
import samPhoto from '@/assets/sam-photo.webp';
import marcoPhoto from '@/assets/marco-photo.webp';
import deeptaPhoto from '@/assets/deepta-photo.webp';
import mikePhoto from '@/assets/mike-photo.webp';
import adamPhoto from '@/assets/adam-photo.webp';
import dannyPhoto from '@/assets/danny-photo.webp';
import bradyPhoto from '@/assets/brady-photo.webp';
import aadiPhoto from '@/assets/aadi-photo.webp';
import aidanPhoto from '@/assets/aidan-photo.webp';
import aubreyPhoto from '@/assets/aubrey-photo.webp';
import andrewPhoto from '@/assets/andrew-photo.webp';
import angelinaPhoto from '@/assets/angelina-photo.webp';
import benPhoto from '@/assets/ben-photo.webp';
import harryPhoto from '@/assets/harry-photo.webp';
import benBrunswickPhoto from '@/assets/ben-brunswick-photo.webp';
import brentonPhoto from '@/assets/brenton-photo.webp';
import dantePhoto from '@/assets/dante-photo.webp';
import derekPhoto from '@/assets/derek-photo.webp';
import skyPhoto from '@/assets/sky-photo.webp';
import stevenPhoto from '@/assets/steven-photo.webp';
import willPhoto from '@/assets/will-photo.webp';
import willRyePhoto from '@/assets/will-rye-photo.webp';
import emmaPhoto from '@/assets/emma-photo.webp';
import georgePhoto from '@/assets/george-photo.webp';
import johnPhoto from '@/assets/john-photo.webp';
import ninaPhoto from '@/assets/nina-photo.webp';
import jacobPhoto from '@/assets/jacob-photo.webp';
import sydneyPhoto from '@/assets/sydney-photo.webp';
import tamarPhoto from '@/assets/tamar-photo.webp';
import charlottePhoto from '@/assets/charlotte-photo.webp';
import scarlettPhoto from '@/assets/scarlett-photo.webp';
import meiPhoto from '@/assets/mei-photo.webp';
import nicoPhoto from '@/assets/nico-photo.webp';
import laurenPhoto from '@/assets/lauren-photo.webp';
import lukePhoto from '@/assets/luke-photo.webp';
import richiePhoto from '@/assets/richie-photo.webp';
import natPhoto from '@/assets/nat-photo.webp';
import rohanPhoto from '@/assets/rohan-photo.webp';
import shafayPhoto from '@/assets/shafay-photo.webp';
import craigPhoto from '@/assets/craig-photo.webp';
import maddyPhoto from '@/assets/maddy-photo.webp';
import izzyPhoto from '@/assets/izzy-photo.webp';
import camiPhoto from '@/assets/cami-photo.webp';
import miaPhoto from '@/assets/mia-photo.webp';
import masonPhoto from '@/assets/mason-photo.webp';
import ianPhoto from '@/assets/ian-photo.webp';
import hunterPhoto from '@/assets/hunter-photo.webp';
import charlotteDarienPhoto from '@/assets/charlotte-darien-photo.webp';
import daniPhoto from '@/assets/dani-photo.webp';
import jackPhoto from '@/assets/jack-photo.webp';
import mattPhoto from '@/assets/matt-photo.webp';
import kylePhoto from '@/assets/kyle-photo.webp';
import elizabethPhoto from '@/assets/elizabeth-photo.webp';
import dylanPhoto from '@/assets/dylan-photo.webp';
import uvaLogo from '@/assets/uva-logo.webp';
// Mascot tutoring logos for high schools
const foxlaneLogo = '/lovable-uploads/Fox_Tutoring.webp';
const hackleyLogo = '/lovable-uploads/Hornet_Tutoring.webp';
const greenwichAcademyLogo = '/lovable-uploads/Gator_Tutoring.webp'; // Greenwich Academy = Gator
const greenwichHighLogo = '/lovable-uploads/Cardinal_Tutoring.webp'; // Greenwich High = Cardinal
const staplesLogo = '/lovable-uploads/Wrecker_Tutoring.webp';
const newcanaanLogo = '/lovable-uploads/Rams_Tutoring.webp';
const fairfieldprepLogo = '/lovable-uploads/Jesuit_Tutoring.webp';
const brunswickLogo = '/lovable-uploads/Bruin_Tutoring.webp'; // Brunswick = Bruin
const tigerLogo = '/lovable-uploads/Tiger_Tutoring.webp'; // Ridgefield + GCDS = Tiger
const stmarksLogo = '/lovable-uploads/Lion_Tutoring.webp'; // St. Mark's = Lion
const darienLogo = '/lovable-uploads/Blue_Wave_Tutoring.webp'; // Darien = Blue Wave
const ryecountrydayLogo = '/lovable-uploads/Wildcat_Tutoring.webp'; // RCDS = Wildcat
import stanfordLogo from '@/assets/stanford-logo.webp';
import pennLogo from '@/assets/penn-logo.webp';
import yaleLogo from '@/assets/yale-logo.webp';
import columbiaLogo from '@/assets/columbia-logo.webp';
import cornellLogo from '@/assets/cornell-logo.webp';
import princetonLogo from '@/assets/princeton-logo.webp';
import dartmouthLogo from '@/assets/dartmouth-logo.webp';
import mitLogo from '@/assets/mit-logo.webp';
import bcLogo from '@/assets/bc-logo.webp';
import uclaLogo from '@/assets/ucla-logo.webp';
import richmondLogo from '@/assets/richmond-logo.webp';
import notredameLogo from '@/assets/notredame-logo.webp';
import bowdoinLogo from '@/assets/bowdoin-logo.webp';
import berkeleyLogo from '@/assets/berkeley-logo.webp';
import uconnLogo from '@/assets/uconn-logo.webp';
import georgetownLogo from '@/assets/georgetown-logo.webp';
import washuLogo from '@/assets/washu-logo.webp';
import vanderbiltLogo from '@/assets/vanderbilt-logo.webp';
import claremontmckennaLogo from '@/assets/claremontmckenna-logo.webp';
import jhuLogo from '@/assets/jhu-logo.webp';
import harvardCrestLogo from '@/assets/harvard-crest-logo.webp';
import gatechLogo from '@/assets/gatech-logo.webp';
import amherstLogo from '@/assets/amherst-logo.webp';
import brownLogo from '@/assets/brown-logo.webp';
import indianaLogo from '@/assets/indiana-logo.webp';
import wisconsinLogo from '@/assets/wisconsin-logo.webp';
import washingtonleeLogo from '@/assets/washingtonlee-logo.webp';
import michiganLogo from '@/assets/michigan-logo.webp';
import northwesternLogo from '@/assets/northwestern-logo.webp';
import buLogo from '@/assets/bu-logo.webp';
import villanovaLogo from '@/assets/villanova-logo.webp';
import wakeforestLogo from '@/assets/wakeforest-logo.webp';
import emoryLogo from '@/assets/emory-logo.webp';
import tuftsLogo from '@/assets/tufts-logo.webp';

// Logo lookup maps for dynamic tutors from DB
const collegeLogoMap: Record<string, string> = {
  'Harvard University': harvardCrestLogo, 'Stanford University': stanfordLogo, 'Yale University': yaleLogo,
  'Columbia University': columbiaLogo, 'Cornell University': cornellLogo, 'Princeton University': princetonLogo,
  'Dartmouth College': dartmouthLogo, 'University of Pennsylvania': pennLogo, 'Brown University': brownLogo,
  'Massachusetts Institute of Technology': mitLogo, 'MIT': mitLogo, 'Georgia Tech': gatechLogo,
  'Georgetown University': georgetownLogo, 'Johns Hopkins University': jhuLogo, 'UCLA': uclaLogo,
  'University of California, Berkeley': berkeleyLogo, 'University of Virginia': uvaLogo,
  'University of Michigan': michiganLogo, 'University of Richmond': richmondLogo,
  'University of Connecticut': uconnLogo, 'University of Notre Dame': notredameLogo,
  'Northwestern University': northwesternLogo, 'Vanderbilt University': vanderbiltLogo,
  'Emory University': emoryLogo, 'Tufts University': tuftsLogo, 'Boston College': bcLogo,
  'Boston University': buLogo, 'Amherst College': amherstLogo, 'Bowdoin College': bowdoinLogo,
  'Villanova University': villanovaLogo, 'Wake Forest University': wakeforestLogo,
  'Washington University in St. Louis': washuLogo, 'Washington & Lee University': washingtonleeLogo,
  'Claremont McKenna College': claremontmckennaLogo, 'Indiana University': indianaLogo,
};
const highSchoolLogoMap: Record<string, string> = {
  'Fox Lane High School': foxlaneLogo, 'Hackley School': hackleyLogo,
  'Greenwich Academy': greenwichAcademyLogo, 'Greenwich High School': greenwichHighLogo,
  'Staples High School': staplesLogo, 'New Canaan High School': newcanaanLogo,
  'Fairfield Preparatory School': fairfieldprepLogo, 'Brunswick School': brunswickLogo,
  'Ridgefield High School': tigerLogo, 'Greenwich Country Day School': tigerLogo,
  "St. Mark's School of Texas": stmarksLogo, 'Darien High School': darienLogo,
  'Rye Country Day School': ryecountrydayLogo,
};

// Subject color mapping - platinum pills with shiny gold font
const subjectColors = {
  Mathematics: 'bg-gradient-to-r from-slate-100 to-slate-200 text-gold-600 border border-slate-300 font-semibold',
  Science: 'bg-gradient-to-r from-slate-100 to-slate-200 text-gold-600 border border-slate-300 font-semibold',
  English: 'bg-gradient-to-r from-slate-100 to-slate-200 text-gold-600 border border-slate-300 font-semibold',
  History: 'bg-gradient-to-r from-slate-100 to-slate-200 text-gold-600 border border-slate-300 font-semibold',
  Economics: 'bg-gradient-to-r from-slate-100 to-slate-200 text-gold-600 border border-slate-300 font-semibold',
  'Computer Science': 'bg-gradient-to-r from-slate-100 to-slate-200 text-gold-600 border border-slate-300 font-semibold',
  'SAT Prep': 'bg-gradient-to-r from-slate-100 to-slate-200 text-gold-600 border border-slate-300 font-semibold',
  'ACT Prep': 'bg-gradient-to-r from-slate-100 to-slate-200 text-gold-600 border border-slate-300 font-semibold',
  Languages: 'bg-gradient-to-r from-slate-100 to-slate-200 text-gold-600 border border-slate-300 font-semibold',
  'Test Prep': 'bg-gradient-to-r from-slate-100 to-slate-200 text-gold-600 border border-slate-300 font-semibold'
};

// AP Score to general subject mapping
const apToSubjectMapping = {
  // Mathematics
  'Calculus AB': 'Mathematics',
  'Calculus BC': 'Mathematics',
  'BC Calculus': 'Mathematics',
  'AB Calculus': 'Mathematics',
  'BC Calc': 'Mathematics',
  'AB Calc': 'Mathematics',
  'Statistics': 'Mathematics',
  // Science
  'Biology': 'Science',
  'Chemistry': 'Science',
  'Physics 1': 'Science',
  'Physics 2': 'Science',
  'Physics C: Mechanics': 'Science',
  'Physics C: Electricity & Magnetism': 'Science',
  'Physics C: Electricity and Magnetism': 'Science',
  'Environmental Science': 'Science',
  'Physics': 'Science',
  'Psychology': 'Science',
  // English
  'English Language': 'English',
  'English Language and Composition': 'English',
  'Language and Composition': 'English',
  'English Literature': 'English',
  'English Literature and Composition': 'English',
  'Literature': 'English',
  // History
  'US History': 'History',
  'World History': 'History',
  'Modern World History': 'History',
  'United States History': 'History',
  'European History': 'History',
  'United States Government': 'History',
  'US Government and Politics': 'History',
  'U.S. Government and Politics': 'History',
  'Government and Politics': 'History',
  'Comparative Government': 'History',
  'Comparative Politics': 'History',
  'United States Politics': 'History',
  'Government and Comparative Politics': 'History',
  // Economics
  'Macroeconomics': 'Economics',
  'Microeconomics': 'Economics',
  // Computer Science
  'Computer Science A': 'Computer Science',
  'Computer Science': 'Computer Science',
  'Computer Science Principles': 'Computer Science',
  // Languages
  'Spanish': 'Languages',
  'Spanish Language': 'Languages',
  'Spanish Language and Composition': 'Languages',
  'Spanish Language and Culture': 'Languages',
  'Spanish Culture': 'Languages',
  'French': 'Languages',
  'Latin': 'Languages'
};
interface Tutor {
  id: string;
  name: string;
  university: string;
  highSchool: string;
  gender: 'Male' | 'Female';
  subjects: string[];
  satScore: number;
  actScore: number;
  specialties: string[];
  availability: string;
  bio: string;
  image: string;
  apScores: string[];
  collegeLogo?: string;
  highSchoolLogo?: string;
}
const tutorDatabase: Tutor[] = [
// Fox Lane High School
{
  id: 'matt-harvard',
  name: 'Matt',
  university: 'Harvard University',
  highSchool: 'Fox Lane High School',
  gender: 'Male',
  subjects: ['Statistics', 'Mathematics', 'Science', 'ACT Prep'],
  satScore: 0,
  actScore: 34,
  specialties: ['Statistics', 'Math', 'Science', 'ACT Prep'],
  availability: 'Flexible Schedule',
  bio: 'Harvard University student from Fox Lane High School Class of 2022. Perfect 5s on 10 AP exams including World History, Chemistry, Computer Science Principles, Biology, English Language, United States History, Computer Science A, Environmental Science, Physics C: Mechanics, Calculus BC, and Statistics.',
  image: mattPhoto,
  apScores: ['World History', 'Chemistry', 'Computer Science Principles', 'Biology', 'English Language', 'United States History', 'Computer Science A', 'Environmental Science', 'Physics C: Mechanics', 'Calculus BC', 'Statistics'],
  highSchoolLogo: foxlaneLogo,
  collegeLogo: harvardCrestLogo
}, {
  id: 'dani-cornell',
  name: 'Dani',
  university: 'Cornell University',
  highSchool: 'Fox Lane High School',
  gender: 'Female',
  subjects: ['Science', 'Mathematics', 'SAT Prep'],
  satScore: 1490,
  actScore: 0,
  specialties: ['Science', 'Math'],
  availability: 'Flexible Schedule',
  bio: 'Cornell University student from Fox Lane High School Class of 2022. Perfect 5s on 5 AP exams: Calculus BC, Calculus AB, Environmental Science, Computer Science A, and Chemistry.',
  image: daniPhoto,
  apScores: ['Calculus BC', 'Calculus AB', 'Environmental Science', 'Computer Science A', 'Chemistry'],
  highSchoolLogo: foxlaneLogo,
  collegeLogo: cornellLogo
},
// Hackley School
{
  id: 'aidan-bowdoin',
  name: 'Aidan',
  university: 'Bowdoin College',
  highSchool: 'Hackley School',
  gender: 'Male',
  subjects: ['Statistics', 'Mathematics', 'Physics', 'English', 'SAT Prep'],
  satScore: 1560,
  actScore: 0,
  specialties: ['Statistics', 'Math', 'Physics', 'English'],
  availability: 'Flexible Schedule',
  bio: 'Bowdoin College student from Hackley School. SAT score of 1560. Perfect 5s on 4 AP exams: Statistics, English Language, Physics C: Mechanics, and Calculus AB.',
  image: aidanPhoto,
  apScores: ['Statistics', 'English Language', 'Physics C: Mechanics', 'Calculus AB'],
  highSchoolLogo: hackleyLogo,
  collegeLogo: bowdoinLogo
}, {
  id: 'steven-jhu',
  name: 'Steven',
  university: 'Johns Hopkins University',
  highSchool: 'Hackley School',
  gender: 'Male',
  subjects: ['Computer Science', 'Economics', 'Chemistry', 'Physics', 'Mathematics', 'English', 'Spanish', 'ACT Prep'],
  satScore: 0,
  actScore: 35,
  specialties: ['Computer Science', 'Economics', 'Public Health'],
  availability: 'Flexible Schedule',
  bio: 'Johns Hopkins University student from Hackley School. ACT score of 35. Triple majoring in Computer Science, Economics, and Public Health. Perfect 5s on 6 AP exams: Computer Science A, Physics, Chemistry, English Language, Calculus BC, and Spanish Language.',
  image: stevenPhoto,
  apScores: ['Computer Science A', 'Physics 1', 'Chemistry', 'English Language', 'Calculus BC', 'Spanish Language'],
  highSchoolLogo: hackleyLogo,
  collegeLogo: jhuLogo
},
// Greenwich High School
{
  id: 'maddy-cornell',
  name: 'Maddy',
  university: 'Cornell University',
  highSchool: 'Greenwich High School',
  gender: 'Female',
  subjects: ['Mathematics', 'SAT Prep'],
  satScore: 1520,
  actScore: 0,
  specialties: ['All Math Levels', 'SAT Prep'],
  availability: 'Flexible Schedule',
  bio: 'Cornell University student from Greenwich High School Class of 2023. Perfect 5s on 8 AP exams including English Language and Composition, Government and Comparative Politics, Physics 1, AP Calculus BC, Statistics, English Literature and Composition, Computer Science Principles, and United States History.',
  image: maddyPhoto,
  apScores: ['English Language and Composition', 'Government and Comparative Politics', 'Physics 1', 'Calculus BC', 'Statistics', 'English Literature and Composition', 'Computer Science Principles', 'United States History'],
  highSchoolLogo: greenwichHighLogo,
  collegeLogo: cornellLogo
}, {
  id: 'harry-yale',
  name: 'Harry',
  university: 'Yale University',
  highSchool: 'Greenwich High School',
  gender: 'Male',
  subjects: ['Science', 'Mathematics', 'ACT Prep'],
  satScore: 1560,
  actScore: 36,
  specialties: ['All Science Levels', 'Math', 'ACT Prep'],
  availability: 'Flexible Schedule',
  bio: 'Yale University student from Greenwich High School Class of 2023. Perfect ACT score of 36 and SAT of 1560. Perfect 5s on 9 AP exams including BC Calculus, Biology, Physics 1, Physics C: Electricity and Magnetism, English Language, Literature, United States History, Comparative Politics, and United States Politics.',
  image: harryPhoto,
  apScores: ['BC Calculus', 'Biology', 'Chemistry', 'Physics 1', 'Physics C: Electricity and Magnetism', 'English Language', 'Literature', 'United States History', 'Comparative Politics', 'United States Politics'],
  highSchoolLogo: greenwichHighLogo,
  collegeLogo: yaleLogo
}, {
  id: 'luke-gatech',
  name: 'Luke',
  university: 'Georgia Tech',
  highSchool: 'Greenwich High School',
  gender: 'Male',
  subjects: ['Physics', 'Mathematics', 'SAT Prep'],
  satScore: 1580,
  actScore: 0,
  specialties: ['Physics', 'Math'],
  availability: 'Flexible Schedule',
  bio: 'Georgia Tech Presidential Scholar from Greenwich High School Class of 2023. SAT score of 1580. Perfect 5s on 10 AP exams including English Language and Composition, Government and Comparative Politics, Physics 1, Calculus BC, Statistics, AP Physics C: Mechanics, Physics C: Electricity and Magnetism, English Literature and Composition, Computer Science Principles, and United States History.',
  image: lukePhoto,
  apScores: ['English Language and Composition', 'Government and Comparative Politics', 'Physics 1', 'Calculus BC', 'Statistics', 'Physics C: Mechanics', 'Physics C: Electricity and Magnetism', 'English Literature and Composition', 'Computer Science Principles', 'United States History'],
  highSchoolLogo: greenwichHighLogo,
  collegeLogo: gatechLogo
}, {
  id: 'george-stanford',
  name: 'George',
  university: 'Stanford University',
  highSchool: 'Greenwich High School',
  gender: 'Male',
  subjects: ['Science', 'Mathematics', 'Politics', 'English'],
  satScore: 0,
  actScore: 0,
  specialties: ['Advanced Science', 'Math', 'Politics'],
  availability: 'Flexible Schedule',
  bio: 'Stanford University student from Greenwich High School Class of 2024. Perfect 5s on 9 AP exams: BC Calculus, Biology, Physics 1, Physics C: Electricity and Magnetism, English Language, Literature, United States History, Comparative Politics, and United States Politics.',
  image: georgePhoto,
  apScores: ['BC Calculus', 'Biology', 'Physics 1', 'Physics C: Electricity and Magnetism', 'English Language', 'Literature', 'United States History', 'Comparative Politics', 'United States Politics'],
  highSchoolLogo: greenwichHighLogo,
  collegeLogo: stanfordLogo
}, {
  id: 'nina-michigan',
  name: 'Nina',
  university: 'University of Michigan',
  highSchool: 'Greenwich High School',
  gender: 'Female',
  subjects: ['History', 'Reading', 'Writing', 'ACT Prep'],
  satScore: 0,
  actScore: 35,
  specialties: ['All History', 'Reading', 'Writing Levels'],
  availability: 'Flexible Schedule',
  bio: 'University of Michigan student from Greenwich High School Class of 2023. ACT score of 35. Perfect 5s on 8 AP exams: BC Calc, Physics 1, Physics C: Mechanics, English Language, Literature, United States History, Comparative Politics, and United States Politics.',
  image: ninaPhoto,
  apScores: ['BC Calculus', 'Physics 1', 'Physics C: Mechanics', 'English Language', 'Literature', 'United States History', 'Comparative Politics', 'United States Politics'],
  highSchoolLogo: greenwichHighLogo,
  collegeLogo: michiganLogo
}, {
  id: 'emma-richmond',
  name: 'Emma',
  university: 'University of Richmond',
  highSchool: 'Greenwich High School',
  gender: 'Female',
  subjects: ['Biology', 'Chemistry', 'ACT Prep'],
  satScore: 0,
  actScore: 33,
  specialties: ['Biology', 'Chemistry'],
  availability: 'Flexible Schedule',
  bio: 'University of Richmond student from Greenwich High School Class of 2023. ACT score of 33. Perfect 5s on 6 AP exams: AB Calculus, Biology, English Language and Composition, Spanish Language and Composition, United States History, and Environmental Science.',
  image: emmaPhoto,
  apScores: ['AB Calculus', 'Biology', 'Chemistry', 'English Language and Composition', 'Spanish Language and Composition', 'United States History', 'Environmental Science'],
  highSchoolLogo: greenwichHighLogo,
  collegeLogo: richmondLogo
}, {
  id: 'nico-cornell',
  name: 'Nico',
  university: 'Cornell University',
  highSchool: 'Greenwich High School',
  gender: 'Male',
  subjects: ['French', 'Mathematics', 'SAT Prep'],
  satScore: 1520,
  actScore: 0,
  specialties: ['French', 'Math'],
  availability: 'Flexible Schedule',
  bio: 'Cornell University student from Greenwich High School Class of 2023. Fluent in French. SAT score of 1520. Perfect 5s on 10 AP exams including BC Calculus, Biology, Physics 1, Physics C: Electricity and Magnetism, English Language, Literature, United States History, Comparative Politics, United States Politics, and French.',
  image: nicoPhoto,
  apScores: ['BC Calculus', 'Biology', 'Physics 1', 'Physics C: Electricity and Magnetism', 'English Language', 'Literature', 'United States History', 'Comparative Politics', 'United States Politics', 'French'],
  highSchoolLogo: greenwichHighLogo,
  collegeLogo: cornellLogo
}, {
  id: 'aubrey-berkeley',
  name: 'Aubrey',
  university: 'University of California, Berkeley',
  highSchool: 'Greenwich High School',
  gender: 'Male',
  subjects: ['SAT Prep', 'Mathematics', 'Economics', 'Science', 'History'],
  satScore: 1600,
  actScore: 0,
  specialties: ['SAT Prep', 'Math', 'Economics'],
  availability: 'Flexible Schedule',
  bio: 'UC Berkeley student from Greenwich High School Class of 2024. Perfect SAT score of 1600. Perfect 5s on 18 AP exams including Statistics, Macroeconomics, Microeconomics, Computer Science Principles, Spanish Language, BC Calculus, Physics C: Mechanics, Physics C: Electricity and Magnetism, English Literature, United States History, European History, Biology, AB Calculus, Psychology, United States Government, Comparative Government, and Environmental Science.',
  image: aubreyPhoto,
  apScores: ['Statistics', 'Macroeconomics', 'Microeconomics', 'Computer Science Principles', 'Spanish Language', 'BC Calculus', 'Physics C: Mechanics', 'Physics C: Electricity and Magnetism', 'English Literature', 'United States History', 'European History', 'Biology', 'AB Calculus', 'Psychology', 'United States Government', 'Comparative Government', 'Environmental Science'],
  highSchoolLogo: greenwichHighLogo,
  collegeLogo: berkeleyLogo
},
// Ridgefield High School
{
  id: 'will-amherst',
  name: 'Will',
  university: 'Amherst College',
  highSchool: 'Ridgefield High School',
  gender: 'Male',
  subjects: ['Computer Science', 'History', 'English', 'Mathematics', 'Economics', 'SAT Prep'],
  satScore: 1530,
  actScore: 0,
  specialties: ['Computer Science', 'Economics'],
  availability: 'Flexible Schedule',
  bio: 'Amherst College student from Ridgefield High School Class of 2024. SAT score of 1530. Perfect 5s on 12 AP exams: Computer Science, World History, English Language, United States History, Calculus BC, Psychology, Spanish, English Literature, Chemistry, US Government and Politics, Microeconomics, and Macroeconomics.',
  image: willPhoto,
  apScores: ['Computer Science A', 'World History', 'English Language', 'United States History', 'Calculus BC', 'Psychology', 'Spanish', 'English Literature', 'Chemistry', 'US Government and Politics', 'Microeconomics', 'Macroeconomics'],
  highSchoolLogo: tigerLogo,
  collegeLogo: amherstLogo
}, {
  id: 'mei-ucla',
  name: 'Mei',
  university: 'UCLA',
  highSchool: 'Ridgefield High School',
  gender: 'Female',
  subjects: ['History', 'English', 'Mathematics', 'Chemistry', 'Economics'],
  satScore: 0,
  actScore: 0,
  specialties: ['Liberal Arts', 'STEM'],
  availability: 'Flexible Schedule',
  bio: 'UCLA student from Ridgefield High School Class of 2024. Perfect 5s on 10 AP exams: World History, English Language, United States History, Calculus BC, Psychology, English Literature, Chemistry, US Government and Politics, Microeconomics, and Macroeconomics.',
  image: meiPhoto,
  apScores: ['World History', 'English Language', 'United States History', 'Calculus BC', 'Psychology', 'English Literature', 'Chemistry', 'US Government and Politics', 'Microeconomics', 'Macroeconomics'],
  highSchoolLogo: tigerLogo,
  collegeLogo: uclaLogo
}, {
  id: 'andrew-uva',
  name: 'Andrew',
  university: 'University of Virginia',
  highSchool: 'Ridgefield High School',
  gender: 'Male',
  subjects: ['Computer Science', 'Mathematics', 'Biology', 'Physics', 'Economics', 'SAT Prep'],
  satScore: 1540,
  actScore: 0,
  specialties: ['Computer Science', 'STEM', 'Economics'],
  availability: 'Flexible Schedule',
  bio: 'University of Virginia student from Ridgefield High School Class of 2024. SAT score of 1540. Perfect 5s on 6 AP exams: Computer Science, Calculus BC, Biology, Physics, Microeconomics, and Macroeconomics.',
  image: andrewPhoto,
  apScores: ['Computer Science A', 'Calculus BC', 'Biology', 'Physics 1', 'Microeconomics', 'Macroeconomics'],
  collegeLogo: uvaLogo,
  highSchoolLogo: tigerLogo
}, {
  id: 'ben-bc',
  name: 'Ben',
  university: 'Boston College',
  highSchool: 'Ridgefield High School',
  gender: 'Male',
  subjects: ['History', 'English', 'Mathematics', 'Chemistry', 'Economics'],
  satScore: 0,
  actScore: 0,
  specialties: ['Liberal Arts', 'Economics'],
  availability: 'Flexible Schedule',
  bio: 'Boston College student from Ridgefield High School Class of 2024. Perfect 5s on 9 AP exams: World History, English Language, United States History, Calculus BC, English Literature, Chemistry, US Government and Politics, Microeconomics, and Macroeconomics.',
  image: benPhoto,
  apScores: ['World History', 'English Language', 'United States History', 'Calculus BC', 'English Literature', 'Chemistry', 'US Government and Politics', 'Microeconomics', 'Macroeconomics'],
  highSchoolLogo: tigerLogo,
  collegeLogo: bcLogo
}, {
  id: 'derek-uva',
  name: 'Derek',
  university: 'University of Virginia',
  highSchool: 'Ridgefield High School',
  gender: 'Male',
  subjects: ['Statistics', 'Mathematics', 'Economics', 'English', 'Physics', 'History', 'SAT Prep'],
  satScore: 1570,
  actScore: 0,
  specialties: ['Statistics', 'Economics', 'Liberal Arts'],
  availability: 'Flexible Schedule',
  bio: 'University of Virginia student from Ridgefield High School Class of 2024. SAT score of 1570. Perfect 5s on 13 AP exams: Statistics, Calculus BC, Microeconomics, Macroeconomics, English Literature, English Language, Spanish, U.S. Government and Politics, Physics 1, Physics 2, Psychology, United States History, and World History.',
  image: derekPhoto,
  apScores: ['Statistics', 'Calculus BC', 'Microeconomics', 'Macroeconomics', 'English Literature', 'English Language', 'Spanish', 'U.S. Government and Politics', 'Physics 1', 'Physics 2', 'Psychology', 'United States History', 'World History'],
  collegeLogo: uvaLogo,
  highSchoolLogo: tigerLogo
}, {
  id: 'kyle-uva',
  name: 'Kyle',
  university: 'University of Virginia',
  highSchool: 'Ridgefield High School',
  gender: 'Male',
  subjects: ['History', 'Computer Science', 'English', 'Statistics', 'Mathematics', 'Physics', 'Economics', 'SAT Prep'],
  satScore: 1530,
  actScore: 0,
  specialties: ['Computer Science', 'Liberal Arts'],
  availability: 'Flexible Schedule',
  bio: 'University of Virginia student from Ridgefield High School Class of 2024. SAT score of 1530. Perfect 5s on 12 AP exams: World History, Computer Science A, United States History, English Language, Statistics, Calculus BC, Physics 1, English Literature, Spanish, US Government and Politics, Macroeconomics, Microeconomics, and Physics 2.',
  image: kylePhoto,
  apScores: ['World History', 'Computer Science A', 'United States History', 'English Language', 'Statistics', 'Calculus BC', 'Physics 1', 'English Literature', 'Spanish', 'US Government and Politics', 'Macroeconomics', 'Microeconomics', 'Physics 2'],
  collegeLogo: uvaLogo,
  highSchoolLogo: tigerLogo
},
// St. Mark's School of Texas
{
  id: 'ian-dartmouth',
  name: 'Ian',
  university: 'Dartmouth College',
  highSchool: "St. Mark's School of Texas",
  gender: 'Male',
  subjects: ['Science', 'Mathematics', 'English', 'SAT Prep', 'History'],
  satScore: 1570,
  actScore: 0,
  specialties: ['All Science Levels', 'Math', 'English', 'SAT Prep'],
  availability: 'Flexible Schedule',
  bio: "Dartmouth College student from St. Mark's School of Texas Class of 2023. SAT score of 1570. Perfect 5s on 10 AP exams: Modern World History, BC Calculus, Spanish Language, English Language, English Literature, Macroeconomics, Comparative Government, Physics, Biology, and United States History.",
  image: ianPhoto,
  apScores: ['Modern World History', 'BC Calculus', 'Spanish Language', 'English Language', 'English Literature', 'Macroeconomics', 'Comparative Government', 'Physics 1', 'Biology', 'United States History'],
  highSchoolLogo: stmarksLogo,
  collegeLogo: dartmouthLogo
}, {
  id: 'nat-wl',
  name: 'Nat',
  university: 'Washington & Lee University',
  highSchool: "St. Mark's School of Texas",
  gender: 'Male',
  subjects: ['Mathematics', 'Economics', 'ACT Prep', 'History', 'Computer Science'],
  satScore: 0,
  actScore: 35,
  specialties: ['All Math and Economics Levels', 'ACT Prep'],
  availability: 'Flexible Schedule',
  bio: "Washington & Lee University student from St. Mark's School of Texas Class of 2023. ACT score of 35. Perfect 5s on 10 AP exams: BC Calculus, Statistics, Microeconomics, Macroeconomics, United States History, United States Government, Comparative Government, Physics 1, Computer Science A, and World History.",
  image: natPhoto,
  apScores: ['BC Calculus', 'Statistics', 'Microeconomics', 'Macroeconomics', 'United States History', 'United States Government', 'Comparative Government', 'Physics 1', 'Computer Science A', 'World History'],
  highSchoolLogo: stmarksLogo,
  collegeLogo: washingtonleeLogo
}, {
  id: 'sky-northwestern',
  name: 'Sky',
  university: 'Northwestern University',
  highSchool: "St. Mark's School of Texas",
  gender: 'Male',
  subjects: ['Mathematics', 'English', 'Economics', 'Physics', 'ACT Prep'],
  satScore: 0,
  actScore: 36,
  specialties: ['Math', 'English'],
  availability: 'Flexible Schedule',
  bio: "Northwestern University student from St. Mark's School of Texas Class of 2023. Perfect ACT score of 36. Perfect 5s on 4 AP exams: Macroeconomics, Microeconomics, Spanish Language and Culture, and Physics 1.",
  image: skyPhoto,
  apScores: ['Macroeconomics', 'Microeconomics', 'Spanish Language and Culture', 'Physics 1'],
  highSchoolLogo: stmarksLogo,
  collegeLogo: northwesternLogo
}, {
  id: 'john-vanderbilt',
  name: 'John',
  university: 'Vanderbilt University',
  highSchool: "St. Mark's School of Texas",
  gender: 'Male',
  subjects: ['Mathematics', 'History', 'Economics', 'English', 'ACT Prep'],
  satScore: 0,
  actScore: 35,
  specialties: ['Math', 'History'],
  availability: 'Flexible Schedule',
  bio: "Vanderbilt University student from St. Mark's School of Texas Class of 2023. ACT score of 35. Perfect 5s on 7 AP exams: Macroeconomics, Microeconomics, English Literature, English language, United States History, World History, and Environmental Science.",
  image: johnPhoto,
  apScores: ['Macroeconomics', 'Microeconomics', 'English Literature', 'English Language', 'United States History', 'World History', 'Environmental Science'],
  highSchoolLogo: stmarksLogo,
  collegeLogo: vanderbiltLogo
},
// Staples High School
{
  id: 'dylan-uva',
  name: 'Dylan',
  university: 'University of Virginia',
  highSchool: 'Staples High School',
  gender: 'Male',
  subjects: ['Data Science', 'Economics', 'Mathematics', 'Computer Science', 'SAT Prep'],
  satScore: 1540,
  actScore: 0,
  specialties: ['Data Science', 'Economics', 'Computer Science'],
  availability: 'Flexible Schedule',
  bio: 'University of Virginia student from Staples High School Class of 2023. Data Science and Economics Double Major. SAT score of 1540 (800M, 740E). Perfect 5s on 7 AP exams: English Language, Calculus AB, Spanish Language, Microeconomics, Macroeconomics, Environmental Science, and Computer Science.',
  image: dylanPhoto,
  apScores: ['English Language', 'Calculus AB', 'Spanish Language', 'Microeconomics', 'Macroeconomics', 'Environmental Science', 'Computer Science A'],
  collegeLogo: uvaLogo,
  highSchoolLogo: staplesLogo
}, {
  id: 'scarlett-emory',
  name: 'Scarlett',
  university: 'Emory University',
  highSchool: 'Staples High School',
  gender: 'Female',
  subjects: ['Political Science', 'History', 'English', 'Economics', 'ACT Prep'],
  satScore: 0,
  actScore: 32,
  specialties: ['Political Science', 'History', 'Writing'],
  availability: 'Flexible Schedule',
  bio: "Emory University student from Staples High School Class of 2023. Political Science and History Double Major. ACT score of 32. Perfect 5s on 6 AP exams: European History, United States Government, Comparative Government, Literature, Microeconomics, Macroeconomics, and Environmental Science. Taken 7+ writing and reading heavy History, English, and Social Science classes with all A's.",
  image: scarlettPhoto,
  apScores: ['European History', 'United States Government', 'Comparative Government', 'Literature', 'Microeconomics', 'Macroeconomics', 'Environmental Science'],
  highSchoolLogo: staplesLogo,
  collegeLogo: emoryLogo
}, {
  id: 'cami-washu',
  name: 'Cami',
  university: 'Washington University in St. Louis',
  highSchool: 'Staples High School',
  gender: 'Female',
  subjects: ['Marketing', 'Business', 'English', 'History', 'ACT Prep'],
  satScore: 0,
  actScore: 34,
  specialties: ['Marketing', 'Organization & Strategic Management', 'Reading'],
  availability: 'Flexible Schedule',
  bio: 'Washington University in St. Louis student from Staples High School Class of 2023. Marketing and Organization & Strategic Management major. ACT score of 34 (36 on both Reading Sections). Former National Honor Society President. Perfect 5s on 6 AP exams: Literature, European History, World History, United States Government, Comparative Government, and Environmental Science.',
  image: camiPhoto,
  apScores: ['Literature', 'European History', 'World History', 'United States Government', 'Comparative Government', 'Environmental Science'],
  highSchoolLogo: staplesLogo,
  collegeLogo: washuLogo
}, {
  id: 'tamar-bu',
  name: 'Tamar',
  university: 'Boston University',
  highSchool: 'Staples High School',
  gender: 'Female',
  subjects: ['Biology', 'Chemistry', 'Mathematics', 'Pre-Med', 'ACT Prep'],
  satScore: 0,
  actScore: 35,
  specialties: ['Human Physiology', 'Pre-Med', 'Biology', 'Chemistry'],
  availability: 'Flexible Schedule',
  bio: "Boston University student from Staples High School Class of 2023. Human Physiology (Pre-Med) major. ACT score of 35. Perfect 5s on 6 AP exams: Calculus, Biology, Chemistry, Environmental Science, European History, and World History. Excelled in 6 college biology and chemistry classes (A's in all) and has over 100+ hours of teaching general chemistry as a learning assistant.",
  image: tamarPhoto,
  apScores: ['Calculus BC', 'Biology', 'Chemistry', 'Environmental Science', 'European History', 'World History'],
  highSchoolLogo: staplesLogo,
  collegeLogo: buLogo
}, {
  id: 'mia-staples',
  name: 'Mia',
  university: 'Dartmouth College',
  highSchool: 'Staples High School',
  gender: 'Female',
  subjects: ['US History', 'Government', 'European History', 'Environmental Science', 'Biology', 'English', 'Psychology'],
  satScore: 0,
  actScore: 35,
  specialties: ['AP Exam Prep', 'History', 'Science', 'English'],
  availability: 'Flexible Schedule',
  bio: 'Dartmouth College student from Staples High School with a 35 ACT and 8 AP courses.',
  image: miaPhoto,
  apScores: ['US History', 'Government and Politics', 'European History', 'Environmental Science', 'Biology', 'Language and Composition', 'Literature', 'Psychology'],
  highSchoolLogo: staplesLogo,
  collegeLogo: dartmouthLogo
}, {
  id: 'sam-staples',
  name: 'Sam',
  university: 'University of Pennsylvania',
  highSchool: 'Staples High School',
  gender: 'Male',
  subjects: ['Computer Science', 'Mathematics', 'Statistics', 'Spanish', 'Economics', 'Physics'],
  satScore: 0,
  actScore: 35,
  specialties: ['Computer Science', 'Mathematics', 'Economics', 'Physics'],
  availability: 'Flexible Schedule',
  bio: 'Staples High School alumni with a 35 ACT and 7 AP courses including Calculus BC and Physics C: Mechanics.',
  image: samPhoto,
  apScores: ['Computer Science A', 'Statistics', 'Calculus BC', 'Spanish Language', 'Macroeconomics', 'Microeconomics', 'Physics C: Mechanics'],
  highSchoolLogo: staplesLogo,
  collegeLogo: pennLogo
}, {
  id: 'charlotte-staples',
  name: 'Charlotte',
  university: 'University of Michigan',
  highSchool: 'Staples High School',
  gender: 'Female',
  subjects: ['Government', 'Mathematics', 'English', 'Psychology', 'Spanish', 'Chemistry'],
  satScore: 0,
  actScore: 35,
  specialties: ['AP Exam Prep', 'Calculus', 'Government', 'Psychology', 'Spanish', 'Chemistry'],
  availability: 'Flexible Schedule',
  bio: 'University of Michigan student from Staples High School with a 35 ACT and 7 AP courses including Calculus AB, Calculus BC, and AP Chemistry.',
  image: charlottePhoto,
  apScores: ['Government and Politics', 'Calculus AB', 'Calculus BC', 'Literature', 'Psychology', 'Spanish Language', 'Chemistry'],
  highSchoolLogo: staplesLogo,
  collegeLogo: michiganLogo
}, {
  id: 'angelina-staples',
  name: 'Angelina',
  university: 'Tufts University',
  highSchool: 'Staples High School',
  gender: 'Female',
  subjects: ['History', 'Government', 'Economics', 'Biology', 'Chemistry', 'Physics', 'English', 'Latin', 'Mathematics'],
  satScore: 1530,
  actScore: 36,
  specialties: ['AP Exam Prep', 'SAT/ACT Prep', 'Sciences', 'Economics', 'Latin', 'Calculus'],
  availability: 'Flexible Schedule',
  bio: 'Tufts University student from Staples High School with a perfect 36 ACT superscore and 1530 SAT. Excelled in 12 AP courses across sciences, humanities, and mathematics.',
  image: angelinaPhoto,
  apScores: ['US History', 'US Government and Politics', 'Microeconomics', 'Macroeconomics', 'Biology', 'Chemistry', 'Physics 1', 'English Language', 'English Literature', 'Latin', 'Calculus AB', 'Calculus BC'],
  highSchoolLogo: staplesLogo,
  collegeLogo: tuftsLogo
}, {
  id: 'lauren-greenwich',
  name: 'Lauren',
  university: 'Tufts University',
  highSchool: 'Greenwich High School',
  gender: 'Female',
  subjects: ['Biology', 'Physics', 'English', 'Spanish', 'Art', 'Psychology', 'Mathematics'],
  satScore: 0,
  actScore: 0,
  specialties: ['AP Exam Prep', 'Sciences', 'Psychology', 'Spanish', 'Calculus'],
  availability: 'Flexible Schedule',
  bio: 'Tufts University student from Greenwich High School Class of 2025. Excelled in 7 AP courses including Biology, Physics 1, and BC Calculus.',
  image: laurenPhoto,
  apScores: ['Biology', 'Physics 1', 'English Language and Composition', 'Spanish Language', '3D Art and Design', 'Psychology', 'Calculus BC'],
  highSchoolLogo: greenwichHighLogo,
  collegeLogo: tuftsLogo
},
// Original tutors
{
  id: '1',
  name: 'Hunter',
  university: 'Columbia University',
  highSchool: 'Brunswick School',
  gender: 'Male',
  subjects: ['Biology', 'Chemistry', 'Physics', 'SAT Prep', 'Mathematics'],
  satScore: 1550,
  actScore: 35,
  specialties: ['Biology', 'Chemistry', 'Physics', 'SAT Prep', 'Math (up to Multivariable Calculus)'],
  availability: 'Flexible Schedule',
  bio: 'Columbia University student from Brunswick School Class of 2023. Perfect 5s on Biology, Chemistry, Physics 1, Physics C: Mechanics/Physics C: Electricity and Magnetism, BC Calculus, Statistics, and Psychology AP exams.',
  image: hunterPhoto,
  apScores: ['Biology', 'Chemistry', 'Physics 1', 'Physics C: Mechanics', 'Physics C: Electricity and Magnetism', 'BC Calculus', 'Statistics', 'Psychology'],
  highSchoolLogo: brunswickLogo,
  collegeLogo: columbiaLogo
}, {
  id: '2',
  name: 'Ben',
  university: 'Dartmouth College',
  highSchool: 'Brunswick School',
  gender: 'Male',
  subjects: ['Biology', 'Chemistry', 'Physics', 'Mathematics', 'English', 'ACT Prep'],
  satScore: 1560,
  actScore: 36,
  specialties: ['All Science Levels', 'Math', 'English', 'ACT Prep'],
  availability: 'Flexible Schedule',
  bio: 'Dartmouth College student from Brunswick School Class of 2023 with perfect ACT score. Perfect 5s on BC Calculus, Biology, Physics 1, Physics C: Electricity and Magnetism, English Language, Literature, United States History, and Politics AP exams.',
  image: benBrunswickPhoto,
  apScores: ['BC Calculus', 'Biology', 'Physics 1', 'Physics C: Electricity and Magnetism', 'English Language', 'Literature', 'United States History', 'US Government and Politics'],
  highSchoolLogo: brunswickLogo,
  collegeLogo: dartmouthLogo
}, {
  id: '3',
  name: 'Michael',
  university: 'Columbia University',
  highSchool: 'Brunswick School',
  gender: 'Male',
  subjects: ['Mathematics', 'Computer Science', 'History', 'Writing', 'Economics'],
  satScore: 1500,
  actScore: 33,
  specialties: ['Math', 'Computer Science', 'History', 'Writing'],
  availability: 'Flexible Schedule',
  bio: 'Columbia University student from Brunswick School Class of 2023. Perfect 5s on Computer Science Principles, United States History, European History, Calculus BC, Computer Science A, Physics C: Mechanics, and Economics AP exams.',
  image: michaelPhoto,
  apScores: ['Computer Science Principles', 'United States History', 'European History', 'Calculus BC', 'Computer Science A', 'Physics C: Mechanics', 'Microeconomics'],
  highSchoolLogo: brunswickLogo,
  collegeLogo: columbiaLogo
}, {
  id: '4',
  name: 'Elizabeth',
  university: 'Princeton University',
  highSchool: 'Darien High School',
  gender: 'Female',
  subjects: ['English', 'History', 'Mathematics', 'Chemistry', 'French'],
  satScore: 1540,
  actScore: 35,
  specialties: ['English Language & Composition', 'United States History', 'Calculus BC', 'Chemistry', 'French'],
  availability: 'Flexible Schedule',
  bio: 'Princeton University student from Darien High School Class of 2023. Perfect 5s on English Language and Composition, United States History, Calculus BC, Chemistry, and French AP exams.',
  image: elizabethPhoto,
  apScores: ['English Language and Composition', 'United States History', 'Calculus BC', 'Chemistry', 'French'],
  highSchoolLogo: darienLogo,
  collegeLogo: princetonLogo
}, {
  id: '5',
  name: 'Lucie',
  university: 'Harvard University',
  highSchool: 'Darien High School',
  gender: 'Female',
  subjects: ['History', 'English', 'Mathematics', 'Government'],
  satScore: 1550,
  actScore: 35,
  specialties: ['History', 'English Literature & Composition', 'AB Calculus', 'American Government & Politics'],
  availability: 'Flexible Schedule',
  bio: 'Harvard University student from Darien High School Class of 2023. Perfect 5s on English Literature and Composition, AB Calculus, and American Government & Politics AP exams.',
  image: luciePhoto,
  apScores: ['English Literature and Composition', 'AB Calculus', 'American Government & Politics'],
  highSchoolLogo: darienLogo,
  collegeLogo: harvardCrestLogo
}, {
  id: '6',
  name: 'Riley',
  university: 'Cornell University',
  highSchool: 'Darien High School',
  gender: 'Female',
  subjects: ['History', 'Spanish', 'Computer Science', 'Biology', 'English', 'Geography', 'Statistics'],
  satScore: 1500,
  actScore: 33,
  specialties: ['History', 'Spanish Language & Literature', 'Computer Science A', 'Biology', 'Human Geography'],
  availability: 'Flexible Schedule',
  bio: 'Cornell University student from Darien High School Class of 2023. Perfect 5s on Spanish Language and Culture, Spanish Literature, Computer Science A, Biology, English Language and Composition, Human Geography, Statistics, and Law and Government AP exams.',
  image: rileyPhoto,
  apScores: ['Spanish Language and Culture', 'Spanish Literature', 'Computer Science A', 'Biology', 'English Language and Composition', 'Human Geography', 'Statistics', 'US Government and Politics'],
  highSchoolLogo: darienLogo,
  collegeLogo: cornellLogo
}, {
  id: '7',
  name: 'Jacob',
  university: 'Claremont McKenna College',
  highSchool: 'Darien High School',
  gender: 'Male',
  subjects: ['History', 'Economics', 'Mathematics', 'Science', 'English', 'Physics'],
  satScore: 1520,
  actScore: 34,
  specialties: ['European History', 'United States History', 'Environmental Science', 'Statistics', 'Microeconomics', 'Physics C'],
  availability: 'Flexible Schedule',
  bio: 'Claremont McKenna College student from Darien High School Class of 2023. Former DHS NHS President. Perfect 5s on European History, United States History, Environmental Science, Statistics, English Language & Composition, Microeconomics, and Physics C: Mechanics AP exams.',
  image: jacobPhoto,
  apScores: ['European History', 'United States History', 'Environmental Science', 'Statistics', 'English Language & Composition', 'Microeconomics', 'Physics C: Mechanics'],
  highSchoolLogo: darienLogo,
  collegeLogo: claremontmckennaLogo
}, {
  id: '8',
  name: 'Charlotte',
  university: 'Georgetown University',
  highSchool: 'Darien High School',
  gender: 'Female',
  subjects: ['Biology', 'SAT Prep', 'Mathematics', 'Chemistry', 'Spanish', 'History', 'English'],
  satScore: 1520,
  actScore: 34,
  specialties: ['Biology', 'SAT Preparation', 'Calculus AB', 'Chemistry', 'Spanish Language', 'Studio Art'],
  availability: 'Flexible Schedule',
  bio: 'Georgetown University student from Darien High School Class of 2023. Perfect 5s on Calculus AB, Chemistry, Biology, Spanish Language, Studio 3D, U.S. History, English Language, and English Literature AP exams.',
  image: charlotteDarienPhoto,
  apScores: ['Calculus AB', 'Chemistry', 'Biology', 'Spanish Language', 'Studio Art 3D', 'U.S. History', 'English Language', 'English Literature'],
  highSchoolLogo: darienLogo,
  collegeLogo: georgetownLogo
}, {
  id: '9',
  name: 'Kai',
  university: 'UCLA',
  highSchool: 'Darien High School',
  gender: 'Male',
  subjects: ['ACT Prep', 'Mathematics'],
  satScore: 1580,
  actScore: 35,
  specialties: ['ACT Preparation', 'Advanced Mathematics', 'Calculus AB', 'Calculus BC'],
  availability: 'Flexible Schedule',
  bio: 'UCLA student from Darien High School Class of 2023 with 35 ACT score. Perfect 5s on Calc AB and Calc BC AP exams.',
  image: kaiPhoto,
  apScores: ['Calculus AB', 'Calculus BC'],
  highSchoolLogo: darienLogo,
  collegeLogo: uclaLogo
}, {
  id: '10',
  name: 'Richie',
  university: 'Wake Forest University',
  highSchool: 'Darien High School',
  gender: 'Male',
  subjects: ['Science', 'Mathematics', 'SAT Prep', 'English', 'History', 'Chemistry', 'Physics'],
  satScore: 1520,
  actScore: 34,
  specialties: ['Science & Math', 'SAT Preparation', 'Chemistry', 'Physics C: Mechanics', 'Calculus BC'],
  availability: 'Flexible Schedule',
  bio: 'Wake Forest University student from Darien High School Class of 2023. Perfect 5s on English Language and Composition, United States History, Calculus BC, Chemistry, Physics C: Mechanics, and Statistics AP exams.',
  image: richiePhoto,
  apScores: ['English Language and Composition', 'United States History', 'Calculus BC', 'Chemistry', 'Physics C: Mechanics', 'Statistics'],
  highSchoolLogo: darienLogo,
  collegeLogo: wakeforestLogo
}, {
  id: '11',
  name: 'Brenton',
  university: 'University of Connecticut',
  highSchool: 'Darien High School',
  gender: 'Male',
  subjects: ['Mathematics', 'Physics', 'Chemistry', 'Government'],
  satScore: 1500,
  actScore: 33,
  specialties: ['Math and Physics', 'Physics C Mechanics', 'Physics C E&M', 'Calculus BC', 'Chemistry'],
  availability: 'Flexible Schedule',
  bio: 'UConn student from Darien High School Class of 2023. Perfect 5s on Physics C Mechanics, Physics C Electricity & Magnetism, Calculus BC, Calculus AB, American Government & Politics, and Chemistry AP exams.',
  image: brentonPhoto,
  apScores: ['Physics C Mechanics', 'Physics C Electricity & Magnetism', 'Calculus BC', 'Calculus AB', 'American Government & Politics', 'Chemistry'],
  highSchoolLogo: darienLogo,
  collegeLogo: uconnLogo
}, {
  id: '12',
  name: 'Shafay',
  university: 'University of Wisconsin',
  highSchool: 'Darien High School',
  gender: 'Male',
  subjects: ['Mathematics', 'Economics', 'Statistics'],
  satScore: 1560,
  actScore: 35,
  specialties: ['Math & Economics', 'Microeconomics', 'Macroeconomics', 'Statistics'],
  availability: 'Flexible Schedule',
  bio: 'University of Wisconsin student from Darien High School Class of 2023 with 780 Math SAT score. Perfect 5s on Micro Economics, Macro Economics, and Statistics AP exams.',
  image: shafayPhoto,
  apScores: ['Microeconomics', 'Macroeconomics', 'Statistics'],
  highSchoolLogo: darienLogo,
  collegeLogo: wisconsinLogo
},
// Fairfield Preparatory School
{
  id: 'marco-upenn',
  name: 'Marco',
  university: 'University of Pennsylvania',
  highSchool: 'Fairfield Preparatory School',
  gender: 'Male',
  subjects: ['Mathematics', 'Science', 'English', 'History', 'SAT Prep'],
  satScore: 0,
  actScore: 0,
  specialties: ['Math', 'Science', 'English', 'History'],
  availability: 'Flexible Schedule',
  bio: 'University of Pennsylvania student from Fairfield Preparatory School Class of 2023. Specializes in math, science, English, and history. Perfect 5s on 5 AP exams: English Literature, English Language, Latin, Biology, US Government and Politics, United States History, and Statistics.',
  image: marcoPhoto,
  apScores: ['English Literature', 'English Language', 'Latin', 'Biology', 'US Government and Politics', 'United States History', 'Statistics'],
  highSchoolLogo: fairfieldprepLogo,
  collegeLogo: pennLogo
}, {
  id: 'craig-notre-dame',
  name: 'Craig',
  university: 'University of Notre Dame',
  highSchool: 'Fairfield Preparatory School',
  gender: 'Male',
  subjects: ['Mathematics', 'Essay Writing', 'ACT Prep'],
  satScore: 0,
  actScore: 34,
  specialties: ['Essay Writing', 'Math'],
  availability: 'Flexible Schedule',
  bio: 'Notre Dame Mendoza School of Business student from Fairfield Preparatory School Class of 2023. ACT score of 34. Specializes in essay writing and math. Perfect 5s on 5 AP exams: English Literature, English Language, Calculus AB, and Calculus BC.',
  image: craigPhoto,
  apScores: ['English Literature', 'English Language', 'Calculus AB', 'Calculus BC'],
  highSchoolLogo: fairfieldprepLogo,
  collegeLogo: notredameLogo
}, {
  id: 'jack-boston-college',
  name: 'Jack',
  university: 'Boston College',
  highSchool: 'Fairfield Preparatory School',
  gender: 'Male',
  subjects: ['Science', 'History', 'ACT Prep'],
  satScore: 0,
  actScore: 34,
  specialties: ['Science', 'History'],
  availability: 'Flexible Schedule',
  bio: 'Boston College student from Fairfield Preparatory School Class of 2023. ACT score of 34. Specializes in science and history. Perfect 5s on 9 AP exams: Biology, English Literature, English Language, US Government, United States History, Computer Science, Chemistry, and Calculus BC.',
  image: jackPhoto,
  apScores: ['Biology', 'English Literature', 'English Language', 'US Government and Politics', 'United States History', 'Computer Science A', 'Chemistry', 'Calculus BC'],
  highSchoolLogo: fairfieldprepLogo,
  collegeLogo: bcLogo
},
// Rye Country Day School
{
  id: 'sydney-brown',
  name: 'Sydney',
  university: 'Brown University',
  highSchool: 'Rye Country Day School',
  gender: 'Female',
  subjects: ['Science', 'Mathematics', 'ACT Prep'],
  satScore: 0,
  actScore: 36,
  specialties: ['All Science Levels', 'Math', 'ACT Prep'],
  availability: 'Flexible Schedule',
  bio: 'Brown University student from Rye Country Day School Class of 2023. Perfect ACT score of 36. Specializes in all science levels, math, and ACT prep. Perfect 5s on 12 AP exams: Physics C Electricity, Physics C Magnetism, Physics C Mechanics, Psychology, Calculus BC, Calculus AB, English Language and Composition, Latin, Physics 1, Statistics, U.S. History, and Chemistry.',
  image: sydneyPhoto,
  apScores: ['Physics C: Electricity and Magnetism', 'Physics C: Mechanics', 'Psychology', 'Calculus BC', 'Calculus AB', 'English Language and Composition', 'Latin', 'Physics 1', 'Statistics', 'U.S. History', 'Chemistry'],
  highSchoolLogo: ryecountrydayLogo,
  collegeLogo: brownLogo
}, {
  id: 'dante-upenn',
  name: 'Dante',
  university: 'University of Pennsylvania',
  highSchool: 'Rye Country Day School',
  gender: 'Male',
  subjects: ['Mathematics', 'SAT Prep', 'Spanish'],
  satScore: 1550,
  actScore: 0,
  specialties: ['Math', 'SAT Prep', 'Spanish Language'],
  availability: 'Flexible Schedule',
  bio: 'University of Pennsylvania student from Rye Country Day School Class of 2023. SAT score of 1550. Fluent in Spanish. Specializes in math and SAT prep. Perfect 5s on 9 AP exams: Calculus BC, Calculus AB, Statistics, English Language and Composition, United States History, Comparative Politics, U.S. Politics, Spanish Language, and Spanish Culture.',
  image: dantePhoto,
  apScores: ['Calculus BC', 'Calculus AB', 'Statistics', 'English Language and Composition', 'United States History', 'Comparative Politics', 'U.S. Politics', 'Spanish Language', 'Spanish Culture'],
  highSchoolLogo: ryecountrydayLogo,
  collegeLogo: pennLogo
}, {
  id: 'will-yale-rye',
  name: 'Will',
  university: 'Yale University',
  highSchool: 'Rye Country Day School',
  gender: 'Male',
  subjects: ['History', 'English', 'Mathematics', 'Latin', 'SAT Prep', 'ACT Prep', 'Writing'],
  satScore: 1570,
  actScore: 36,
  specialties: ['SAT/ACT Prep', 'Essays/Writing', 'History', 'English', 'Latin'],
  availability: 'Flexible Schedule',
  bio: 'Yale University student from Rye Country Day School Class of 2023. Perfect ACT score of 36 and SAT score of 1570. Specializes in SAT/ACT prep, essays/writing, history, English, Latin, and math. Perfect 5s on 8 AP exams: European History, Physics C Mechanics, Calculus BC, U.S. History, Latin, English Language and Composition, Physics 1, and Computer Science A.',
  image: willRyePhoto,
  apScores: ['European History', 'Physics C: Mechanics', 'Calculus BC', 'U.S. History', 'Latin', 'English Language and Composition', 'Physics 1', 'Computer Science A'],
  highSchoolLogo: ryecountrydayLogo,
  collegeLogo: yaleLogo
}, {
  id: 'aadi-johns-hopkins',
  name: 'Aadi',
  university: 'Johns Hopkins University',
  highSchool: 'Rye Country Day School',
  gender: 'Male',
  subjects: ['Mathematics', 'Science', 'SAT Prep', 'ACT Prep'],
  satScore: 1580,
  actScore: 0,
  specialties: ['Math', 'Science', 'SAT/ACT Prep'],
  availability: 'Flexible Schedule',
  bio: 'Johns Hopkins University student from Rye Country Day School Class of 2023. SAT score of 1580. Specializes in math, science, and SAT/ACT prep. Perfect 5s on 11 AP exams: Biology, Chemistry, Environmental Science, Computer Science A, Physics 1, Calculus BC, Calculus AB, Statistics, United States History, English Language and Composition, and Physics C: Mechanics.',
  image: aadiPhoto,
  apScores: ['Biology', 'Chemistry', 'Environmental Science', 'Computer Science A', 'Physics 1', 'Calculus BC', 'Calculus AB', 'Statistics', 'United States History', 'English Language and Composition', 'Physics C: Mechanics'],
  highSchoolLogo: ryecountrydayLogo,
  collegeLogo: jhuLogo
}, {
  id: 'deepta-mit',
  name: 'Deepta',
  university: 'Massachusetts Institute of Technology',
  highSchool: 'Rye Country Day School',
  gender: 'Female',
  subjects: ['Science', 'Mathematics', 'English', 'Computer Science', 'History', 'SAT Prep', 'ACT Prep'],
  satScore: 1550,
  actScore: 36,
  specialties: ['Science', 'Math', 'Computer Science', 'English', 'SAT/ACT Prep'],
  availability: 'Flexible Schedule',
  bio: 'MIT student from Rye Country Day School. Perfect ACT score of 36 and SAT score of 1550. Perfect 5s on 11 AP exams: Chemistry, Computer Science A, English Language and Composition, English Literature and Composition, Calculus BC, Statistics, Physics C: Mechanics, Physics C: Electricity and Magnetism, Biology, Environmental Science, and United States History.',
  image: deeptaPhoto,
  apScores: ['Chemistry', 'Computer Science A', 'English Language and Composition', 'English Literature and Composition', 'Calculus BC', 'Statistics', 'Physics C: Mechanics', 'Physics C: Electricity and Magnetism', 'Biology', 'Environmental Science', 'United States History'],
  highSchoolLogo: ryecountrydayLogo,
  collegeLogo: mitLogo
},
// New Canaan High School
{
  id: 'danny-upenn',
  name: 'Danny',
  university: 'University of Pennsylvania',
  highSchool: 'New Canaan High School',
  gender: 'Male',
  subjects: ['Science', 'Mathematics', 'English', 'History', 'Economics', 'Computer Science', 'SAT Prep'],
  satScore: 1560,
  actScore: 0,
  specialties: ['Physics', 'Biology', 'Calculus BC', 'English Literature', 'History'],
  availability: 'Flexible Schedule',
  bio: 'University of Pennsylvania student from New Canaan High School Class of 2024. SAT score of 1560. Perfect 5s on 13 AP exams: Biology, Calculus BC, English Literature, Physics C Mechanics, Physics C Electricity and Magnetism, Comparative Government, Microeconomics, Physics 1, United States History, Computer Science Principles, World History, European History, and English Language and Composition.',
  image: dannyPhoto,
  apScores: ['Biology', 'Calculus BC', 'English Literature', 'Physics C: Mechanics', 'Physics C: Electricity and Magnetism', 'Comparative Government', 'Microeconomics', 'Physics 1', 'United States History', 'Computer Science Principles', 'World History', 'European History', 'English Language and Composition'],
  highSchoolLogo: newcanaanLogo,
  collegeLogo: pennLogo
}, {
  id: 'brady-richmond',
  name: 'Brady',
  university: 'University of Richmond',
  highSchool: 'New Canaan High School',
  gender: 'Male',
  subjects: ['Economics', 'Computer Science', 'History', 'Science'],
  satScore: 0,
  actScore: 0,
  specialties: ['Economics', 'Computer Science', 'History', 'Physics'],
  availability: 'Flexible Schedule',
  bio: 'University of Richmond student from New Canaan High School Class of 2024. Perfect 5s on 9 AP exams: Microeconomics, Macroeconomics, Computer Science Principles, Computer Science A, AP World History, United States History, Comparative Government, Physics 1, and Physics C.',
  image: bradyPhoto,
  apScores: ['Microeconomics', 'Macroeconomics', 'Computer Science Principles', 'Computer Science A', 'World History', 'United States History', 'Comparative Government', 'Physics 1', 'Physics C'],
  highSchoolLogo: newcanaanLogo,
  collegeLogo: richmondLogo
}, {
  id: 'radea-uconn',
  name: 'Radea',
  university: 'University of Connecticut',
  highSchool: 'New Canaan High School',
  gender: 'Female',
  subjects: ['Science', 'Mathematics', 'English', 'History', 'Economics', 'Computer Science', 'Languages', 'SAT Prep'],
  satScore: 1560,
  actScore: 0,
  specialties: ['Valedictorian', 'Physics', 'Chemistry', 'Calculus BC', 'Statistics', 'Computer Science'],
  availability: 'Flexible Schedule',
  bio: 'University of Connecticut student from New Canaan High School Class of 2025. Valedictorian. SAT score of 1560. Perfect 5s on 14 AP exams: World History, Computer Science, Chemistry, English Language and Composition, US History, Physics 1, Calculus BC, Spanish, French, Statistics, Microeconomics, Physics C: Mechanics, Physics C: Electricity & Magnetism, and English Literature.',
  image: radeaPhoto,
  apScores: ['World History', 'Computer Science A', 'Chemistry', 'English Language and Composition', 'United States History', 'Physics 1', 'Calculus BC', 'Spanish', 'French', 'Statistics', 'Microeconomics', 'Physics C: Mechanics', 'Physics C: Electricity & Magnetism', 'English Literature'],
  highSchoolLogo: newcanaanLogo,
  collegeLogo: uconnLogo
}, {
  id: 'rohan-upenn',
  name: 'Rohan',
  university: 'University of Pennsylvania',
  highSchool: 'New Canaan High School',
  gender: 'Male',
  subjects: ['Science', 'Mathematics', 'English', 'History', 'Economics', 'Computer Science', 'ACT Prep'],
  satScore: 0,
  actScore: 35,
  specialties: ['Class President', 'Physics', 'Chemistry', 'Calculus BC', 'Statistics', 'Computer Science', 'Psychology'],
  availability: 'Flexible Schedule',
  bio: 'University of Pennsylvania student from New Canaan High School Class of 2025. Class President. ACT score of 35. Perfect 5s on 13 AP exams: Chemistry, World History, Computer Science Principles, Microeconomics, Macroeconomics, Language and Composition, US History, Calculus BC, Physics 1, Statistics, Psychology, Physics C: Mechanics, and Physics C: E&M.',
  image: rohanPhoto,
  apScores: ['Chemistry', 'World History', 'Computer Science Principles', 'Microeconomics', 'Macroeconomics', 'English Language and Composition', 'United States History', 'Calculus BC', 'Physics 1', 'Statistics', 'Psychology', 'Physics C: Mechanics', 'Physics C: Electricity and Magnetism'],
  highSchoolLogo: newcanaanLogo,
  collegeLogo: pennLogo
}, {
  id: 'mason-indiana',
  name: 'Mason',
  university: 'Indiana University',
  highSchool: 'New Canaan High School',
  gender: 'Male',
  subjects: ['Mathematics', 'History', 'Computer Science', 'Government', 'ACT Prep'],
  satScore: 0,
  actScore: 35,
  specialties: ['Calculus BC', 'Statistics', 'US History', 'Computer Science'],
  availability: 'Flexible Schedule',
  bio: 'Indiana University student from New Canaan High School. ACT score of 35. Perfect 5s on 7 AP exams: World History, Calculus BC, Calculus AB, US History, Computer Science Principles, Statistics, and US Government.',
  image: masonPhoto,
  apScores: ['World History', 'Calculus BC', 'Calculus AB', 'United States History', 'Computer Science Principles', 'Statistics', 'United States Government and Politics'],
  highSchoolLogo: newcanaanLogo,
  collegeLogo: indianaLogo
}, 
// Rye Country Day School
{
  id: 'rhoades-columbia',
  name: 'Rhoades',
  university: 'Columbia University',
  highSchool: 'Rye Country Day School',
  gender: 'Male',
  subjects: ['Mathematics', 'English', 'Computer Science', 'Science', 'History', 'Statistics'],
  satScore: 0,
  actScore: 0,
  specialties: ['Statistics', 'English', 'Computer Science', 'Chemistry', 'Physics', 'Calculus', 'History'],
  availability: 'Flexible Schedule',
  bio: 'Columbia University student from Rye Country Day School Class of 2024. Perfect 5s on 9 AP exams: Statistics, English Language and Composition, English Literature and Composition, Computer Science A, Chemistry, Physics 1, Physics C: Mechanics, Calculus BC, and United States History.',
  image: rhoadesPhoto,
  apScores: ['Statistics', 'English Language and Composition', 'English Literature and Composition', 'Computer Science A', 'Chemistry', 'Physics 1', 'Physics C: Mechanics', 'Calculus BC', 'United States History'],
  highSchoolLogo: ryecountrydayLogo,
  collegeLogo: columbiaLogo
},
// Greenwich Academy
{
  id: 'izzy-columbia',
  name: 'Izzy',
  university: 'Columbia University',
  highSchool: 'Greenwich Academy',
  gender: 'Female',
  subjects: ['Art History', 'French', 'Statistics'],
  satScore: 1520,
  actScore: 0,
  specialties: ['Art History', 'French', 'Statistics'],
  availability: 'Flexible Schedule',
  bio: 'Columbia University student from Greenwich Academy. SAT score of 1520. Perfect 5s on 3 AP exams: Art History, French, and Statistics.',
  image: izzyPhoto,
  apScores: ['Art History', 'French', 'Statistics'],
  highSchoolLogo: greenwichAcademyLogo,
  collegeLogo: columbiaLogo
},
// Greenwich Country Day School
{
  id: 'mike-villanova',
  name: 'Mike',
  university: 'Villanova University',
  highSchool: 'Greenwich Country Day School',
  gender: 'Male',
  subjects: [],
  satScore: 0,
  actScore: 0,
  specialties: [],
  availability: 'Flexible Schedule',
  bio: 'Villanova University student from Greenwich Country Day School.',
  image: mikePhoto,
  apScores: [],
  highSchoolLogo: tigerLogo,
  collegeLogo: villanovaLogo
}, {
  id: 'adam-uva',
  name: 'Adam',
  university: 'University of Virginia',
  highSchool: 'Greenwich Country Day School',
  gender: 'Male',
  subjects: [],
  satScore: 0,
  actScore: 0,
  specialties: [],
  availability: 'Flexible Schedule',
  bio: 'University of Virginia student from Greenwich Country Day School.',
  image: adamPhoto,
  apScores: [],
  collegeLogo: uvaLogo,
  highSchoolLogo: tigerLogo
}];
// State mapping for high schools
const schoolToStateMapping: {
  [key: string]: string;
} = {
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
  'The Taft School': 'CT',
  'Westminster School': 'CT',
  'Loomis Chaffee School': 'CT',
  'New Canaan High School': 'CT',
  'Choate Rosemary Hall': 'CT',
  'Avon Old Farms School': 'CT',
  'Hopkins School': 'CT',
  'Rye Country Day School': 'NY',
  'Rye High School': 'NY',
  'Fox Lane High School': 'NY',
  'Hackley School': 'NY',
  'Portledge School': 'NY',
  'Scarsdale High School': 'NY',
  'Brearley School': 'NY',
  'Trinity School': 'NY',
  'Riverdale Country School': 'NY',
  'Collegiate School': 'NY',
  'Dalton School': 'NY',
  'Browning School': 'NY',
  'Horace Mann School': 'NY',
  'Regis High School': 'NY',
  'Nightingale-Bamford School': 'NY',
  'Poly Prep Country Day School': 'NY',
  "St. Mark's School of Texas": 'TX',
  'Deerfield Academy': 'MA',
  'Groton School': 'MA',
  'Buckingham Browne & Nichols School': 'MA',
  'Winsor School': 'MA',
  'Phillips Academy Andover': 'MA',
  'Phillips Exeter Academy': 'NH',
  'Malvern Preparatory School': 'PA',
  'Princeton Day School': 'NJ',
  'Lawrenceville School': 'NJ',
  'Pingry School': 'NJ',
  'Delbarton School': 'NJ',
  'Oxbridge Academy': 'FL',
  'Lick-Wilmerding High School': 'CA',
  'The Webb Schools': 'CA',
  'Harvard-Westlake School': 'CA',
  'Crean Lutheran High School': 'CA',
  'Georgetown Preparatory School': 'MD',
  'Potomac School': 'VA',
  'Episcopal High School': 'VA'
};
// Fallback schools if Supabase fetch hasn't loaded yet
const fallbackSchools = ['Brunswick School', 'Darien High School', 'Fairfield Preparatory School', 'Fox Lane High School', 'Greenwich Academy', 'Greenwich Country Day School', 'Greenwich High School', 'Hackley School', 'New Canaan High School', 'Ridgefield High School', 'Rye Country Day School', "St. Mark's School of Texas", 'Staples High School'];
const allStates = ['All States', 'CT', 'NY', 'TX'];
const allUniversities = ['All Universities', 'Amherst College', 'Boston College', 'Boston University', 'Bowdoin College', 'Brown University', 'Claremont McKenna College', 'Columbia University', 'Cornell University', 'Dartmouth College', 'Emory University', 'Georgetown University', 'Georgia Tech', 'Harvard University', 'Indiana University', 'Johns Hopkins University', 'Massachusetts Institute of Technology', 'Northwestern University', 'Princeton University', 'Stanford University', 'Tufts University', 'UCLA', 'University of California, Berkeley', 'University of Connecticut', 'University of Michigan', 'University of Notre Dame', 'University of Pennsylvania', 'University of Richmond', 'University of Virginia', 'Vanderbilt University', 'Villanova University', 'Wake Forest University', 'Washington & Lee University', 'Washington University in St. Louis', 'Yale University'];
const allSubjects = ['Biology', 'Chemistry', 'Computer Science', 'Economics', 'English', 'History', 'Languages', 'Mathematics', 'Physics', 'Science', 'Statistics'];
const allAPClasses = ['Biology', 'Calculus AB', 'Calculus BC', 'Chemistry', 'Comparative Government', 'Comparative Politics', 'Computer Science A', 'Computer Science Principles', 'English Language', 'English Literature and Composition', 'Environmental Science', 'European History', 'French', 'Government and Comparative Politics', 'Literature', 'Macroeconomics', 'Microeconomics', 'Modern World History', 'Physics 1', 'Physics 2', 'Physics C: Electricity and Magnetism', 'Physics C: Mechanics', 'Psychology', 'Spanish', 'Spanish Language and Composition', 'Statistics', 'United States Politics', 'United States Government', 'United States History', 'World History'];

// Filter Pill Dropdown component
function PillDropdown({
  label, options, value, defaultValue, onChange, isOpen, onToggle
}: {
  label: string; options: string[]; value: string; defaultValue: string; onChange: (v: string) => void;
  isOpen: boolean; onToggle: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const isActive = value !== defaultValue;
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 8, left: Math.min(rect.left, window.innerWidth - 216) });
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={onToggle}
        className={`flex-shrink-0 flex items-center gap-1 px-4 py-2 text-[13px] font-medium rounded-full transition-all whitespace-nowrap ${
          isActive
            ? 'bg-[#1D1D1F] text-white'
            : 'text-[#86868B] bg-[#F5F5F7] hover:text-[#1D1D1F] hover:bg-[#EDEDF0]'
        }`}
      >
        {isActive ? value : label}
        {isActive ? (
          <X
            className="h-3 w-3 ml-0.5 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onChange(defaultValue); }}
          />
        ) : (
          <span className="text-[11px] ml-0.5">▾</span>
        )}
      </button>
      {isOpen && (
        <div
          ref={dropRef}
          className="fixed bg-white border border-[#E5E5EA] rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] py-1.5 min-w-[200px] max-h-[240px] overflow-y-auto z-[100]"
          style={{ top: pos.top, left: pos.left }}
        >
          {options.filter(o => o !== defaultValue).map((option) => (
            <button
              key={option}
              onClick={() => { onChange(option); }}
              className={`block text-left px-3.5 py-2 text-[13px] rounded-[6px] mx-1.5 cursor-pointer transition-colors ${
                value === option ? 'text-[#1D1D1F] bg-[#F5F5F7] font-medium' : 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
              }`}
              style={{ width: 'calc(100% - 12px)' }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// Multi-select Filter Pill Dropdown (for AP Subjects)
function MultiPillDropdown({
  label, options, selected, onChange, isOpen, onToggle
}: {
  label: string; options: string[]; selected: string[]; onChange: (v: string[]) => void;
  isOpen: boolean; onToggle: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const isActive = selected.length > 0;
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 8, left: Math.min(rect.left, window.innerWidth - 216) });
    }
  }, [isOpen]);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const displayLabel = isActive
    ? selected.length === 1
      ? selected[0]
      : `${selected.length} AP Subjects`
    : label;

  return (
    <>
      <button
        ref={btnRef}
        onClick={onToggle}
        className={`flex-shrink-0 flex items-center gap-1 px-4 py-2 text-[13px] font-medium rounded-full transition-all whitespace-nowrap ${
          isActive
            ? 'bg-[#1D1D1F] text-white'
            : 'text-[#86868B] bg-[#F5F5F7] hover:text-[#1D1D1F] hover:bg-[#EDEDF0]'
        }`}
      >
        {displayLabel}
        {isActive ? (
          <X
            className="h-3 w-3 ml-0.5 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onChange([]); }}
          />
        ) : (
          <span className="text-[11px] ml-0.5">▾</span>
        )}
      </button>
      {isOpen && (
        <div
          ref={dropRef}
          className="fixed bg-white border border-[#E5E5EA] rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] py-1.5 min-w-[200px] max-h-[240px] overflow-y-auto z-[100]"
          style={{ top: pos.top, left: pos.left }}
        >
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                onClick={() => toggleOption(option)}
                className={`flex items-center gap-2 text-left px-3.5 py-2 text-[13px] rounded-[6px] mx-1.5 cursor-pointer transition-colors ${
                  isSelected ? 'text-[#1D1D1F] bg-[#F5F5F7] font-medium' : 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
                }`}
                style={{ width: 'calc(100% - 12px)' }}
              >
                <span className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                  isSelected ? 'bg-[#1D1D1F] border-[#1D1D1F] text-white' : 'border-[#D1D1D6]'
                }`}>
                  {isSelected && '✓'}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

function FilterPills({
  searchTerm, setSearchTerm,
  selectedHighSchool, setSelectedHighSchool,
  selectedUniversity, setSelectedUniversity,
  selectedAPClasses, setSelectedAPClasses,
  selectedGender, setSelectedGender,
  availableHighSchools,
  onReset,
  hasActiveFilter,
}: {
  searchTerm: string; setSearchTerm: (v: string) => void;
  selectedHighSchool: string; setSelectedHighSchool: (v: string) => void;
  selectedUniversity: string; setSelectedUniversity: (v: string) => void;
  selectedAPClasses: string[]; setSelectedAPClasses: (v: string[]) => void;
  selectedGender: string; setSelectedGender: (v: string) => void;
  availableHighSchools: string[];
  onReset: () => void;
  hasActiveFilter: boolean;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        // Check if click is on a fixed dropdown
        const target = e.target as HTMLElement;
        if (target.closest('[data-filter-dropdown]')) return;
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggle = (key: string) => setOpenDropdown(prev => prev === key ? null : key);
  const handleChange = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setOpenDropdown(null);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-6"
    >
      <div className="relative flex-shrink-0">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#AEAEB2]" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-[160px] pl-8 pr-3 py-2 text-[13px] text-[#1D1D1F] bg-[#F5F5F7] border-none rounded-full placeholder:text-[#AEAEB2] focus:outline-none focus:ring-1 focus:ring-[#1D1D1F]"
        />
      </div>
      <PillDropdown label="High School" options={availableHighSchools} value={selectedHighSchool} defaultValue="All High Schools" onChange={handleChange(setSelectedHighSchool)} isOpen={openDropdown === 'hs'} onToggle={() => toggle('hs')} />
      <PillDropdown label="College" options={allUniversities} value={selectedUniversity} defaultValue="All Universities" onChange={handleChange(setSelectedUniversity)} isOpen={openDropdown === 'uni'} onToggle={() => toggle('uni')} />
      <MultiPillDropdown label="AP Subject" options={allAPClasses} selected={selectedAPClasses} onChange={setSelectedAPClasses} isOpen={openDropdown === 'ap'} onToggle={() => toggle('ap')} />
      <PillDropdown label="Gender" options={['All Genders', 'Male', 'Female']} value={selectedGender} defaultValue="All Genders" onChange={handleChange(setSelectedGender)} isOpen={openDropdown === 'gender'} onToggle={() => toggle('gender')} />
      {hasActiveFilter && (
        <button
          onClick={onReset}
          className="flex-shrink-0 px-4 py-2 text-[13px] font-medium text-[#86868B] bg-[#F5F5F7] rounded-full hover:text-[#1D1D1F] hover:bg-[#EDEDF0] transition-all whitespace-nowrap"
        >
          Reset All
        </button>
      )}
    </div>
  );
}

// Helper function to convert school names to URL-friendly slugs
export const schoolNameToSlug = (schoolName: string): string => {
  // Special case for Hackley School
  if (schoolName === 'Hackley School') {
    return 'hackley';
  }
  return schoolName.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
};

// Helper function to convert tutor names to URL-friendly slugs
export const tutorNameToSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
};

// Helper function to convert university names to URL-friendly slugs
export const universityNameToSlug = (universityName: string): string => {
  return universityName.toLowerCase().replace(/[^a-z0-9]/g, '');
};

// Helper function to convert AP class names to URL-friendly slugs
export const apClassToSlug = (apClass: string): string => {
  return apClass.toLowerCase().replace(/[^a-z0-9]/g, '');
};

// Helper function to convert URL slugs back to school names
export const slugToSchoolName = (slug: string): string => {
  // Special case for Hackley
  if (slug === 'hackley') {
    return 'Hackley School';
  }
  const schoolMap: { [key: string]: string } = {};
  // Use schoolToStateMapping keys as the canonical list of all known schools
  Object.keys(schoolToStateMapping).forEach(school => {
    schoolMap[schoolNameToSlug(school)] = school;
  });
  return schoolMap[slug] || 'All High Schools';
};

// Helper function to detect filter type and return the matching value
export const detectFilterFromSlug = (slug: string): { type: 'state' | 'university' | 'apClass' | 'gender' | 'highSchool' | 'none', value: string } => {
  const normalizedSlug = slug.toLowerCase();
  
  // Check states first (shortest match)
  const stateMatch = allStates.slice(1).find(state => state.toLowerCase() === normalizedSlug);
  if (stateMatch) {
    return { type: 'state', value: stateMatch };
  }
  
  // Check gender
  if (normalizedSlug === 'male') return { type: 'gender', value: 'Male' };
  if (normalizedSlug === 'female') return { type: 'gender', value: 'Female' };
  
  // Check universities
  const universityMap: { [key: string]: string } = {};
  allUniversities.slice(1).forEach(uni => {
    universityMap[universityNameToSlug(uni)] = uni;
  });
  if (universityMap[normalizedSlug]) {
    return { type: 'university', value: universityMap[normalizedSlug] };
  }
  
  // Check AP classes
  const apClassMap: { [key: string]: string } = {};
  allAPClasses.forEach(ap => {
    apClassMap[apClassToSlug(ap)] = ap;
  });
  if (apClassMap[normalizedSlug]) {
    return { type: 'apClass', value: apClassMap[normalizedSlug] };
  }
  
  // Check high schools
  const schoolName = slugToSchoolName(slug);
  if (schoolName !== 'All High Schools') {
    return { type: 'highSchool', value: schoolName };
  }
  
  return { type: 'none', value: '' };
};

// Export tutorDatabase for use in other components
export { tutorDatabase };
// School brand colors
const schoolColorMap: { [key: string]: string } = {
  'Greenwich High School': '#8C1515',
  'Greenwich Academy': '#006747',
  'Greenwich Country Day School': '#E87722',
  'Brunswick School': '#6B2714',
  'Darien High School': '#0033A0',
  'Staples High School': '#1B2A4A',
  'Fox Lane High School': '#CC0000',
  'Hackley School': '#D4A017',
  'New Canaan High School': '#CC0000',
  'Ridgefield High School': '#E87722',
  'Rye Country Day School': '#003DA5',
  "St. Mark's School of Texas": '#1B2A4A',
  'Fairfield Preparatory School': '#8B0000',
};

// Short display names for header
const schoolShortName: { [key: string]: string } = {
  'Greenwich High School': 'GREENWICH HIGH',
  'Greenwich Academy': 'GREENWICH ACADEMY',
  'Greenwich Country Day School': 'GCDS',
  'Brunswick School': 'BRUNSWICK',
  'Darien High School': 'DARIEN HIGH',
  'Staples High School': 'STAPLES',
  'Fox Lane High School': 'FOX LANE',
  'Hackley School': 'HACKLEY',
  'New Canaan High School': 'NEW CANAAN',
  'Ridgefield High School': 'RIDGEFIELD',
  'Rye Country Day School': 'RYE COUNTRY DAY',
  "St. Mark's School of Texas": "ST. MARK'S",
  'Fairfield Preparatory School': 'FAIRFIELD PREP',
};

export function TutorDirectory() {
  const { schoolSlug } = useParams<{ schoolSlug: string }>();
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHighSchool, setSelectedHighSchool] = useState('All High Schools');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedGender, setSelectedGender] = useState('All Genders');
  const [selectedAPClasses, setSelectedAPClasses] = useState<string[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState('All Universities');
  const [dynamicSchools, setDynamicSchools] = useState<string[]>([]);
  const [dbTutors, setDbTutors] = useState<Tutor[]>([]);

  // Fetch active market schools and dynamic tutors from Supabase
  useEffect(() => {
    supabase.from('markets').select('high_schools').eq('status', 'active')
      .then(({ data }) => {
        if (data) {
          const schools = data.flatMap(m => m.high_schools || []).sort();
          setDynamicSchools(schools);
        }
      });

    supabase.from('public_tutors').select('*').eq('is_active', true)
      .then(({ data }) => {
        if (data && data.length > 0) {
          const mapped: Tutor[] = data.map((t: any) => ({
            id: t.id,
            name: t.name,
            university: t.university,
            highSchool: t.high_school,
            gender: t.gender || 'Male',
            subjects: t.subjects || [],
            satScore: t.sat_score || 0,
            actScore: t.act_score || 0,
            specialties: t.specialties || [],
            availability: t.availability || 'Flexible Schedule',
            bio: t.bio || '',
            image: t.image_url || '',
            apScores: t.ap_scores || [],
          }));
          setDbTutors(mapped);
        }
      });
  }, []);

  // Pre-populate filters based on URL parameter
  useEffect(() => {
    if (schoolSlug) {
      const filterResult = detectFilterFromSlug(schoolSlug);
      
      switch (filterResult.type) {
        case 'state':
          setSelectedState(filterResult.value);
          break;
        case 'university':
          setSelectedUniversity(filterResult.value);
          break;
        case 'apClass':
          setSelectedAPClasses([filterResult.value]);
          break;
        case 'gender':
          setSelectedGender(filterResult.value);
          break;
        case 'highSchool':
          setSelectedHighSchool(filterResult.value);
          // Set the corresponding state for this high school
          const schoolState = schoolToStateMapping[filterResult.value];
          if (schoolState) {
            setSelectedState(schoolState);
          }
          break;
      }
    }
  }, [schoolSlug]);

  // Build allHighSchools from dynamic Supabase data (with fallback)
  const allHighSchools = useMemo(() => {
    const schools = dynamicSchools.length > 0 ? dynamicSchools : fallbackSchools;
    return ['All High Schools', ...schools.sort()];
  }, [dynamicSchools]);

  // Compute available high schools based on selected state
  const availableHighSchools = useMemo(() => {
    if (selectedState === 'All States') {
      return allHighSchools;
    }
    const schoolsInState = Object.entries(schoolToStateMapping).filter(([school, state]) => state === selectedState).map(([school]) => school).sort();
    return ['All High Schools', ...schoolsInState];
  }, [selectedState, allHighSchools]);

  // Handle state selection - reset high school if it's not in the new state
  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    if (newState === 'All States') {
      // Keep current high school selection if "All States" is selected
      return;
    }

    // Check if current high school is in the new state
    if (selectedHighSchool !== 'All High Schools') {
      const schoolState = schoolToStateMapping[selectedHighSchool];
      if (schoolState !== newState) {
        setSelectedHighSchool('All High Schools');
      }
    }
  };

  // Handle high school selection - automatically set corresponding state
  const handleHighSchoolChange = (newHighSchool: string) => {
    setSelectedHighSchool(newHighSchool);
    if (newHighSchool === 'All High Schools') {
      // Don't change state when "All High Schools" is selected
      return;
    }

    // Set the corresponding state for this high school
    const schoolState = schoolToStateMapping[newHighSchool];
    if (schoolState && selectedState !== schoolState) {
      setSelectedState(schoolState);
    }
  };
  // Schools with tutors: derived from actual tutor data + dynamic markets
  const schoolsWithTutors = useMemo(() => {
    const fromTutors = new Set(tutorDatabase.map(t => t.highSchool));
    dynamicSchools.forEach(s => fromTutors.add(s));
    return Array.from(fromTutors);
  }, [dynamicSchools]);
  const filteredTutors = useMemo(() => {
    // Merge hardcoded tutors with DB tutors (DB tutors override by ID)
    const hardcodedIds = new Set(tutorDatabase.map(t => t.id));
    const allTutors = [...tutorDatabase, ...dbTutors.filter(t => !hardcodedIds.has(t.id))];
    let filtered = allTutors.filter(tutor => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matches = tutor.name.toLowerCase().includes(searchLower) || tutor.university.toLowerCase().includes(searchLower) || tutor.highSchool.toLowerCase().includes(searchLower) || tutor.subjects.some(subject => subject.toLowerCase().includes(searchLower)) || tutor.specialties.some(specialty => specialty.toLowerCase().includes(searchLower));
        if (!matches) return false;
      }

      // State filter
      if (selectedState !== 'All States') {
        const tutorState = schoolToStateMapping[tutor.highSchool];
        if (tutorState !== selectedState) {
          return false;
        }
      }

      // High school filter
      if (selectedHighSchool !== 'All High Schools' && tutor.highSchool !== selectedHighSchool) {
        return false;
      }

      // University filter
      if (selectedUniversity !== 'All Universities' && tutor.university !== selectedUniversity) {
        return false;
      }

      // Gender filter
      if (selectedGender !== 'All Genders' && tutor.gender !== selectedGender) {
        return false;
      }

      // AP Class filter - tutor must match ALL selected subjects (flexible matching)
      if (selectedAPClasses.length > 0) {
        const hasAllSelected = selectedAPClasses.every(selectedAP => {
          return tutor.apScores.some(score => {
            if (score === selectedAP) return true;
            const normalizedSelected = selectedAP.toLowerCase();
            const normalizedScore = score.toLowerCase();
            if (normalizedSelected.includes('spanish') && normalizedScore.includes('spanish')) return true;
            if (normalizedSelected.includes('english') && normalizedScore.includes('english')) return true;
            if (normalizedSelected.includes('physics') && normalizedScore.includes('physics')) return true;
            if (normalizedSelected.includes('calculus') && normalizedScore.includes('calculus')) return true;
            if (normalizedSelected.includes('government') && normalizedScore.includes('government')) return true;
            if (normalizedSelected.includes('politics') && normalizedScore.includes('politics')) return true;
            if (normalizedSelected.includes('history') && normalizedScore.includes('history')) return true;
            if (normalizedSelected.includes('literature') && normalizedScore.includes('literature')) return true;
            if (normalizedSelected.includes('computer science') && normalizedScore.includes('computer science')) return true;
            return normalizedScore.includes(normalizedSelected) || normalizedSelected.includes(normalizedScore);
          });
        });
        if (!hasAllSelected) return false;
      }
      return true;
    });

    // Custom default sort: featured tutors first, no-score tutors last, then alphabetical
    // School-specific featured ordering
    const schoolFeatured: Record<string, Record<string, number>> = {
      'Greenwich High School': {
        'luke-gatech': 0,
        'harry-yale': 1,
        'nina-michigan': 2,
      },
    };
    // School-specific demoted tutors (pushed to the bottom)
    const schoolDemoted: Record<string, Set<string>> = {
      'Greenwich High School': new Set(['aubrey-berkeley']),
    };
    const globalFeatured: Record<string, number> = {
      '5': 0,           // Lucie
      'luke-gatech': 1, // Luke
      'charlotte-staples': 2, // Charlotte
    };
    const featuredOrder = (selectedHighSchool !== 'All High Schools' && schoolFeatured[selectedHighSchool])
      ? schoolFeatured[selectedHighSchool]
      : globalFeatured;
    const demotedSet = (selectedHighSchool !== 'All High Schools' && schoolDemoted[selectedHighSchool])
      ? schoolDemoted[selectedHighSchool]
      : new Set<string>();
    filtered.sort((a, b) => {
      const aFeatured = featuredOrder[a.id] ?? -1;
      const bFeatured = featuredOrder[b.id] ?? -1;
      // Featured tutors come first in specified order
      if (aFeatured !== -1 && bFeatured !== -1) return aFeatured - bFeatured;
      if (aFeatured !== -1) return -1;
      if (bFeatured !== -1) return 1;
      // Demoted tutors go to the bottom (next to no-score tutors)
      const aDemoted = demotedSet.has(a.id);
      const bDemoted = demotedSet.has(b.id);
      if (aDemoted && !bDemoted) return 1;
      if (!aDemoted && bDemoted) return -1;
      // Tutors with no test scores go to the bottom
      const aHasScores = a.satScore > 0 || a.actScore > 0;
      const bHasScores = b.satScore > 0 || b.actScore > 0;
      if (aHasScores && !bHasScores) return -1;
      if (!aHasScores && bHasScores) return 1;
      // Otherwise alphabetical
      return a.name.localeCompare(b.name);
    });
    return filtered;
  }, [searchTerm, selectedHighSchool, selectedState, selectedGender, selectedAPClasses, selectedUniversity, dbTutors]);
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedHighSchool('All High Schools');
    setSelectedState('All States');
    setSelectedGender('All Genders');
    setSelectedAPClasses([]);
    setSelectedUniversity('All Universities');
  };
  const openCalendly = (tutorName: string) => {
    window.open('https://calendly.com/tutoringalumni/consultation', '_blank');
  };
  const [showAll, setShowAll] = useState(false);
  const displayedTutors = showAll ? filteredTutors : filteredTutors.slice(0, 8);

  const buildProfileUrl = (tutor: Tutor) => {
    return `/alumnitutors/${schoolNameToSlug(tutor.highSchool)}/${tutorNameToSlug(tutor.name)}`;
  };

  const schoolShortNameMap: Record<string, string> = {
    'Greenwich High School': 'GREENWICH HIGH',
    'Staples High School': 'STAPLES',
    'Brunswick School': 'BRUNSWICK',
    'Hackley School': 'HACKLEY',
    'Greenwich Country Day School': 'GCDS',
    'Darien High School': 'DARIEN',
    'New Canaan High School': 'NEW CANAAN',
    'Rye Country Day School': 'RYE COUNTRY DAY',
    'Fairfield Prep': 'FAIRFIELD PREP',
    'Fox Lane High School': 'FOX LANE',
    'Ridgefield High School': 'RIDGEFIELD',
    "St. Mark's School of Texas": "ST. MARK'S",
    'Washington-Lee High School': 'WASHINGTON-LEE',
    'Jesuit College Preparatory School': 'JESUIT',
  };

  const getSchoolShortName = (school: string): string => {
    if (schoolShortNameMap[school]) return schoolShortNameMap[school];
    return school
      .replace(/\s*(High School|School|Academy)\s*$/i, '')
      .toUpperCase()
      .trim();
  };

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-5">

        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium mb-4">
            {selectedHighSchool !== 'All High Schools'
              ? `// OUR ${getSchoolShortName(selectedHighSchool)} ALUMNI TUTORS \\\\`
              : '// OUR ALUMNI TUTORS \\\\'}
          </p>
          <h1 className="text-[34px] md:text-[44px] font-serif font-bold text-[#1D1D1F] leading-tight">
            Local alumni who've been in your seat.
          </h1>
        </div>

        {/* Filter Pills */}
        <FilterPills
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedHighSchool={selectedHighSchool}
          setSelectedHighSchool={handleHighSchoolChange}
          selectedUniversity={selectedUniversity}
          setSelectedUniversity={setSelectedUniversity}
          selectedAPClasses={selectedAPClasses}
          setSelectedAPClasses={setSelectedAPClasses}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          availableHighSchools={availableHighSchools}
          onReset={resetFilters}
          hasActiveFilter={selectedHighSchool !== 'All High Schools' || selectedUniversity !== 'All Universities' || selectedAPClasses.length > 0 || selectedGender !== 'All Genders' || searchTerm !== ''}
        />

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
          {displayedTutors.map((tutor) => {
            const hasPhoto = !!tutor.image;
            const statParts: { label: string; value: string }[] = [];
            if (tutor.satScore > 0) statParts.push({ label: 'SAT', value: String(tutor.satScore) });
            if (tutor.actScore > 0) statParts.push({ label: 'ACT', value: String(tutor.actScore) });
            if (tutor.apScores.length > 0) statParts.push({ label: 'AP 5s', value: String(tutor.apScores.length) });

            const shortCollege = tutor.university
              .replace('University of California, Berkeley', 'UC Berkeley')
              .replace('University of Virginia', 'UVA')
              .replace('University of Michigan', 'Michigan')
              .replace('University of Richmond', 'Richmond')
              .replace('University of Connecticut', 'UConn')
              .replace('University of Wisconsin-Madison', 'Wisconsin')
              .replace('Massachusetts Institute of Technology', 'MIT')
              .replace('Washington and Lee University', 'W&L')
              .replace('Boston University', 'Boston U')
              .replace(' University', '');

            const shortHS = tutor.highSchool
              .replace(' High School', '')
              .replace('Greenwich Country Day School', 'GCDS')
              .replace(' Preparatory School', ' Prep')
              .replace(' School', '');

            return (
              <div
                key={tutor.id}
                className="group cursor-pointer block transition-transform duration-500 ease-out hover:-translate-y-2"
                onClick={() => navigate(buildProfileUrl(tutor))}
              >
                {/* Photo — top half of unified card */}
                <div className="aspect-[3/4] w-full rounded-t-[14px] overflow-hidden bg-[#F5F5F7]">
                  {hasPhoto ? (
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[40px] font-serif font-bold text-[#AEAEB2]">{tutor.name[0]}</span>
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div className="bg-white/60 backdrop-blur-xl border border-[#E5E5EA]/40 border-t-0 rounded-b-[14px] p-3">
                  <h3 className="text-[15px] md:text-[17px] font-semibold text-[#1D1D1F]">{tutor.name}</h3>

                  {/* Schools — each on its own row with logo */}
                  <div className="flex flex-col gap-1 mt-1.5 md:mt-2">
                    {(tutor.collegeLogo || collegeLogoMap[tutor.university]) && (
                      <div className="flex items-center gap-1.5">
                        <img src={tutor.collegeLogo || collegeLogoMap[tutor.university]} alt="" loading="lazy" decoding="async" className="w-5 h-5 md:w-8 md:h-8 rounded-[3px] md:rounded-[5px] border border-[#E5E5EA] bg-white p-0.5 object-contain flex-shrink-0" />
                        <p className="text-[12px] md:text-[13px] font-medium text-[#1D1D1F] leading-tight">{shortCollege}</p>
                      </div>
                    )}
                    {(tutor.highSchoolLogo || highSchoolLogoMap[tutor.highSchool]) && (
                      <div className="flex items-center gap-1.5">
                        <img src={tutor.highSchoolLogo || highSchoolLogoMap[tutor.highSchool]} alt="" loading="lazy" decoding="async" className="w-5 h-5 md:w-8 md:h-8 rounded-[3px] md:rounded-[5px] border border-[#E5E5EA] bg-white p-0.5 object-contain flex-shrink-0" />
                        <p className="text-[11px] md:text-[12px] text-[#86868B] leading-tight">{shortHS}</p>
                      </div>
                    )}
                  </div>

                  {/* Stats — each on its own line */}
                  {statParts.length > 0 && (
                    <div className="flex flex-col gap-0.5 mt-2 pt-2 border-t border-[#E5E5EA]/30">
                      {statParts.map((s) => (
                        <p key={s.label} className="text-[11px] md:text-[12px] text-[#86868B]">
                          <span className="font-medium text-[#1D1D1F]">{s.value}</span> {s.label}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Availability */}
                  <div className="flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
                    <span className="text-[11px] md:text-[12px] text-[#86868B]">Available</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all link */}
        {!showAll && filteredTutors.length > 8 && (
          <div className="text-center mt-8">
            <span
              onClick={() => setShowAll(true)}
              className="text-[15px] font-medium text-[#1D1D1F] underline underline-offset-4 decoration-[#86868B] cursor-pointer hover:decoration-[#1D1D1F] transition-colors"
            >
              View all tutors
            </span>
          </div>
        )}
      </div>
    </div>
  );
}