import { StripeProvider } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import { _VectorIcons, _View } from '../../../../../components';
import Loader from '../../../../Loader/Loading';
import { styles } from '../../../styles';
import { StripeCardView } from './StripeCardView';
interface props {
  fullName: string;
  email: string;
  domainUrl: string;
  visible: boolean;
  stripeKey: string;
  studentId: number;
  navigation: any;
  onClose: (isclose: boolean) => void;
}
export const StripeModal: React.FC<props> = ({
  fullName,
  email,
  domainUrl,
  visible,
  stripeKey,
  studentId,
  navigation,
  onClose,
}) => {
  const [loader, setLoader] = useState(false);
  return (
    <Modal visible={visible} transparent>
      {loader && <Loader />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'never'}
        contentContainerStyle={styles.stripeModal}
      >
        <_View style={styles.mainStripeView}>
          <_View style={styles.close}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => onClose(false)}
            >
              <_VectorIcons
                name={'close'}
                type={'AntDesign'}
                size={18}
                color={'white'}
              />
            </TouchableOpacity>
          </_View>
          <StripeProvider
            publishableKey={stripeKey}
            merchantIdentifier='merchant.identifier'
          >
            <StripeCardView
              fullName={fullName}
              domainUrl={domainUrl}
              email={email}
              close={onClose}
              setLoader={setLoader}
              loader={loader}
              studentId={studentId}
              navigation={navigation}
              stripeKey={stripeKey}
            />
          </StripeProvider>
        </_View>
      </ScrollView>
    </Modal>
  );
};
