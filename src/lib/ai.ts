import "server-only";

import { google } from "@ai-sdk/google";
import { generateText, LanguageModelV1, zodSchema } from "ai";
import { GEMINI_FLASH } from "@/src/constants/config";
import { generateCarPrompt, searchCarPrompt, searchCarPromptSystem } from "./prompts";
import { addCarSchema } from "./zod";
import { getAllCars } from "@/src/lib/actions/cars-actions";
import { extractArrayFromResponse } from "./utils";

class AIService {
  private model: LanguageModelV1;
  private searchModel: LanguageModelV1;

  constructor() {
    this.model = google(GEMINI_FLASH);

    this.searchModel = google(GEMINI_FLASH, {
      useSearchGrounding: true,
    });
  }

  generativeAI = async () => {};

  generateCarAgent = async (carName: string) => {
    const modifiedSchema = zodSchema(addCarSchema).jsonSchema;

    const { text } = await generateText({
      model: this.searchModel,
      messages: [
        {
          role: "assistant",
          content: generateCarPrompt,
        },
        {
          role: "assistant",
          content: "THe car Zod schema is: " + JSON.stringify(modifiedSchema),
        },
        {
          role: "user",
          content: `The car name is ${carName}`,
        },
      ],
    });

    console.log
    return text;
  };
  


  searchAgent = async (carDescription: string) => {
  const cars = await getAllCars();

  const carsLists = cars.map((car) => ({
    id: car.id,
    name: car.name,
    year: car.year,
    mileage: car.mileage,
    price: car.price,
    image: car.images[0],
    description: car.description,
    brand: car.brand,
    fuel: car.fuelType,
    transmission: car.transmission,
    availableColors: car.colors,
    location: car.location,
    features: car.features,
    carType: car.type,
  }));

  const { text } = await generateText({
    model: this.searchModel,
    temperature: 0, // Set to 0 for maximum consistency
    maxTokens: 100, // Limit tokens to prevent long explanations
    messages: [
      {
        role: "system",
        content: `${searchCarPromptSystem}

CARS DATABASE:
${JSON.stringify(carsLists)}

REMEMBER: First character must be '[' or 'N'. Nothing else allowed.`
      },
      {
        role: "user",
        content: carDescription
      },
    ],
  });

  console.log("Raw AI Response:", text);
  
  // Extract JSON array if AI included extra text
  const cleanedText = extractArrayFromResponse(text);
  console.log("Cleaned Response:", cleanedText);
  
  return cleanedText;
};


}

export const aiService = new AIService();
