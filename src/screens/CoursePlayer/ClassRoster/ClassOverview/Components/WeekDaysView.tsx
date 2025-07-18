import { _Text, _View } from "../../../../../components";
import CommonStyles from "../../../../CommonStyles";
import { whiteThemeColors } from "../../../../../Utilities/colors";
import { styles } from "../styles";

export const WeekDaysView = ({ weekDays, selectedDays }: any) => {
    return (
      <_View flexDirection="row">
        {weekDays.map((day: string, dayIndex: number) => {
          const isSelected = selectedDays?.includes(day);
          return (
            <_View
              key={`day-${dayIndex}`}
              style={[
                styles.days,
                {
                  backgroundColor: isSelected
                    ? `${whiteThemeColors.primary}90`
                    : whiteThemeColors.white,
                },
                !isSelected && {
                  borderColor: whiteThemeColors.primary,
                  borderWidth: 0.5,
                },
              ]}
            >
              <_Text
                style={{
                  fontSize: 11,
                  fontFamily: CommonStyles.fonts.medium,
                  color: isSelected
                    ? whiteThemeColors.white
                    : whiteThemeColors.black,
                }}
              >
                {day}
              </_Text>
            </_View>
          );
        })}
      </_View>
    );
  };