import { useState, useEffect } from 'react';
import { LazyMotion, domAnimation, m as motion, AnimatePresence } from 'framer-motion';
import { Vault, Users, BookOpen, Video, FileText, Star, ChevronRight, ArrowLeft, Lock, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PDFViewer } from './PDFViewer';
import { ViewOnlyPDFViewer } from './ViewOnlyPDFViewer';
import { supabase } from '@/lib/supabase-tab-client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


interface VaultResource {
  id: string;
  title: string;
  type: 'worksheet' | 'video' | 'guide' | 'notes';
  author: string;
  university: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  description: string;
  subcategory: string;
}

interface VaultSection {
  title: string;
  icon: string;
  color: string;
  subcategories: string[];
  resources: VaultResource[];
}

const vaultSections: { [key: string]: VaultSection } = {
  math: {
    title: "Mathematics",
    icon: "📐",
    color: "from-blue-500 to-cyan-600",
    subcategories: [
      "Pre Algebra",
      "Algebra 1", 
      "Geometry",
      "Algebra 2",
      "Pre-Calculus",
      "Calculus AB",
      "Calculus BC"
    ],
    resources: [
      {
        id: 'm1',
        title: 'Pre-Algebra Fundamentals',
        type: 'guide',
        author: 'Sarah Johnson',
        university: 'Stanford',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Essential pre-algebra concepts and problem-solving strategies.',
        subcategory: 'Pre Algebra'
      },
      {
        id: 'm1b',
        title: 'SAT Practice Test Analysis Report',
        type: 'notes',
        author: 'John Doe',
        university: 'Alumni Tutoring',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Detailed SAT score breakdown and performance analysis with targeted improvement strategies.',
        subcategory: 'Pre Algebra'
      },
      {
        id: 'm2',
        title: 'Algebra 1 Problem Sets',
        type: 'worksheet',
        author: 'Michael Chen',
        university: 'MIT',
        difficulty: 'Beginner',
        rating: 4.7,
        description: 'Comprehensive practice problems for Algebra 1 topics.',
        subcategory: 'Algebra 1'
      },
      {
        id: 'm3',
        title: 'Geometry Practice Problems',
        type: 'worksheet',
        author: 'David Park',
        university: 'Harvard',
        difficulty: 'Intermediate',
        rating: 4.9,
        description: 'Comprehensive geometry problems with step-by-step solutions.',
        subcategory: 'Geometry'
      },
      {
        id: 'm4',
        title: 'Algebra 2 Master Study Guide',
        type: 'guide',
        author: 'Lisa Thompson',
        university: 'Yale',
        difficulty: 'Intermediate',
        rating: 4.6,
        description: 'Complete guide covering all Algebra 2 concepts and techniques.',
        subcategory: 'Algebra 2'
      },
      {
        id: 'm5',
        title: 'Pre-Calculus Study Guide',
        type: 'guide',
        author: 'James Wilson',
        university: 'Princeton',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Complete preparation for calculus with trigonometry review.',
        subcategory: 'Pre-Calculus'
      },
      {
        id: 'm6',
        title: 'Calculus AB Practice Tests',
        type: 'worksheet',
        author: 'Emily Rodriguez',
        university: 'Columbia',
        difficulty: 'Advanced',
        rating: 4.9,
        description: 'AP Calculus AB practice tests with detailed solutions.',
        subcategory: 'Calculus AB'
      },
      {
        id: 'm7',
        title: 'Calculus BC Advanced Techniques',
        type: 'guide',
        author: 'Robert Davis',
        university: 'Duke',
        difficulty: 'Advanced',
        rating: 5.0,
        description: 'Master advanced calculus techniques for BC exam success.',
        subcategory: 'Calculus BC'
      }
    ]
  },
  science: {
    title: "Science",
    icon: "🔬",
    color: "from-green-500 to-emerald-600",
    subcategories: [
      "AP Biology",
      "AP Chemistry", 
      "AP Physics 1",
      "AP Physics 2",
      "AP Physics C: Mechanics",
      "AP Physics C: Electricity and Magnetism"
    ],
    resources: [
      {
        id: 's1',
        title: 'AP Biology Study Guide',
        type: 'guide',
        author: 'Maria Garcia',
        university: 'Stanford',
        difficulty: 'Advanced',
        rating: 4.9,
        description: 'Comprehensive guide covering all AP Biology topics.',
        subcategory: 'AP Biology'
      },
      // Unit 1: Atomic Structure and Properties
      {
        id: 'chem-1-1',
        title: 'Unit 1.1: Moles and Molar Mass',
        type: 'guide',
        author: 'Dr. Sarah Chen',
        university: 'Harvard',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Introduction to moles, molar mass calculations, and Avogadro\'s number.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-1-2',
        title: 'Unit 1.2: Mass Spectra of Elements',
        type: 'worksheet',
        author: 'Prof. Michael Kim',
        university: 'MIT',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Practice problems on interpreting mass spectra and isotope analysis.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-1-3',
        title: 'Unit 1.3: Elemental Composition of Pure Substances',
        type: 'guide',
        author: 'Dr. Lisa Wang',
        university: 'Stanford',
        difficulty: 'Intermediate',
        rating: 4.7,
        description: 'Determining empirical and molecular formulas from experimental data.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-1-4',
        title: 'Unit 1.4: Composition of Mixtures',
        type: 'worksheet',
        author: 'Dr. James Thompson',
        university: 'Yale',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Calculating mass percentages and composition in mixtures.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-1-5',
        title: 'Unit 1.5: Atomic Structure and Electron Configuration',
        type: 'guide',
        author: 'Prof. Emma Rodriguez',
        university: 'Princeton',
        difficulty: 'Intermediate',
        rating: 4.9,
        description: 'Quantum mechanics, electron configurations, and orbital theory.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-1-6',
        title: 'Unit 1.6: Photoelectron Spectroscopy',
        type: 'worksheet',
        author: 'Dr. Robert Davis',
        university: 'Columbia',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Analyzing PES data to determine electron configurations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-1-7',
        title: 'Unit 1.7: Periodic Trends',
        type: 'guide',
        author: 'Dr. Maria Garcia',
        university: 'Duke',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Ionization energy, atomic radius, and electronegativity trends.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-1-8',
        title: 'Unit 1.8: Valence Electrons and Ionic Compounds',
        type: 'worksheet',
        author: 'Prof. David Park',
        university: 'Caltech',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Predicting ionic compound formation and properties.',
        subcategory: 'AP Chemistry'
      },

      // Unit 2: Compound Structure and Properties
      {
        id: 'chem-2-1',
        title: 'Unit 2.1: Types of Chemical Bonds',
        type: 'guide',
        author: 'Dr. Jennifer Lee',
        university: 'Harvard',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Ionic, covalent, and metallic bonding fundamentals.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-2-2',
        title: 'Unit 2.2: Intramolecular Force and Potential Energy',
        type: 'worksheet',
        author: 'Prof. Thomas Wilson',
        university: 'MIT',
        difficulty: 'Intermediate',
        rating: 4.7,
        description: 'Bond energy calculations and potential energy diagrams.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-2-3',
        title: 'Unit 2.3: Structure of Ionic Solids',
        type: 'guide',
        author: 'Dr. Amy Johnson',
        university: 'Stanford',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Crystal lattices, coordination numbers, and ionic radii.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-2-4',
        title: 'Unit 2.4: Structure of Metals and Alloys',
        type: 'worksheet',
        author: 'Dr. Kevin Brown',
        university: 'Yale',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Metallic bonding, band theory, and alloy properties.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-2-5',
        title: 'Unit 2.5: Lewis Diagrams',
        type: 'guide',
        author: 'Prof. Rachel Martinez',
        university: 'Princeton',
        difficulty: 'Intermediate',
        rating: 4.9,
        description: 'Drawing Lewis structures and predicting molecular geometry.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-2-6',
        title: 'Unit 2.6: Resonance and Formal Charge',
        type: 'worksheet',
        author: 'Dr. Steven Taylor',
        university: 'Columbia',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Resonance structures and formal charge calculations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-2-7',
        title: 'Unit 2.7: VSEPR and Hybridization',
        type: 'guide',
        author: 'Dr. Nicole Anderson',
        university: 'Duke',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Molecular geometry prediction and hybrid orbital theory.',
        subcategory: 'AP Chemistry'
      },

      // Unit 3: Properties of Substances and Mixtures
      {
        id: 'chem-3-1',
        title: 'Unit 3.1: Intermolecular and Interparticle Forces',
        type: 'guide',
        author: 'Dr. Mark Thompson',
        university: 'Harvard',
        difficulty: 'Advanced',
        rating: 4.9,
        description: 'London forces, dipole interactions, and hydrogen bonding.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-2',
        title: 'Unit 3.2: Properties of Solids',
        type: 'worksheet',
        author: 'Prof. Laura Davis',
        university: 'MIT',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Crystal structures, phase diagrams, and solid properties.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-3',
        title: 'Unit 3.3: Solids, Liquids, and Gases',
        type: 'guide',
        author: 'Dr. Brian Wilson',
        university: 'Stanford',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Phase changes, vapor pressure, and kinetic molecular theory.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-4',
        title: 'Unit 3.4: Ideal Gas Law',
        type: 'worksheet',
        author: 'Dr. Susan Garcia',
        university: 'Yale',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Gas law calculations and stoichiometry problems.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-5',
        title: 'Unit 3.5: Kinetic Molecular Theory',
        type: 'guide',
        author: 'Prof. Daniel Kim',
        university: 'Princeton',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Molecular motion, effusion, and real vs ideal gases.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-6',
        title: 'Unit 3.6: Deviation from Ideal Gas Law',
        type: 'worksheet',
        author: 'Dr. Patricia Martinez',
        university: 'Columbia',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Van der Waals equation and real gas behavior.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-7',
        title: 'Unit 3.7: Solutions and Mixtures',
        type: 'guide',
        author: 'Dr. Andrew Johnson',
        university: 'Duke',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Molarity, molality, and solution preparation.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-8',
        title: 'Unit 3.8: Representations of Solutions',
        type: 'worksheet',
        author: 'Prof. Christina Lee',
        university: 'Caltech',
        difficulty: 'Intermediate',
        rating: 4.7,
        description: 'Particulate diagrams and solution stoichiometry.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-9',
        title: 'Unit 3.9: Separation of Solutions and Mixtures',
        type: 'guide',
        author: 'Dr. Matthew Brown',
        university: 'Harvard',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Chromatography, distillation, and separation techniques.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-10',
        title: 'Unit 3.10: Solubility',
        type: 'worksheet',
        author: 'Dr. Jessica Taylor',
        university: 'MIT',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Solubility rules, Ksp calculations, and precipitation.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-11',
        title: 'Unit 3.11: Spectroscopy and the Electromagnetic Spectrum',
        type: 'guide',
        author: 'Prof. Ryan Anderson',
        university: 'Stanford',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'IR, NMR, and mass spectroscopy techniques.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-12',
        title: 'Unit 3.12: Properties of Photons',
        type: 'worksheet',
        author: 'Dr. Melissa Wilson',
        university: 'Yale',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Energy-wavelength relationships and photoelectric effect.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-3-13',
        title: 'Unit 3.13: Beer-Lambert Law',
        type: 'guide',
        author: 'Dr. Timothy Davis',
        university: 'Princeton',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Absorption spectroscopy and concentration determination.',
        subcategory: 'AP Chemistry'
      },

      // Unit 4: Chemical Reactions
      {
        id: 'chem-4-1',
        title: 'Unit 4.1: Introduction for Reactions',
        type: 'guide',
        author: 'Dr. Rebecca Garcia',
        university: 'Harvard',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Chemical equations, reaction types, and balancing.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-4-2',
        title: 'Unit 4.2: Net Ionic Equations',
        type: 'worksheet',
        author: 'Prof. Jonathan Kim',
        university: 'MIT',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Writing and balancing net ionic equations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-4-3',
        title: 'Unit 4.3: Representations of Reactions',
        type: 'guide',
        author: 'Dr. Amanda Martinez',
        university: 'Stanford',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Particulate diagrams and chemical representations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-4-4',
        title: 'Unit 4.4: Physical and Chemical Changes',
        type: 'worksheet',
        author: 'Dr. Christopher Johnson',
        university: 'Yale',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Energy changes in physical and chemical processes.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-4-5',
        title: 'Unit 4.5: Stoichiometry',
        type: 'guide',
        author: 'Prof. Stephanie Lee',
        university: 'Princeton',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Mole-to-mole ratios and limiting reagent calculations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-4-6',
        title: 'Unit 4.6: Introduction to Titration',
        type: 'worksheet',
        author: 'Dr. Gregory Thompson',
        university: 'Columbia',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Acid-base titrations and equivalence points.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-4-7',
        title: 'Unit 4.7: Types of Chemical Reactions',
        type: 'guide',
        author: 'Dr. Jennifer Wilson',
        university: 'Duke',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Synthesis, decomposition, single and double replacement.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-4-8',
        title: 'Unit 4.8: Introduction to Acid-Base Reactions',
        type: 'worksheet',
        author: 'Prof. Benjamin Davis',
        university: 'Caltech',
        difficulty: 'Intermediate',
        rating: 4.7,
        description: 'Arrhenius, Brønsted-Lowry acid-base theory.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-4-9',
        title: 'Unit 4.9: Oxidation-Reduction (Redox) Reactions',
        type: 'guide',
        author: 'Dr. Katherine Brown',
        university: 'Harvard',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Oxidation states, redox reactions, and balancing.',
        subcategory: 'AP Chemistry'
      },

      // Unit 5: Kinetics
      {
        id: 'chem-5-1',
        title: 'Unit 5.1: Reaction Rates',
        type: 'guide',
        author: 'Dr. Alexander Martinez',
        university: 'MIT',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Rate expressions and factors affecting reaction rates.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-5-2',
        title: 'Unit 5.2: Introduction to Rate Law',
        type: 'worksheet',
        author: 'Prof. Victoria Kim',
        university: 'Stanford',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Rate laws, rate constants, and reaction orders.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-5-3',
        title: 'Unit 5.3: Concentration Changes Over Time',
        type: 'guide',
        author: 'Dr. Nicholas Johnson',
        university: 'Yale',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Integrated rate laws and half-life calculations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-5-4',
        title: 'Unit 5.4: Elementary Reactions',
        type: 'worksheet',
        author: 'Dr. Samantha Garcia',
        university: 'Princeton',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Molecularity and elementary reaction steps.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-5-5',
        title: 'Unit 5.5: Collision Model',
        type: 'guide',
        author: 'Prof. Richard Lee',
        university: 'Columbia',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Collision theory and activation energy concepts.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-5-6',
        title: 'Unit 5.6: Reaction Energy Profile',
        type: 'worksheet',
        author: 'Dr. Natalie Thompson',
        university: 'Duke',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Energy diagrams and transition state theory.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-5-7',
        title: 'Unit 5.7: Introduction to Reaction Mechanisms',
        type: 'guide',
        author: 'Dr. Charles Wilson',
        university: 'Caltech',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Multi-step mechanisms and rate-determining steps.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-5-8',
        title: 'Unit 5.8: Reaction Mechanism and Rate Law',
        type: 'worksheet',
        author: 'Prof. Sarah Davis',
        university: 'Harvard',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Deriving rate laws from proposed mechanisms.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-5-9',
        title: 'Unit 5.9: Pre-Equilibrium Approximation',
        type: 'guide',
        author: 'Dr. Joshua Brown',
        university: 'MIT',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Steady-state and pre-equilibrium approximations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-5-10',
        title: 'Unit 5.10: Multistep Reaction Energy Profile',
        type: 'worksheet',
        author: 'Dr. Elizabeth Martinez',
        university: 'Stanford',
        difficulty: 'Intermediate',
        rating: 4.7,
        description: 'Complex energy profiles and reaction coordinates.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-5-11',
        title: 'Unit 5.11: Catalysis',
        type: 'guide',
        author: 'Prof. William Kim',
        university: 'Yale',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Homogeneous and heterogeneous catalysis mechanisms.',
        subcategory: 'AP Chemistry'
      },

      // Unit 6: Thermochemistry
      {
        id: 'chem-6-1',
        title: 'Unit 6.1: Endothermic and Exothermic Processes',
        type: 'guide',
        author: 'Dr. Michelle Johnson',
        university: 'Princeton',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Heat transfer, calorimetry, and enthalpy changes.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-6-2',
        title: 'Unit 6.2: Energy Diagrams',
        type: 'worksheet',
        author: 'Prof. Robert Garcia',
        university: 'Columbia',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Potential energy diagrams and thermodynamic cycles.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-6-3',
        title: 'Unit 6.3: Heat Transfer and Thermal Equilibrium',
        type: 'guide',
        author: 'Dr. Kelly Lee',
        university: 'Duke',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Specific heat, heat capacity, and thermal equilibrium.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-6-4',
        title: 'Unit 6.4: Heat Capacity and Calorimetry',
        type: 'worksheet',
        author: 'Dr. Peter Thompson',
        university: 'Caltech',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Coffee cup and bomb calorimetry calculations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-6-5',
        title: 'Unit 6.5: Energy of Phase Changes',
        type: 'guide',
        author: 'Prof. Heather Wilson',
        university: 'Harvard',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Heat of fusion, vaporization, and phase diagrams.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-6-6',
        title: 'Unit 6.6: Introduction to Enthalpy of Reaction',
        type: 'worksheet',
        author: 'Dr. Anthony Davis',
        university: 'MIT',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Standard enthalpy changes and thermochemical equations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-6-7',
        title: 'Unit 6.7: Bond Enthalpies',
        type: 'guide',
        author: 'Dr. Monica Brown',
        university: 'Stanford',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Bond dissociation energies and reaction enthalpy estimation.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-6-8',
        title: 'Unit 6.8: Enthalpy of Formation',
        type: 'worksheet',
        author: 'Prof. Scott Martinez',
        university: 'Yale',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Standard formation enthalpies and Hess\'s law.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-6-9',
        title: 'Unit 6.9: Hess\'s Law',
        type: 'guide',
        author: 'Dr. Andrea Kim',
        university: 'Princeton',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Calculating enthalpy changes using Hess\'s law.',
        subcategory: 'AP Chemistry'
      },

      // Unit 7: Equilibrium
      {
        id: 'chem-7-1',
        title: 'Unit 7.1: Introduction to Equilibrium',
        type: 'guide',
        author: 'Dr. Jeffrey Johnson',
        university: 'Columbia',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Dynamic equilibrium and equilibrium constants.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-2',
        title: 'Unit 7.2: Direction of Reversible Reactions',
        type: 'worksheet',
        author: 'Prof. Crystal Garcia',
        university: 'Duke',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Reaction quotient and predicting equilibrium direction.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-3',
        title: 'Unit 7.3: Reaction Quotient and Equilibrium Constant',
        type: 'guide',
        author: 'Dr. Russell Lee',
        university: 'Caltech',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Kc, Kp relationships and equilibrium expressions.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-4',
        title: 'Unit 7.4: Calculating the Equilibrium Constant',
        type: 'worksheet',
        author: 'Dr. Tiffany Thompson',
        university: 'Harvard',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'ICE tables and equilibrium constant calculations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-5',
        title: 'Unit 7.5: Magnitude of the Equilibrium Constant',
        type: 'guide',
        author: 'Prof. Brandon Wilson',
        university: 'MIT',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Interpreting K values and equilibrium position.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-6',
        title: 'Unit 7.6: Properties of the Equilibrium Constant',
        type: 'worksheet',
        author: 'Dr. Vanessa Davis',
        university: 'Stanford',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Temperature dependence and K manipulations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-7',
        title: 'Unit 7.7: Calculating Equilibrium Concentrations',
        type: 'guide',
        author: 'Dr. Aaron Brown',
        university: 'Yale',
        difficulty: 'Intermediate',
        rating: 4.8,
        description: 'Finding equilibrium concentrations from initial conditions.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-8',
        title: 'Unit 7.8: Representations of Equilibrium',
        type: 'worksheet',
        author: 'Prof. Danielle Martinez',
        university: 'Princeton',
        difficulty: 'Intermediate',
        rating: 4.7,
        description: 'Graphical and particulate equilibrium representations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-9',
        title: 'Unit 7.9: Introduction to Le Châtelier\'s Principle',
        type: 'guide',
        author: 'Dr. Craig Kim',
        university: 'Columbia',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Predicting equilibrium shifts from stress changes.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-10',
        title: 'Unit 7.10: Reaction Quotient and Le Châtelier\'s Principle',
        type: 'worksheet',
        author: 'Dr. Lindsey Johnson',
        university: 'Duke',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Combining Q and Le Châtelier\'s principle.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-11',
        title: 'Unit 7.11: Introduction to Solubility Equilibria',
        type: 'guide',
        author: 'Prof. Shane Garcia',
        university: 'Caltech',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Ksp expressions and solubility calculations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-7-12',
        title: 'Unit 7.12: Common-Ion Effect',
        type: 'worksheet',
        author: 'Dr. Cynthia Lee',
        university: 'Harvard',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Effect of common ions on solubility equilibria.',
        subcategory: 'AP Chemistry'
      },

      // Unit 8: Acids and Bases
      {
        id: 'chem-8-1',
        title: 'Unit 8.1: Introduction to Acids and Bases',
        type: 'guide',
        author: 'Dr. Marcus Thompson',
        university: 'MIT',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Arrhenius, Brønsted-Lowry, and Lewis acid-base theories.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-8-2',
        title: 'Unit 8.2: pH and pOH of Strong Acids and Bases',
        type: 'worksheet',
        author: 'Prof. Alicia Wilson',
        university: 'Stanford',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'pH calculations for strong acids and bases.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-8-3',
        title: 'Unit 8.3: Weak Acid and Base Equilibria',
        type: 'guide',
        author: 'Dr. Gerald Davis',
        university: 'Yale',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Ka and Kb expressions for weak acids and bases.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-8-4',
        title: 'Unit 8.4: Acid-Base Reactions and Buffers',
        type: 'worksheet',
        author: 'Dr. Courtney Brown',
        university: 'Princeton',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Buffer systems and Henderson-Hasselbalch equation.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-8-5',
        title: 'Unit 8.5: Acid-Base Titrations',
        type: 'guide',
        author: 'Prof. Vincent Martinez',
        university: 'Columbia',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Titration curves and equivalence point calculations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-8-6',
        title: 'Unit 8.6: Molecular Structure of Acids and Bases',
        type: 'worksheet',
        author: 'Dr. Brenda Kim',
        university: 'Duke',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Structure-acidity relationships and periodic trends.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-8-7',
        title: 'Unit 8.7: pH and pKₐ',
        type: 'guide',
        author: 'Dr. Eugene Johnson',
        university: 'Caltech',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Relationship between pH, pKa, and acid strength.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-8-8',
        title: 'Unit 8.8: Properties of Buffers',
        type: 'worksheet',
        author: 'Prof. Marsha Garcia',
        university: 'Harvard',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Buffer capacity and buffer range calculations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-8-9',
        title: 'Unit 8.9: Henderson-Hasselbalch Equation',
        type: 'guide',
        author: 'Dr. Calvin Lee',
        university: 'MIT',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Using Henderson-Hasselbalch for buffer calculations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-8-10',
        title: 'Unit 8.10: Buffer Capacity',
        type: 'worksheet',
        author: 'Dr. Denise Thompson',
        university: 'Stanford',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Factors affecting buffer effectiveness.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-8-11',
        title: 'Unit 8.11: pH and Solubility',
        type: 'guide',
        author: 'Prof. Lance Wilson',
        university: 'Yale',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Effect of pH on solubility of ionic compounds.',
        subcategory: 'AP Chemistry'
      },

      // Unit 9: Thermodynamics and Electrochemistry
      {
        id: 'chem-9-1',
        title: 'Unit 9.1: Introduction to Entropy',
        type: 'guide',
        author: 'Dr. Joyce Davis',
        university: 'Princeton',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Entropy concepts and the second law of thermodynamics.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-9-2',
        title: 'Unit 9.2: Absolute Entropy and Entropy Change',
        type: 'worksheet',
        author: 'Prof. Rodney Brown',
        university: 'Columbia',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Calculating entropy changes for reactions.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-9-3',
        title: 'Unit 9.3: Gibbs Free Energy and Thermodynamic Favorability',
        type: 'guide',
        author: 'Dr. Cheryl Martinez',
        university: 'Duke',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Gibbs free energy and spontaneity predictions.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-9-4',
        title: 'Unit 9.4: Thermodynamic and Kinetic Control',
        type: 'worksheet',
        author: 'Dr. Antonio Kim',
        university: 'Caltech',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Distinguishing kinetic vs thermodynamic control.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-9-5',
        title: 'Unit 9.5: Free Energy and Equilibrium',
        type: 'guide',
        author: 'Prof. Tammy Johnson',
        university: 'Harvard',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Relationship between ΔG° and equilibrium constant.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-9-6',
        title: 'Unit 9.6: Free Energy of Dissolution',
        type: 'worksheet',
        author: 'Dr. Walter Garcia',
        university: 'MIT',
        difficulty: 'Advanced',
        rating: 4.7,
        description: 'Thermodynamics of dissolution processes.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-9-7',
        title: 'Unit 9.7: Coupled Reactions',
        type: 'guide',
        author: 'Dr. Evelyn Lee',
        university: 'Stanford',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Coupling unfavorable reactions with favorable ones.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-9-8',
        title: 'Unit 9.8: Galvanic (Voltaic) and Electrolytic Cells',
        type: 'worksheet',
        author: 'Prof. Ralph Thompson',
        university: 'Yale',
        difficulty: 'Beginner',
        rating: 4.9,
        description: 'Cell diagrams and electrochemical cell types.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-9-9',
        title: 'Unit 9.9: Cell Potential and Free Energy',
        type: 'guide',
        author: 'Dr. Gloria Wilson',
        university: 'Princeton',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Relationship between cell potential and Gibbs free energy.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-9-10',
        title: 'Unit 9.10: Cell Potential Under Nonstandard Conditions',
        type: 'worksheet',
        author: 'Dr. Roy Davis',
        university: 'Columbia',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Nernst equation and concentration effects.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 'chem-9-11',
        title: 'Unit 9.11: Electrolysis and Faraday\'s Law',
        type: 'guide',
        author: 'Prof. Frances Brown',
        university: 'Duke',
        difficulty: 'Beginner',
        rating: 4.8,
        description: 'Quantitative electrolysis and Faraday\'s law calculations.',
        subcategory: 'AP Chemistry'
      },
      {
        id: 's3',
        title: 'Physics 1 Problem Solutions',
        type: 'worksheet',
        author: 'James Wilson',
        university: 'Caltech',
        difficulty: 'Intermediate',
        rating: 4.7,
        description: 'Detailed solutions to AP Physics 1 practice problems.',
        subcategory: 'AP Physics 1'
      },
      {
        id: 's4',
        title: 'AP Physics 2 Study Guide',
        type: 'guide',
        author: 'Lisa Thompson',
        university: 'MIT',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Complete study guide for AP Physics 2 concepts and problem-solving.',
        subcategory: 'AP Physics 2'
      },
      {
        id: 's5',
        title: 'Mechanics Problem Sets',
        type: 'worksheet',
        author: 'David Park',
        university: 'Harvard',
        difficulty: 'Advanced',
        rating: 4.9,
        description: 'Advanced mechanics problems for Physics C.',
        subcategory: 'AP Physics C: Mechanics'
      },
      {
        id: 's6',
        title: 'E&M Master Study Guide',
        type: 'guide',
        author: 'Michael Chen',
        university: 'Yale',
        difficulty: 'Advanced',
        rating: 4.8,
        description: 'Comprehensive study guide covering electricity and magnetism.',
        subcategory: 'AP Physics C: Electricity and Magnetism'
      }
    ]
  }
};

export function VaultPage() {
  useEffect(() => {
    document.title = "The Vault | Alumni Tutoring";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Access study guides, practice problems, and resources from the Alumni Tutoring vault.');
  }, []);

  // Check if password is already stored in session
  const [animationStage, setAnimationStage] = useState<
    'initial' | 'flythrough' | 'vault-approach' | 'password-entry' | 'vault-unlock' | 'complete'
  >(() => {
    const stored = sessionStorage.getItem('vaultAccess');
    return stored === 'true' ? 'complete' : 'initial';
  });
  const [showContent, setShowContent] = useState(() => {
    return sessionStorage.getItem('vaultAccess') === 'true';
  });
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<{[key: string]: string}>({
    math: 'All',
    science: 'All'
  });
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedCategoryType, setSelectedCategoryType] = useState<string | null>(null);

  const startVaultJourney = () => {
    // Go directly to password entry
    setAnimationStage('password-entry');
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await supabase.functions.invoke('validate-vault-password', {
        body: { password: password.trim() }
      });
      
      if (response.data?.success) {
        setIsPasswordCorrect(true);
        setShowPasswordError(false);
        
        // Store access in session storage
        sessionStorage.setItem('vaultAccess', 'true');
        
        // Show unlock animation then go to content
        setTimeout(() => {
          setAnimationStage('vault-unlock');
          setTimeout(() => {
            setAnimationStage('complete');
            setShowContent(true);
          }, 2000);
        }, 1000);
      } else {
        setShowPasswordError(true);
        setTimeout(() => setShowPasswordError(false), 2000);
      }
    } catch (error) {
      console.error('Password validation error:', error);
      setShowPasswordError(true);
      setTimeout(() => setShowPasswordError(false), 2000);
    }
  };

  const handlePasswordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'worksheet': return <FileText className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'notes': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleResourceAccess = (resourceId: string) => {
    if (resourceId === 'm1b') {
      // Show SAT Report for the specific resource
      setSelectedResource(resourceId);
    } else {
      setSelectedResource(resourceId);
    }
  };

  const handleSectionSelect = (sectionKey: string) => {
    setSelectedSection(sectionKey);
  };

  const handleBackToSections = () => {
    setSelectedResource(null);
    setSelectedClass(null);
    setSelectedCategoryType(null);
    // Keep current section selected
  };

  const handleBackToVault = () => {
    setSelectedResource(null);
    setSelectedSection(null);
    setSelectedClass(null);
    setSelectedCategoryType(null);
  };

  const handleSubcategoryChange = (section: string, subcategory: string) => {
    setSelectedSubcategories(prev => ({
      ...prev,
      [section]: subcategory
    }));
  };

  const getFilteredResources = (section: VaultSection, selectedSubcategory: string) => {
    if (selectedSubcategory === 'All') {
      return section.resources;
    }
    return section.resources.filter((resource: VaultResource) => 
      resource.subcategory === selectedSubcategory
    );
  };

  if (selectedResource) {
    const allResources = [...vaultSections.math.resources, ...vaultSections.science.resources];
    const resource = allResources.find(r => r.id === selectedResource);
    
    return (
      <div className="h-screen bg-gradient-to-br from-background to-secondary/20 pt-20 pb-20 overflow-y-auto">
        <div className="bg-background border-b shadow-sm sticky top-0 z-[60]">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToVault}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to AlumniVault
              </Button>
              <div className="text-right">
                <h1 className="text-lg font-bold">{resource?.title}</h1>
                <p className="text-xs text-muted-foreground">by {resource?.author} • {resource?.university}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-4">
          {selectedResource === 'm1b' ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-center">SAT Practice Test Analysis Report</h3>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/baeb39bf-16cc-4482-bb60-30a7f26fa939.webp" 
                  alt="SAT Practice Test Analysis Report"
                  className="max-w-full h-auto rounded-lg border"
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">
                  This detailed SAT analysis report shows comprehensive performance breakdown including section scores, 
                  category analysis, and targeted improvement recommendations.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Key Insights:</h4>
                  <ul className="text-sm text-blue-800 text-left list-disc list-inside space-y-1">
                    <li>Total Score: 1360 (660 Reading/Writing + 700 Math)</li>
                    <li>Strong performance in Math (700/800)</li>
                    <li>Areas for improvement identified in Reading & Writing sections</li>
                    <li>Detailed breakdown by skill category for targeted study</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <ViewOnlyPDFViewer 
              title={resource?.title}
              pdfUrl="/lovable-uploads/5ba80f34-76f8-48f7-82d1-c3811883bb55.webp"
            />
          )}
        </div>
      </div>
    );
  }

  // If a specific section is selected, show only that section's content
  if (selectedSection) {
    const section = vaultSections[selectedSection];

    const isEssays = selectedSection === 'essays';

    const filteredResources = isEssays
      ? section.resources.filter(r =>
          (selectedCategoryType === 'commonapp' && r.subcategory === 'Common App Essay') ||
          (selectedCategoryType === 'supplementals' && r.subcategory === 'Sample College Supplements')
        )
      : section.resources.filter(r => {
          if (!selectedClass) return false;
          if (r.subcategory !== selectedClass) return false;
          if (!selectedCategoryType) return false;
          if (selectedCategoryType === 'study') return r.type === 'guide';
          if (selectedCategoryType === 'practice') return r.type === 'worksheet';
          if (selectedCategoryType === 'test') return r.type === 'notes';
          return true;
        });

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        {/* Header */}
        <div className="bg-background border-b shadow-sm sticky top-20 z-[60]">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToVault}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to AlumniVault
                </Button>
                <div className="flex items-center gap-3">
                  <div className={`text-2xl bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                    {section.icon}
                  </div>
                  <div>
                    <h1 className={`text-2xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                      {section.title}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {!isEssays
                        ? (selectedClass ? selectedClass : `Choose your class`)
                        : (selectedCategoryType
                            ? (selectedCategoryType === 'commonapp' ? 'Common App Main Essay' : 'Specific College Supplementals')
                            : 'Choose a category')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Essays: choose between two options */}
          {isEssays && !selectedCategoryType && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer"
                    onClick={() => setSelectedCategoryType('commonapp')}>
                <div className="text-3xl mb-2">📝</div>
                <h3 className="text-xl font-semibold mb-2">Common App Main Essay</h3>
                <p className="text-muted-foreground">Strategies, examples, and analysis</p>
              </Card>
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer"
                    onClick={() => setSelectedCategoryType('supplementals')}>
                <div className="text-3xl mb-2">🏛️</div>
                <h3 className="text-xl font-semibold mb-2">Specific College Supplementals</h3>
                <p className="text-muted-foreground">School-specific prompts and samples</p>
              </Card>
            </div>
          )}

          {/* Math/Science: choose class */}
          {!isEssays && !selectedClass && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.subcategories.map((sub) => (
                <Card key={sub}
                      className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
                      onClick={() => setSelectedClass(sub)}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{sub}</h3>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Math/Science: choose resource category */}
          {!isEssays && selectedClass && !selectedCategoryType && (
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer"
                    onClick={() => setSelectedCategoryType('study')}>
                <div className="text-3xl mb-2">📘</div>
                <h3 className="text-xl font-semibold mb-2">Master Study Guide</h3>
                <p className="text-muted-foreground">Guides and structured notes</p>
              </Card>
              <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer"
                    onClick={() => setSelectedCategoryType('practice')}>
                <div className="text-3xl mb-2">🧠</div>
                <h3 className="text-xl font-semibold mb-2">Practice Problems</h3>
                <p className="text-muted-foreground">Worksheets and drills</p>
              </Card>
            </div>
          )}

          {/* Final: show filtered resources */}
          {((isEssays && selectedCategoryType) || (!isEssays && selectedClass && selectedCategoryType)) && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource: VaultResource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
                        onClick={() => handleResourceAccess(resource.id)}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(resource.type)}
                        <span className="text-sm font-medium capitalize">{resource.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{resource.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{resource.description}</p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">{resource.author}</span> • {resource.university}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                        {resource.difficulty}
                      </span>
                    </div>

                    <Button className="w-full" size="sm">
                      Access Resource <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showContent) {
    return (
      <div className="h-screen bg-gradient-to-br from-background to-secondary/20 pt-20 pb-20 overflow-y-auto">
        {/* Header */}
        <div className="bg-background border-b shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/'}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Section Selection */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            {Object.entries(vaultSections).map(([key, section]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Object.keys(vaultSections).indexOf(key) * 0.2 }}
                onClick={() => handleSectionSelect(key)}
                className="cursor-pointer"
              >
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 hover:scale-105">
                  <div className={`text-6xl mb-4 bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                    {section.icon}
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {section.resources.length} resources available
                  </p>
                  <Button className="w-full" size="lg">
                    Explore {section.title} <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Continue with existing animation logic
  if (showContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        {/* Header */}
        <div className="bg-background border-b shadow-sm sticky top-20 z-[60]">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/'}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <span className="text-xl">🔒</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Alumni Vault</h1>
                    <p className="text-sm text-muted-foreground">Exclusive resources from top university alumni</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Section Headers */}
          <div className="grid gap-12">
            {Object.entries(vaultSections).map(([key, section]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Object.keys(vaultSections).indexOf(key) * 0.2 }}
              >
                {/* Section Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className={`text-4xl bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                      {section.icon}
                    </div>
                    <h2 className={`text-3xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                      {section.title}
                    </h2>
                  </div>
                  
                  {/* Subcategory Dropdown */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          {selectedSubcategories[key] || 'All'}
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" className="w-56 bg-background border z-50">
                        <DropdownMenuItem
                          onClick={() => handleSubcategoryChange(key, 'All')}
                          className="cursor-pointer"
                        >
                          All {section.title}
                        </DropdownMenuItem>
                        {section.subcategories.map((subcategory: string) => (
                          <DropdownMenuItem
                            key={subcategory}
                            onClick={() => handleSubcategoryChange(key, subcategory)}
                            className="cursor-pointer"
                          >
                            {subcategory}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className={`w-24 h-1 bg-gradient-to-r ${section.color} mx-auto rounded-full`} />
                </div>
                
                {/* Resources Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {getFilteredResources(section, selectedSubcategories[key]).map((resource: VaultResource, index: number) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(resource.type)}
                            <span className="text-sm font-medium capitalize">{resource.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{resource.rating}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Author:</span>
                            <span className="font-medium">{resource.author}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">University:</span>
                            <span className="font-medium">{resource.university}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Category:</span>
                            <span className="font-medium text-xs bg-muted px-2 py-1 rounded-full">{resource.subcategory}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                            {resource.difficulty}
                          </span>
                          <Button 
                            size="sm" 
                            className={`gap-2 bg-gradient-to-r ${section.color} hover:opacity-90 text-white`}
                            onClick={() => handleResourceAccess(resource.id)}
                          >
                            Access <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation} strict>
    <div className="h-screen bg-gradient-to-br from-platinum-950 via-platinum-900 to-platinum-800 relative overflow-hidden pt-20 pb-20">
      
      {/* Initial Scene - Premium Academic Environment */}
      <AnimatePresence>
        {animationStage === 'initial' && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-platinum-900 via-platinum-800 to-platinum-950 flex flex-col items-center justify-center pt-20 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Back to Home Button */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:text-white backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
            {/* Premium Library Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-platinum-950/80 via-transparent to-platinum-900/60" />
            
            {/* Floating Academic Elements — CSS-only, 8 particles */}
            <div className="absolute inset-0" aria-hidden="true">
              {[
                [8, 15], [23, 45], [40, 70], [57, 25],
                [72, 55], [85, 80], [15, 85], [65, 10]
              ].map(([left, top], i) => (
                <div
                  key={i}
                  className="vault-particle"
                  style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </div>
            
            {/* Central Content */}
            <div className="relative z-10 text-center text-foreground mb-2 sm:mb-4 px-4 max-h-full overflow-y-auto">
              <motion.div
                className="mb-4 sm:mb-6 inline-flex p-3 sm:p-4 bg-gradient-gold rounded-full shadow-gold-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: "backOut" }}
              >
                <Vault className="w-8 h-8 sm:w-12 sm:h-12 text-platinum-950" />
              </motion.div>
              
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 bg-gradient-gold bg-clip-text text-transparent"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Alumni Vault
              </motion.h1>
              
              <motion.div 
                className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4 max-w-3xl mx-auto space-y-2 sm:space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3">
                  Unlock the treasures of academic excellence from top university alumni
                </p>
                
                <div className="grid grid-cols-1 gap-3 text-left px-2 sm:px-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl sm:text-2xl">📐</span>
                      <h3 className="text-base sm:text-lg font-bold text-white">Mathematics Resources</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 mb-2">
                      <strong>Master Study Guides:</strong> Comprehensive review materials covering all key concepts and problem-solving strategies
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300">
                      <strong>Practice Worksheets:</strong> Extensive problem sets with detailed step-by-step solutions
                    </p>
                    <div className="mt-3 text-xs text-gold-300">
                      Pre-Algebra through Calculus BC • All difficulty levels
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl sm:text-2xl">🔬</span>
                      <h3 className="text-base sm:text-lg font-bold text-white">Science Resources</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 mb-2">
                      <strong>Master Study Guides:</strong> Complete exam preparation materials for all AP sciences
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300">
                      <strong>Practice Worksheets:</strong> Review problems with detailed explanations from top universities
                    </p>
                    <div className="mt-3 text-xs text-gold-300">
                      AP Biology, Chemistry, Physics 1/2/C • Advanced level focus
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mt-6 italic">
                  All resources created by alumni from Harvard, MIT, Stanford, Princeton, Yale, Columbia, Duke, and more
                </p>
              </motion.div>
              
              <motion.div
                className="mt-4 sm:mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button 
                  onClick={startVaultJourney}
                  size="lg"
                  className="bg-gradient-gold hover:shadow-gold-lg text-platinum-950 font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-gold transition-all duration-300 hover:scale-105 w-auto"
                >
                  Enter the Vault
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flythrough Animation - Academic Corridor */}
      <AnimatePresence>
        {animationStage === 'flythrough' && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-platinum-900 via-platinum-800 to-platinum-950 overflow-hidden pt-20 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 3D Perspective Corridor */}
            <motion.div 
              className="absolute inset-0 overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              {/* Corridor Walls */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-platinum-700 via-platinum-800 to-platinum-900"
                animate={{
                  scaleY: [1, 3],
                  rotateX: [0, 15],
                  y: [0, -300]
                }}
                transition={{ duration: 3, ease: "easeInOut" }}
              >
                {/* Bookshelf Lines — reduced to 6 CSS elements */}
                {[10, 26, 42, 58, 74, 90].map((topPct, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"
                    style={{
                      top: `${topPct}%`,
                      animation: `vault-bookshelf-fade 3s ease-in-out ${i * 0.15}s forwards`
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Vault at End Growing Larger */}
              <motion.div
                className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                animate={{
                  scale: [0.1, 2],
                  y: [200, -100]
                }}
                transition={{ duration: 3, ease: "easeInOut" }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-gold shadow-gold-lg relative">
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 shadow-inner">
                    <div className="absolute inset-4 rounded-full border-2 border-gold-800/50">
                      <Vault className="w-full h-full text-platinum-950 p-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Speed Lines Effect — CSS-only, 8 lines (was 25 + window.innerHeight) */}
            {[5, 15, 27, 38, 52, 63, 77, 90].map((left, i) => (
              <div
                key={i}
                aria-hidden="true"
                className="vault-speed-line"
                style={{ left: `${left}%`, animationDuration: '0.8s', animationDelay: `${i * 0.1}s` }}
              />
            ))}
            
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-lg text-gold-300">Approaching the sacred vault...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vault Approach - Majestic Reveal */}
      <AnimatePresence>
        {animationStage === 'vault-approach' && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-platinum-950 to-platinum-800 flex items-center justify-center pt-20 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Magnificent Vault Door */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0, rotateY: 45 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotateY: 0
              }}
              transition={{ 
                duration: 1.2, 
                ease: "backOut"
              }}
            >
              {/* Outer Ring */}
              <motion.div 
                className="w-96 h-96 rounded-full bg-gradient-gold shadow-gold-lg relative"
                animate={{
                  boxShadow: [
                    'var(--shadow-gold-lg)',
                    '0 25px 50px -12px hsl(38 92% 50% / 0.4)',
                    'var(--shadow-gold-lg)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Middle Ring */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gold-300 to-gold-700 shadow-inner">
                  {/* Inner Vault Core */}
                  <div className="absolute inset-6 rounded-full bg-gradient-to-br from-platinum-200 to-platinum-400 shadow-inner">
                    {/* Vault Mechanism */}
                    <div className="absolute inset-8 rounded-full border-4 border-gold-600 bg-gradient-to-br from-gold-200 to-gold-500">
                      <Vault className="w-full h-full text-platinum-800 p-8" />
                    </div>
                  </div>
                </div>
                
                {/* Rotating Gears */}
                <motion.div
                  className="absolute inset-12 border-2 border-gold-700/40 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-16 border-2 border-gold-600/30 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              {/* Ambient Glow */}
              <motion.div
                className="absolute inset-0 w-96 h-96 bg-gradient-radial from-gold-400/30 via-gold-500/20 to-transparent rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Entry Stage */}
      <AnimatePresence>
        {animationStage === 'password-entry' && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-platinum-950 to-platinum-800 flex items-center justify-center pt-20 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Back to Home Button */}
            <div className="absolute top-8 left-8 z-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:text-white backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
            {/* Vault Door with Password Interface */}
            <motion.div
              className="relative flex flex-col items-center px-4 max-h-full overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Vault Door */}
              <motion.div 
                className={`w-60 h-60 sm:w-80 sm:h-80 rounded-full relative mx-auto transition-all duration-1000 ${
                  isPasswordCorrect 
                    ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-500/50' 
                    : showPasswordError 
                    ? 'bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/50'
                    : 'bg-gradient-gold shadow-gold-lg'
                }`}
                animate={{
                  boxShadow: isPasswordCorrect 
                    ? ['0 0 40px rgba(34, 197, 94, 0.5)', '0 0 80px rgba(34, 197, 94, 0.8)', '0 0 40px rgba(34, 197, 94, 0.5)']
                    : showPasswordError
                    ? ['0 0 40px rgba(239, 68, 68, 0.5)', '0 0 80px rgba(239, 68, 68, 0.8)', '0 0 40px rgba(239, 68, 68, 0.5)']
                    : ['var(--shadow-gold-lg)', '0 25px 50px -12px hsl(38 92% 50% / 0.4)', 'var(--shadow-gold-lg)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Vault Mechanism */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-platinum-200 to-platinum-400 shadow-inner">
                  <div className="absolute inset-6 rounded-full border-4 border-platinum-600 bg-gradient-to-br from-platinum-100 to-platinum-300 flex items-center justify-center">
                    {isPasswordCorrect ? (
                      <Check className="w-16 h-16 text-green-600" />
                    ) : (
                      <Lock className="w-16 h-16 text-platinum-700" />
                    )}
                  </div>
                </div>
                
                {/* Rotating Security Ring */}
                <motion.div
                  className="absolute inset-12 border-2 border-platinum-600/40 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              {/* Password Input Interface */}
              <motion.div
                className="mt-8 bg-platinum-100/90 backdrop-blur-sm rounded-2xl p-8 shadow-platinum border border-platinum-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-center space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-platinum-900 mb-1 sm:mb-2">Vault Access Required</h3>
                    <p className="text-sm sm:text-base text-platinum-700">Enter the password to unlock the Alumni Resources</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Input
                      type="password"
                      placeholder="Enter vault password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handlePasswordKeyPress}
                      className={`text-center text-lg py-3 transition-all duration-300 ${
                        showPasswordError 
                          ? 'border-red-400 focus:border-red-500 bg-red-50' 
                          : 'border-platinum-300 focus:border-gold-500'
                      }`}
                      disabled={isPasswordCorrect}
                    />
                    
                    {showPasswordError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-sm"
                      >
                        Incorrect password. Try again!
                      </motion.p>
                    )}
                    
                    <Button
                      onClick={handlePasswordSubmit}
                      disabled={!password || isPasswordCorrect}
                      className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                        isPasswordCorrect
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gradient-gold hover:shadow-gold-lg text-platinum-950'
                      }`}
                    >
                      {isPasswordCorrect ? 'Access Granted!' : 'Unlock Vault'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vault Unlock Success Animation */}
      <AnimatePresence>
        {animationStage === 'vault-unlock' && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-platinum-950 to-platinum-800 flex items-center justify-center pt-20 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Success Animation */}
            <motion.div
              className="text-center space-y-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto"
                animate={{
                  boxShadow: ['0 0 40px rgba(34, 197, 94, 0.5)', '0 0 80px rgba(34, 197, 94, 0.8)', '0 0 40px rgba(34, 197, 94, 0.5)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Check className="w-16 h-16 text-white" />
              </motion.div>
              
              <motion.h2
                className="text-4xl font-bold text-green-400"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Access Granted!
              </motion.h2>
              
              <motion.p
                className="text-xl text-platinum-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Welcome to the Alumni Vault
              </motion.p>
            </motion.div>
            
            {/* Success Burst Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-green-400/20 via-transparent to-transparent"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 4, opacity: [0, 1, 0] }}
              transition={{ duration: 2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </LazyMotion>
  );
}