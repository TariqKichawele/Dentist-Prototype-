import { createAdminClient } from "@/lib/supabase/admin";

export type PatientUpsertInput = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
};

export async function upsertPatient(input: PatientUpsertInput) {
  const supabase = createAdminClient();

  const row: {
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  } = {
    email: input.email.toLowerCase().trim(),
  };

  const firstName = input.firstName?.trim();
  const lastName = input.lastName?.trim();
  const phone = input.phone?.trim();

  if (firstName) row.first_name = firstName;
  if (lastName) row.last_name = lastName;
  if (phone) row.phone = phone;

  const { data, error } = await supabase
    .from("patients")
    .upsert(row, { onConflict: "email" })
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}
