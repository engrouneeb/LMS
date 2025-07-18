import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  getTerminologyLabel,
  isTablet,
  TerminologyMap,
  whiteThemeColors,
} from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import { _Text, _VectorIcons, _View } from '../../../components';
import WhiteLabelConfig from '../../../WhiteLabelConfig';
import CommonStyles from '../../CommonStyles';
interface props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedItem: any;
}
const FeedbackModal: React.FC<props> = ({
  modalVisible,
  setModalVisible,
  selectedItem,
}) => {
  const [enterFeedback, setEnterFeedback] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const { PostSecured } = DataAccess();
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

  const emojiList: any = {
    ['OK']: '/assets/Canvas/images/extreemlyhelpful.png',
    ['Smile']: '/assets/Canvas/images/helpful.png',
    ['Calm']: '/assets/Canvas/images/nothelp.png',
  };

  const sendFeedback = async () => {
    let data = {
      ArticleId: selectedItem?.id,
      FeedbackMessage: enterFeedback,
      FeedbackReactionImage: emojiList[selectedEmoji],
    };

    PostSecured(ApiEndpoints.SaveArticleFeedback, data)
      .then((res: any) => {
        if (res) {
          setEnterFeedback('');
          setSelectedEmoji('');
          setModalVisible(false);
        } else {
          Alert.alert('Error', 'There is an error posting feedback', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      })
      .catch((err: any) => {});
  };

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      style={{}}
    >
      <_View style={styles.centeredView}>
        <_View style={styles.modalView}>
          <_View style={styles.headerContainer}>
            <_Text style={styles.headText}>{''}</_Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.crossIcon}
            >
              <_VectorIcons
                type={'Entypo'}
                name='cross'
                size={15}
                color={whiteThemeColors.primary}
                style={{ padding: 5 }}
              />
            </TouchableOpacity>
          </_View>
          <_View style={styles.subContainer}>
            <_Text style={[styles.headText, { marginLeft: 25 }]}>
              {'Feedback'}
            </_Text>
            <_View style={styles.textContainer}>
              <_Text style={[styles.subText, { marginLeft: 25 }]}>
                {`Your Comments, ${terminologies['Question']?.pluralLabel}, or Suggestions`}
              </_Text>
            </_View>
            <_View style={styles.searchContainer}>
              <TextInput
                multiline
                placeholder='Enter your feedback...'
                value={enterFeedback}
                onChangeText={(text) => setEnterFeedback(text)}
                style={styles.input}
              />
            </_View>
            <_View style={styles.txt}>
              <_Text style={styles.subText}>
                {'Please let us know how this content is helpful to you.'}
              </_Text>
            </_View>
            <_View style={styles.emojiContainer}>
              <TouchableOpacity
                onPress={() => setSelectedEmoji('Ok')}
                style={[
                  {
                    backgroundColor:
                      selectedEmoji == 'Ok'
                        ? whiteThemeColors.primary + 70
                        : whiteThemeColors.greyDark + 10,
                  },
                  styles.emoji,
                ]}
              >
                <_Text style={{ fontSize: selectedEmoji == 'Ok' ? 38 : 25 }}>
                  {'👌'}
                </_Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedEmoji('Smile')}
                style={[
                  {
                    backgroundColor:
                      selectedEmoji == 'Smile'
                        ? whiteThemeColors.primary + 70
                        : whiteThemeColors.greyDark + 10,
                  },
                  styles.emoji,
                ]}
              >
                <_Text
                  style={[
                    styles.emojiMargin,
                    { fontSize: selectedEmoji == 'Smile' ? 38 : 25 },
                  ]}
                >
                  {'😀'}
                </_Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedEmoji('Calm')}
                style={[
                  {
                    backgroundColor:
                      selectedEmoji == 'Calm'
                        ? whiteThemeColors.primary + 70
                        : whiteThemeColors.greyDark + 10,
                  },
                  styles.emoji,
                ]}
              >
                <_Text
                  style={[
                    styles.emojiMargin,
                    { fontSize: selectedEmoji == 'Calm' ? 38 : 25 },
                  ]}
                >
                  {'😌'}
                </_Text>
              </TouchableOpacity>
            </_View>
            <TouchableOpacity
              onPress={() => sendFeedback()}
              style={styles.button}
            >
              <_Text style={styles.text}>{'Send FeedBack'}</_Text>
            </TouchableOpacity>
          </_View>
        </_View>
      </_View>
    </Modal>
  );
};
export default React.memo(FeedbackModal);

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(54,54,54,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalView: {
    backgroundColor:whiteThemeColors.background,
    shadowColor: whiteThemeColors.black,
    height: isTablet ? '48%' : '60%',
    shadowOpacity: 0.25,
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  subContainer: {
    backgroundColor:
      WhiteLabelConfig.APP_VARIANT_NAME == 'stembuilderslms'||  WhiteLabelConfig.APP_VARIANT_NAME == 'codeheroacademylms'
        ? '#f2f2f2'
        : whiteThemeColors.background,
    borderRadius: 20,
    height: '100%',
  },
  headText: {
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
    height: 50,
    paddingHorizontal: 14,
    marginVertical: 5,
  },
  crossIcon: {
    backgroundColor: whiteThemeColors.primary + 40,
    alignSelf: 'flex-end',
    borderRadius: 8,
    zIndex: 10,
    width: 25,
    marginBottom: 10,
  },
  loadingTxt: {
    color: whiteThemeColors.primaryTextColor,
  },
  nameTxt: {
    color: whiteThemeColors.lightBlack,
    textTransform: 'capitalize',
    marginLeft: 15,
    fontSize: 16,
  },
  searchContainer: {
    backgroundColor: whiteThemeColors.white + 90,
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 15,
    width: '90%',
    padding: 8,
    height: 200,
  },
  input: {
    color: whiteThemeColors.lightBlack,
    paddingHorizontal: 5,
    width: '100%',
    height: '100%',
    fontFamily: CommonStyles.fonts.regular,
  },
  button: {
    backgroundColor: whiteThemeColors.primary,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 40,
    bottom: 15,
    width: 150,
    right: 15,
  },
  text: {
    color: whiteThemeColors.white,
    fontSize: 14,
    fontFamily: CommonStyles.fonts.semiBold,
  },
  emoji: {
    shadowColor: whiteThemeColors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowOffset: {
      height: 0.5,
      width: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    height: 50,
    width: 50,
    margin: 5,
  },
  emojiMargin: {
    marginTop: 1,
    marginLeft: 1,
  },
  subText: {
    color: whiteThemeColors.greyDark,

    fontFamily: CommonStyles.fonts.regular,
    fontSize: 13,
    marginTop: 3,
  },
  textContainer: {
    paddingBottom: 10,
  },
  txt: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  emojiContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 5,
  },
});
