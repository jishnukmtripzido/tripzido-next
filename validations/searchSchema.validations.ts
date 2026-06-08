import { z } from "zod";

export const searchSchema = z.object({
  city_id: z
    .number({ error: "Please select a city" })
    .int()
    .positive("Please select a valid city"),

  city_name: z.string().min(1, "Please select a city"),

  pickup_datetime: z.coerce.date({
    error: "Pick-up date and time are required",
  }),

  dropoff_datetime: z.coerce.date({
    error: "Drop-off date and time are required",
  }),
}).superRefine((data, ctx) => {
  const now = new Date();

  if (data.pickup_datetime < now) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["pickup_datetime"],
      message: "Pick-up time cannot be in the past",
    });
  }

  if (data.dropoff_datetime <= data.pickup_datetime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["dropoff_datetime"],
      message: "Drop-off must be after pick-up",
    });
  }

  const diffMs = data.dropoff_datetime.getTime() - data.pickup_datetime.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["dropoff_datetime"],
      message: "Minimum rental duration is 1 hour",
    });
  }

  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  if (diffDays > 30) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["dropoff_datetime"],
      message: "Maximum rental duration is 30 days",
    });
  }
});

export type SearchFormValues = z.infer<typeof searchSchema>;