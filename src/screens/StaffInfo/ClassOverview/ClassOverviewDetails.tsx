import { _Text, _VectorIcons, _View, endpoint } from '../../../components';
import React, { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { _ActivityIndicator } from '../../Loader/_ActivityIndicator';
import {
  getTerminologyLabel,
  removeStyling,
  TerminologyMap,
  whiteThemeColors,
} from '../../../Utilities';
import ApiEndpoints from '../../../../data/ApiEndpoints';
import { DataAccess } from '../../../../data/DAL';
import {
  ClassOverviewProps,
  classDetails,
  instialClassDetails,
} from '../../../interfaces';
import CommonStyles from '../../CommonStyles';
import { CheckboxItem, ClassTimings } from './components';
import { styles } from './styles';

export const ClassOverviewDetail: React.FC<ClassOverviewProps> = ({
  showModal,
  setShowModal,
  item,
}) => {
  enum classSizeType {
    'Not Selected',
    'One-on-One',
    'Group',
  }
  enum classBundling {
    'Not Selected',
    'Anytime',
    'Regular',
  }
  const { Get } = DataAccess();
  const [selectedItem, setSelectedItem] = useState<classDetails | {}>(
    instialClassDetails,
  );
  const [Loading, setLoading] = useState<Boolean>(false);
  const [showAll, setShowAll] = useState<Boolean>(false);
  const [catList, setCatList] = useState<Boolean>(false);
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

  useEffect(() => {
    setLoading(true);
    var EndPoint: endpoint = ApiEndpoints.GetInstructorClassDetails;
    EndPoint.params = `?classId=${item.classId}&backlogID=${item.cabId}`;
    Get(EndPoint)
      .then((res: any) => {
        if (res) {
          setSelectedItem(res);
          if (res.categoryList.length > 0)
            setCatList(res.categoryList.slice(0, 9));
          else setCatList(res.categoryList);
        }
      })
      .catch((e: any) => console.log('Error: ', e))
      .finally(() => {
        setLoading(false);
      });
  }, [showModal]);

  useEffect(() => {
    if (showAll) setCatList(selectedItem.categoryList);
    else setCatList(selectedItem.categoryList.slice(0, 9));
  }, [showAll]);
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType='fade'
      transparent={true}
      visible={showModal}
    >
      <_View flex={1}>
      <ScrollView bounces={false}>
        <_View style={{ ...styles.modalView }}>
          <_View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.crossIcon}
            >
              <_VectorIcons
                type='Entypo'
                name='cross'
                size={15}
                color={whiteThemeColors.black}
                style={{ padding: 7 }}
              />
            </TouchableOpacity>
          </_View>

          <_View style={{ marginTop: 30 }}>
            <_View style={[styles.inner, { backgroundColor: 'transparent' }]}>
              <_Text
                style={{
                  ...styles.key,
                  marginTop: 0,
                }}
              >
                {`${terminologies['Course']?.label} Name`}
              </_Text>
              <_Text
                style={{
                  fontFamily: CommonStyles.fonts.semiBold,
                  fontSize: 20,
                }}
              >
                {item.courseModule}
              </_Text>
              <_Text
                style={styles.key}
              >{`${terminologies['Class']?.label} Name`}</_Text>
              <_Text
                style={[
                  styles.value,
                  { fontFamily: CommonStyles.fonts.semiBold, fontSize: 20 },
                ]}
              >
                {item?.className}
              </_Text>
              <_View
                style={{
                  backgroundColor: whiteThemeColors.primary + 20,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                }}
              >
                <_View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <_View>
                    <_Text
                      style={styles.key2}
                    >{`${terminologies['Course']?.label} Cycle`}</_Text>
                    <_Text style={styles.value2}>{item.classCycle}</_Text>
                  </_View>
                  <_View style={{ justifyContent: 'flex-start', width: '50%' }}>
                    <_Text style={styles.key2}>Partner</_Text>
                    <_Text style={styles.value2}>{item.partner}</_Text>
                  </_View>
                </_View>
                <_Text style={styles.key2}>Location</_Text>
                <_Text style={styles.value2}>{item.location}</_Text>
                <_View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <_View>
                    <_Text
                      style={styles.key2}
                    >{`Slots for the ${terminologies['Class']?.label}`}</_Text>
                    <_Text style={styles.value2}>
                      {selectedItem.noOfSlots}
                    </_Text>
                  </_View>
                  <_View style={{ justifyContent: 'flex-start', width: '50%' }}>
                    <_Text style={styles.key2}>Section</_Text>
                    <_Text style={styles.value2}>{selectedItem.sections}</_Text>
                  </_View>
                </_View>
                <_View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <_View>
                    <_Text
                      style={styles.key2}
                    >{`${terminologies['Class']?.label} Size Type`}</_Text>
                    <_Text style={styles.value2}>
                      {classSizeType[selectedItem.classSizeType]}
                    </_Text>
                  </_View>
                  <_View style={{ justifyContent: 'flex-start', width: '50%' }}>
                    <_Text
                      style={styles.key2}
                    >{`${terminologies['Class']?.label} Bundling`}</_Text>
                    <_Text style={styles.value2}>
                      {classBundling[selectedItem.classBundling]}
                    </_Text>
                  </_View>
                </_View>
                <_View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <_View>
                    <_Text
                      style={styles.key2}
                    >{`${terminologies['Class']?.label} Type`}</_Text>
                    <_Text style={styles.value2}>
                      {selectedItem.classType ? 'Online' : 'OnSite'}
                    </_Text>
                  </_View>
                  <_View style={{ justifyContent: 'flex-start', width: '50%' }}>
                    <_Text style={styles.key2}>Shift</_Text>
                    <_Text style={styles.value2}>{selectedItem.shifts}</_Text>
                  </_View>
                </_View>
                <_View style={styles.fromCont}>
                  <_View style={styles.fromInn}>
                    <_Text style={styles.key2}>Age </_Text>
                    <_Text style={[styles.value2]}>
                      {Boolean(selectedItem.ageFrom)
                        ? `${selectedItem.ageFrom} - ${selectedItem.ageTo}`
                        : ''}
                    </_Text>
                  </_View>
                  <_View style={styles.fromInn}>
                    <_Text style={styles.key2}>Timing </_Text>
                    <_Text style={[styles.value2]}>
                      {item.timings.length > 0 && item.timings[0].timing}
                    </_Text>
                  </_View>
                </_View>
                <_View style={styles.fromCont}>
                  <_View style={styles.fromInn}>
                    <_Text style={styles.key2}>Date From </_Text>
                    <_Text style={[styles.value2]}>{item.dateFrom}</_Text>
                  </_View>
                  <_View style={styles.fromInn}>
                    <_Text style={styles.key2}>Date To</_Text>
                    <_Text style={[styles.value2]}>{item.dateTo}</_Text>
                  </_View>
                </_View>
                <_Text
                  style={styles.key2}
                >{`${terminologies['Category(Course)']?.label} List`}</_Text>
                <_View style={styles.staffCon}>
                  {selectedItem.categoryList.length == 0 ? (
                    <_Text style={[styles.value2]}>No category selected</_Text>
                  ) : selectedItem.categoryList.length < 10 ? (
                    selectedItem.categoryList.map((category, index) => (
                      <_View style={styles.inst}>
                        <_Text
                          style={{
                            ...styles.valueText,
                            fontSize: 10,
                            marginLeft: 5,
                            color: whiteThemeColors.white,
                          }}
                        >{`${category}`}</_Text>
                      </_View>
                    ))
                  ) : (
                    catList.map((category, index) =>
                      index == catList.length - 1 ? (
                        <Pressable
                          onPress={() => {
                            setShowAll(!showAll);
                          }}
                          style={styles.inst}
                        >
                          <_Text
                            style={{
                              ...styles.valueText,
                              fontSize: 10,
                              marginLeft: 5,
                              color: whiteThemeColors.white,
                            }}
                          >
                            {showAll ? 'see less' : 'see more'}
                          </_Text>
                        </Pressable>
                      ) : (
                        <_View style={styles.inst}>
                          <_Text
                            style={{
                              ...styles.valueText,
                              fontSize: 10,
                              marginLeft: 5,
                              color: whiteThemeColors.white,
                            }}
                          >
                            {`${category}`}
                          </_Text>
                        </_View>
                      ),
                    )
                  )}
                </_View>
                <_View style={{ marginTop: 20 }}>
                  <CheckboxItem
                    text={'Display in Website'}
                    isChecked={selectedItem?.displayinWebsite}
                  />
                  <CheckboxItem
                    text={'Most Popular'}
                    isChecked={selectedItem?.isMostPopular}
                  />
                  <CheckboxItem
                    text={'Almost full'}
                    isChecked={selectedItem?.isAlmostFull}
                  />
                  <CheckboxItem
                    text={'Can Add to Waitlist'}
                    isChecked={selectedItem?.canAddToWaitlist}
                  />
                </_View>
                <_Text style={styles.key2}>Aditional Information </_Text>
                <_View style={styles.notes}>
                  <_Text
                    style={[styles.key2, { marginTop: 0, color: 'black' }]}
                  >
                    {Boolean(item.additionalNotes) &&
                      removeStyling(item.additionalNotes)}
                  </_Text>
                </_View>
              </_View>
              <_Text
                style={[
                  styles.value,
                  {
                    fontFamily: CommonStyles.fonts.semiBold,
                    fontSize: 20,
                    marginTop: 10,
                  },
                ]}
              >
                {`${terminologies['Class']?.label} Timings`}
              </_Text>
              {Loading ? (
                <_View flex={1} justifyContent='center'>
                  <_ActivityIndicator />
                </_View>
              ) : (
                <_View>
                  <ClassTimings timingArray={selectedItem.timingsArray} />
                </_View>
              )}
            </_View>
          </_View>
        </_View>
      </ScrollView>
      </_View>
    </Modal>
  );
};
