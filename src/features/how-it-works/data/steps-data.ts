export interface Step {
  id: number;
  titleKey: string;
  descriptionKey: string;
  iconImage: string;
}

export const stepsData: Step[] = [
  {
    id: 1,
    titleKey: "steps.step1.title",
    descriptionKey: "steps.step1.description",
    iconImage: "/HowItWorks/Experience.png",
  },
  {
    id: 2,
    titleKey: "steps.step2.title",
    descriptionKey: "steps.step2.description",
    iconImage: "/HowItWorks/Securely.png",
  },
  {
    id: 3,
    titleKey: "steps.step3.title",
    descriptionKey: "steps.step3.description",
    iconImage: "/HowItWorks/Confirmation.png",
  },
  {
    id: 4,
    titleKey: "steps.step4.title",
    descriptionKey: "steps.step4.description",
    iconImage: "/HowItWorks/Journey.png",
  },
];
