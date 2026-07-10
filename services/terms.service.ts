// services/terms.service.ts
import { api } from "@/lib/api";

export interface PlatformTermsResult {
  id: number;
  doc_type: string;
  version: number;
  content: string;
  published_at: string | null;
}

export interface VendorTermsResult {
  vendor_id: number;
  version: number;
  terms_items: string[];
  security_deposit_note: string;
  operating_hours_note: string;
  distance_limit_note: string;
  excess_charge_note: string;
  late_penalty_note: string;
}

export async function getPlatformTermsApi(
  docType: "PLATFORM_TC" | "PRIVACY_POLICY" = "PLATFORM_TC",
): Promise<PlatformTermsResult> {
  const data = await api.get<{ data: PlatformTermsResult }>(
    `/api/administrations/legal-document/?doc_type=${docType}`,
  );
  return data.data;
}

export async function getVendorTermsApi(
  vendorId: number,
): Promise<VendorTermsResult> {
  const data = await api.get<{ data: VendorTermsResult }>(
    `/api/vendors/${vendorId}/terms/`,
  );
  return data.data;
}
