export const _selectCategory = (
  courseId: number,
  index: number,
  props: any,
) => {
  let menuName = '';
  if (index === 0) {
    menuName = 'assignStudents';
  } else if (index === 1) {
    menuName = 'messageToClass';
  } else if (index === 2) {
    menuName = 'classOverview';
  } else {
    menuName = 'assignInstructors';
  }
  props.onSelectCourseMenu(courseId, menuName);
};
