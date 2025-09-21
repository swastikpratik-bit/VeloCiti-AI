import { getCarById } from "@/src/lib/actions/cars-actions";
import CarDetailPage from "./CarDetailPage";
import { mapApiCarToUi } from "@/src/lib/mappers/car-mapper";
import { notFound } from "next/navigation";


export default async function Page({ params }: { params: { id: string } }) {
    let apiCar; 

    try {
        apiCar = await getCarById(params.id);
    } catch (err) {
        return notFound(); // show Next.js 404 page
    }
    const car = mapApiCarToUi(apiCar, "currentUserId");

    return <CarDetailPage car={car} />;
}
