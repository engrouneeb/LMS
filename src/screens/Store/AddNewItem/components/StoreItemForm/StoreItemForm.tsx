import { useNavigation } from '@react-navigation/native';
import { EndpointType } from '../../../../../interfaces';
import { NavigationProps } from '../../../../../navigation';
import React, { FC, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Appstate } from '../../../../../../reducers/Appstate';
import {
  CustomAlert,
  isAdmin,
  isParent,
  isStudent,
  whiteThemeColors,
} from '../../../../../Utilities';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import {
  _Button,
  _Image,
  _ModalDropdown,
  _Text,
  _TextInput,
  _View,
} from '../../../../../components';
import { UploadAttachment } from '../../../../CoursePlayer/components/ChallengeDetails/Homework/components/SubmitHomework/components/UploadAttachment';
import { ManageInventoryModal } from '../ManageInventoryModal/ManageInventoryModal';
import { AddTags } from './components/AddTags';
import { CameraButton } from './components/CameraButton';
import { FormMiddle } from './components/FormMiddle';
import { styles } from './styles';
import ModalDropdown from 'react-native-modal-dropdown';
interface Props {
  Showtab: boolean;
  isEditing: boolean;
  disbaleTabs: boolean;
  storeId: number;
  inventoryId: number;
  setActiveTab: (val: { name: string }) => void;
  setDisbleTabs: (val: boolean) => void;
  allCategories: { name: string; id: number }[];
  setInventoryId: (val: number) => void;
  isShipmentItem: boolean;
  getAllCategories: () => void;
  getAllInventories: () => void;
  inventoryDescription: string;
  setInventoryDescription: (val: string) => void;
}

export const StoreItemForm: FC<Props> = ({
  Showtab,
  isEditing,
  disbaleTabs,
  storeId = 0,
  inventoryId,
  setActiveTab,
  setDisbleTabs,
  allCategories,
  setInventoryId,
  isShipmentItem,
  getAllCategories,
  getAllInventories,
  inventoryDescription,
  setInventoryDescription,
}) => {
  const UserData: any = useSelector((state: Appstate) => state.User.UserInfo);
  const [inventoryTags, setInventoryTags] = useState<
    { tagName: string; tagColor: string }[]
  >([]);
  const [inventoryCost, setInventoryCost] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [inventoryCategories, setInventoryCategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ name: string; id: number }[]>(
    [],
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryId, setCategoryId] = useState();
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>();
  const [soldInventories, setSoldInventories] = useState<string>('0');
  const [avaiableInventories, setAvailableInventories] = useState<string>('0');
  const [editingItem, setEditingItem] = useState<
    { category: number } | undefined
  >();
  const [totalInventories, setTotalInventories] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [allStatus, setAllStatus] = useState<any[]>([]);
  const [allStatusArray, setAllStatusArray] = useState<
    { id: number; name: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tagText, setTagText] = useState<string>('');
  const [allTags, setAllTags] = useState<{ text: string }[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [achieveCost, setAchieveCost] = useState<number>(0);
  const [showManageModal, setShowManageModal] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  const [defaultStatus, setDefaultStatus] = useState<string>('');
  const isUserStudent = isStudent(UserData.roleName);
  const isUserParent = isParent(UserData.roleName);
  const isUserAdmin = isAdmin(UserData.roleName);
  const [isShipmentNeeded, setIsShipmentNeeded] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps>();
  let selectedCategoryId: any =
    categories && categories?.filter((c) => c.name === selectedCategory);
  let editingCategory =
    categories && categories?.filter((x) => x?.id === editingItem?.category);
  // console.log('editingCategory', allCategories);
  const { Get, PostSecured, PostSecuredWithParams } = DataAccess();
  useEffect(() => {
    if (allCategories) setCategories(allCategories);
  }, [allCategories]);
  useEffect(() => {
    getAllStatus();
    getAllTags();
  }, []);
  useEffect(() => {
    if (inventoryId) getEditingItem(inventoryId);
  }, [inventoryId]);
  useEffect(() => {
    if (selectedCategory) setCategoryId(selectedCategoryId[0]?.id);
  }, [selectedCategory]);
  useEffect(() => {
    let url = ApiEndpoints.GetInventoriesCategories;
    Get(url).then((res: any) => {
      if (res) {
        let arr = [];
        for (let category of res) {
          arr.push(category.name);
        }
        setInventoryCategories(arr);
      }
    });
  }, [showManageModal]);
  const handleUploadImage = (fileName: string, imageUrl: { url: string }) => {
    setFileName(fileName);
    setImageUrl(imageUrl?.url);
  };
  const submitTag = () => {
    setInventoryTags([
      ...inventoryTags,
      {
        tagName: tagText,
        tagColor: '#1271c4',
      },
    ]);
    postTag();
  };
  const setStatus = (option: any) => {
    let id: number = allStatusArray?.filter(
      (status) => status['name'] === option,
    )[0]?.id;
    setSelectedStatus(id);
  };
  const postTag = async () => {
    if (search(tagText)) {
      return;
    } else {
      let url = ApiEndpoints.SaveTag;
      let params = `?tag=${tagText}&color=${'#1271c4'}`;
      try {
        let response = await PostSecuredWithParams(url, params);
        if (response.error) {
          console.log('Error', response);
        }
      } catch (error) {
        console.log('Error');
      }
    }
    setTagText('');
  };

  const search = (tagText: string) =>
    allTags.find((tag) => tag.text === tagText);

  const CreateUpdateInventory = async () => {
    setIsLoading(true);
    let dataObj = {
      inventoryId: inventoryId,
      storeId: storeId,
      inventoryTitle: title,
      // inventoryTags: null,
      selectedFranchiseId: UserData.companyID,
      inventoryDescription: encodeURIComponent(inventoryDescription),
      inventoryInstruction: null,
      inventoryStatusString: null,
      inventoryCost: inventoryCost,
      tags: inventoryTags,
      state: isEditing ? selectedStatus : allStatusArray[0].id,
      quantity: totalInventories?.toString(),
      category: categoryId,
      availableInventory: totalInventories?.toString(),
      imageUrl: imageUrl,
      inventoriesSold: soldInventories,
      availableForSold: avaiableInventories,
      inventoryTags: JSON.stringify(inventoryTags),
      AchievePointsCost: achieveCost,
      IsShipmentNeeded: isShipmentNeeded,
    };
    let url = ApiEndpoints.CreateUpdateInventory;
    try {
      let response = await PostSecured(url, dataObj);
      getAllInventories && getAllInventories();
      if (response.error) {
        setAlertModalVisible(true);
        setAlertText(response.error_description);
      } else {
        setInventoryId(response['inventoryId']);
        if (disbaleTabs) {
          setDisbleTabs(false);
          getEditingItem(response['inventoryId']);
          setActiveTab({ name: 'description' });
        } else {
          navigation.goBack();
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Catch error', error);
    }
  };

  const getAllStatus = () => {
    let url = ApiEndpoints.GetInvnetoryAllStatus;
    Get(url).then((res: any) => {
      setStoreStatus(res);
    });
  };

  const setStoreStatus = (res: any) => {
    let arr = [];
    for (let item of res) {
      arr.push(item.name);
    }
    setAllStatusArray(res);
    setAllStatus(arr);
  };

  const getAllTags = () => {
    let url = ApiEndpoints.GetAllTags;
    Get(url).then((res: any) => {
      setAllTags(res);
    });
  };
  const getEditingItem = (inventoryId: number) => {
    let url: EndpointType = ApiEndpoints.CreateInventory;
    url.params = `?inventoryId=${inventoryId}&storeId=${storeId}`;
    Get(url).then((res: any) => {
      if (res.error) {
        setAlertModalVisible(true);
        setAlertText(res.error_description);
      } else {
        isEditing == true;
        setEditingItem(res);
        setTitle(res.inventoryTitle);
        setTotalInventories(res?.availableInventory);
        setSoldInventories(res?.inventoriesSold);
        setAvailableInventories(res?.availableForSold);
        setInventoryCost(res?.inventoryCost);
        setInventoryTags(res?.tags);
        setInventoryDescription(decodeURIComponent(res?.inventoryDescription));
        setImageUrl(res?.imageUrl);
        setCategoryId(res?.category);
        setAchieveCost(res?.achievePointsCost);
        setStoreStatus(res?.inventoryStatus);
        selectedCategoryId = res?.category;
        let name: string = res?.inventoryStatus?.filter(
          (status: any) => status['id'] === res?.state,
        )[0]?.name;
        setDefaultStatus(name);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.form}>
        <_Text style={styles.textboxTitle}>Title</_Text>
        <_TextInput
          placeholder={'Title'}
          width={'100%'}
          editable={isUserAdmin && !isShipmentItem ? true : false}
          style={styles.inputText}
          value={title?.toString()} //title
          onChangeText={(text) => setTitle(text)}
        />
        <_Text style={styles.textboxTitle}>{'Tags'}</_Text>
        <AddTags
          tagText={tagText}
          allTags={allTags}
          submitTag={submitTag}
          setTagText={setTagText}
          isUserAdmin={isUserAdmin}
          inventoryTags={inventoryTags}
          isShipmentItem={isShipmentItem}
          setInventoryTags={setInventoryTags}
        />

        <_Text style={styles.textboxTitle}>{'Status'}</_Text>
        <ModalDropdown
          options={allStatus}
          defaultValue={defaultStatus}
          dropdownStyle={styles.dropdownStyle}
          textStyle={[styles.inputText, { width: '100%' }]}
          style={{
            backgroundColor: isShipmentItem
              ? whiteThemeColors.white
              : whiteThemeColors.primary + 50,
            borderRadius: 8,
          }}
          onSelect={(index, option: any) => {
            setStatus(option);
            setSelectedCategory(option);
          }}
          disabled={isShipmentItem && !Showtab ? false : true}
          dropdownTextStyle={[styles.text]}
          defaultTextStyle={[styles.text, { width: '100%' }]}
          renderRow={(option: any, index, isSelected) => {
            return (
              <_View style={styles.dropDownRow}>
                <_Text style={styles.text}>{option}</_Text>
              </_View>
            );
          }}
        />
        <_Text style={styles.textboxTitle}>{'Category'}</_Text>
        <_View style={styles.catContainer}>
          <ModalDropdown
            disabled={isUserAdmin && !isShipmentItem ? false : true}
            options={inventoryCategories}
            defaultValue={editingCategory && editingCategory[0]?.name} //"Select Category"
            dropdownStyle={styles.dropdownStyle}
            textStyle={{ width: '65%', paddingTop: 10, marginLeft: 10 }}
            style={{
              borderRadius: 10,
              backgroundColor: whiteThemeColors.white + 90,

              // width: '60%',
            }}
            onSelect={(index, option: any) => {
              setSelectedCategory(option);
            }}
            dropdownTextStyle={[styles.text, { color: 'gray' }]}
            defaultTextStyle={[styles.text, { color: 'gray' }]}
            renderRow={(option: any) => {
              return (
                <_View style={styles.dropDownRow}>
                  <_Text style={styles.text}>{option}</_Text>
                </_View>
              );
            }}
          />
          <_Button
            isBlock={isUserAdmin && !isShipmentItem ? false : true}
            borderRadius={10}
            width='30%'
            callback={() => setShowManageModal(true)}
            btnText='Manage'
            style={styles.manageButton}
            BtnTxt={styles.buttonText}
            submitting={true}
          />
        </_View>
        <FormMiddle
          isEditing={isEditing}
          achieveCost={achieveCost}
          isUserAdmin={isUserAdmin}
          inventoryCost={inventoryCost}
          isShipmentItem={isShipmentItem}
          setAchieveCost={setAchieveCost}
          soldInventories={soldInventories}
          IsShipmentNeeded={isShipmentNeeded}
          setInventoryCost={setInventoryCost}
          totalInventories={totalInventories}
          setIsShipmentNeeded={setIsShipmentNeeded}
          setTotalInventories={setTotalInventories}
          avaiableInventories={avaiableInventories}
          setAvailableInventories={setAvailableInventories}
          setSoldInventories={setSoldInventories}
        />
        {isUserParent || isUserStudent || isShipmentItem ? (
          <_Image uri={imageUrl} style={styles.itemImage} />
        ) : (
          <CameraButton
            onPress={() => {
              setIsModalVisible(!isModalVisible);
            }}
            fileName={fileName}
          />
        )}
        {isUserAdmin && (
          <_Button
            borderRadius={10}
            isBlock={
              (!isEditing && title && totalInventories && inventoryCost) ||
              isEditing
                ? false
                : true
            }
            width='100%'
            submitting={!isLoading}
            loaderColor={whiteThemeColors.white}
            BtnTxt={styles.buttonText}
            style={[
              styles.button,
              {
                backgroundColor:
                  (!isEditing && title && totalInventories && inventoryCost) ||
                  isEditing
                    ? whiteThemeColors.primary
                    : 'gray',
              },
            ]}
            btnText='Save'
            callback={() => CreateUpdateInventory()}
          />
        )}
        <ManageInventoryModal
          // setSelectedCategory={setSelectedCategory}
          visible={showManageModal}
          setVisible={setShowManageModal}
          setInventoryCategories={setCategories}
          getAllCategories={getAllCategories}
        />
        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {}}
          supportedOrientations={['portrait', 'landscape']}
        >
          <UploadAttachment
            isVisible={isModalVisible}
            visibleModal={() => {
              setIsModalVisible(!isModalVisible);
            }}
            uploadedAttachment={handleUploadImage}
            attachmentFor={'InventoryImage'}
            itemId={0}
            itemType={0}
            dependentId={undefined}
          />
        </Modal>
        {alertModalVisible && (
          <CustomAlert
            visible={alertModalVisible}
            title={'Error'}
            msg={alertText}
            firstBtn={'Okay'}
            firstBtnFunc={() => {
              setAlertModalVisible(false);
            }}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
