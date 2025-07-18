import React from 'react';
import { _View } from '../../../../components';
import { styles, TextPair } from "./";

interface Props {
  singleClass: {
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    instructors: string;
  };
}

export const ContactCard: React.FC<Props> = ({ singleClass }) => {
 return (singleClass?.contactName||singleClass.contactEmail||singleClass.contactPhone)?
    <_View style={styles.card2}>
    {singleClass?.contactName && <TextPair label="Contact Name" value={singleClass.contactName} iconName='account' width='50%' />}
    {singleClass?.contactPhone && <TextPair
      label="Contact Phone"
      value={singleClass.contactPhone}
      width="50%"
      iconName='phone-in-talk'
    />}
    {singleClass?.contactEmail && <TextPair
      label="Contact Email"
      value={singleClass.contactEmail}
      iconName='email'
      width='50%'
    />}
  </_View>:<></>
};
