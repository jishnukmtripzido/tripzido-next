import type { StaticImageData } from "next/image";

export interface Offer {
  id: string;
  title: string;
  description: string;
  variant: "featured" | "default";
  icon: "star" | "receipt" | "lightning" | "bell" | "money";
}

export interface Bike {
  id: string;
  name: string;
  specs: string;
  imageUrl: string;
  price: number;
  badge?: { label: string; variant: "yellow" | "green" };
  tags: string[];
  rating?: number;
  reviewCount?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Destination {
  name: string;
  imageUrl: StaticImageData;
  flag: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: "location" | "card" | "bike" | "check";
}
