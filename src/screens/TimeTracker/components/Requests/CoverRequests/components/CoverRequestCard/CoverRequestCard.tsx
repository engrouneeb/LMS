import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {
  CoverRequestCardInterface,
  DataInterface,
  TAG_COLORInterface,
} from 'interfaces';
import { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../../components';
import { CoverRequestConstants } from '../../../../../../../constants';
import ScreensNames from '../../../../../../../screenNames';
import {
  TimeTrackerTabs,
  englishRequests,
} from '../../../../../../Strings/english';
import { UserImg } from '../../../../../../ThumbNail';
import { CoverTradeShiftStatus } from '../../../../../../values/english';
import { CoverCommentModal } from '../../../components/CoverCommentModal';
import { styles } from './style';

const TAG_COLOR: TAG_COLORInterface = {
  [CoverRequestConstants.Submitted]: '#004bc0',
  [CoverRequestConstants.Pending]: '#FFBF00',
  [CoverRequestConstants.Approved]: whiteThemeColors.green,
};

export const CoverRequestCard: FC<CoverRequestCardInterface> = ({
  item,
  showButtons = true,
  UpdateCoverageStatus,
  isCoverageTabActive,
  activeTab,
  UpdateApprovalsDetails,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalActionType, setModalActionType] = useState('');
  const [modalComment, setModalComment] = useState('');
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const renderModal = (btnName: string) => {
    setModalActionType(btnName);
    setShowModal(true);
  };

  const onCloseModal = () => {
    modalActionType == CoverRequestConstants.Approved ||
    modalActionType == CoverRequestConstants.Accept
      ? onPressAccept(item, CoverTradeShiftStatus.Accepted)
      : onPressReject(item, CoverTradeShiftStatus.Rejected);
  };

  const onPressAccept = (item: DataInterface, status: number) => {
    showModal != false && isCoverageTabActive
      ? UpdateCoverageStatus(item.itemId, status)
      : UpdateApprovalsDetails(
          item,
          CoverRequestConstants.Approved,
          modalComment
        );
    setShowModal(false);
    setModalComment('');
  };
  const onPressReject = (item: DataInterface, status: number) => {
    showModal != false && isCoverageTabActive
      ? UpdateCoverageStatus(item.itemId, status)
      : UpdateApprovalsDetails(
          item,
          CoverRequestConstants.Rejected,
          modalComment
        );
    setShowModal(false);
    setModalComment('');
  };
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate(ScreensNames.myRequestsDetails.name, {
          data: item,
          type: CoverRequestConstants.Cover,
        })
      }
    >
      <_View style={styles.innerCont}>
        <UserImg
          UserInfo={{
            FirstName: item.requestedFromUserName,
            LastName: item.requestedFromUserName.split(' ')[1],
            UserImage: '',
            UserImageColor: whiteThemeColors.primary,
          }}
          size={50}
        />
        <_View width={'88%'}>
          <_View style={styles.viewIn}>
            <_Text style={styles.userNameText}>
              {item.requestedFromUserName}
            </_Text>
            <_View
              style={[
                styles.tag,
                {
                  backgroundColor:
                    TAG_COLOR[item.status] || whiteThemeColors.red,
                },
              ]}
            >
              <_Text style={styles.tagText}>{item.status}</_Text>
            </_View>
          </_View>
          <_View flexDirection='row' width={'100%'}>
            <_Text numberOfLines={1} style={styles.details}>
              {isCoverageTabActive &&
              activeTab.name == TimeTrackerTabs.Approvals
                ? englishRequests.Wouldyouliketocover
                : !isCoverageTabActive &&
                  activeTab.name == TimeTrackerTabs.Approvals
                ? englishRequests.requesthasbeenacceptedby
                : activeTab.name == TimeTrackerTabs.MyRequests
                ? englishRequests.requestcoverto
                : null}
            </_Text>
            {!isCoverageTabActive && (
              <_Text numberOfLines={1} style={styles.reciverName}>
                {item?.requestedToUserName}
              </_Text>
            )}
          </_View>
          <_Text style={styles.details}>{item.startDateTemp}</_Text>
          <_Text
            style={styles.details}
          >{`${item?.startTimeDisplay} - ${item?.endTimeDisplay}`}</_Text>
        </_View>
      </_View>

      {showButtons && (
        <_View style={styles.buttonContainer}>
          {item.status == CoverRequestConstants.Rejected ? null : (
            <TouchableOpacity
              style={styles.declineBtn}
              onPress={() =>
                renderModal(
                  isCoverageTabActive
                    ? CoverRequestConstants.Decline
                    : CoverRequestConstants.Reject
                )
              }
            >
              <_Text style={styles.btnText}>
                {isCoverageTabActive
                  ? englishRequests.Decline
                  : englishRequests.Reject}
              </_Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.approveBtn}
            onPress={() =>
              renderModal(
                isCoverageTabActive
                  ? CoverRequestConstants.Accept
                  : CoverRequestConstants.Approve
              )
            }
          >
            <_Text style={[styles.btnText, { color: whiteThemeColors.green }]}>
              {isCoverageTabActive
                ? englishRequests.Accept
                : englishRequests.Approve}
            </_Text>
          </TouchableOpacity>
        </_View>
      )}

      <CoverCommentModal
        modalVisible={showModal}
        setModalVisible={setShowModal}
        modalComment={modalComment}
        setModalComment={setModalComment}
        commentFor={modalActionType}
        onCloseModalCallBack={onCloseModal}
      />
    </TouchableOpacity>
  );
};
