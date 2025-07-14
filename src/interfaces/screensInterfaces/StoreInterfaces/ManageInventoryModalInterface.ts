export type categoryType = {
  name?: string;
  id?: number;
};

export type responseType = {
  message: string;
  isSuccess: boolean;
};

export interface ManageInventoryProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  setInventoryCategories: (val: any) => void;
  getAllCategories: () => void;
}

export interface ManageInventoryCardHeader {
  isAddingNew: boolean;
  onAddingNew: () => void;
  setIsAddingNew: (val: boolean) => void;
  newCategoryName: string | undefined;
  setNewCategoryName: (val: string) => void;
  CreateUpdateStoreCategory: () => void;
}

type itemType = {
  name: string;
  id: number;
};
export interface ManageInventoryCardProps {
  item: itemType;
  index: number;
  DeleteCategory: (val: number) => void;
  onEdit: (firstVal: itemType, secondVal: number) => void;
  setEditingItem: (val: string) => void;
}

export interface CustomTagsDropdownProps {
  allTags: { text: string }[];
  tagText: string;
  inventoryTags: {}[];
  setTagText: (val: string) => void;
  submitTag: () => void;
}
