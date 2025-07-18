import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { isTablet } from 'react-native-device-info';
import WebView from 'react-native-webview';
import { isPortrait, whiteThemeColors } from '../../../../Utilities';
import { Approvels } from '../../../../../assets/Icons';
import { _Text, _View } from '../../../../components';
import CommonStyles from '../../../CommonStyles';

let screenHeight = Dimensions.get('window').height / 1.2;
interface props {
  isActive: boolean;
  value?: string;
}
const _OverviewTab: React.FC<props> = ({ isActive, value }) => {
  const [data, setData] = useState<any>();
  const [cardHeight, setCardHeight] = useState(
    isPortrait() ? screenHeight : 500
  );

  useEffect(() => {
    let _data;
    if (value) {
      _data = value;
      _data = _data.split('//www').join('http://www');
    } else {
      _data = value;
    }

    var htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
    <div>
    ${_data}
    </div>
    </body>
    </html>`;
    setData(htmlContent);
  }, [value]);

  useEffect(() => {
    const subs = Dimensions.addEventListener('change', _onLayout);

    return () => {
      subs.remove();
    };
  });

  const _onLayout = (result: any) => {
    if (result.window.height > result.window.width) {
      isTablet()
        ? setCardHeight(result.window.height / 1.5)
        : setCardHeight(result.window.height / 1.2);
    } else {
      isTablet() ? setCardHeight(500) : setCardHeight(300);
    }
  };
  return (
    <_View style={{ flex: 1, backgroundColor: whiteThemeColors.background }}>
      <_View style={styles.container}>
        {isActive ? (
          ['', null, '<p><br></p>', undefined].includes(value) ? (
            <_View style={styles.emptyListContainer}>
              <Approvels />
              <_Text
                style={[
                  CommonStyles.className,
                  { marginTop: 150, color: whiteThemeColors.greyDark },
                ]}
              >
                No Data
              </_Text>
            </_View>
          ) : (
            <_View
              style={[
                {
                  height: cardHeight - 50,
                  width: '98%',
                  paddingVertical: 20,
                },
              ]}
            >
              <WebView source={{ html: data }} />
            </_View>
          )
        ) : null}
      </_View>
    </_View>
  );
};

export const OverviewTab = React.memo(_OverviewTab);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whiteThemeColors.background,
  },
  emptyListContainer: {
    height: '98%',
    width: '98%',
    paddingHorizontal: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
