import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { _Screen } from '../../../../../../../components';
import { TabViewExample } from '.';
import { Appstate } from '../../../../../../../reducers/Appstate';
import { useNavigation } from '@react-navigation/native';
import { NoteDetialsInterface } from '../../../../../../../interfaces';

const NoteDetials: FC<NoteDetialsInterface> = ({ route }) => {
  const [downloads] = useState(route.params?.downloads);
  const [discription] = useState(route.params?.discription);
  const { classNotesScreen } = useSelector((state: Appstate) => state.language);
  const navigation: any = useNavigation();
  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen hideTopSafeArea onAndroidBack={handleBack}>
      <TabViewExample
        Attachment={downloads}
        Discription={discription}
        header={classNotesScreen.ClassNotes}
      />
    </_Screen>
  );
};

export { NoteDetials };
