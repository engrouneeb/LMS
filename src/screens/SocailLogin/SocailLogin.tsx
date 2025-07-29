import { Pressable, StyleSheet, TouchableHighlight, } from 'react-native'
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FlatList } from 'react-native';
import { _Image, _Screen, _Text, _VectorIcons, _View, } from '../../components';
import { TiktokIcon } from "../../../assets/tiktokIcon";
import { styles } from "./styles";
import { getAuthUrl, startInAppBrowserLogin } from '../../customHooks';
import { useDispatch, useSelector } from 'react-redux';
import { Appstate } from '../../reducers/Appstate';
import Header from "../Headers"
import { CustomAlert, height, isParent, whiteThemeColors, width } from '../../Utilities';
import { useNavigation } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import {
    fetchSocialPublicKeys,
    fetchUserSocialChannels,
    fetchParentStudents,
    ParentStudent, disconnectSocial
} from '../../actions/WebAuthLogin';
import moment from 'moment';
import Loader from '../Loader/loader';
import WhiteLabelConfig from 'WhiteLabelConfig';
import { StudentIcon } from '../../../assets/Icons';

type SocialProvider = 'facebook' | 'instagram' | 'tiktok';

const baseChannels = [
    {
        id: '1',
        name: 'instagram',
        type: 'FontAwesome',
        icon: 'instagram',
        iconColor: '#E12F6C',
        connectedUser: null,
        connectedDate: null,
        lastSynced: null,
        status: 'Not Connected',
        profilePic: null,
    },
    {
        id: '2',
        name: 'facebook',
        type: 'FontAwesome',
        icon: 'facebook-square',
        iconColor: '#1977F2',
        connectedUser: null,
        connectedDate: null,
        lastSynced: null,
        status: 'Not Connected',
        profilePic: null,
    },
    {
        id: '3',
        name: 'tikTok',
        type: 'FontAwesome5Brands',
        icon: 'tiktok',
        iconColor: '#000000',
        connectedUser: null,
        connectedDate: null,
        lastSynced: null,
        status: 'Not Connected',
        profilePic: null,
    },
];

const getStatusColor = (status) => {
    return status === 'Connected' ? styles.statusConnected : styles.statusNotConnected;
};

export const SocailLogin = () => {
    const navigation = useNavigation();
    const dispatch: any = useDispatch();
    const { publicKeys, connectedSocials, parentStudents } = useSelector((state: Appstate) => state.WebAuthReducer);
    const { UserInfo } = useSelector((state: Appstate) => state.User);
    const [selectedStudent, setSelectedStudent] = useState<ParentStudent | null>(null);
    const [dropdownValue, setDropdownValue] = useState("Select Student");
    const [initialLoading, setInitialLoading] = useState(true);
    const [studentSelectionLoading, setStudentSelectionLoading] = useState(false);
    const [socialChannelsLoading, setSocialChannelsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<SocialProvider | null>(null);
    const dropdownRef = useRef(null);
    const isLoading = initialLoading || studentSelectionLoading || socialChannelsLoading;

    useEffect(() => {
        const init = async () => {
            setInitialLoading(true);
            await dispatch(fetchSocialPublicKeys());
            if (isParent(UserInfo.roleName)) {
                await dispatch(fetchParentStudents());
            } else {
                await dispatch(fetchUserSocialChannels(UserInfo.userID));
            }
            setInitialLoading(false);
        };
        init();
    }, [dispatch, UserInfo]);

    useEffect(() => {
        const loadStudents = async () => {
            if (parentStudents.length > 0) {
                setStudentSelectionLoading(true);
                setDropdownValue(parentStudents[0].name);
                setSelectedStudent(parentStudents[0]);
                setStudentSelectionLoading(false);
            }
        };
        loadStudents();
    }, [parentStudents]);

    useEffect(() => {
        const loadSocials = async () => {
            if (selectedStudent) {
                setSocialChannelsLoading(true);
                await dispatch(fetchUserSocialChannels(selectedStudent.id));
                setSocialChannelsLoading(false);
            }
        };
        loadSocials();
    }, [selectedStudent]);

    const socialChannels = useMemo(() => {
        return baseChannels.map(channel => {
            const matched = connectedSocials.find(
                item => item.channelName.toLowerCase() === channel.name.toLowerCase()
            );
            return matched
                ? {
                    ...channel,
                    connectedUser: matched.connectedUser,
                    connectedDate: matched.connectedDate ? moment(matched.connectedDate).format('MMM D, YYYY') : null,
                    lastSynced: matched.lastSyncedDate ? moment(matched.lastSyncedDate).fromNow() : null,
                    status: 'Connected',
                    profilePic: matched.profilePic
                }
                : channel;
        });
    }, [connectedSocials]);
    const { businessCompanyGuid, companyUrl, portalV3URL } =
        useSelector((state: Appstate) => state?.User?.UserInfo);
    const handleConnect = (provider: SocialProvider) => {
        const publicKey = publicKeys[provider];
        const authUrl = getAuthUrl({
            provider,
            publicKey,
            companyGuid: businessCompanyGuid,
            // companyUrl: companyUrl || 'https://portalv3.calibermatrix.com/',
            companyUrl: `${portalV3URL}/`,
            userId: selectedStudent ? selectedStudent.id : UserInfo.userID,
        });
        startInAppBrowserLogin({
            provider,
            authUrl,
            onSuccess: async (provider, code) => {
                setInitialLoading(true);
                await dispatch(fetchUserSocialChannels(selectedStudent ? selectedStudent.id : UserInfo.userID));
                setInitialLoading(false);
            },
            onClose: async () => {
                await dispatch(fetchUserSocialChannels(selectedStudent ? selectedStudent.id : UserInfo.userID));
                console.log(`${provider} login cancelled`);
            },
        });
    };

    const handleDisconnect = async (item: SocialProvider | null) => {
        if (!item) return; // Guard clause
        setInitialLoading(true);
        await dispatch(disconnectSocial(item, selectedStudent ? selectedStudent.id : UserInfo.userID));
        await dispatch(fetchUserSocialChannels(selectedStudent ? selectedStudent.id : UserInfo.userID));
        setInitialLoading(false);
    };
    const SocialChannelItem = ({ item }) => {
        return (
            <_View style={styles.card}>
                <_View style={styles.iconWrapper}>
                    {item.icon == "tiktok" ? <TiktokIcon height={24} width={24} /> : <_VectorIcons name={item.icon} size={24} color={item.iconColor} type={item.type} />}
                    {item.profilePic && (
                        <_View style={{
                            width: 24,
                            height: 24,
                            borderRadius: 4,
                            padding: 1,
                            borderWidth: 1,
                            borderColor: whiteThemeColors.primary,
                            marginTop: 10,
                            overflow: "hidden"
                        }}>
                            <_Image
                                uri={item.profilePic}
                                style={{
                                    alignSelf: 'center',
                                    width: 22,
                                    height: 22,

                                }}
                            />
                        </_View>
                    )}
                </_View>
                <_View style={styles.infoWrapper}>
                    <_Text style={styles.channelName}>{item.name}</_Text>
                    {item.connectedUser &&
                        <_Text style={styles.userText}>
                            {item.connectedUser}
                        </_Text>}
                    {item.connectedDate && (
                        <_Text style={styles.metaText}>Connected: {item.connectedDate}</_Text>
                    )}
                    {item.lastSynced && (
                        <_Text style={styles.metaText}>Last Synced: {item.lastSynced}</_Text>
                    )}
                </_View>
                <_View style={styles.statusWrapper}>
                    <_Text style={[styles.statusText, getStatusColor(item.status)]}>
                        {item.status}
                    </_Text>
                    {item.status === 'Connected' ? (
                        <Pressable hitSlop={20} onPress={() => {
                            setShowAlert(true);
                            setSelectedItem(item.name);
                            // handleDisconnect(item.name);
                        }}>
                            <_VectorIcons name="link-variant-off" size={24} color={whiteThemeColors.primary} style={{ marginTop: 4 }} type='MaterialCommunityIcons' /></Pressable>
                    ) :
                        <Pressable style={{ borderColor: "#1977F2", borderWidth: .5, borderRadius: 5, marginTop: 15, marginLeft: 45, height: 25, width: 110, justifyContent: "center", alignItems: "center", alignSelf: "center" }} onPress={() => { handleConnect(item.name) }}><_Text style={styles.linkText}>Connect Now</_Text></Pressable>
                    }
                </_View>
            </_View>
        );
    };
    const backPress = () => {
        navigation.goBack();
        return true;
    }
    const DropDownRow = useCallback((rowData, rowID, highlighted) => {
        return (
            <TouchableHighlight
                underlayColor="#f0f0f0"
                onPress={() => {
                    const selected = parentStudents[Number(rowID)];
                    if (selected) {
                        setDropdownValue(selected.name);
                        setSelectedStudent(selected);
                        dropdownRef.current?.hide();
                    }
                }}
                style={{
                    backgroundColor: highlighted ? '#f0f0f0' : '#fff',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                }}
            >
                <_Text style={{ textAlign: 'center', color: '#000' }}>{rowData}</_Text>
            </TouchableHighlight>
        );
    }, [parentStudents]);
    return (
        <_Screen
            header={
                <Header
                    isBack
                    goBack={backPress}
                    Screen={'Social Accounts'}
                />
            }
            flex={1}
            hideTopSafeArea
            onAndroidBack={backPress}
            backgroundColor={whiteThemeColors.background}
        >
            <_View style={{ flex: 1, padding: 10 }}>
                {isParent(UserInfo.roleName) && <_View flexDirection='row' width={"100%"} style={{}}>
                    <_Text style={{ fontSize: 16, fontWeight: 'bold', width: "50%" }}>Selected Student</_Text>
                    <_View style={styles.dropdownContainer}>
                        <ModalDropdown
                            ref={dropdownRef}
                            defaultValue={dropdownValue}
                            saveScrollPosition={false}
                            showsVerticalScrollIndicator={false}
                            options={parentStudents.map(std => std.name)}
                            renderRow={DropDownRow}
                            style={{
                                width: '40%',
                                height: 35,
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: whiteThemeColors.primary,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            dropdownTextHighlightStyle={{
                                backgroundColor: 'red',
                            }}
                            dropdownTextStyle={styles.dropdownTextStyle}
                            dropdownStyle={styles.dropdownStyle}
                            textStyle={styles.textStyle}
                        />
                    </_View>
                </_View>}
                <_Text style={styles.title}>Channels</_Text>
                <_View style={styles.container}>
                    {isLoading ? (
                        <_View style={{ alignItems: 'center', marginTop: 50 }}>
                            {/* Replace this with your actual loader component */}
                            <Loader size="large" color={whiteThemeColors.primary} />
                        </_View>
                    ) : parentStudents && parentStudents.length === 0 ? (
                        <_View style={{ alignItems: 'center', marginTop: 50 }}>
                            <StudentIcon size={100} color={whiteThemeColors.primary + '80'} />
                            <_Text style={{ marginTop: 16, fontSize: 18, fontWeight: 'bold', color: whiteThemeColors.red }}>
                                No Student Available
                            </_Text>
                            <_Text style={{ marginTop: 16, fontSize: 16 }}>
                                There are currently no active students available for configuring social accounts.
                                Parents can only configure or connect social accounts for their children.
                            </_Text>
                        </_View>
                    ) : (
                        <FlatList
                            data={socialChannels}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <SocialChannelItem item={item} />}
                        />
                    )}
                </_View>

            </_View>
            {showAlert && <CustomAlert
                visible={showAlert}
                title={'Are you sure?'}
                msg={`Disconnecting your ${selectedItem} account will stop monitoring your posts and prevent earning loyalty points.`}
                firstBtn={'Disconnect'}
                secondBtn={'Cancel'}
                firstBtnFunc={() => {
                    handleDisconnect(selectedItem); // Pass selected item here
                    setShowAlert(false);            // Hide alert
                }}
                secondBtnFunc={() => {
                    setShowAlert(false);
                    setSelectedItem(null);           // Clear selected item
                }}
            />}
        </_Screen>
    )
}