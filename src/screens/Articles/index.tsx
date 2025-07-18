import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { whiteThemeColors } from '../../Utilities';
import ApiEndpoints from '../../../data/ApiEndpoints';
import { DataAccess } from '../../../data/DAL';
import {
  _Screen,
  _Text,
  _VectorIcons,
  _View,
  articlesInterface,
  endpoint,
} from '../../components';
import ScreensNames from '../../screenNames';
import Header from '../Headers';
import { _ActivityIndicator } from '../Loader';
import Search from '../Search';
import Card from './components/Card';
import { HeaderTabs } from './components/HeaderTabs';
import { useNavigation } from '@react-navigation/native';
import DrawerScreens from '../../navigation/Drawer/DrawerScreenNames';
interface props {
}
const Articles: React.FC<props> = () => {
  const navigation = useNavigation();
  const searchRef: any = useRef();
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState<articlesInterface>();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [isVisible, setisVisible] = useState(false);
  const { Get } = DataAccess();
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (activeTab) getArticlesByCategory();
  }, [activeTab]);

  const getCategories = async () => {
    const Endpoint = ApiEndpoints.GetCategories;
    Get(Endpoint)
      .then((res: any) => {
        if (res.length > 0) {
          setTabs(res);
          setActiveTab(res[0]);
        } else {
        }
      })
      .catch((er: any) => {});
  };

  const getArticlesByCategory = async () => {
    setIsLoading(true);
    const Endpoint: endpoint = ApiEndpoints.GetArticlesByCategory;
    Endpoint.params = `?categoryId=${activeTab?.id}`;
    Get(Endpoint)
      .then((res: any) => {
        setIsLoading(false);
        if (res) {
          setArticles(res);
          setFilteredArticles(res);
        } else {
          setArticles([]);
        }
      })
      .catch((er: any) => {});
  };

  const handleOnPress = (item: any) =>
    navigation.navigate(ScreensNames.articleDetails.name, {
      details: item,
    });

    const backPress = () => {
      navigation.navigate(DrawerScreens.dashboard.name);
      return true;
    };

  const NoData = () => {
    return (
      <_View style={styles.emptyList}>
        <_VectorIcons
          type='FontAwesome5'
          name={'store-alt'}
          size={80}
          color={whiteThemeColors.primary + 90}
        />
        <_Text style={styles.emptyListText}>No Item Found</_Text>
      </_View>
    );
  };

  const _ActivityIndicator = () => {
    return (
      <_View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color={whiteThemeColors.primary} />
      </_View>
    );
  };

  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleOnPress(item)}
      >
        <Card
          title={item.title}
          time={item?.lastUpdated}
          writerName={item?.articleWrittenByNames}
          description={item?.description || 'No Description'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <_Screen
      header={
        <Header
          isMenu={true}
          isBack={false}
          OpenMenu={() => {
            navigation.toggleDrawer();
          }}
          Screen={ScreensNames.articles.name}
          isSearchBtn={true}
          OpenSearch={() => {
            setisVisible(true);
          }}
        />
      }
      onAndroidBack={backPress}
      hideTopSafeArea
      backgroundColor={whiteThemeColors.background}
    >
      {isVisible && (
        <Search
          onInputChange={setArticles}
          onClose={() => {
            setisVisible(false);
          }}
          animSpeed={100}
          data={filteredArticles}
          searchKey='title'
          isVisible={isVisible}
          outPos={-110}
          inPos={-10}
          height={60}
        />
      )}
      <HeaderTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        showTabName={true}
      />
      {isLoading ? (
        <_ActivityIndicator size='large' color={whiteThemeColors.primary} />
      ) : (
        <_View flex={1} style={{ paddingHorizontal: 2 }}>
          {articles.length > 0 ? (
            <FlatList
              data={articles}
              renderItem={({ item }) => <_renderItem item={item} />}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <NoData />
          )}
        </_View>
      )}
    </_Screen>
  );
};

export default Articles;

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    alignSelf: 'center',
    marginTop: 30,
  },
  cardContainer: {
    width: '100%',
    paddingHorizontal: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
