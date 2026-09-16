export type ProjectCategory = 
  | 'Architecture & 3D Elevation'
  | 'Interior Design'
  | 'Commercial & Retail'
  | 'Completed Execution';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  location: string;
  year?: string;
  description: string;
  coverImage: string;
  gallery: string[];
  featured: boolean;
  scope?: string[];
  sourcePages?: string;
  isExecuted?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  image: string;
}

export interface OfficeLocation {
  id: string;
  name: string;
  type: 'Head Office' | 'City Office';
  building: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email?: string;
  mapQuery: string;
  mapEmbedUrl: string;
}

export interface StudioInfo {
  name: string;
  tagline: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  leadArchitect: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  offices: OfficeLocation[];
}
