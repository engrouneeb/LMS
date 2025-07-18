import { EndpointType } from '../../../../../interfaces';
import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { CustomAlert, whiteThemeColors } from '../../../../../Utilities';
import { ManageInventoryCard } from '..';
import ApiEndpoints from '../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../data/DAL';
import { _View } from '../../../../../components';
import { _ActivityIndicator } from '../../../../Loader';
import { ModalHeader } from './components';
import { HeaderCard } from './components/HeaderCard';
import { styles } from './styles';
import {
  categoryType,
  responseType,
  ManageInventoryProps,
} from '../../../../../interfaces';

const ManageInventoryModal: FC<ManageInventoryProps> = ({
  visible,
  setVisible,
  setInventoryCategories,
  getAllCategories,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingItemIndex, setEditingItemIndex] = useState<number>(0);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string | undefined>(
    '',
  );
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<string>('');
  const [id, setId] = useState<number | undefined>(0);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<
    responseType | undefined
  >();
  const { PostSecuredWithParams, Get } = DataAccess();
  const onAddingNew = async () => {
    setIsAddingNew(true);
    setIsEditing(false);
  };

  useEffect(() => {
    setLoading(true);
    getCategories();
    setLoading(false);
  }, []);

  const getCategories = () => {
    let url: EndpointType = ApiEndpoints.GetInventoriesCategories;
    Get(url).then((res: any) => {
      if (res) {
        setCategories(res);
        setInventoryCategories(res);
      }
    });
  };

  useEffect(() => {
    getCategories();
  }, [visible]);

  const CreateUpdateStoreCategory = async () => {
    let categoryName = isEditing ? editingItem : newCategoryName;
    let editingItemIndex: number | undefined = categories?.findIndex((item) => {
      item.name == null ||
        item.name.toLowerCase() == categoryName?.toLowerCase();
    });
    if (categories[editingItemIndex] != undefined) {
      setAlertModalVisible(true);
      setResponseMessage({
        message: 'Category Name already exists',
        isSuccess: false,
      });
      return;
    }
    let url = ApiEndpoints.CreateUpdateStoreCategory;
    let params = `?categoryName=${categoryName}&categoryId=${id}`;
    try {
      let response = await PostSecuredWithParams(url, params);
      setId(0);
      setNewCategoryName('');
      getAllCategories();
      if (response.error) {
        setAlertModalVisible(true);
        setResponseMessage({
          message: response?.error_description,
          isSuccess: false,
        });
      } else {
        setResponseMessage({
          message: response?.message,
          isSuccess: response.categoryId !== 0 ? true : false,
        });
        setAlertModalVisible(true);
        if (response.categoryId === 0) {
          getCategories();
        }
        setNewCategoryName('');
        setIsAddingNew(false);

        getCategories();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  const DeleteCategory = async (CategoryId: number) => {
    let url = ApiEndpoints.DeleteCategory;
    let params = `?id=${CategoryId}`;
    try {
      let response = await PostSecuredWithParams(url, params);
      if (response.error) {
        console.log('Error', response);
      } else {
        setAlertModalVisible(true);
        setResponseMessage({
          message: response?.message,
          isSuccess: response?.isSuccess,
        });
        response.isSuccess &&
          setCategories(
            categories?.filter((cat: categoryType) => cat.id !== CategoryId),
          );
      }
    } catch (error) {
      console.log('Error');
    }
  };
  const onEdit = async (item: categoryType, index: number) => {
    setEditingItemIndex(index);
    setNewCategoryName(item?.name);
    setIsEditing(false);
    setIsAddingNew(true);
    setId(item.id);
  };
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
      transparent={true}
      visible={visible}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <ModalHeader
            onPress={() => {
              setVisible(false);
              setIsAddingNew(false);
              setIsEditing(false);
            }}
          />
          <_View style={styles.webViewContainer}>
            <_View style={styles.modalInsideView}>
              {loading ? (
                <_ActivityIndicator
                  size={'large'}
                  color={whiteThemeColors.primary}
                />
              ) : (
                <>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={categories}
                    style={{ flex: 1, width: '100%', marginTop: '2%' }}
                    ListHeaderComponent={
                      <HeaderCard
                        isAddingNew={isAddingNew}
                        onAddingNew={onAddingNew}
                        setIsAddingNew={setIsAddingNew}
                        newCategoryName={newCategoryName}
                        setNewCategoryName={setNewCategoryName}
                        CreateUpdateStoreCategory={CreateUpdateStoreCategory}
                      />
                    }
                    stickyHeaderIndices={[0]}
                    renderItem={({ item, index }) => (
                      <_View>
                        <ManageInventoryCard
                          item={item}
                          index={index}
                          // CreateUpdateStoreCategory={CreateUpdateStoreCategory}
                          DeleteCategory={DeleteCategory}
                          onEdit={onEdit}
                          setEditingItem={setEditingItem}
                          // isEditing={isEditing}
                          // editingItemIndex={editingItemIndex}
                          // editingItem={editingItem}
                          // setIsEditing={setIsEditing}
                          // setIsAddingNew={setIsAddingNew}
                          // newCategoryName={newCategoryName}
                          // getAllCategories={getAllCategories}
                        />
                        {index == categories.length - 1 && (
                          <_View style={{ height: 50 }} />
                        )}
                      </_View>
                    )}
                  />
                </>
              )}
            </_View>
          </_View>
        </_View>
        {alertModalVisible && (
          <CustomAlert
            visible={alertModalVisible}
            title={responseMessage?.isSuccess ? 'Success' : 'Error'}
            msg={responseMessage?.message}
            firstBtn={'Okay'}
            firstBtnFunc={() => {
              setAlertModalVisible(false);
            }}
          />
        )}
      </_View>
    </Modal>
  );
};
export { ManageInventoryModal };
