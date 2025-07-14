export interface MyRequestDetailsRenderItemInterface {
  item: ItemInterface;
}
interface ItemInterface {
  comments: string;
  fullName: string;
  id: number;
  status: string;
}
export interface StatusColorInterface {
  [key: string]: string;
}
