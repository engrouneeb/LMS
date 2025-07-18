import { AddOrEditInterface } from '../../../../../../interfaces';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FlatList, Modal, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../../../../../../reducers/Appstate';
import { whiteThemeColors } from '../../../../../../Utilities';
import Endpoint from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import { setupSuccess } from '../../../../../../actions/SetupActions';
import { _View, endpoint } from '../../../../../../components';
import Headers from '../../../../../Headers';
import Loader from '../../../../../Loader/loader';
import Search from '../../../../../Search';
import {
  EmptyList,
  RenderItem,
  SaveApprovals,
  StickyHeader,
} from './components';
import { useAppModulePermission } from '../../../../../../customHooks';

const AddOrEditSetupp: React.FC<AddOrEditInterface> = forwardRef(
  (
    { assignmentId, users, selectedUserIndex, handleSaveApprovals, approvers },
    ref,
  ) => {
    const { filterMenuOptions } = useAppModulePermission();
    const [approver, setApprovers] = useState<any>(approvers);
    const [filterdApprovers, setfilterdApprovers] = useState(approvers);
    const [selectedApprovers, setSelectedApprovers] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [isUpdating, setUpdatingState] = useState(false);
    const [visibleModal, setModalVisilbeState] = useState(false);
    const [isEdit, setEditState] = useState(false);
    const [isView, setViewState] = useState(false);
    const [showSelected, setSelectedState] = useState(false);
    const [selected, setSelected] = useState<any>([]);
    const [prevId, setPrevId] = useState<any>([]);
    const [isVisible, setisVisible] = useState(false);
    const { addOrEdit } = useSelector((state: Appstate) => state.language);
    const isShowAddApproval=filterMenuOptions("AddApproval")
    let searchRef: any = useRef();
    const { Get, PostSecured } = DataAccess();
    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
      changeVisibleState() {
        setModalVisilbeState(!visibleModal);
      },
      isEditing(state = false) {
        setEditState(state);
      },
      isViewing(state = false) {
        setViewState(state);
      },
    }));

    useEffect(() => {
      setApprovers([]);
      setfilterdApprovers([]);
    }, []);

    const fetchApprovalsUser = () => {
      if (visibleModal) {
        setLoading(true);
        let url: endpoint = Endpoint.getAppoversUsers;
        url.params = `?userId=${users[selectedUserIndex].userId}`;
        Get(url)
          .then((res: any) => {
            setApprovers(res);
            setfilterdApprovers(res);
            const _selectedApr = [];
            const _ids = [];
            for (let i = 0; i < res.length; i++) {
              if (res[i].isSelected === true) {
                _ids.push(res[i].id);
                _selectedApr.push(res[i]);
              }
            }
            setSelectedApprovers(_selectedApr);
            setPrevId(_ids);
            return setLoading(false);
          })
          .catch(() => {
            return setLoading(false);
          });
      }
    };

    useEffect(() => {
      fetchApprovalsUser();
    }, [selectedUserIndex, visibleModal]);

    const onSelectApproval = (item: any, index: any) => {
      if (item.isSelected) item.isSelected = false;
      else item.isSelected = true;

      if (item.isSelected === true) {
        selectedApprovers.push(item);
      } else {
        let hasId = selectedApprovers.find(function (id: any) {
          return id === item;
        });
        if (hasId !== undefined) {
          let ind = selectedApprovers.findIndex(function (id: any) {
            return id === item;
          });
          selectedApprovers.splice(ind, 1);
        }
      }
      let _data = [...filterdApprovers];
      _data[index].isSelected = item.isSelected;
      setfilterdApprovers(_data);
    };

    const handlePress = () => {
      setUpdatingState(true);
      let selectedStr = '';
      const newApprovals = [];
      let removeApprovals = prevId;
      for (let i = 0; i < selectedApprovers.length; i++) {
        removeApprovals = removeApprovals.filter(
          (id: any) => id != selectedApprovers[i].id,
        );
        if (!prevId.includes(selectedApprovers[i].id)) {
          newApprovals.push(selectedApprovers[i].id);
        }
        let str = selectedApprovers[i].name + ', ';
        selectedStr += str;
      }

      users[selectedUserIndex].userApprovers = selectedStr;

      let data = {
        AssignmentId: assignmentId,
        Approvers: newApprovals,
        RemoveApprovers: removeApprovals,
      };
      PostSecured(Endpoint.updateApprovers, data)
        .then(() => {
          setUpdatingState(false);
          setSelectedApprovers([]);
          setfilterdApprovers([]);
          setSelectedState(false);
          handleSaveApprovals(
            addOrEdit.Success,
            addOrEdit.ApproversHasBeenSaved,
          );
        })
        .catch(() => {
          setUpdatingState(false);
          handleSaveApprovals(addOrEdit.Error, addOrEdit.SomethingWentWrong);
        });

      setModalVisilbeState(false);
      dispatch(setupSuccess(users));
    };

    const handleShowSelectedOnly = (v: any) => {
      setSelectedState(v);
      if (v) {
        const _selected = [];
        for (let i = 0; i < filterdApprovers.length; i++) {
          if (filterdApprovers[i].isSelected === true) {
            _selected.push(filterdApprovers[i]);
          }
        }
        setSelected(_selected);
      }
    };

    const OpenCloseSearch = () => setisVisible(true);

    return (
      <Modal
        visible={visibleModal}
        animationType='slide'
        onDismiss={() => setModalVisilbeState(false)}
        onRequestClose={() => setModalVisilbeState(false)}
        supportedOrientations={['portrait', 'landscape']}
        presentationStyle='overFullScreen'
      >
        <Headers
          isBack
          isSearchBtn
          Screen={
            isEdit
              ? addOrEdit.EditApprovals
              : isView
              ? addOrEdit.SelectedApprovals
              : addOrEdit.AddApprovals
          }
          GoBack={() => {
            setSelectedState(false);
            setModalVisilbeState(false);
          }}
          OpenSearch={OpenCloseSearch}
        />
        {isVisible && (
          <Search
            onInputChange={(data: any) => setfilterdApprovers(data)}
            onClose={() => setisVisible(false)}
            animSpeed={100}
            data={approver}
            searchKey='name'
            isVisible={isVisible}
            outPos={-110}
            inPos={-10}
            height={60}
          />
        )}
        <StickyHeader
          addOrEdit={addOrEdit}
          showSelected={showSelected}
          handleShowSelectedOnly={handleShowSelectedOnly}
        />
        <_View style={styles.topContainer}>
          {loading ? (
            <Loader />
          ) : (
            <FlatList
              data={showSelected ? selected : filterdApprovers}
              style={{ width: '97%', marginTop: 5 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <RenderItem
                  item={item}
                  index={index}
                  onSelectApproval={onSelectApproval}
                />
              )}
              ListEmptyComponent={EmptyList}
              ListFooterComponent={<_View style={{ height: 70 }} />}
            />
          )}
        </_View>
        {isShowAddApproval&&<SaveApprovals
          handlePress={handlePress}
          addOrEdit={addOrEdit}
          isUpdating={isUpdating}
        />}
      </Modal>
    );
  },
);

const AddOrEditSetup = React.memo(AddOrEditSetupp);
export { AddOrEditSetup };

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: whiteThemeColors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
