export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: 'LANGUAGE' | 'FRAMEWORK' | 'TOOL' | 'DATABASE';
  proficiency: number;
  iconUrl: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
  current: boolean;
  technologies: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
