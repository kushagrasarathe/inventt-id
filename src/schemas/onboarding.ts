import { z } from "zod";

const minLenghtErrorMessage = (fieldName: string, length: number) =>
  `Field must contain at least ${length} character(s)`;

const maxLenghtErrorMessage = (fieldName: string, length: number) =>
  `Field should be max ${length} characters long`;

const OnboardingSchema = z.object({
  name: z
    .string()
    .min(3, { message: minLenghtErrorMessage("Name", 3) })
    .max(128, maxLenghtErrorMessage("Name", 128))
    .refine((data) => data.trim().length > 0, {
      message: "Name is required.",
    }),
  email: z
    .string()
    .email("Invalid email")
    .min(3, { message: minLenghtErrorMessage("Email", 3) })
    .max(128, maxLenghtErrorMessage("Email", 128))
    .refine((data) => data.trim().length > 0, {
      message: "Email field is required.",
    }),
  pin: z
    .string()
    .min(6, "PIN must be at least 6 characters")
    .max(6, "PIN must be at least 6 characters"),
  favCar: z
    .string()
    .min(3, { message: minLenghtErrorMessage("Favourite car", 3) })
    .max(64, maxLenghtErrorMessage("Favourite car", 64))
    .refine((data) => data.trim().length > 0, {
      message: "Favourite car field is required.",
    }),
  bestPlace: z
    .string()
    .min(3, { message: minLenghtErrorMessage("Favourite place", 3) })
    .max(64, maxLenghtErrorMessage("Favourite place", 64))
    .refine((data) => data.trim().length > 0, {
      message: "Best place field is required.",
    }),
  favGame: z
    .string()
    .min(3, { message: minLenghtErrorMessage("Favourite game character", 3) })
    .max(64, maxLenghtErrorMessage("Favourite game character", 64))
    .refine((data) => data.trim().length > 0, {
      message: "Favourite game character field is required.",
    }),
});

export default OnboardingSchema;
