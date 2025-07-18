import React, { useEffect, useState } from 'react';
import { _View, _Text,endpoint } from '../../../../../../components';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { AttachmentTypes, whiteThemeColors } from '../../../../../../Utilities';
import ApiEndPoint from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import { SetAttachmentNavigateScreen } from '../../../../../../actions/CoursePlayerAction';
import {
  courseAttachmentFailed,
  courseAttachmentSuccess,
} from '../../../../../../actions/DownloadAction';
import ScreensNames from '../../../../../../screenNames';
import { Attachments } from '../../../CourseDetails/components';
import { HomeworkAttachmentInterface } from '../../../../../../interfaces';
import CommonStyles from '../../../../../CommonStyles';

const Attachment: React.FC<HomeworkAttachmentInterface> = ({
  navigation,
  tabName,
  data,
  hideNodata,
  userId = undefined,
}) => {
  const [Attachment, setAttachment] = useState([]);
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  useEffect(() => {
    getAttachmentsDetail();
  }, [data.homeWorkID]);

  const getAttachmentsDetail = () => {
    if (data.homeWorkID != undefined) {
      dispatch(SetAttachmentNavigateScreen(ScreensNames.homeWork.name));
      let url: endpoint = ApiEndPoint.GetAttachment;
      url.params = `?itemId=${data.homeWorkID}&itemType=${AttachmentTypes.HomeView.value}`;
      Get(url)
        .then((res: any) => {
          if (!res.attachments) {
            return dispatch(courseAttachmentFailed());
          }
          res.length == 0 ? setAttachment([]) : setAttachment(res);
          dispatch(courseAttachmentSuccess(res));
          return res;
        })
        .catch(() => {
          return dispatch(courseAttachmentFailed());
        });
    }
  };
  return (
    <_View style={styles.container}>
      {tabName && (
        <_View style={styles.titleContainer}>
          <_Text style={styles.titleTxt}>{tabName}</_Text>
        </_View>
      )}
      <_View style={styles.bodyContainer}>
        <Attachments
          list={Attachment}
          itemId={data.homeWorkID}
          hideNodata
          userId={userId}
        />
      </_View>
    </_View>
  );
};

export { Attachment };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
  },
  titleContainer: {
    paddingHorizontal: 5,
    paddingTop: 20,
    justifyContent: 'center',
  },
  titleTxt: {
    fontSize: 20,
    color: whiteThemeColors.primary,

    marginLeft: 15,
    marginBottom: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  bodyContainer: {
    backgroundColor: whiteThemeColors.white,
    width: '95%',
    height: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
