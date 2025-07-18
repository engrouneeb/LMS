import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  EmbedInHTML,
  EmptyHTML,
  removeStyling,
  RemoveHTML,
  getHeight,
  getWidth,
  whiteThemeColors,
} from '../../../Utilities';
import { _Screen, _Text, _VectorIcons, _View } from '../../../components';
import Header from '../../Headers';
import FeedbackModal from './FeedbackModal';
import { ArticleDetailsInterface } from '../../../interfaces';
import CommonStyles from '../../CommonStyles';

const ArticleDetails: React.FC<ArticleDetailsInterface> = ({
  navigation,
  route,
}) => {
  const { details } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [htmlContent, setHtmlContent] = useState(EmptyHTML());
  const parseIntoHTML = () => {
    let { content } = details;
    if (content != null) {
      content = RemoveHTML(removeStyling(content));
      setHtmlContent(EmbedInHTML(content));
    } else {
      setHtmlContent(EmbedInHTML('No Article Description'));
    }
  };

  useEffect(() => {
    parseIntoHTML();
  }, []);

  const handleBack = () => {
    navigation?.goBack();
    return true; //disable back button
  };

  const _Title = () => {
    const { title } = details;
    return (
      <_View style={styles.titleContainer}>
        <_VectorIcons
          type={'Ionicons'}
          name={'md-newspaper-outline'}
          color={whiteThemeColors.primary}
          size={25}
        />
        <_Text style={styles.title}>{removeStyling(title) || 'Article'}</_Text>
      </_View>
    );
  };

  const _WebView = () => {
    return (
      <_View style={styles.webContainer}>
        <WebView
          source={{ html: htmlContent }}
          style={styles.webView}
          cacheMode='LOAD_NO_CACHE'
          allowsLinkPreview
          domStorageEnabled
          javaScriptEnabled
          useSharedProcessPool={false}
        />
      </_View>
    );
  };

  const _FeedbackBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        <_Text style={styles.text}>Feedback</_Text>
      </TouchableOpacity>
    );
  };

  return (
    <_Screen
      header={
        <Header
          isBack={true}
          Screen={'Details'}
          GoBack={() => {
            navigation?.goBack();
          }}
        />
      }
      flex={1}
      hideTopSafeArea
      onAndroidBack={handleBack}
      backgroundColor={whiteThemeColors.background}
    >
      <_View style={styles.container}>
        <_Title />
        <_WebView />
        <_FeedbackBtn />
      </_View>
      <FeedbackModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedItem={details}
      />
    </_Screen>
  );
};

export default React.memo(ArticleDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titleContainer: {
    width: '100%',
    maxheight: 40,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 10,
    marginBottom: 10,
  },
  webContainer: {
    backgroundColor: whiteThemeColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: '84%',
    padding: 12,
  },
  webView: {
    flex: 1,
    width: getWidth('90%'),
    height: getHeight('100%'),
  },
  button: {
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 15,
    height: 44,
    bottom: 20,
    right: 15,
    left: 15,
  },
  title: {
    color: whiteThemeColors.black,
    marginLeft: 5,
    fontSize: 16,
    textTransform: 'capitalize',
    fontFamily: CommonStyles.fonts.semiBold,
    minHeight: 40,
    width: '90%',
  },
  text: {
    color: whiteThemeColors.white,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
