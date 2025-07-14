import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ScreensNames from '../../../screenNames';
import {
  AddUpdateWage,
  CoverRequest,
  ExpenseRequest,
  InstructorList,
  Requests,
  Schedule,
  ScheduleUserListView,
  ScheduleWeekView,
  SetupScreen,
  TimeOff,
  TimeOffRequest,
  TimeSheet,
  TimeSheetDetial,
  TimeSheetRequest,
  TimeTracker,
  Wages,
  WagesAdmin,
  WagesInstructor,
} from '../../../screens/TimeTracker';
import { MyRequestDetails } from '../../../screens/TimeTracker/components/MyRequestDetails';
import DrawerScreenNames from '../../Drawer/DrawerScreenNames';
const Stack = createStackNavigator();

const TimeTrackerStack = (props) => {
  return (
    <Stack.Navigator
      initialRouteName={DrawerScreenNames.timeTracker.name}
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}
    >
      <Stack.Screen
        component={TimeTracker}
        name={DrawerScreenNames.timeTracker.name}
      />
      <Stack.Screen
        component={AddUpdateWage}
        name={ScreensNames.addUpdateWage.name}
      />
      <Stack.Screen component={Requests} name={ScreensNames.requests.name} />
      <Stack.Screen
        component={InstructorList}
        name={ScreensNames.instructorList.name}
      />
      <Stack.Screen component={Schedule} name={ScreensNames.schedule.name} />
      <Stack.Screen
        component={ScheduleUserListView}
        name={ScreensNames.ScheduleUserListView.name}
      />
      <Stack.Screen
        component={ScheduleWeekView}
        name={ScreensNames.scheduleWeekView.name}
      />

      <Stack.Screen
        component={SetupScreen}
        name={ScreensNames.setupScreen.name}
      />
      <Stack.Screen component={TimeOff} name={ScreensNames.timeOff.name} />
      <Stack.Screen component={TimeSheet} name={ScreensNames.timeSheet.name} />
      <Stack.Screen
        component={TimeSheetDetial}
        name={ScreensNames.timeSheetDetails.name}
      />

      <Stack.Screen component={Wages} name={ScreensNames.wages.name} />
      <Stack.Screen
        component={WagesAdmin}
        name={ScreensNames.wagesAdmin.name}
      />
      <Stack.Screen
        component={WagesInstructor}
        name={ScreensNames.wagesInstructor.name}
      />

      <Stack.Screen
        component={TimeOffRequest}
        name={ScreensNames.timeOffRequests.name}
      />
      <Stack.Screen
        component={TimeSheetRequest}
        name={ScreensNames.timeSheetRequests.name}
      />
      <Stack.Screen
        component={CoverRequest}
        name={ScreensNames.coverRequests.name}
      />
      <Stack.Screen
        component={ExpenseRequest}
        name={ScreensNames.expenseRequests.name}
      />
      <Stack.Screen
        component={MyRequestDetails}
        name={ScreensNames.myRequestsDetails.name}
      />
    </Stack.Navigator>
  );
};

export default TimeTrackerStack;
