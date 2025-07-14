import { _Text, _View } from "components";
import { styles } from "../styles";
import { whiteThemeColors } from "../../../../../Utilities/colors";

export const InstructorsView = ({ instructors }: any) => {
    const instructorArray = instructors.trim(" ")?.split(',') || [];
    const instructorList=instructorArray.filter(Boolean); // remove empty element
    const maxDisplay = 10;
    if (instructorList.length === 0) {
      return (
        <_Text
          style={{
            ...styles.valueText,
            fontSize: 10,
            marginLeft: 5,
          }}
        >
          No instructor assigned
        </_Text>
      );
    }
  
    return (
      <>
        {instructorList.slice(0, maxDisplay).map((inst: string, index: number) => (
          <_View key={`inst-${index}`} style={styles.inst}>
            <_Text
              style={{
                ...styles.valueText,
                fontSize: 10,
                marginLeft: 5,
                color: whiteThemeColors.white,
              }}
            >
              {inst}
            </_Text>
          </_View>
        ))}
        {instructorList.length > maxDisplay && (
          <_View style={styles.inst}>
            <_Text style={[styles.valueText, styles.instructorName]}>
              {`  ...+${instructorList.length - maxDisplay} more`}
            </_Text>
          </_View>
        )}
      </>
    );
  };