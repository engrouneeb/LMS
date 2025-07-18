import { AprovalCoverageTabsInterface } from '../../../../../../../interfaces';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { _Text, _View } from '../../../../../../../components';
import { styles } from './style';

const AprovalCoverageTabs: FC<AprovalCoverageTabsInterface> = ({
  setIsCoverageTabActive,
  isCoverageTabActive,
  activeTab,
  TimeTrackerTabs,
  coverCount,
  coverageCount,
}) => {
  return activeTab?.name == TimeTrackerTabs.Approvals ? (
    <_View style={styles.miniTab}>
      <TouchableOpacity
        style={
          !isCoverageTabActive ? styles.activeMiniTab : styles.nonActiveMiniTab
        }
        onPress={() => setIsCoverageTabActive(false)}
      >
        <_Text
          style={
            !isCoverageTabActive
              ? styles.activeMiniTabText
              : styles.nonActiveMiniTabText
          }
        >
          Approvals
        </_Text>
        {coverCount > 0 ? (
          <_View style={styles.badgeContainer}>
            <_Text style={styles.badgeText}>{coverCount}</_Text>
          </_View>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          isCoverageTabActive ? styles.activeMiniTab : styles.nonActiveMiniTab
        }
        onPress={() => setIsCoverageTabActive(true)}
      >
        <_Text
          style={
            isCoverageTabActive
              ? styles.activeMiniTabText
              : styles.nonActiveMiniTabText
          }
        >
          Coverage
        </_Text>
        {coverageCount > 0 ? (
          <_View style={styles.badgeContainer}>
            <_Text style={styles.badgeText}>{coverageCount}</_Text>
          </_View>
        ) : null}
      </TouchableOpacity>
    </_View>
  ) : null;
};
export { AprovalCoverageTabs };
