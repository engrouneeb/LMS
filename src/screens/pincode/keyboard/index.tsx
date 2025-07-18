import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _Text, _View } from '../../../components';
import styles from '../style';
interface props {
  clearAll: () => void;
  backBtn: () => void;
  keys: any;
  changePin: (itm: any) => void;
}
export const KeyBoard: React.FC<props> = ({
  clearAll,
  backBtn,
  keys,
  changePin,
}) => {
  const getBackBtn = (keyObj: any, key: number) => {
    if (key == 0) {
      return (
        <TouchableOpacity onPress={() => clearAll()} key={key}>
          <_Text style={styles.clearAll}>{keyObj.Text}</_Text>
        </TouchableOpacity>
      );
    } else if (key == 2) {
      return (
        <TouchableOpacity onPress={() => backBtn()} key={key}>
          <_Text style={styles.backButton}>{keyObj.Text}</_Text>
        </TouchableOpacity>
      );
    }
  };
  return (
    <_View style={[styles.btnContainer, { alignItems: 'center' }]}>
      {keys[0]?.map((Obj: any, index: number) => {
        return (
          <_View key={index} style={[styles.btnRow]}>
            {Obj.map((keyObj: any, k: number) => {
              if (index == 3 && (k == 0 || k == 2)) {
                return getBackBtn(keyObj, k);
              } else {
                return (
                  <TouchableOpacity
                    key={k}
                    onPress={() => changePin(keyObj.value)}
                    style={styles.keyBtn}
                  >
                    <_Text style={styles.objText}>{keyObj.Text}</_Text>
                  </TouchableOpacity>
                );
              }
            })}
          </_View>
        );
      })}
    </_View>
  );
};
