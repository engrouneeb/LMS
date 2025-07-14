import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'navigation';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AttachmentTypes, isAdmin, isParent, isStudent } from 'utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { _Screen } from '../../../components';
import { TopTabs } from '../../../components/TopTabs';
import { Editor } from '../../CoursePlayer/components/ChallengeDetails/Homework/components/SubmitHomework/components/Editor';
import { DiscussionTab } from '../../CoursePlayer/components/common/Discussion/components';
import { Attachments } from '../../CoursePlayer/components/CourseDetails/components';
import Header from '../../Headers';
import { StoreItemForm } from './components';

import { EndpointType } from 'interfaces';
import { Appstate } from 'reducers/Appstate';
import { tabOptions } from './TabsOptions';
import { whiteThemeColors } from '../../../theme';

export const AddNewItem: FC<any> = ({ route }) => {
  const {
    Id,
    allCategories,
    isEditing,
    isShipmentItem,
    storeId,
    getAllCategories,
    Showtab,
    getAllInventories,
  } = route?.params;

  const navigation = useNavigation<NavigationProps>();
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);

  const [activeTab, setActiveTab] = useState({ name: 'form' });
  const [inventoryDescription, setInventoryDescription] = useState<string>('');
  const [discussionComments, setDiscussionComments] = useState<[]>([]);
  const [disbaleTabs, setDisbleTabs] = useState<boolean>(
    isEditing ? false : true
  );
  const [inventoryId, setInventoryId] = useState<number>(isEditing ? Id : 0);
  const [allCategory, setAllCategories] = useState<
    { name: string; id: number }[]
  >([]);
  const isUserStudent = isStudent(UserData.roleName);
  const isUserParent = isParent(UserData.roleName);
  const isUserAdmin = isAdmin(UserData.roleName);
  const { Get, PostSecuredWithParams } = DataAccess();
  let tabs;

  if ((isUserStudent && !isShipmentItem) || (isUserParent && !isShipmentItem)) {
    tabs =
      Showtab === 'form'
        ? [tabOptions[0], tabOptions[1]]
        : Showtab === 'discussion'
        ? [tabOptions[2]]
        : [tabOptions[3]];
  } else if (isShipmentItem) {
    tabs =
      Showtab === 'discussion'
        ? [tabOptions[2]]
        : Showtab === 'attachment'
        ? [tabOptions[3]]
        : [tabOptions[0]];
  } else {
    tabs = tabOptions;
  }

  useEffect(() => {
    setAllCategories(allCategories);
    Showtab && setActiveTab({ name: Showtab });
    getDiscussion();
    getAllCategories;
    isEditing && getDiscussion();
  }, []);
  const getDiscussion = async () => {
    let url: EndpointType = ApiEndpoints.GetDiscussions;
    url.params = `?ItemId=${inventoryId}&Type=${AttachmentTypes.Inventory.value}`;
    Get(url).then((res: any) => {
      if (res) {
        setDiscussionComments(res);
      }
    });
  };

  const UpdateInventoryDesc = async (value: any) => {
    let description = encodeURIComponent(value);
    let url = ApiEndpoints.UpdateInventoryDesc;
    let params = `?inventoryId=${inventoryId}&description=${description}`;
    try {
      let response = await PostSecuredWithParams(url, params);
      if (response.error) {
        console.log('Error', response.error);
      }
    } catch (err) {
      console.log('err', err);
    }
    setInventoryDescription(value);
  };
  const onAndroidBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <_Screen
      header={
        <Header
          isClose
          Screen={
            isEditing && !Showtab
              ? 'Store Item'
              : Showtab
              ? Showtab
              : 'Add New Item'
          }
          onPressClose={() => navigation.goBack()}
        />
      }
      onAndroidBack={onAndroidBack}
      backgroundColor={whiteThemeColors.background}
      hideTopSafeArea
      flex={1}
    >
      <TopTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        isDisable={disbaleTabs}
        setitem={(value) => console.log('value', value)}
      />
      {activeTab.name === 'form' ? (
        <StoreItemForm
          allCategories={allCategory}
          isEditing={isEditing}
          setActiveTab={setActiveTab}
          setDisbleTabs={setDisbleTabs}
          disbaleTabs={disbaleTabs}
          setInventoryDescription={setInventoryDescription}
          inventoryDescription={inventoryDescription}
          setInventoryId={setInventoryId}
          inventoryId={inventoryId}
          storeId={storeId}
          getAllInventories={getAllInventories}
          getAllCategories={getAllCategories}
          isShipmentItem={isShipmentItem}
          Showtab={Showtab}
        />
      ) : activeTab.name === 'description' ? (
        <Editor
          disabled={!isUserAdmin}
          updateFunction={(value: string) => UpdateInventoryDesc(value)}
          getAllInventories={getAllInventories}
          IntialValue={inventoryDescription}
          type={'Description'}
          user={UserData}
        />
      ) : activeTab.name === 'discussion' ? (
        <DiscussionTab
          route={{ params: { courseID: inventoryId } }}
          isCourse={null}
          Discussion={getDiscussion}
          discussionRes={discussionComments}
          isActive={true}
          itemType={AttachmentTypes.Inventory.value}
        />
      ) : activeTab.name === 'attachment' ? (
        <Attachments
          itemId={inventoryId}
          list={{
            InventoryId: inventoryId,
            itemType: AttachmentTypes.Inventory.value,
          }}
          type={'InventoryAttachment'}
          dependentId={0}
          moduleFolder={AttachmentTypes.Inventory.folderName}
          itemType={AttachmentTypes.Inventory.value}
          isFromCourseAttachment={undefined}
          isAddable={true}
          index={0}
        />
      ) : null}
    </_Screen>
  );
};
