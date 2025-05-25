import { UUID } from "crypto";

export interface Admin {
  id: number;
  name: string;
  role: "admin";
  password: string;
}

export interface Booking {
  id: number;
  customerName: string;
  serviceId: string;
  date: Date;
  time: string;
  status: "confirmed" | "canceled" | "completed";
}

export interface Worker {
  id: number;
  name: string;
  role: string;
  isAvailable: boolean;
  pin: string;
  turn: number;
  totalTurns: number;
}

export interface Appointment {
  id: UUID;
  bookingId: string;
  workerId: string;
  serviceId: string;
  date: Date;
  time: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  gel: boolean;
  duration: Number; // in minutes
  price: number;
}

export interface ServiceCustomization {
  serviceId: number;
  options: string[];
}

export interface IncomeSplit {
  ownerPercentage: number;
  workerSplits: {
    workerId: number;
    percentage: number;
    amount: number;
  }[];
  totalIncome: number;
}
