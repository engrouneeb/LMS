import React, { FC } from 'react';
import { whiteThemeColors } from '../../../../../../Utilities';
import { _Text, _TextInput, _View } from '../../../../../../components';
import { TextinptSpinner } from '../../TextinputSpinner';
import { styles } from '../styles';
import { ShipmentCheck } from './ShipmentCheck';

interface Props {
  isEditing: boolean;
  isUserAdmin: boolean;
  achieveCost: number;
  setAchieveCost: (val: number) => void;
  inventoryCost: number;
  isShipmentItem: boolean;
  soldInventories: {};
  setInventoryCost: (val: number) => void;
  IsShipmentNeeded: boolean;
  totalInventories: number;
  setIsShipmentNeeded: (val: boolean) => void;
  avaiableInventories: string;
  setAvailableInventories: (val: string) => void;
  setTotalInventories: (val: number) => void;
  setSoldInventories: (val: string) => void;
}

export const FormMiddle: FC<Props> = ({
  isEditing,
  isUserAdmin,
  achieveCost,
  setAchieveCost,
  inventoryCost,
  isShipmentItem,
  soldInventories,
  setInventoryCost,
  IsShipmentNeeded,
  totalInventories,
  setIsShipmentNeeded,
  avaiableInventories,
  setAvailableInventories,
  setTotalInventories,
  setSoldInventories,
}) => {
  return (
    <_View>
      <_Text style={styles.textboxTitle}>{'Inventories'}</_Text>
      <_View style={[styles.inputText, styles.spinerInput]}>
        <TextinptSpinner
          disabled={isUserAdmin && !isShipmentItem ? false : true}
          value={totalInventories}
          setValue={setTotalInventories}
          placeholder={'Available Inventories'}
        />
      </_View>
      {!isEditing ? (
        <_View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 8 }}>
          <ShipmentCheck
            IsShipmentNeeded={IsShipmentNeeded}
            setIsShipmentNeeded={setIsShipmentNeeded}
          />
        </_View>
      ) : null}
      <_View style={styles.container}>
        <_View style={{ width: '48%' }}>
          <_Text style={styles.textboxTitle}>{'Sold'}</_Text>

          <_TextInput
            style={[
              styles.inputText,
              { backgroundColor: whiteThemeColors.primary + 20 },
            ]}
            editable={false}
            keyboardType={'numeric'}
            width={'100%'}
            placeholder='0'
            onChangeText={(text) => setSoldInventories(text)}
            value={soldInventories.toString()}
          />
        </_View>
        <_View style={{ width: '48%' }}>
          <_Text style={styles.textboxTitle}>{'Available'}</_Text>
          <_TextInput
            editable={false}
            style={[
              styles.inputText,
              { backgroundColor: whiteThemeColors.primary + 20 },
            ]}
            placeholder='0'
            keyboardType={'numeric'}
            width={'100%'}
            onChangeText={(text) => setAvailableInventories(text)}
            value={avaiableInventories.toString()}
          />
        </_View>
      </_View>

      <_Text style={styles.textboxTitle}>{'Inventory Cost'}</_Text>
      <_View style={[styles.inputText, styles.spinerInput]}>
        <TextinptSpinner
          disabled={isUserAdmin && !isShipmentItem ? false : true}
          value={inventoryCost}
          setValue={setInventoryCost}
          placeholder={'Inventory Cost'}
        />
      </_View>
      <_Text style={styles.textboxTitle}>{'Achieve Points Cost'}</_Text>
      <_View style={[styles.inputText, styles.spinerInput]}>
        <TextinptSpinner
          disabled={isUserAdmin && !isShipmentItem ? false : true}
          value={achieveCost}
          setValue={setAchieveCost}
          placeholder={'Achieve Points Cost'}
        />
      </_View>
    </_View>
  );
};
