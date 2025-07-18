import { useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch } from 'react-redux';
import {
  EmbedInHTML,
  EmptyHTML,
  getTerminologyLabel,
  Orientation,
  TerminologyMap,
  whiteThemeColors,
} from '../../../Utilities';
import { AnnouncementsIcon } from '../../../../assets/Icons';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { loading } from '../../../actions/AsyncStorage';
import { endpoint, _Screen, _Text, _View } from '../../../components';
import CommonStyles from '../../CommonStyles';
import Header from '../../Headers';
import {
  announcementInterface,
  announcementDetailInterface,
} from '../../../interfaces';

const AnnouncementsDetails: FC<announcementDetailInterface> = ({ route }) => {
  const dispatch = useDispatch();
  const { Get } = DataAccess();
  dispatch(loading(true));
  const [title, setTitle] = useState('');
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [htmlContent, setHtmlContent] = useState(EmptyHTML());
  const navigation: any = useNavigation();
  const [terminologies, setTerminologies] = useState<Partial<TerminologyMap>>(
    {},
  );
  useEffect(() => {
    const fetchTerminologies = async () => {
      const terms = await getTerminologyLabel();
      setTerminologies(terms);
    };
    fetchTerminologies();
  }, []);

  const getAnnouncementData = async (id: number) => {
    const Endpoint: endpoint = ApiEndpoints.GetAnnouncementsDetail;
    const params = `?announcementKey=${id}`;
    let res: announcementInterface & { status: number } = await Get({
      url: Endpoint.url,
      params: params,
    });
    if (res) return res;
    else return null;
  };

  const getData = async () => {
    const { id } = route?.params;
    let body = await getAnnouncementData(id);
    if (body != null) {
      setTitle(body.title);
      setHtmlContent(EmbedInHTML(body.description));
    }
  };

  useEffect(() => {
    getData();
  }, [orientation]);

  const onAndroidBack = () => {
    navigation.goBack();
    return true;
  };
  return (
    <Orientation
      getOrientation={(o: any) => {
        setOrientation(o);
      }}
    >
      <_Screen
        header={
          <Header
            isBack
            Screen={`${terminologies['Announcement']?.label}`}
            goBack={() => navigation.goBack()}
          />
        }
        flex={1}
        hideTopSafeArea
        onAndroidBack={onAndroidBack}
        backgroundColor={whiteThemeColors.background}
      >
        <_View>
          <_Text numberOfLines={2} style={styles.titleContainer}>
            {title}
          </_Text>
          <_View style={styles.stickyIconContainer}>
            <AnnouncementsIcon color={whiteThemeColors.primary} size={130} />
          </_View>
        </_View>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 10 }}>
          <_View style={styles.webViewContainer}>
            <WebView
              showsVerticalScrollIndicator={false}
              onLoadStart={() => dispatch(loading(true))}
              onLoadEnd={() => dispatch(loading(false))}
              source={{ html: htmlContent }}
              style={{
                flex: 1,
                borderRadius: 10,
              }}
            />
          </_View>
        </ScrollView>
      </_Screen>
    </Orientation>
  );
};
export const AnnouncementDetails = React.memo(AnnouncementsDetails);

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 21,
    marginTop: 30,
    marginLeft: 12,
    paddingRight: '10%',
    color: whiteThemeColors.primaryTextColor,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  stickyIconContainer: {
    position: 'absolute',
    right: 50,
    top: 15,
    height: 50,
    zIndex: -2,
    transform: [{ rotateY: '180deg' }],
    opacity: 0.2,
  },
  webViewContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: 40,
    borderRadius: 10,
    zIndex: 10,
    marginTop: 10,

    backgroundColor: whiteThemeColors.background,
  },
});
