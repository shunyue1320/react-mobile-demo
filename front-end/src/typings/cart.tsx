import { Lesson } from "./lesson";
export interface CartItem {
  lesson: Lesson; //课程
  count: number; //数量
  checked: boolean; //选中状态
}
export type CartState = CartItem[];
