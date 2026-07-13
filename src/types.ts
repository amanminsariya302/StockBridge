export type Language = 'en' | 'hi' | 'te' | 'gu';

export type UserRole = 'company' | 'provider';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface StorageListing {
  id: string;
  name: string;
  address: string;
  capacity: string; // e.g. "500 sq ft", "10 Tons"
  description: string;
  facilities: string[];
  providerId: string;
  providerName: string;
  priceSuggestion: string; // Rent suggestion (optional)
  image: string;
  isVerified: boolean;
}

export interface BookingRequest {
  id: string;
  listingId: string;
  listingName: string;
  companyId: string;
  companyName: string;
  companyPhone: string;
  status: 'pending' | 'accepted' | 'rejected' | 'confirmed' | 'paid';
  rentalTermsDiscussed?: string;
  companyPaidFee: boolean;
  providerPaidFee: boolean;
  createdAt: string;
  price: string; // Agreed price
  date: string; // Booking date
}

export interface LanguageResources {
  welcome: string;
  welcomeSub: string;
  startBtn: string;
  selectLang: string;
  skipBtn: string;
  loginTitle: string;
  registerTitle: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  roleSelect: string;
  companyRole: string;
  providerRole: string;
  searchPlaceholder: string;
  addStorageTitle: string;
  capacityLabel: string;
  facilitiesLabel: string;
  addressLabel: string;
  bookingStatus: string;
  receiptTitle: string;
  feeNotice: string;
}
