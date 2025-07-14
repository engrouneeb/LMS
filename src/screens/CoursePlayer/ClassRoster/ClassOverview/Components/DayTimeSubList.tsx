import { _Text, _View } from "components";
import { styles } from "../styles";
import { WeekDaysView } from "./index";
export const DayTimeSubList = ({ dayTime, weekDays }: any) => {
    return (
          <_View
            key={`timeInst-}`}
            alignItems="center"
            justifyContent="center"
          >
            <_Text style={[styles.courseName, { marginVertical: 5 }]}>
              {dayTime?.timingLists}
            </_Text>
            <WeekDaysView weekDays={weekDays} selectedDays={dayTime?.formattedDays} />
          </_View>
    );
  };