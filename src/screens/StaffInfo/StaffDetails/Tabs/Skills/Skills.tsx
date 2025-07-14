import React, { useState } from 'react';
import {
  _Text,
  _VectorIcons,
  _View,
  _NoDataFound,
  endpoint,
} from '../../../../../components';
import { whiteThemeColors } from 'utilities';
import { FlatList } from 'react-native';
import { SkillCard } from './SkillsCard';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import Loader from '../../../../Loader/loader';
import { useEffect } from 'react';
interface props {
  staffId: number | undefined;
}
const Skills: React.FC<props> = ({ staffId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { Get } = DataAccess();
  useEffect(() => {
    getSkills();
  }, []);

  const getSkills = () => {
    setIsLoading(true);
    var EndPoint: endpoint = ApiEndpoints.Skills;
    EndPoint.params = `?staffId=${staffId}`;
    Get(EndPoint)
      .then((res: any) => {
        if (res) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((e) => console.log('Error: ', e))
      .finally(() => setIsLoading(false));
  };
  return (
    <_View style={styles.main}>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 80 }}
          ListEmptyComponent={() => (
            <_NoDataFound discription='No Skill Found' />
          )}
          data={data}
          renderItem={({ item }: any) => (
            <SkillCard
              SkillName={item?.skillSetName}
              YearsOfExperience={item?.yearOfExperience}
              SkillRating={item?.rating}
              SkillDescription={item?.skillDescription}
            />
          )}
        />
      )}
    </_View>
  );
};

export { Skills };

const styles = {
  main: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
};
