import React, { FC, useState } from 'react';
import { styles } from './styles';
import { whiteThemeColors } from '../../../../../Utilities';
import { TouchableOpacity } from 'react-native';
import ReceiptModal from '../ReceiptModal/ReceiptModal';
import { _Text, _VectorIcons, _View } from '../../../../../components';
import { TransactionCardProps } from '../../../../../interfaces';
import CommonStyles from '../../../../../screens/CommonStyles';

interface Props {
  item: TransactionCardProps;
}

const TransactionCard: FC<Props> = ({ item }) => {
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  return (
    <_View style={styles.container}>
      <_View style={styles.costContainer}>
        {item.achievedPoints && (
          <>
            <_Text style={styles.cardRightText}>{'Achieved Points'}</_Text>
            <_Text
              style={styles.cardActiveValueText}
            >{`${item.achievedPoints}`}</_Text>
          </>
        )}
        <_Text style={{ ...styles.cardRightText, marginTop: 10 }}>
          {'Amount Paid'}
        </_Text>
        <_Text style={styles.cardActiveValueText}>{`$${item.amtPaid}`}</_Text>
      </_View>
      <_View style={styles.detailsContainer}>
        <_Text
          style={{
            ...styles.cardItemValueText,
            fontSize: 14,
            fontFamily: CommonStyles.fonts.semiBold,
            marginLeft: 0,
          }}
        >
          {item.transactionType}
        </_Text>
        <_View style={styles.cardItem}>
          <_Text style={styles.cardItemKeyText}>Payment Method:</_Text>
          <_Text style={styles.cardItemValueText}>{item.paymentMethod}</_Text>
        </_View>
        {item.transactionKey && (
          <_View style={styles.cardItem}>
            <_Text style={styles.cardItemKeyText}>Transaction Key:</_Text>
            <_Text style={styles.cardItemValueText}>
              {item.transactionKey}
            </_Text>
          </_View>
        )}
        <_View style={styles.cardItem}>
          <_Text style={styles.cardItemKeyText}>Total Amount:</_Text>
          <_Text style={styles.cardItemValueText}>{`$${item.totalAmt}`}</_Text>
        </_View>
        <_Text style={styles.dateText}>{item.transactionDateTime}</_Text>
      </_View>
      <_View style={styles.statusContainer}>
        <_View style={[styles.statusView, styles.succeed]}>
          <_Text style={styles.transactionStatusText}>
            {item?.paymentStatus.split(':')[0]}
          </_Text>
          <_VectorIcons
            type={'MaterialCommunityIcons'}
            name='check-decagram'
            size={13}
            color={whiteThemeColors.white}
          />
        </_View>
        {item.receiptUrl && (
          <TouchableOpacity
            style={styles.receiptIcon}
            onPress={() => setShowReceipt(true)}
          >
            <_VectorIcons
              type={'FontAwesome5'}
              name='receipt'
              size={48}
              color={whiteThemeColors.greyDark + 90}
            />
          </TouchableOpacity>
        )}
      </_View>

      <ReceiptModal
        visible={showReceipt}
        setVisible={setShowReceipt}
        item={item}
      />
    </_View>
  );
};
export default TransactionCard;
