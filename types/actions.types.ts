// types/actions.types.ts  (reusable across all actions)
export type SearchActionState = {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
};
