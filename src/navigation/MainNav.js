import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { createContext, useState } from 'react';
import { Orientation } from 'utilities';
import { commanHeaderStyle } from './CommonHeaderOptions';
import AuthenticationStack from './Stacks/AuthStack/AuthStack';
const Stack = createStackNavigator();
const orientationContext = createContext();
function createScreen(name, component, options) {
  return <Stack.Screen name={name} component={component} options={options} />;
}

function Navigator() {
  const [orientation, setOrientation] = useState('PORTRAIT');
  async function orientationMode(o) {
    setOrientation(o);
  }
  return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={commanHeaderStyle}>
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={'auth'}
              component={AuthenticationStack}
            />
            {/* <Stack.Screen
              options={{ gestureEnabled: true, animationEnabled: false }}
              name={ScreensNames.homeWork.name}
              component={Homework}
            />
            <Stack.Screen
              options={{ gestureEnabled: true, animationEnabled: false }}
              name={ScreensNames.StudentListForHomework.name}
              component={StudentList}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={DrawerNames.pinCode.name}
              component={KioskStack}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={ScreensNames.chatInterface.name}
              component={ChatInterface}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={ScreensNames.submitChallenge.name}
              component={SubmitChallenge}
            />
            <Stack.Screen
              options={{
                gestureEnabled: false,
                animationEnabled:
                  Platform.OS == 'android' &&
                  parseInt(deviceInfoModule.getSystemVersion()) > 9
                    ? false
                    : true,
              }}
              component={OnlineAssessment}
              name={ScreensNames.onlineAssessment.name}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              component={NotificationsTab}
              name={DrawerNames.notificationsTab.name}
            />

            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={ScreensNames.StudentProgressList.name}
              component={ProgressStudentList}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={ScreensNames.StudentAssessmentList.name}
              component={StudentAssessmentListForAdmin}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={ScreensNames.StudentProgress.name}
              component={StudentProgressReport}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={ScreensNames.SingleStudentProgress.name}
              component={SingleStudent}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={ScreensNames.AnnouncementDetails.name}
              component={AnnouncementDetails}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={ScreensNames.Announcement.name}
              component={Announcement}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={ScreensNames.DayDetails.name}
              component={DayDetails}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={ScreensNames.EventDetails.name}
              component={EventDetails}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={"EventRoster"}
              component={EventRoster}
            />
            <Stack.Screen
              component={EnrollmentScreen}
              name={ScreensNames.enrollmentScreen.name}
            />
            <Stack.Screen
              component={Curriculum}
              name={DrawerNames.Curriculum.name}
            />
            <Stack.Screen
              component={SecureFranchise}
              name={ScreensNames.secureFranchise.name}
            />
            <Stack.Screen
              component={SelectTypes}
              name={ScreensNames.selectTypes.name}
            />
            <Stack.Screen
              component={Enrollments}
              name={ScreensNames.Enrollments.name}
            />
            <Stack.Screen
              component={Articles}
              name={ScreensNames.articles.name}
            />
            <Stack.Screen
              component={ArticleDetails}
              name={ScreensNames.articleDetails.name}
            />
            <Stack.Screen
              component={GroupChatInterface}
              name={ScreensNames.groupChatInterface.name}
            />
            <Stack.Screen
              component={StudentListForAssessment}
              name={ScreensNames.StudentListForAssessment.name}
            />

            {screenArray.map((val1) => {
              return val1.map((val) => {
                return createScreen(
                  val.name,
                  val.component,
                  val.navigationOptions,
                );
              });
            })}
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name={DrawerNames.dashboard.name}
              component={DrawerNavigation}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
  );
}
export const useLogin = () => React.useContext(orientationContext);
export default React.memo(Navigator);
