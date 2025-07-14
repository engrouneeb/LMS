import { HomeworkHTMLViewInterface } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { EmbedInHTML, whiteThemeColors } from 'utilities';
import { _Text, _View } from '../../../../../../components';
import CommonStyles from 'screens/CommonStyles';

const _HtmlView: React.FC<HomeworkHTMLViewInterface> = ({
  data,
  type,
  isActive,
  tabName,
}) => {
  const [formatedData, setFormatedData] = useState<any>();

  useEffect(() => {
    let receivedType = type;
    if (data[receivedType] === null) {
      setFormatedData('');
    } else {
      var _data =
        data[receivedType] == undefined
          ? null
          : data[receivedType].split('//www').join('http://www');
      setFormatedData(EmbedInHTML(_data));
    }
  }, [data]);

  return (
    <_View style={styles.container}>
      <_Text style={styles.titleTxt}>{tabName}</_Text>
      {isActive ? (
        <_View style={styles.webViewContainer}>
          <WebView style={{ flex: 1 }} source={{ html: formatedData }} />
        </_View>
      ) : null}
    </_View>
  );
};

export const HtmlView = React.memo(_HtmlView);

const styles = StyleSheet.create({
  webViewContainer: {
    width: '95%',
    height: '88%',
    backgroundColor: whiteThemeColors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
    paddingTop: 30,
    paddingBottom: 50,
  },
  titleTxt: {
    fontSize: 20,
    color: whiteThemeColors.primary,
    marginLeft: 15,
    marginBottom: 10,
    fontFamily: CommonStyles.fonts.semiBold,
  },
});
