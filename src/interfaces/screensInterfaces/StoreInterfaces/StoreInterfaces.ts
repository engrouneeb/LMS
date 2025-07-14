export interface Tab {
  name?: string;
  id?: number;
  icon?: string;
}

export interface InventoryItemsType {
  id?: number;
  quantityWithPayment?: number;
  available?: number;
  ordered_Quantity?: number;
  totalPaymentCost?: number;
  totlaCost?: number;
  cost?: number;
  quantityWithPoints?: number;
  quantity?: number;
  totalAcheivementPointsCost?: number;
  achivePointsCost?: number;
}
type Data = {
  inventoryId: number;
  id: number;
  inventory: string;
  cost: number;
  achivePointsCost?: number;
  available?: number;
  redeemCode?: number;
  quantityWithPoints?: number;
  quantityWithPayment?: number;
  totalPaymentCost?: number;
  totalAcheivementPointsCost?: number;
  imageURL?: string;
};

export interface ItemCardProps {
  data: Data;
  activeTab: {};
  inCartItem?: { ordered_Quantity?: number; id: number };
  onCartIcon: () => void;
  allCategories: {};
  onPressAddtoCart: () => void;
  getAllInventories: () => void;
  paymentOptionsModal: boolean;
  setPaymentOptionsModal: (val: boolean) => void;
}
export interface PaymentConfirmationModalProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  totalCartCost?: number;
  totalCartPoints: number;
  isPaymentLoading: boolean;
  handleInventoryPayment: () => void;
}
export interface PaymentOptionsModalProps {
  visible: boolean;
  totalCost: number;
  setVisible: (val: boolean) => void;
  onPressAddtoCart: (val: string) => void;
  achievePointsCost?: number;
}

export type TransactionCardProps = {
  achievedPoints: number;
  amtPaid: number;
  transactionType: string;
  paymentMethod: string;
  transactionKey: string;
  totalAmt: number;
  transactionDateTime: Date;
  paymentStatus: string;
  receiptUrl: string;
};

export type ShipmentCardItemProps = {
  id: number;
  inventory: string;
  cost: number;
  achivePointsCost: number;
  quantity: number;
  totlaCost: number;
  totalAchivedPoints: number;
  purchasedByName: string;
  purshasedDate: Date;
  shipmentDate: Date;
  isShipmentNeeded: boolean;
  pendingShippedItems: string;
  shippedItems: string;
  status: string;
  inventoryId: number;
  storeId: number;
};
export interface AddTagsProps {
  tagText: string;
  allTags: {};
  submitTag: (val: any) => void;
  setTagText: (val: string) => void;
  isUserAdmin: boolean;
  inventoryTags: { tagColor: string; tagName: string }[];
  isShipmentItem: boolean;
  setInventoryTags: (val: { tagName: string; tagColor: string }[]) => void;
}
