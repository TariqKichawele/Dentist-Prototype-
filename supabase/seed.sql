-- Placeholder Calendly URLs — replace with your real event-type URLs
-- Format: https://calendly.com/{org}/{event-type-slug}

insert into practitioners (id, name, email, specialty, bio, image_url, role, credentials) values
  (
    'a0000001-0000-4000-8000-000000000001',
    'Dr. Sarah Johnson, DDS',
    'sarah.johnson@gentledental.example',
    'General & Cosmetic Dentistry',
    'With over 15 years of experience, Dr. Johnson specializes in gentle restorative care and cosmetic dentistry.',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    'Lead Dentist & Practice Owner',
    array['ADA Member', 'Invisalign Provider', 'Sedation Certified']
  ),
  (
    'a0000001-0000-4000-8000-000000000002',
    'Dr. Michael Chen, DMD',
    'michael.chen@gentledental.example',
    'Endodontics & Restorative',
    'Dr. Chen focuses on root canals, crowns, and complex restorative cases with a calm, patient-first approach.',
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    'Associate Dentist',
    array['Endodontics Specialist', 'CEREC Certified']
  ),
  (
    'a0000001-0000-4000-8000-000000000003',
    'Dr. Emily Rivera, DDS',
    'emily.rivera@gentledental.example',
    'Pediatric & Preventive Care',
    'Dr. Rivera helps families build healthy habits with gentle cleanings and anxiety-free pediatric visits.',
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
    'Pediatric Dentist',
    array['Board Certified Pediatric Dentist', 'Sedation Certified']
  );

insert into appointment_types (id, slug, name, duration_minutes, description) values
  ('b0000001-0000-4000-8000-000000000001', 'cleaning', 'Routine Cleaning & Exam', 60, 'Professional cleaning, exam, and X-rays as needed.'),
  ('b0000001-0000-4000-8000-000000000002', 'emergency', 'Tooth Pain / Emergency', 30, 'Same-day relief for tooth pain, swelling, or dental trauma.'),
  ('b0000001-0000-4000-8000-000000000003', 'cosmetic', 'Cosmetic Consultation', 45, 'Smile makeover planning: veneers, whitening, and Invisalign.'),
  ('b0000001-0000-4000-8000-000000000004', 'other', 'Other', 30, 'General consultation for any dental concern.');

-- Dr. Johnson — general services
insert into practitioner_services (practitioner_id, appointment_type_id, calendly_event_url, calendly_event_type_uri) values
  ('a0000001-0000-4000-8000-000000000001', 'b0000001-0000-4000-8000-000000000001', 'https://calendly.com/tariqkichawele01/teeth-cleaning-1', 'https://api.calendly.com/event_types/0b8607c3-1b4a-4918-b03e-aae4f239d205'),
  ('a0000001-0000-4000-8000-000000000001', 'b0000001-0000-4000-8000-000000000002', 'https://calendly.com/tariqkichawele01/emergency-service', 'https://api.calendly.com/event_types/f4da8ebf-fcb8-4fae-865e-04132762dba1'),
  ('a0000001-0000-4000-8000-000000000001', 'b0000001-0000-4000-8000-000000000003', 'https://calendly.com/tariqkichawele01/cosmetic-procedure', 'https://api.calendly.com/event_types/e3eb7246-0379-4a7d-99c1-4167a12bb4ed'),
  ('a0000001-0000-4000-8000-000000000001', 'b0000001-0000-4000-8000-000000000004', 'https://calendly.com/tariqkichawele01/consultancy', 'https://api.calendly.com/event_types/cf377985-a841-47bf-a964-890e57b67520');

-- Dr. Chen — restorative / emergency focus
insert into practitioner_services (practitioner_id, appointment_type_id, calendly_event_url, calendly_event_type_uri) values
  ('a0000001-0000-4000-8000-000000000002', 'b0000001-0000-4000-8000-000000000002', 'https://calendly.com/tariqkichawele01/emergency-service', 'https://api.calendly.com/event_types/f4da8ebf-fcb8-4fae-865e-04132762dba1'),
  ('a0000001-0000-4000-8000-000000000002', 'b0000001-0000-4000-8000-000000000003', 'https://calendly.com/tariqkichawele01/cosmetic-procedure', 'https://api.calendly.com/event_types/e3eb7246-0379-4a7d-99c1-4167a12bb4ed'),
  ('a0000001-0000-4000-8000-000000000002', 'b0000001-0000-4000-8000-000000000004', 'https://calendly.com/tariqkichawele01/consultancy', 'https://api.calendly.com/event_types/cf377985-a841-47bf-a964-890e57b67520');

-- Dr. Rivera — pediatric / cleaning focus
insert into practitioner_services (practitioner_id, appointment_type_id, calendly_event_url, calendly_event_type_uri) values
  ('a0000001-0000-4000-8000-000000000003', 'b0000001-0000-4000-8000-000000000001', 'https://calendly.com/tariqkichawele01/teeth-cleaning-1', 'https://api.calendly.com/event_types/0b8607c3-1b4a-4918-b03e-aae4f239d205'),
  ('a0000001-0000-4000-8000-000000000003', 'b0000001-0000-4000-8000-000000000002', 'https://calendly.com/tariqkichawele01/emergency-service', 'https://api.calendly.com/event_types/f4da8ebf-fcb8-4fae-865e-04132762dba1'),
  ('a0000001-0000-4000-8000-000000000003', 'b0000001-0000-4000-8000-000000000004', 'https://calendly.com/tariqkichawele01/consultancy', 'https://api.calendly.com/event_types/cf377985-a841-47bf-a964-890e57b67520');
