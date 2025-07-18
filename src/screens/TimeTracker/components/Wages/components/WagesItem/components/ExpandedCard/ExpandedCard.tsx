import { WagesItemExpandedCardInterface } from '../../../../../../../../interfaces';
import React, { FC } from 'react';
import { _Button, _Text, _View } from '../../../../../../../../components';
import { styles } from './styles';

export const ExpandedCard: FC<WagesItemExpandedCardInterface> = ({
  wagesDetails,
  onPressDetails,
  expanded,
}) => {
  return wagesDetails.map((item: any, index: number) => {
    return (
      <_View
        style={[
          styles.mainContainer,
          {
            height: expanded ? undefined : 0,
          },
        ]}
        key={index.toString() + '-=-='}
      >
        <_View style={styles.cardContainer}>
          <_View style={styles.inner2Container}>
            <_View style={styles.cardHeader}>
              <_Text style={styles.cardHeaderText}>{item.itemName}</_Text>
            </_View>
            <_View style={styles.infoContainer}>
              <_View style={styles.infoRow}>
                <_View style={styles.infoRowLeftView}>
                  <_Text style={styles.labelText}>{'Hours : '}</_Text>
                  <_Text style={styles.text_card}>
                    {item.totalHours.toFixed(3)}
                  </_Text>
                </_View>

                <_Button
                  disabled={false}
                  borderRadius={5}
                  width={80}
                  callback={() => onPressDetails(item)}
                  btnText={'Details'}
                  submitting={true}
                  style={styles.detailbtn}
                  BtnTxt={styles.detailbtnText}
                />
              </_View>
              <_View style={styles.infoRowLeftView}>
                <_Text style={styles.labelText}>{'Status : '}</_Text>
                <_Text style={styles.text_card}>{item.status}</_Text>
              </_View>

              <_View style={styles.infoRowLeftView}>
                <_Text style={styles.labelText}>{'Wage : '}</_Text>
                <_Text style={styles.text_card}>{item.userWage}</_Text>
              </_View>
            </_View>
          </_View>
        </_View>
      </_View>
    );
  });
};
