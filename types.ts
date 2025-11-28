import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  action?: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  badges: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
}

export type GeneratorMode = 'text' | 'image' | 'logo';