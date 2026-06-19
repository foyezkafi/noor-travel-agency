export interface Package {
  id: string;
  name: string;
  type: 'haj' | 'umrah';
  category: 'Economy' | 'Premium' | 'VIP';
  price: number; // in BDT
  duration: number; // in days
  makkahHotel: string;
  makkahHotelRating: number;
  madinaHotel: string;
  madinaHotelRating: number;
  facilities: {
    hotel: string;
    flight: string;
    food: string;
    transport: string;
  };
  description: string;
  gallery: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: string;
    title: string;
    description: string;
  }[];
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  packageId: string;
  packageName: string;
  travelers: number;
  travelDate: string;
  createdAt: string;
  status: 'Pending' | 'Approved' | 'Cancelled';
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  packageTaken: string;
  quote: string;
  avatar: string;
  year: number;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Haj' | 'Umrah' | 'Visa';
}
