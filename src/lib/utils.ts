import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractJSON = (str: string) => {
  const match = str.match(/\{[\s\S]*?\}/);
  if (!match) throw new Error("No JSON object found in string");
  return JSON.parse(match[0]);
};

export const isNotCarFound = (result: string) => {
  // Check if the result has the phrase "No car found"
  const noCarFoundRegex = /No car found/i;
  const isNoCarFound = noCarFoundRegex.test(result);
  if (isNoCarFound) {
    return true;
  }
  // If neither phrase is found, return false
  return false;
};


// Helper function to extract array from messy responses
export const extractArrayFromResponse = (response: string): string => {
  const trimmed = response.trim();
  
  // If it's already clean, return as is
  if (trimmed === "No car found" || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    return trimmed;
  }
  
  // Try to extract JSON array from response
  const arrayMatch = trimmed.match(/\[([^\]]*)\]/);
  if (arrayMatch) {
    const extracted = arrayMatch[0];
    try {
      JSON.parse(extracted); // Validate it's valid JSON
      return extracted;
    } catch (e) {
      console.error("Invalid JSON extracted:", extracted);
    }
  }
  
  // If no valid array found, return no match
  return "No car found";
};

export const convertStringToArray = (jsonString: string): string[] => {
  try {
    // Remove any extra whitespace
    const trimmed = jsonString.trim();
    
    // Parse the JSON string
    const parsed = JSON.parse(trimmed);
    
    // Ensure it's an array and all elements are strings
    if (Array.isArray(parsed)) {
      return parsed.map(item => String(item));
    } else {
      throw new Error("Parsed result is not an array");
    }
  } catch (error) {
    console.error("Error parsing JSON string:", error);
    return []; // Return empty array on error
  }
};

