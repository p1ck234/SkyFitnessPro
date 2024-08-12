export type Course = {
  id: string;
  name: string;
  img: string;
  imgMobile: string;
  days: number;
  range: string;
  good_for_you: string[];    // Новый массив строк
  directions: string[];      // Новый массив строк
  description: string[];     // Новый массив строк
};
