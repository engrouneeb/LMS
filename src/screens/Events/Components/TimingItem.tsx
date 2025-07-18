import React from 'react';
import { _View, _Text } from '../../../components';
import { styles } from "./"

interface Props {
  days: string[];
  timing: string;
  backgroundColor: string;
}

export const TimingItem: React.FC<Props> = ({ days, timing, backgroundColor }) => (
  <_View flexDirection="row" style={{ marginBottom: 5 }}>
    {days.map((day) => {
      return <_View style={{ ...styles.days, backgroundColor }}>
        <_Text style={styles.classTiming}>{day}</_Text>
      </_View>
    })}

    <_Text style={styles.classTimingValue}>{timing}</_Text>
  </_View>
);
