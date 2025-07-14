export interface InventoryCardInterface {
  data: {
    id: number;
    inventoryId: number;
    inventory: string;
    cost: number;
    achivePointsCost: number;
    available: number;
    imageURL: string;
    redeemCode: number;
    quantityWithPoints: number;
    quantityWithPayment: number;
    totalPaymentCost: number;
    totalAcheivementPointsCost: number;
  };
  onPressAddtoCart: () => void;
  allCategories: [];
  cartItems: { id: number }[];
  deleteInventory: () => void;
  isUserParent: boolean;
  isUserStudent: boolean;
  activeTab: { name: string; id: number };
  setFlag: (val: boolean) => void;
  flag: boolean;
  getAllInventories: () => void;
}
