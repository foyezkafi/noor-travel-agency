import { Package, Testimonial, FAQ } from './types';

export const PACKAGES: Package[] = [
  {
    id: 'umrah-economy',
    name: 'Economy Umrah Package',
    type: 'umrah',
    category: 'Economy',
    price: 165000,
    duration: 14,
    makkahHotel: 'Swiss International Hotel Al-Haram (3★)',
    makkahHotelRating: 3,
    madinaHotel: 'Tulip Inn Al Dar Madinah (3★)',
    madinaHotelRating: 3,
    facilities: {
      hotel: '3★ Hotels with 24/7 complimentary shuttle services',
      flight: 'Transit Flight (Gulf Air / Air Arabia) with baggage',
      food: 'Daily Bangladeshi buffet breakfast, lunch, and dinner',
      transport: 'Comfortable air-conditioned coach transportation'
    },
    description: 'Our most popular budget-friendly package designed for couples and families who want a fully guided and comfortable Umrah experience at an affordable rate. Accompanied by experienced Bangladeshi Moallim (guide).',
    gallery: [
      'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600', // Kaaba
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600', // Madina
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600'  // Flight
    ],
    inclusions: [
      'Umrah Visa process and documentation',
      'Return economy class airfare',
      '14 nights accommodation (7 nights Makkah, 7 nights Madina)',
      'Bangladeshi food daily (Breakfast, Lunch & Dinner)',
      'AC transport for airport-hotel transfers and Ziyarah',
      'Local religious historical sightseeing (Ziyarah) in Makkah & Madina',
      '24/7 support & guidance by senior Bangladeshi Moallim',
      'Complimentary Umrah kit (Waist bag, ID Card, Pilgrim guide booklet)'
    ],
    exclusions: [
      'Any personal expenses or shopping',
      'Extra luggage charges beyond airline policy',
      'Tips to drivers/hotel staff',
      'Any PCR or medical tests if required'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Umrah Performance', description: 'Depart from Dhaka Hazrat Shahjalal International Airport, arrive in Jeddah. Complete immigration, board the AC bus to Makkah. Check in to the hotel, rest, and perform Umrah with our expert guide.' },
      { day: 'Day 3', title: 'Makkah Ziyarah', description: 'Visit historic sites in Makkah: Cave of Hira, Cave of Thawr, Mount Arafat (Jabal al-Rahmah), Muzdalifah, and Mina.' },
      { day: 'Day 8', title: 'Transfer to Madina', description: 'Check out from Makkah, board the AC coach, and travel to Madina. Check in to the Madina hotel near Masjid al-Nabawi.' },
      { day: 'Day 10', title: 'Madina Ziyarah', description: 'Visit historic places in Madina: Masjid al-Quba (first mosque), Masjid al-Qiblatayn, Mount Uhud, and Date market.' },
      { day: 'Day 14', title: 'Departure for Dhaka', description: 'Check out of the hotel and travel to Madina/Jeddah Airport for your return flight back home to Bangladesh.' }
    ]
  },
  {
    id: 'umrah-premium',
    name: 'Premium Umrah Package',
    type: 'umrah',
    category: 'Premium',
    price: 210000,
    duration: 14,
    makkahHotel: 'Pullman ZamZam Makkah (5★)',
    makkahHotelRating: 5,
    madinaHotel: 'Al Aqeeq Madinah Hotel (5★)',
    madinaHotelRating: 5,
    facilities: {
      hotel: '5★ Luxury Hotels just steps away from Haram courtyard',
      flight: 'Direct Flight on Biman Bangladesh Airlines (DAC-JED / MED-DAC)',
      food: 'Premium Half-Board buffet (Breakfast & Dinner at hotel)',
      transport: 'Special VIP GMC Yukon or luxury coach transportation'
    },
    description: 'Experience a spiritual journey with unparalleled style and comfort. Enjoy five-star hotel stays situated directly inside or adjacent to the Haram boundaries, gourmet dining, and direct flights from Dhaka.',
    gallery: [
      'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=600', // Mosque interior
      'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600', // Haram
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600'  // Madina Nabawi
    ],
    inclusions: [
      'Premium Umrah Visa services',
      'Return direct airfare on Biman Bangladesh Airlines',
      '14 nights in 5-star hotel rooms (Quad/Triple sharing options available)',
      'High-quality luxury buffet breakfast and dinner inside premium hotels',
      'Full Ziyarah (historic tours) with VIP transport and audio-guides',
      'Senior Islamic scholar as group Mentor & guide',
      'VIP Umrah bag package: Premium Cabin bag, Shoulder bag, Ihram, Shoe bag'
    ],
    exclusions: [
      'Personal laundry & telecom bills',
      'Lunch (Optional BD meal catering can be added)',
      'Custom luxury upgrades (e.g., individual cab tours)'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Comfort Flight & Welcome', description: 'Depart on a direct flight from Dhaka to Jeddah. VIP pick-up from airport via luxury GMC car. Check-in directly at Pullman ZamZam Makkah. Fresh up and perform Umrah.' },
      { day: 'Day 4', title: 'Private Guided Ziyarah', description: 'Luxury guided tour of Arafat, Mina, Muzdalifah, Jabal Nur, Al Maala Cemetery with historical storytelling.' },
      { day: 'Day 8', title: 'Haramain High-Speed Train', description: 'Experience the premium Haramain High-Speed Train transfer from Makkah to Madina in under 2 hours.' },
      { day: 'Day 9', title: 'Madina Welcoming & Worship', description: 'Check-in at Al Aqeeq Hotel. Present Salam at Roza Mubarak of Prophet Muhammad (PBUH) with specialist guide.' },
      { day: 'Day 14', title: 'Direct Return flight', description: 'Direct checkout and transfer to Madina Airport. Return to Dhaka with spiritual tranquility.' }
    ]
  },
  {
    id: 'umrah-ramadan',
    name: 'Luxury Ramadan Umrah',
    type: 'umrah',
    category: 'VIP',
    price: 280000,
    duration: 15,
    makkahHotel: 'Swissôtel Makkah (5★ Luxury)',
    makkahHotelRating: 5,
    madinaHotel: 'Pullman Zamzam Madina (5★ Luxury)',
    madinaHotelRating: 5,
    facilities: {
      hotel: 'Premium 5★ Luxury overlooking the Haram/Kaaba directly',
      flight: 'Direct Premium Airline - Saudia / Biman Bangladesh',
      food: 'Authentic Traditional Iftar & Suhoor buffet from hotel kitchens',
      transport: 'VIP Airport Meet & Assist with Private Luxury transfers'
    },
    description: 'Savour the exceptional reward of performing Umrah during the holy month of Ramadan. Includes premium Kaaba view hotels, lavish buffet menus for Sehri and Iftar, and exclusive spiritual gatherings.',
    gallery: [
      'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600'
    ],
    inclusions: [
      'Ramadan Umrah Special Visa Approval',
      'Direct Roundtrip air tickets (Dhaka-Jeddah / Madina-Dhaka)',
      '15 Days pure convenience inside 5★ Luxury Hotels adjacent to Masjid Al Haram',
      'Lavish Sehri and Iftar multi-cuisine buffet inside the hotels daily',
      'Special Taraweeh and Tahajjud assistance with scholars',
      'Haramain High-Speed Train transfer from Makkah to Madina in VIP class',
      'Full premium travel accessories bundle'
    ],
    exclusions: [
      'Optional private Kaaba-facing room upgrades (available on extra cost)',
      'Personal shopping and laundry services'
    ],
    itinerary: [
      { day: 'Day 1', title: 'Ramadan Arrival', description: 'Direct flight to Jeddah. Fast track check-in at Makkah Swissôtel. Relax and perform Umrah in the evening after Iftar.' },
      { day: 'Day 5', title: 'Taraweeh in Haram', description: 'Spend blessed days praying Taraweeh inside Masjid al-Haram. Daily brief Halaqas (learning sessions) led by Bangladeshi Islamic Scholars.' },
      { day: 'Day 9', title: 'Fast-speed Train Transfer', description: 'Travel comfortably in air-conditioned High-Speed VIP train to Madina. Check in at Pullman Zamzam Madina.' },
      { day: 'Day 15', title: 'Khair Al-Wada', description: 'Emotional final prayers in Masjid Nabawi, checkout and drive to Madina terminal to return home in state of immense bliss.' }
    ]
  },
  {
    id: 'haj-vip',
    name: 'Haj 1448H VIP Royal Package',
    type: 'haj',
    category: 'VIP',
    price: 750000,
    duration: 21,
    makkahHotel: 'Fairmont Makkah Clock Royal Tower (5★ VIP)',
    makkahHotelRating: 5,
    madinaHotel: 'Anwar Al Madinah Mövenpick (5★ VIP)',
    madinaHotelRating: 5,
    facilities: {
      hotel: 'Royal Clock Tower rooms directly in front of Makkah sanctuary',
      flight: 'Business Class Direct Flights on Biman Bangladesh Airlines',
      food: 'Gourmet Full-Board international dining prepared by top chefs',
      transport: 'Private VIP Luxury buses and customized tents at Mina/Arafat'
    },
    description: 'We offer our elite Bangladeshi pilgrims the pinnacle of luxury, peace, and spiritual ease. This package includes custom-curated VIP air-conditioned tents in Mina (closest to Jamarat), presidential suite stays, and direct individual guidance from eminent muftis.',
    gallery: [
      'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=600' // Pilgrims
    ],
    inclusions: [
      'Haj pilgrim electronic visa approval',
      'Business class/Premium seating roundtrip DAC-JED-DAC',
      'VIP customized AC tents in Mina and Arafat with Sofa-cum-beds',
      'Unrestricted 24-hours access to VIP buffet at Mina and Arafat',
      'Haramain bullet train VIP coach transfers',
      'Private 1-on-1 religious scholar escort and guide during Haj days',
      'Full premium luggage sets and Hajj checklist books',
      'Premium medical clinic on-call in hotel'
    ],
    exclusions: [
      'Costs of personal Qurbani (can be arranged separately at BDT ~18,000)',
      'Any personal luxury room-service orders'
    ],
    itinerary: [
      { day: 'Day 1-4', title: 'Jeddah Arrival & Madina Stay', description: 'Arrive in Saudi, land in Madina first. Relax in Anwar Al Madinah Mövenpick for 3 nights. Visit Prophet (PBUH) Roza Mubarak and complete local Ziyarah.' },
      { day: 'Day 5', title: 'Transfer to Makkah in Style', description: 'Board the Haramain high speed bullet train. Check into Fairmont Clock Royal Tower. Prepare for Hajj preparations.' },
      { day: 'Day 8-12', title: 'Mina & Hajj days (VIP service)', description: 'Move to private VIP tents in Mina. Perform Wuquf in Arafat with exclusive luxury buffet, stay in Muzdalifah, and proceed to Jamarat with elite scholar escort.' },
      { day: 'Day 13-14', title: 'Tawaf al-Ifadah', description: 'Return to Makkah Fairmont to refresh. Complete Tawaf al-Ifadah directly from the hotel courtyard.' },
      { day: 'Day 21', title: 'Return Biman flight to Dhaka', description: 'Complete Farewell Tawaf, custom transport to Jeddah Airport. Land back in Dhaka as a Haj pilgrim.' }
    ]
  },
  {
    id: 'haj-premium',
    name: 'Haj 1448H Premium Package',
    type: 'haj',
    category: 'Premium',
    price: 620000,
    duration: 30,
    makkahHotel: 'Hilton Suites Makkah (5★)',
    makkahHotelRating: 5,
    madinaHotel: 'Madinah Hilton (5★)',
    madinaHotelRating: 5,
    facilities: {
      hotel: '5★ Luxury hospitality situated directly in the central Haram area',
      flight: 'Direct Flight on flight partners / Biman Bangladesh Airlines',
      food: '3 Meals daily with authentic Bangladeshi flavors (BD cooks)',
      transport: 'Upgraded Moallim buses with professional logistics drivers'
    },
    description: 'An outstanding balance of premium service and affordability. This Haj package has been a top choice for Bangladeshi families, ensuring five-star luxury in Makkah & Madina, close proximity tents in Mina, and high-quality local cuisine.',
    gallery: [
      'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600'
    ],
    inclusions: [
      'Government Hajj Visa and Ministry registrations',
      'Direct return airline flight on Biman Bangladesh Airlines',
      '30 Days duration (15 days Makkah, 10 days Madina, 5 days Hajj rites)',
      'High class catering with live cooking and high nutritional foods',
      'Premium AC standard tents in Mina equipped with individual pillows & sheets',
      'Full Ziyarah of historical sights conducted in groups',
      'Experienced scholar guides accompanying pilgrims 24/7'
    ],
    exclusions: [
      'Qurbani sacrifices expense (approx 15,000 - 18,000 BDT)',
      'Extra hotel services (room dial-out, dry wash)'
    ],
    itinerary: [
      { day: 'Day 1-7', title: 'Arrival & Pre-Haj stays', description: 'Fly from Dhaka, checking directly into Hilton Suites Makkah. Spend spiritual days engaging in prayers and preparatory lectures.' },
      { day: 'Day 8-12', title: 'The Pillars of Hajj', description: 'Fulfill the central rituals of Hajj. Transit to Premium Mina tents. Stand in prayer at Mount Arafat, gather stones in Muzdalifah, perform stoning at Jamarat.' },
      { day: 'Day 13-20', title: 'Holy Makkah worship', description: 'Stay in Makkah for additional prayers, complete Tawaf, Quran recitals, and personal spiritual time.' },
      { day: 'Day 21-29', title: 'Journey to the City of Prophet', description: 'Drive via AC buses to Madina. Check into Madinah Hilton. Offer 40 prayers inside Prophet Nabawi mosque.' },
      { day: 'Day 30', title: 'Return Flight to BD', description: 'Proceed with luggage checkout and transport to Airport. Fly back safely to Dhaka Airport.' }
    ]
  },
  {
    id: 'haj-economy',
    name: 'Haj 1448H Comfort Economy',
    type: 'haj',
    category: 'Economy',
    price: 540000,
    duration: 35,
    makkahHotel: 'Al Kiswah Towers Makkah (4★)',
    makkahHotelRating: 4,
    madinaHotel: 'ODST Al Madinah (3★)',
    madinaHotelRating: 3,
    facilities: {
      hotel: 'High capacity modern towers with fast 24/7 Haram shuttle',
      flight: 'Bangladeshi Flight Carrier (Biman / Saudia)',
      food: '3 Authentic BD meals daily cooked in local Bangladeshi style',
      transport: 'Standard air-conditioned Ministry approved coaches'
    },
    description: 'An economical Hajj package conforming to all government norms, providing proper hygiene, air-conditioned rooms in massive modern high-rise towers in Makkah, and excellent scholar guiding protocols.',
    gallery: [
      'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600'
    ],
    inclusions: [
      'Standard Hajj Visa and administrative clearances',
      'Return economy class flights',
      '35 Days entire journey with experienced support staff',
      'Tents in Mina and Arafat managed by Moallim service office',
      'Complimentary Zamzam water bottle voucher (5 Litre)',
      'Regular group tours in Makkah & Madina historic valleys'
    ],
    exclusions: [
      'Hajj Qurbani fees',
      'Local city-rickshaws or wheelchair services'
    ],
    itinerary: [
      { day: 'Day 1-10', title: 'Dhaka Departure & Makkah Stay', description: 'Fly from Dhaka, check in Makkah Kiswah Towers. Perform introductory prayers and enjoy Makkah environment.' },
      { day: 'Day 11-15', title: 'Hajj Ritual Stays', description: 'Travel in standard buses to Mina tents. Dedicate your mind in prayers, complete Muzdalifah stay, and carry out stoning at Jamarat.' },
      { day: 'Day 16-25', title: 'Second half in Makkah', description: 'Continue spiritual prayers in Makkah towers. Relax, perform optional Umrahs.' },
      { day: 'Day 26-34', title: 'Ziyara of Beloved Madina', description: 'Bus transfer to Madina. Settle down at ODST Hotel. Spend blessed evenings near the holy Prophet green-dome.' },
      { day: 'Day 35', title: 'Back to Bangladesh', description: 'Proceed to Airport, board return flight to Hazrat Shahjalal International Airport in Dhaka.' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Al-Haj Rafiqul Islam',
    location: 'Mirpur, Dhaka',
    packageTaken: 'Haj 1447H Premium Package',
    quote: 'Alhamdulillah, Noor Travel BD made our Haj journey absolute worry-free. From the Biman check-in to Pullman hotels, and especially the delicious Bangladeshi buffet meals, everything was exactly as promised!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    year: 2025,
    rating: 5
  },
  {
    id: 't-2',
    name: 'Begum Rehana Akhter',
    location: 'Chittagong',
    packageTaken: 'Premium Umrah Package',
    quote: 'Traveling alone as an elderly woman, I was worried about managing details. But the Moallim from Noor Travel BD guided me like a son. The Makkah Swissôtel was incredibly close to Haram.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    year: 2026,
    rating: 5
  },
  {
    id: 't-3',
    name: 'Dr. Tariqul Anam',
    location: 'Sylhet',
    packageTaken: 'Haj VIP Royal Package',
    quote: 'Excellent service! The bulletins, continuous learning sessions, and bullet train transfers to Madina were fantastic. Highly recommended for premium and comfortable arrangements.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    year: 2025,
    rating: 5
  },
  {
    id: 't-4',
    name: 'Fahim & Tasnim (Newweds)',
    location: 'Uttara, Dhaka',
    packageTaken: 'Economy Umrah Package',
    quote: 'We wanted a budget-friendly packages after marriage. Noor Travel economy package exceeded our expectations! Even with 3-star prices, the shuttle service and BD meals were perfect.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    year: 2026,
    rating: 4.8
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is the current countdown or date for Haj 1448H in 2027?',
    answer: 'Haj 1448H is expected to take place in mid-May 2027. Registration is already open with Noor Travel BD under ministry rules. We provide full automated notifications of visa regulations to our pre-registered pilgrims.',
    category: 'Haj'
  },
  {
    id: 'faq-2',
    question: 'Are flights direct or transit?',
    answer: 'For our Premium and VIP packages, we guarantee non-stop direct flights on Biman Bangladesh Airlines or Saudia. For Economy packages, we offer high-quality transit flights (e.g., Gulf Air or Air Arabia) to keep the cost affordable.',
    category: 'General'
  },
  {
    id: 'faq-3',
    question: 'Do you provide Bangladeshi cooks and local menus?',
    answer: 'Yes! We recognize that local meals are crucial for pilgrims during multi-week trips. Our Economy and Premium packages feature daily menus cooked by skilled Bangladeshi chefs in Saudi Arabia, providing traditional rice, dal, fish, chicken, and local curries.',
    category: 'General'
  },
  {
    id: 'faq-4',
    question: 'What are the visa requirements to apply from Bangladesh?',
    answer: 'You will need a Bangladeshi passport with at least 6 months validity, a digital color photo with a white background, and Covid or meningitis vaccination cards depending on current Saudi Ministry of Hajj guidelines. Our team manages all online visa portals.',
    category: 'Visa'
  },
  {
    id: 'faq-5',
    question: 'How do we contact Noor Travel BD from remote locations?',
    answer: 'Noor Travel BD has physical branches in Dhaka (Kakrail, Purana Paltan), Sylhet, and Chittagong. However, we also provide a 100% digital portal with WhatsApp service for remote customers. We send passport collection staff to your home if needed!',
    category: 'General'
  },
  {
    id: 'faq-6',
    question: 'What benefits does a dedicated Moallim offer?',
    answer: 'Our professional Bangladeshi Moallims are Islamic Scholars who guide the group throughout all Umrah rituals and Haj steps. They lead prayers, explain spiritual significances, and help clarify issues in your local language (Bengali).',
    category: 'Umrah'
  }
];
