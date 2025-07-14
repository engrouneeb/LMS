import CommonStyles from 'screens/CommonStyles';
import { whiteThemeColors } from 'utilities';
export const styles = {
  cardContainer: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: whiteThemeColors.white + 90,
    marginTop: 10,
    borderRadius: 15,
    padding: 15,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skillName: {
    fontSize: 16,
    color: whiteThemeColors.primary,
    fontFamily: CommonStyles.fonts.semiBold,
    width: '75%',
  },
  ExperienceTitle: {
    color: whiteThemeColors.greyDark,
    fontFamily: CommonStyles.fonts.medium,
    fontSize: 12,
    marginTop: 5,
  },
  ExperienceValue: {
    color: whiteThemeColors.black,
    fontFamily: CommonStyles.fonts.regular,
  },
  discriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillRatingContainer: {
    justifyContent: 'center',
    marginTop: 5,
  },
  skillRatingTitle: {
    color: whiteThemeColors.greyDark,
    fontSize: 11,
    fontFamily: CommonStyles.fonts.medium,
  },
  skillRating: {
    fontSize: 10,
    fontFamily: CommonStyles.fonts.medium,
    textAlign: 'center',
    letterSpacing: 2,
  },
  Discription: {
    fontSize: 12,
  },
  DiscriptionText: {
    fontSize: 11,
    color: whiteThemeColors.greyDark,

    padding: 10,
  },
  exp_Rating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillratingCon: {
    backgroundColor: whiteThemeColors.primary + 30,
    height: 20,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  discriptionValueContainer: {
    maxHeight: 140,
    backgroundColor: whiteThemeColors.primary + 10,
    borderRadius: 8,
  },
  iconCont: {
    backgroundColor: whiteThemeColors.primary + 30,
    width: 70,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
};
