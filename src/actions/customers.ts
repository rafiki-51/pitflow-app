"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { CreateCustomerFormState } from "@/types/customer";

const CUSTOMERS_ROUTE = "/dashboard/customers";

function normalizeOptionalValue(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

export async function createCustomerAction(
  _previousState: CreateCustomerFormState,
  formData: FormData,
): Promise<CreateCustomerFormState> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      message: "Debes iniciar sesión para crear clientes.",
    };
  }

  const fullNameValue = formData.get("full_name");
  const fullName = typeof fullNameValue === "string" ? fullNameValue.trim() : "";
  const email = normalizeOptionalValue(formData.get("email"));
  const phone = normalizeOptionalValue(formData.get("phone"));
  const notes = normalizeOptionalValue(formData.get("notes"));

  if (fullName.length < 2) {
    return {
      success: false,
      message: "El nombre debe tener al menos 2 caracteres.",
    };
  }

  if (email && !email.includes("@")) {
    return {
      success: false,
      message: "Ingresa un email válido.",
    };
  }

  const { error } = await supabase.from("customers").insert({
    full_name: fullName,
    email,
    phone,
    notes,
  });

  if (error) {
    return {
      success: false,
      message: "No se pudo crear el cliente.",
    };
  }

  revalidatePath(CUSTOMERS_ROUTE);

  return {
    success: true,
    message: "Cliente creado.",
  };
}
