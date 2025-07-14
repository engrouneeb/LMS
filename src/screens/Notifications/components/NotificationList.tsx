import React from 'react';
import { FlatList } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { whiteThemeColors } from 'utilities';
import { _View } from '../../../components';
import { _ActivityIndicator } from '../../Loader';
import {
  filterdNotificationType,
  ListEmpty,
  NotificationListCard,
  RenderLeftActions,
} from './';

interface NotificationListPropsInterface {
  footerLoader: boolean;
  isSearchOpened: boolean;
  filterdNotification: filterdNotificationType[];
  mainLoader: boolean;
  refreshingLoader: boolean;
  NoNotificationisFound: string;
  pullToRefreshFetch: () => void;
  initialLoad_And_LoadMore: (onEndReached?: boolean) => void;
  handleOnSwipe: (
    data: filterdNotificationType[],
    item: filterdNotificationType,
  ) => void;
  collectRowRefs: any;
}
const NotificationList: React.FC<NotificationListPropsInterface> = ({
  footerLoader,
  isSearchOpened,
  NoNotificationisFound,
  mainLoader,
  filterdNotification,
  refreshingLoader,
  pullToRefreshFetch,
  initialLoad_And_LoadMore,
  handleOnSwipe,
  collectRowRefs,
}) => {
  return mainLoader ? (
    <_ActivityIndicator size='large' />
  ) : (
    <FlatList
      scrollEnabled={!footerLoader}
      style={{ paddingTop: 0, paddingHorizontal: 8 }}
      data={filterdNotification}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={8}
      refreshing={refreshingLoader}
      onRefresh={() => (isSearchOpened ? null : pullToRefreshFetch())}
      onEndReached={() =>
        refreshingLoader && !isSearchOpened
          ? initialLoad_And_LoadMore(true)
          : null
      }
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => <_View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <Swipeable
          useNativeAnimations={true}
          renderLeftActions={RenderLeftActions}
          leftThreshold={100}
          friction={2}
          overshootLeft={true}
          onSwipeableLeftOpen={() => {
            handleOnSwipe(filterdNotification, item);
          }}
          ref={collectRowRefs}
        >
          <NotificationListCard item={item} />
        </Swipeable>
      )}
      ListFooterComponent={
        <_View
          style={{
            width: '100%',
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {footerLoader && (
            <_ActivityIndicator
              showText={false}
              color={whiteThemeColors.greyDark}
            />
          )}
        </_View>
      }
      keyExtractor={(item) => item?.id.toString()}
      ListEmptyComponent={() => (
        <ListEmpty NoNotificationisFound={NoNotificationisFound} />
      )}
    />
  );
};

export { NotificationList };
