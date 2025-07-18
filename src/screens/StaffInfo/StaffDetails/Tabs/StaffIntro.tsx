import React, { useEffect, useState } from 'react';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { _Text, _View, _VectorIcons, endpoint } from '../../../../components';
import Loader from '../../../Loader/loader';
import WebView from 'react-native-webview';
import EmptyList from '../../../EmptyList';
import { EmbedInHTML, whiteThemeColors, EmptyHTML } from '../../../../Utilities';
import { StyleSheet } from 'react-native';
interface props {
  staffId: number | undefined;
}
const StaffIntro: React.FC<props> = ({ staffId }) => {
  const [description, setDescription] = useState<any>(EmptyHTML());
  const [loader, setLoader] = useState(false);
  const { Get } = DataAccess();
  useEffect(() => {
    getStaffIntroDetail();
  }, []);

  const getStaffIntroDetail = async () => {
    var url: endpoint = ApiEndpoints.GetStaffOverviewById;
    url.params = `?staffId=${staffId}`;
    setLoader(true);
    Get(url)
      .then((response: any) => {
        if (response) {
          setDescription(response?.overview);
        } else {
          setDescription(null);
        }
      })
      .catch((e: any) => console.log('Error in Fetching StdList ', e))
      .finally(() => setLoader(false));
  };

  return (
    <_View style={styles.container}>
      {loader ? (
        <Loader />
      ) : description == null ? (
        <EmptyList
          image={
            <_VectorIcons
              type='Foundation'
              name={'page-delete'}
              size={50}
              color={whiteThemeColors.primary}
              style={{ marginBottom: 20 }}
            />
          }
          text='No Intro Found'
        />
      ) : (
        <_View style={styles.webViewContainer}>
          <WebView
            source={{
              html: EmbedInHTML(description),
            }}
            style={styles.webView}
          />
        </_View>
      )}
    </_View>
  );
};

export { StaffIntro };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteThemeColors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webViewContainer: {
    width: '100%',
    height: '100%',
  },
  webView: {
    width: '100%',
    height: 200,
    backgroundColor: whiteThemeColors.background,
  },
});
