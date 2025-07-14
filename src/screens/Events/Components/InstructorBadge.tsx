import React from 'react';
import { _View, _Text } from "components";
import {styles} from "./"

interface Props {
  name: string;
}

export const InstructorBadge: React.FC<Props> = ({ name }) => (
  <_View style={styles.inst}>
    <_Text style={styles.staffName}>{name}</_Text>
  </_View>
);

