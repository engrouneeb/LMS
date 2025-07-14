import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { whiteThemeColors } from 'utilities';
import { Approvels } from '../../../../../../../assets/Icons';
import ApiEndPoint from '../../../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../../../data/DAL';
import { _Text, _View, endpoint } from '../../../../../../components';
import { HtmlWebView } from '../../../common/HtmlWebView';
import { _VectorIcons } from '../../../../../../components';
import { Appstate } from '../../../../../../reducers/Appstate';
import { HomeworkWhiteboardInterface } from 'interfaces';
import CommonStyles from 'screens/CommonStyles';

function Whiteboard(props: HomeworkWhiteboardInterface): JSX.Element {
  console.log({ Whiteboard: props.stepId });
  const [linkId, setLinkId] = useState(0);
  const [Attachment, setAttachment] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(0);
  const user: any = useSelector((state: Appstate) => state.User.UserInfo);
  const selectedStudent: any = useSelector(
    (state: Appstate) => state.courseAssignStudentsReducer.data,
  );
  const [isWebview, setisWebview] = useState(false);
  const { Get } = DataAccess();
  useEffect(() => {
    if (props?.data?.homeWorkID) getWhiteBoardsLinks();
  }, [props.data]);

  const getWhiteBoardsLinks = () => {
    let url: endpoint = ApiEndPoint.GetStudentHomeWorkWhiteBoardLinks;
    let userId;
    if (props.userId) userId = props.userId;
    else if (selectedStudent == null || selectedStudent?.length === 0) {
      userId = user.userID;
      setSelectedStudentId(user.userID);
    } else {
      setSelectedStudentId(selectedStudent.id);
      userId = selectedStudent.id;
    }
    url.params = `?StudentId=${userId}&HomeworkId=${
      props.data!.homeWorkID
    }&StepId=${props.stepId}`;
    Get(url).then((res: any) => {
      setAttachment(res);
      return res;
    });
  };
  const ListEmpty = () => {
    return props?.hideNodata ? (
      <_View alignItems='center' justify='center'>
        <_Text
          style={{
            fontFamily: CommonStyles.fonts.medium,
            color: whiteThemeColors.greyDark,
          }}
        >
          No Whiteboard Found
        </_Text>
      </_View>
    ) : (
      <_View style={styles.emptyContainer}>
        <Approvels />
        <_Text style={styles.whiteBoardTxt}>No Whiteboard Found</_Text>
      </_View>
    );
  };

  const RenderList = (Obj: any) => {
    return (
      <>
        <_View style={styles.singleCardContainer}>
          <_View style={styles.titleContainer}>
            <_VectorIcons
              type={'MaterialCommunityIcons'}
              name={'subtitles-outline'}
              size={20}
              color={whiteThemeColors.primary}
            />
            <_Text style={styles.titleTxt}>Title:</_Text>
            <_Text numberOfLines={1} style={styles.titleValueTxt}>
              {Obj.title}
            </_Text>
          </_View>
          <_View style={styles.typeContainer}>
            <_VectorIcons
              type={'Entypo'}
              name={'text'}
              size={20}
              color={whiteThemeColors.primary}
            />
            <_Text style={styles.typeTxt}>Type:</_Text>
            <_Text numberOfLines={2} style={styles.typeValueTxt}>
              {Obj.type}
            </_Text>
          </_View>
        </_View>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            setLinkId(Obj.linkID);
            setisWebview(true);
          }}
        >
          <_Text style={styles.btnText}>Open</_Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <_View style={styles.mainContainer}>
      {props.tabName && (
        <_View style={styles.screenTitleContainer}>
          <_Text style={styles.screenTitleTxt}>{props.tabName}</_Text>
        </_View>
      )}
      <_View
        style={{
          width: '100%',
          // height: '80%',
          alignSelf: 'center',
          backgroundColor: props?.isFromDrawer
            ? 'transparent'
            : whiteThemeColors.white,
          borderRadius: 10,
          // paddingVertical: 5,
        }}
      >
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={Attachment}
          ListEmptyComponent={() => <ListEmpty />}
          ListHeaderComponent={() => <_View style={{ height: 10 }} />}
          ListFooterComponent={() => <_View style={{ height: 10 }} />}
          ItemSeparatorComponent={() => <_View style={{ height: 20 }} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <_View style={styles.renderItemContainer}>
              <_View style={[styles.renderItemSubContainer]}>
                {RenderList(item)}
              </_View>
            </_View>
          )}
        />
      </_View>
      {isWebview && (
        <HtmlWebView
          changeVisibleState={() => {
            setisWebview(false);
          }}
          title={'White Board'}
          studentId={selectedStudentId}
          role={user.roleName}
          noteId={linkId}
          isWebview={isWebview}
        />
      )}
    </_View>
  );
}

export { Whiteboard };

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
    paddingHorizontal: 10,
  },
  screenTitleContainer: {
    marginTop: 15,
    marginLeft: 8,
  },
  screenTitleTxt: {
    fontSize: 20,
    color: whiteThemeColors.primary,

    marginBottom: 15,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  bodyContainer: {
    width: '100%',
    height: '80%',
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
    paddingVertical: 5,
  },
  renderItemContainer: { flex: 1, zIndex: 10, paddingVertical: 0, margin: 0 },
  renderItemSubContainer: {
    width: '100%',
    padding: 5,
    backgroundColor: whiteThemeColors.background,
    borderRadius: 5,
    zIndex: 10,
  },
  flatListContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  singleCardContainer: {
    width: '88%',
    paddingVertical: 15,
    paddingLeft: 10,
  },
  headingTxt: {
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: '500',
    alignSelf: 'flex-start',
    color: whiteThemeColors.black,
  },
  valTxt: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'flex-start',
    color: whiteThemeColors.greyDark,
    textTransform: 'capitalize',
  },
  btnText: {
    fontSize: 15,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,

    marginBottom: 3,
    color: whiteThemeColors.white,
    marginLeft: 5,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    flexGrow: 1,
    width: '98%',
    alignSelf: 'center',
  },
  whiteBoardTxt: {
    marginTop: 200,
    fontFamily: CommonStyles.fonts.medium,
    alignSelf: 'center',
    marginLeft: 20,
    fontSize: 16,
    color: whiteThemeColors.greyDark,
  },

  shadow: {
    shadowColor: whiteThemeColors.greyDark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  titleTxt: {
    marginLeft: 10,
    marginRight: 5,
    fontSize: 13,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  titleValueTxt: {
    fontSize: 14,
    color: whiteThemeColors.greyDark,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.medium,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  typeTxt: {
    marginLeft: 10,
    marginRight: 5,
    fontSize: 13,
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  typeValueTxt: {
    fontSize: 15,
    color: whiteThemeColors.greyDark,
    textTransform: 'capitalize',
    width: '70%',
    fontFamily: CommonStyles.fonts.medium,
  },
  btnContainer: {
    paddingVertical: 10,
    backgroundColor: whiteThemeColors.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    flexDirection: 'row',
  },
});
