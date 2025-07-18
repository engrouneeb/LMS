import { SkillCardInterface } from '../../../../../../interfaces';
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../../../../reducers/Appstate';
import { _ActivityIndicator } from '../../../../../../../Loader';
import { whiteThemeColors } from '../../../../../../Utilities';
import { _View } from '../../../../../../components';
import { NoDataFound } from '../NoDataFound';
import SkillCard from './components/SkillCard/SkillCard';

const _SkillsTab = () => {
  const { Skills, loading }: any = useSelector((state: Appstate) => ({
    Skills: state.StudentInfoReducer.skills,
    loading: state.StudentInfoReducer.isSkillsLoading,
  }));
  const _renderItem: ({
    item,
  }: {
    item: SkillCardInterface;
  }) => React.JSX.Element = ({ item }) => (
    <SkillCard
      courseTitle={item.courseTitle}
      courseRating={item.courseRating}
      levels={item.levels}
      courseCertificate={item.courseCertificate}
    />
  );

  return (
    <_View style={{ flex: 1 }}>
      {loading ? (
        <_View flex={1} justify='center' alignItems='center'>
          <_ActivityIndicator size='large' />
        </_View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: whiteThemeColors.background }}
          data={Skills.classesList}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={(item) => _renderItem(item)}
          ListEmptyComponent={() => <NoDataFound />}
          keyExtractor={(item) => item.key}
        />
      )}
    </_View>
  );
};
export const SkillsTab = React.memo(_SkillsTab);
