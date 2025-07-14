// utils/useSocialLogin.ts
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';

const baseURL = 'https://angular-api.calibermatrix.com/api/SocialIntegration';

export const getAuthUrl = ({
  provider,
  publicKey,
  companyGuid,
  companyUrl,
  userId,
}: {
  provider: string;
  publicKey:string;
  companyGuid: string;
  companyUrl: string;
  userId: string;
}): string => {
  const encodedState = encodeURIComponent(`companyGuid=${companyGuid}&userId=${userId}&url=${companyUrl}&fromMobile=true`);

  switch (provider) {
    case 'facebook':
      return `https://www.facebook.com/v22.0/dialog/oauth?client_id=${publicKey}&redirect_uri=${encodeURIComponent(`${baseURL}/facebook/callback`)}&scope=${encodeURIComponent('pages_read_engagement,pages_read_user_content,pages_show_list,pages_manage_engagement,pages_manage_metadata,pages_manage_posts,email,public_profile,ads_management')}&response_type=code&state=${encodedState}`;
    case 'instagram':
      return `https://api.instagram.com/oauth/authorize?client_id=${publicKey}&redirect_uri=${encodeURIComponent(`${baseURL}/instagram/callback`)}&scope=${encodeURIComponent('instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights')}&response_type=code&state=${encodedState}`;
    case 'tikTok':
      return `https://www.tiktok.com/v2/auth/authorize/?client_key=${publicKey}&redirect_uri=${encodeURIComponent(`${baseURL}/tiktok/callback`)}&scope=${encodeURIComponent('user.info.basic,user.info.profile,user.info.stats,video.list')}&response_type=code&state=${encodedState}`;
    default:
      return '';
  }
};

export const startInAppBrowserLogin = async ({
  provider,
  authUrl,
  onSuccess,
  onClose,
}: {
  provider: string;
  authUrl: string;
  onSuccess: (provider: string, code: string) => void;
  onClose: () => void;
}) => {
  try {
    if (await InAppBrowser.isAvailable()) {  
      const result = await InAppBrowser.openAuth(authUrl, `${baseURL}/${provider}/callback`, {
        // iOS
        ephemeralWebSession: true,
        // Android
        showTitle: true,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
      });

      if (result.type === 'success' && result.url) {
        const match = result.url.match(/[?&]code=([^&]+)/);
        if (match?.[1]) {
          onSuccess(provider, decodeURIComponent(match[1]));
        } else {
          onClose(); // fallback
        }
      } else {
        console.log({result});
        onClose();
      }
    } else {
      Linking.openURL(authUrl); // fallback
    }
  } catch (error) {
    console.error(`[${provider}] login error`, error);
    onClose();
  }
};
