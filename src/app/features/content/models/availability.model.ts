export interface AvailabilityModel {
  status: string;
  available_to_browse: boolean;
  available_to_borrow: boolean;
  available_to_waitlist: boolean;
  is_printdisabled: boolean;
  is_readable: boolean;
  is_lendable: boolean;
  is_previewable: boolean;
  identifier: string;
  isbn: string | null;
  oclc: string | null;
  openlibrary_work: string;
  openlibrary_edition: string;
  last_loan_date: string | null;
  num_waitlist: number | null;
  last_waitlist_date: string | null;
  is_restricted: boolean;
  is_browseable: boolean;
  __src__: string;
}