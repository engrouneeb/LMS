import React from 'react';
import {
  ApprovalsSvg,
  Clock2Svg,
  ClockSvg,
  ScheduleSvg,
  SetupSvg,
  WageSvg,
} from '../../../../assets/Icons';
import { whiteThemeColors } from 'utilities';
import { englishTrackerScreen as TimeTrackerConstants } from '../../Strings/english';

export const GetSvg = {
  [TimeTrackerConstants.Schedule]: (
    <ScheduleSvg size={35} color={whiteThemeColors.white} />
  ),
  [TimeTrackerConstants.Timesheet]: (
    <Clock2Svg size={35} color={whiteThemeColors.white} />
  ),
  [TimeTrackerConstants.TimeOff]: (
    <ClockSvg size={35} color={whiteThemeColors.white} />
  ),
  [TimeTrackerConstants.Wages]: (
    <WageSvg size={35} color={whiteThemeColors.white} />
  ),
  [TimeTrackerConstants.Requests]: (
    <ApprovalsSvg size={35} color={whiteThemeColors.white} />
  ),

  [TimeTrackerConstants.Setup]: (
    <SetupSvg size={35} color={whiteThemeColors.white} />
  ),
};
