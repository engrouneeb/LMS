import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { VideoPlayer, whiteThemeColors } from 'utilities';
import ApiEndpoints from '../../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../../data/DAL';
import { _Text, _VectorIcons, _View, endpoint } from '../../../../components';
import Loader from '../../../Loader/loader';
interface props {
  staffId: number;
}
const Video: React.FC<props> = ({ staffId }) => {
  const [videoUrl, setVideoUrl] = useState<any>();
  const [loader, setLoader] = useState(false);
  const { Get } = DataAccess();
  useEffect(() => {
    getVideoUrl();
  }, []);

  const getVideoUrl = () => {
    var url: endpoint = ApiEndpoints.GetStaffOverviewById;
    url.params = `?staffId=${staffId}`;
    setLoader(true);
    Get(url)
      .then((response: any) => {
        if (response) setVideoUrl(response?.videoUrl);
        else setVideoUrl(null);
      })
      .catch((e: any) => console.log('Error in Fetching StdList ', e))
      .finally(() => setLoader(false));
  };

  const NoVideoUploadedYet = () => {
    return (
      <_View style={{ marginVertical: 80 }}>
        <_VectorIcons
          type={'Entypo'}
          name={'video'}
          size={90}
          color={whiteThemeColors.primary}
        />
        <_Text style={styles.noVideoFoundTxt}>No Video Found</_Text>
      </_View>
    );
  };
  return (
    <_View style={styles.container}>
      {loader ? (
        <Loader />
      ) : videoUrl == null ? (
        <NoVideoUploadedYet />
      ) : (
        <_View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <VideoPlayer style={styles.thumbnailContainer} url={videoUrl} />
        </_View>
      )}
    </_View>
  );
};

export { Video };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: whiteThemeColors.background,
  },
  thumbnailContainer: {
    width: Dimensions.get('window').width - 20,
    height: '100%',
    borderRadius: 20,
  },
  noVideoFoundTxt: {
    fontSize: 13,
    color: whiteThemeColors.greyDark,
    marginTop: 3,
  },
});
