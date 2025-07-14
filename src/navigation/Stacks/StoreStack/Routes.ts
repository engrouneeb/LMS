export type StoreScreensWithOutParams =
  | 'Store'
  | 'shipment-screen'
  | 'store-home-screen'
  | 'store-transaction-screen'
  | 'OnlineNotesAttachmentView';

export interface StoreScreensWithParams {
  'store-add-new-item': {
    allCategories?: {};
    getAllCategories?: () => void;
    getAllInventories?: () => void;
    Id?: number;
    isEditing?: boolean;
    isShipmentItem?: boolean;
    Showtab?: string;
    isFranchise?: boolean;
    storeId?: number;
  };

  'add-redeem-code-screen': {
    inventoryitem: {
      id: number;
      inventoryId: number;
    };
  };
}
