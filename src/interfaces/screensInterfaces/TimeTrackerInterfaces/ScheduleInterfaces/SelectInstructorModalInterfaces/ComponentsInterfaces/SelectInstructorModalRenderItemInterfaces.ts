interface itemInterface {
  text: string;
  value: number;
}
export interface SelectInstructorModalRenderItemInterface {
  fetchWages: (item: itemInterface) => void;
  item: itemInterface;
  selectedInstructor: itemInterface;
}
