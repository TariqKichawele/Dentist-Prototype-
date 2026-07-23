export type SmileCase = {
  id: string;
  treatment: string;
  summary: string;
  composite: { src: string; alt: string; width: number; height: number };
};

export const SMILE_CASES: SmileCase[] = [
  {
    id: "whitening",
    treatment: "Professional Whitening",
    summary: "Brighter shade in a single visit",
    composite: {
      src: "/images/smile-gallery/whitening-before-after.webp",
      alt: "Before and after professional teeth whitening — upper smile comparison",
      width: 404,
      height: 563,
    },
  },
  {
    id: "aligners",
    treatment: "Clear Aligners",
    summary: "Straighter smile without metal braces",
    composite: {
      src: "/images/smile-gallery/aligners-before-after.jpg",
      alt: "Before and after clear aligners — gap closed for a straighter smile",
      width: 1024,
      height: 682,
    },
  },
  {
    id: "veneers",
    treatment: "Porcelain Veneers",
    summary: "Even, natural-looking front teeth",
    composite: {
      src: "/images/smile-gallery/veneers-before-after.jpg",
      alt: "Before and after porcelain veneers — brighter, even front teeth",
      width: 1024,
      height: 682,
    },
  },
];
