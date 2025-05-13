// filepath: c:\Users\khang\nailspa-app\nailspa-frontend\src\types\index.ts
export interface Booking {
  id: string;
  customerName: string;
  serviceId: string;
  date: string;
  time: string;
  status: "confirmed" | "canceled" | "completed";
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  bookingId: string;
  workerId: string;
  serviceId: string;
  date: string;
  time: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
}

export interface ServiceCustomization {
  serviceId: string;
  options: string[];
}
