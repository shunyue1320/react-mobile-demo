export interface Lesson {
  id: string;
  title: string;
  video: string;
  poster: string;
  url: string;
  price: string;
  category: string;
}

export interface LessonResult {
  success: boolean;
  data: Lesson
}