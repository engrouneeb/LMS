import { Tabs } from '../../../interfaces';
export const getUserTabs: (isUserAdmin: boolean) => Tabs[] = (
  isUserAdmin: boolean,
) => {
  return [
    {
      type: isUserAdmin ? 'Entypo' : 'MaterialCommunityIcons',
      name: isUserAdmin ? 'Setup' : 'Store',
      icon: isUserAdmin ? 'flow-parallel' : 'store-outline',
      navigateTo: 'store-home-screen',
    },
    {
      type: 'FontAwesome5',
      name: isUserAdmin ? 'Shipment Needed' : 'Recent Orders',
      icon: 'dolly',
      navigateTo: 'shipment-screen',
    },
    {
      type: 'FontAwesome',
      name: 'Transactions',
      icon: 'exchange',
      navigateTo: 'store-transaction-screen',
    },
  ];
};
