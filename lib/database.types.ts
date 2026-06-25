export type AppointmentStatus = "scheduled" | "canceled";

export type Practitioner = {
  id: string;
  name: string;
  email: string;
  specialty: string | null;
  bio: string | null;
  image_url: string | null;
  role: string | null;
  credentials: string[];
  created_at: string;
};

export type AppointmentType = {
  id: string;
  slug: string;
  name: string;
  duration_minutes: number;
  description: string | null;
  created_at: string;
};

export type PractitionerService = {
  id: string;
  practitioner_id: string;
  appointment_type_id: string;
  calendly_event_url: string;
  calendly_event_type_uri: string | null;
};

export type Patient = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
};

export type Appointment = {
  id: string;
  patient_id: string | null;
  practitioner_id: string | null;
  appointment_type_id: string | null;
  calendly_uuid: string;
  calendly_event_uri: string | null;
  status: AppointmentStatus;
  start_time: string;
  end_time: string;
  patient_email: string;
  patient_name: string | null;
  insurance: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      practitioners: {
        Row: Practitioner;
        Insert: Omit<Practitioner, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Practitioner>;
        Relationships: [];
      };
      appointment_types: {
        Row: AppointmentType;
        Insert: Omit<AppointmentType, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<AppointmentType>;
        Relationships: [];
      };
      practitioner_services: {
        Row: PractitionerService;
        Insert: Omit<PractitionerService, "id"> & { id?: string };
        Update: Partial<PractitionerService>;
        Relationships: [
          {
            foreignKeyName: "practitioner_services_practitioner_id_fkey";
            columns: ["practitioner_id"];
            isOneToOne: false;
            referencedRelation: "practitioners";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "practitioner_services_appointment_type_id_fkey";
            columns: ["appointment_type_id"];
            isOneToOne: false;
            referencedRelation: "appointment_types";
            referencedColumns: ["id"];
          },
        ];
      };
      patients: {
        Row: Patient;
        Insert: Omit<Patient, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Patient>;
        Relationships: [];
      };
      appointments: {
        Row: Appointment;
        Insert: Omit<Appointment, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Appointment>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      appointment_status: AppointmentStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
