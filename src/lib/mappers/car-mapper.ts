export function mapApiCarToUi(car: any, currentUserId?: string) {

    return {
        id: car.id,
        name: car.name,
        brand: car.brand,
        price: car.price,
        year: car.year,
        mileage: car.mileage,
        transmission: car.transmission,
        fuelType: car.fuelType,
        location: car.location,
        aiGenerated: false, // default
        description: car.description,
        images: car.images,
        features: car.features,
        colors: car.colors,
        specifications: car.specification, // map singular
        seller: {
            id: car.userId,
            name: "Seller Name", // fetch separately if needed
            image: "", // optional
            phone: "", // optional
            email: "", // optional
            verified: false,
            rating: 4,
            totalSales: 0,
        },
        savedBy: car.savedBy,
        isLiked: currentUserId ? car.savedBy.includes(currentUserId) : false,
        viewCount: 123,
        rating: 4,
        reviews: 4,
    };
}
