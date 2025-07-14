export type editingItemType = {
  redeemCode: string;
  redeemCodeId: number;
};

export interface AddRedeemCodeModalProps {
  isEditing: {};
  editingItem: editingItemType | undefined;
  inventoryId: number;
  setIsEditing: (val: boolean) => void;
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
  getAllRedeemCodes: () => void;
}
