export interface IProfile {
  imageUrls: string[];
  id: string;
  name: string;
  age: number;
  sex: 'male' | 'female' | 'none';
  introduce: string;
  distance: number;
  hobbies: string[];
}
