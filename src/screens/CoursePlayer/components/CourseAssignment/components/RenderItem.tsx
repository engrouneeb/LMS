import React from 'react';
import { styles } from '../styles';
import { _Text, _View } from '../../../../../components';
interface props {
  title: string;
  selected: boolean;
  reduceText: (title: string) => void;
}
export const Item: React.FC<props> = ({ title, selected, reduceText }) => {
  console.log(typeof title, typeof selected, typeof reduceText);
  return (
    <_View style={styles.itemContainer}>
      <_View style={styles.avatarNameContainer}>
        <_View style={styles.avatarContainer}>
          <_Text style={styles.avatarText}>
            {title.substring(0, 1).toUpperCase()}
          </_Text>
        </_View>
        <_Text style={styles.nameText}>{reduceText(title)}</_Text>
      </_View>
      <_View
        style={[
          styles.statusContainer,
          {
            backgroundColor: selected ? '#50c878' : '#bf2237',
          },
        ]}
      >
        <_Text style={styles.statusText} numberOfLines={1}>
          {selected ? 'Active' : 'Inactive'}
        </_Text>
      </_View>
    </_View>
  );
};
