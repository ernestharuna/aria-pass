import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function parseForm(request: Request): Promise<
  Record<string, FormDataEntryValue>
> {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  return credentials;
};

export function truncateText(text: string, length = 50): string {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text
}

export function to12HourFormat(time24: string): string {
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr;
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${period}`;
}

export function isPastEventDate(date: string, startTime: string | null): boolean {
  // Combine date and time into a full ISO string
  const eventDateTime = new Date(
    `${date}T${startTime ?? "00:00:00"}`
  );

  const now = new Date();

  return eventDateTime.getTime() < now.getTime();
}
