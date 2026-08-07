export type GalleryCategory = "clinic" | "equipment";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  alt: string;
};

const clinicImages = ["clinic1.jpg", "clinic2.jpg", "clinic3.jpg", "clinic4.jpg", "clinic5.jpg"];

const equipmentImages = [
  "1.png",
  "2.png",
  "5.png",
  "7.png",
  "9.png",
  "10.png",
  "11.png",
  "16.png",
  "17.png",
  "19.png",
  "20.jpg",
  "21.jpg",
  "rincal.png",
];

export const LOCAL_GALLERY: GalleryItem[] = [
  ...clinicImages.map((file, index) => ({
    id: `clinic-${index + 1}`,
    title: `Clinic ${index + 1}`,
    category: "clinic" as const,
    imageUrl: `/assets/${file}`,
    alt: `Dermaheal clinic interior ${index + 1}`,
  })),
  ...equipmentImages.map((file, index) => ({
    id: `equipment-${index + 1}`,
    title: `Equipment ${index + 1}`,
    category: "equipment" as const,
    imageUrl: `/assets/equp/${file}`,
    alt: `Dermaheal clinic equipment ${index + 1}`,
  })),
];
