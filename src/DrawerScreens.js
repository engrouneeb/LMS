// import { Homework } from 'screens/HomeWorks';
import { NewHomeWorkStack } from './navigation/Stacks/NewHomeWorkStack';
import DrawerNames from './navigation/Drawer/DrawerScreenNames';
import HomeWorkAssignment from './screens/HomeworkAssignment';
import StudentAssessments from './screens/StudentAssessments';
import Profile from './screens/UserProfile/index';
export default DrawerScreens = {
  profile: {
    name: DrawerNames.profile.name,
    component: Profile,
  },
  HomeWorkAssignment: {
    name: DrawerNames.HomeworkAssignment.name,
    // component: HomeWorkAssignment,
    component: NewHomeWorkStack,
  },
  StudentAssessments: {
    name: DrawerNames.StudentAssessments.name,
    component: StudentAssessments,
  },
};

export const DrawerArray = Object.keys(DrawerScreens).map((key) => [
  DrawerScreens[key],
]);
