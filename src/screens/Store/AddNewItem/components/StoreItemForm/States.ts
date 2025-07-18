export const stateConstant = {
  INVENTORY_TAGS: 'inventoryTags',
  INVENTORY_COST: 'inventoryCost',
  TITLE: 'title',
  INVENTORY_CATEGORIES: 'inventoryCategories',
  CATEGORIES: 'categories',
  SELECTED_CATEGORY: 'selectedCategory',
  CATEGORY_ID: 'categoryId',
  SELECTED_STATUS: 'selectedStatus',
  SOLD_INVENTORIES: 'soldInventories',
  AVAILABLE_INVENTORIES: 'availableInventories',
  EDITING_ITEM: 'editingItem',
  TOTAL_INVENTORIES: 'totalInventories',
  IS_MODAL_VISIBLE: 'isModalVisible',
  ALL_STATUS: 'allStatus',
  ALL_STATUS_ARRAY: 'allStatusArray',
  IS_LOADING: 'isLoading',
  TAG_TEXT: 'tagText',
  ALL_TAGS: 'allTags',
  IMAGE_URL: 'imageUrl',
  FILE_NAME: 'fileName',
  ACHIEVE_COST: 'achieveCost',
  SHOW_MANAGE_MODAL: 'showManageModal',
  ALERT_MODAL_VISIBLE: 'alertModalVisible',
  ALERT_TEXT: 'alertText',
  DEFAULT_STATUS: 'defaultStatus',
  IS_SHIPMENT_NEEDED: 'isShipmentNeeded',
  DID_MOUNT: 'didMount',
  UPLOAD_IMAGE: 'uploadImage',
  INITIAL_STATE: 'initialState',
};

export const initialState = {
  title: '',
  inventoryTags: [],
  inventoryCost: 0,
  inventoryCategories: [],
  categories: [],
  selectedCategory: '',
  categoryId: 0,
  selectedStatus: '',
  soldInventories: '0',
  availableInventories: '0',
  editingItem: {},
  totalInventories: 0,
  isModalVisible: false,
  allStatus: [],
  allStatusArray: [],
  isLoading: false,
  tagText: '',
  allTags: {},
  imageUrl: null,
  fileName: '',
  achieveCost: 0,
  showManageModal: false,
  alertModalVisible: false,
  alertText: '',
  defaultStatus: '',
  isShipmentNeeded: false,
};

export const reducer = (state, payload) => {
  console.log(">>>>>>>>>>>>>>>>>>>>",payload.data)
  switch (payload.type) {
    case stateConstant.DID_MOUNT:
      return {
      ...state,
       categories: payload.data.categories,
       editingItem: payload.data.editingItem,
      };
    case stateConstant.UPLOAD_IMAGE:
      return {
      ...state,
       fileName: payload.data.fileName,
       imageUrl: payload.data.imageUrl,
      };
    case stateConstant.INVENTORY_TAGS:
      return { ...state, inventoryTags: payload.data };
    case stateConstant.INVENTORY_COST:
      return { ...state, inventoryCost: payload.data };
    case stateConstant.TITLE:
      return { ...state, title: payload.data };
    case stateConstant.INVENTORY_CATEGORIES:
      return { ...state, inventoryCategories: payload.data };
    case stateConstant.CATEGORIES:
      return { ...state, categories: payload.data };
    case stateConstant.SELECTED_CATEGORY:
      return { ...state, selectedCategory: payload.data };
    case stateConstant.CATEGORY_ID:
      return { ...state, categoryId: payload.data };
    case stateConstant.SELECTED_STATUS:
      return { ...state, selectedStatus: payload.data };
    case stateConstant.SOLD_INVENTORIES:
      return { ...state, soldInventories: payload.data };
    case stateConstant.AVAILABLE_INVENTORIES:
      return { ...state, availableInventories: payload.data };
    case stateConstant.EDITING_ITEM:
      return { ...state, editingItem: payload.data };
    case stateConstant.TOTAL_INVENTORIES:
      return { ...state, totalInventories: payload.data };
    case stateConstant.IS_MODAL_VISIBLE:
      return { ...state, isModalVisible: payload.data };
    case stateConstant.ALL_STATUS:
      return { ...state, allStatus: payload.data };
    case stateConstant.ALL_STATUS_ARRAY:
      return { ...state, allStatusArray: payload.data };
    case stateConstant.IS_LOADING:
      return { ...state, isLoading: payload.data };
    case stateConstant.TAG_TEXT:
      return { ...state, tagText: payload.data };
    case stateConstant.ALL_TAGS:
      return { ...state, allTags: payload.data };
    case stateConstant.IMAGE_URL:
      return { ...state, imageUrl: payload.data };
    case stateConstant.FILE_NAME:
      return { ...state, fileName: payload.data };
    case stateConstant.ACHIEVE_COST:
      return { ...state, achieveCost: payload.data };
    case stateConstant.SHOW_MANAGE_MODAL:
      return { ...state, showManageModal: payload.data };
    case stateConstant.ALERT_MODAL_VISIBLE:
      return { ...state, alertModalVisible: payload.data };
    case stateConstant.ALERT_TEXT:
      return { ...state, alertText: payload.data };
    case stateConstant.DEFAULT_STATUS:
      return { ...state, defaultStatus: payload.data };
    case stateConstant.IS_SHIPMENT_NEEDED:
      return { ...state, isShipmentNeeded: payload.data };

    case stateConstant.INITIAL_STATE:
      return { ...initialState };
    default:
      return state;
  }
};
