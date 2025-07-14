import React from 'react';
import { _Text, _View, _VectorIcons } from '../../../../../components';
import { styles } from './Styles';
import { whiteThemeColors } from 'theme';
interface props {
  SkillName: string;
  YearsOfExperience: string;
  SkillRating: number;
  SkillDescription: string;
}
export const SkillCard: React.FC<props> = ({
  SkillName = '',
  YearsOfExperience = '',
  SkillRating = '',
  SkillDescription = '',
}) => {
  return (
    <_View style={styles.cardContainer}>
      <_View style={{ flexDirection: 'row' }}>
        <_View style={styles.iconCont}>
          <_VectorIcons
            type='MaterialCommunityIcons'
            name='head-lightbulb-outline'
            color='white'
            size={40}
          />
        </_View>

        <_View style={{ marginLeft: 15 }}>
          <_View style={styles.headingContainer}>
            <_Text style={styles.skillName} numberOfLines={1}>
              {SkillName}
            </_Text>
          </_View>
          <_View style={styles.exp_Rating}>
            <_Text style={styles.ExperienceTitle}>
              {'Experience: '}
              <_Text style={styles.ExperienceValue}>
                {YearsOfExperience + ' year'}
              </_Text>
            </_Text>
          </_View>
          <_View style={styles.skillRatingContainer}>
            <_View style={styles.skill}>
              <_Text style={styles.skillRatingTitle}>{'Skill Rating '}</_Text>
              <_View style={styles.skillratingCon}>
                <_Text style={styles.skillRating}>{`${SkillRating}/10`}</_Text>
              </_View>
            </_View>
          </_View>
        </_View>
      </_View>
    </_View>
  );
};
