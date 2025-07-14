import React from 'react';
import { _View, _Text, _VectorIcons } from 'components';
import { styles, InstructorBadge, TextPair } from "./"
import { whiteThemeColors } from '../../../Utilities/colors';

interface Props {
  singleClass: {
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    instructors: string;
  };
}

export const ContactCard: React.FC<Props> = ({ singleClass }) => (
  <_View style={styles.card2}>
    <_View flexDirection="row" justifyContent="space-between">
      <TextPair label="Contact Name" value={singleClass.contactName} iconName='account' />
      <TextPair
        label="Contact Phone"
        value={singleClass.contactPhone}
        width="50%"
        iconName='phone-in-talk'
      />
    </_View>
    <TextPair
      label="Contact Email"
      value={singleClass.contactEmail} iconName='email'
    />
      <_View flexDirection='row'>
        <_VectorIcons
          type={"MaterialCommunityIcons"}
          name={"account-multiple"}
          size={20}
          color={whiteThemeColors.primary}
          style={{ marginRight: 5 }}
        />
        <_Text style={styles.key2}>Instructor(s)</_Text>
    </_View>
    <_View style={styles.staffCon}>
      {singleClass.instructors.split(',').map((inst, index) => (
        <InstructorBadge key={index} name={inst} />
      ))}
    </_View>
  </_View>
);
