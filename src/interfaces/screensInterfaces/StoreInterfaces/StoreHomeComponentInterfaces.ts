export interface StoreFlastlistHeader {
  children: { name: string }[];
  isUserParent: boolean;
  selectedChild: { name: string };
  onValueChange: (val: any) => void;
  userTotalPoints: number;
  totalCartPoints: number;
}
export interface CartItemType {
  id?: number;
  totalAcheivementPointsCost: number;
  achivePointsCost: number;
  InventoryID?: number;
  InventoryName: string;
  FranchiseID: number;
  FranchiseName: string;
  inventoryId?: number;
  quantityWithPoints: number;
  isPayment?: boolean;
  totalPaymentCost: number;
  quantityWithPayment: number;
  inventory: number;
  franchise: string;
  cost: number;
  totlaCost: number;
  available: number;
}

export interface AddToCardModalInterface {
  cartItems: CartItemType[];
  paymentWith: string;
  modalVisible: boolean;
  selectedItem: any;
  setModalVisible: (val: boolean) => void;
  totalSingleItem?: number;
  userTotalPoints: number;
  removePointsCartItem: any;
  removePaymentCartItem: any;
  onAddtoCartWithPoints: (quantity: number, item: CartItemType) => void;
  onAddtoCartWithPayment: (quantity: number, item: CartItemType) => void;
}

export interface CartFloatingButtonInterface {
  onProceedToPayment: () => void;
  totalCartCost?: number;
  totalCartPoints: number;
}
