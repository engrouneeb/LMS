import { _Text, _View } from "../../../../components";
import CommonStyles from "../../../CommonStyles";
import { WeekDaysView } from "../ClassOverview/Components";
export const TimingItem = ({ dayTimeSubLists, weekDays }: any) => {
  return (
    <>
      {dayTimeSubLists?.map((timeInst: any, index: number) => (
        <_View
          key={`timeInst-${index}`}
          alignItems="center"
          justifyContent="center"
        >
          <_Text style={{
            marginVertical: 5, fontFamily: CommonStyles.fonts.medium,
            fontSize: 14,
          }}>
            {timeInst?.timingLists}
          </_Text>
          <WeekDaysView weekDays={weekDays} selectedDays={timeInst?.dbDays} />
        </_View>
      ))}
    </>
  );
};