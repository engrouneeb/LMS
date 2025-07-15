import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { whiteThemeColors } from '../../../Utilities';
import Endpoints from '../../../../data/ApiEndpoints';
import { Domain } from '../../../../src/reducers/BaseUrl';
import { saveToken, saveUserToken } from '../../../actions/AsyncStorage';
import { _Button, _Text, _View } from '../../../components';
import DrawerNames from '../../../navigation/Drawer/DrawerScreenNames';
import Screen from '../../../screenNames';
import CstHeader from '../../Headers';
interface props {
  navigation: any;
  route: any;
}
export const Eula: React.FC<props> = ({ navigation, route }) => {
  const dispatch: any = useDispatch();
  const acceptEula = async () => {
    var URL = Domain + Endpoints.AcceptEulaByUser.url;
    let Token = `Bearer ${route.params.response.token}`;
    if (Token != null) {
      let response = await fetch(URL, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: Token,
        },
        method: 'POST',
      }).catch((err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      });
      let responseJson = await response.json();
      if (responseJson) {
        dispatch(saveUserToken(route.params.response));
        dispatch(saveToken(route.params.response));
        getUserData();
      }
    }
  };

  const getUserData = async () => {
    await AsyncStorage.setItem('userState', 'Dashboard');
    return navigation.navigate(DrawerNames.dashboard.name);
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <CstHeader Screen={'END USER LICENSE AGREEMENT (EULA)'} />
      <_View style={styles.content}>
        <_Text style={styles.eulaStartText}>
          THIS SOFTWARE END USER LICENSE AGREEMENT (“EULA”) IS A LEGAL AGREEMENT
          BETWEEN YOU AND US. READ THIS END-USER LICENSE AGREEMENT (HEREINAFTER
          REFERRED TO AS “THE AGREEMENT”) CAREFULLY BEFORE INSTALLING,
          ACCESSING, COPYING OR USING THE LICENSED SOFTWARE ACCOMPANYING THIS
          AGREEMENT. BY DOWNLOADING, INSTALLING, OR USING THESOFTWARE, USER
          ACKNOWLEDGES AND AGREES TO BE BOUND BY THESE TERMS. SHOULD USER NOT
          ACKNOWLEDGE AND AGREE TO THESE TERMS, USER MUST IMMEDIATELY UNINSTALL
          THIS SOFTWARE AND DISCONTINUE ITS USE.
        </_Text>
        <_Text style={styles.headingsTxt}>1. DEFINITIONS:</_Text>
        <_Text style={styles.txt}>
          “Account” means all our Services accounts provided by the Company and
          created by or on behalf of Subscriber within the Service.
        </_Text>
        <_Text style={styles.txt}>
          “Subscriber” shall mean any individual or entity creating an account
          on our website and is also referred to as User or Licensee.
        </_Text>
        <_Text style={styles.txt}>
          “Software” shall for purposes of this EULA, means such software,
          together with all components thereof and all updates, patches, fixes,
          modifications and enhancements thereto, including releases of new
          versions, whether provided to you via download, automatically without
          additional consent or action on your part or otherwise, and any and
          all accompanying documentation, files and materials.
        </_Text>
        <_Text style={styles.txt}>
          “Company” shall mean Caliber Technologies Inc having an address- 5094
          159th St W, Apple Valley, MN - 55124.
        </_Text>
        <_Text style={styles.txt}>
          “Documentation” means any written or electronic record, images, video,
          text or sounds which describes about the funtions and prosess of the
          service provided or made available to the User/Subscriber through our
          Services or from our website or otherwise.
        </_Text>
        <_Text style={styles.txt}>
          “Service Plan” means the services offered by the Company for the
          specified duration on the demand by the Subscriber.
        </_Text>
        <_Text style={styles.txt}>
          “Site” means CALIMATIC and all other website owned or operated by the
          Company or its subsidiaries.
        </_Text>
        <_Text style={styles.txt}>
          <_Text
            style={{ fontWeight: 'bold', color: whiteThemeColors.greyDark }}
          >
            “Subscription Period”
          </_Text>{' '}
          means the Period as prescribed under this agreement for which the user
          has agreed to subscribe to the Service.
        </_Text>
        <_Text style={styles.txt}>
          Data” means all electronic data, text messages or other materials
          submitted to the Company by the User or Subscriber in connection with
          use of the services provided by the company.
        </_Text>
        <_Text style={styles.headingsTxt}>2. GENERAL</_Text>
        <_Text style={styles.txt}>
          This EULA governs the use of the services which are provided to the
          user through our ‘software’ made available via our website and other
          associated website domains (hereinafter referred to as the “Site”) by
          or on behalf of the Company (hereinafter referred to as “the Company”,
          “we”, “us” or “our”). The Terms of this EULA constitute a legally
          binding Agreement (the “Agreement”) between you (hereinafter referred
          to as the “user”, “Subscriber”, “licensee”,“you” or“yours”) and us.
          The provisions under this EULA shall subject to the Privacy Policy of
          the Company and together constitute a binding agreement between the
          parties to this EULA.
        </_Text>
        <_Text style={styles.headingsTxt}>3. LICENSE GRANT:</_Text>
        <_Text style={styles.txt}>
          Subject to these Terms, the Company grants the user a personal,
          non-exclusive, non-transferable, limited and revocable license to use
          the software for personal use only on a device owned or controlled by
          user. Although we do not guarantee that our software supports all
          platforms or operating systems, the software supports only the limited
          number of platforms. The user accepts that buying an account does not
          guarantee that the software can be used in all kinds of platform e.g.
          Mobile Phones etc. Any use of the software in any other manner,
          including, without limitation, resale, transfer, modification or
          distribution of the Software or text, pictures, music, barcodes,
          video, data, hyperlinks, displays, and other content associated with
          the Software (“Content”) is prohibited. This agreement also governs
          any updates to, or supplements or replacements for, this software
          unless separate terms accompany such updates, supplements or
          replacements, in which case the separate terms will apply. The Company
          does not offer any guarantee to provide back up services for any
          information even though the Company servers are backed up. Your
          license rights under this EULA are non-exclusive.
        </_Text>
        <_Text style={styles.headingsTxt}>4. PAYMENT:</_Text>
        <_Text style={styles.txt}>
          The user shall make the payments for buying a package or subscribing
          to a plan in order to use our software, which shall be made using a
          credit card or a debit card, or by using Paypal. The choice for the
          medium of payment shall be made by the Company and thus the user shall
          have to make the payment accordingly with the prescribed mode of
          payment.
        </_Text>
        <_Text style={styles.headingsTxt}>
          5. RESTRICTIONS AND PROHIBITION:
        </_Text>
        <_Text style={styles.headingsTxt}>5.1 License Restrictions</_Text>
        <_Text style={styles.txt}>
          Except to the extent contrary to applicable law:
        </_Text>
        <_Text style={styles.txt}>
          (a) Other than as expressly set forth in Section 3, you may not make
          or distribute copies of the Software, or electronically transfer the
          Software from one computer to another or over a network.
        </_Text>
        <_Text style={styles.txt}>
          (b) You may not alter, merge, adapt or translate the Software, or
          decompile, reverse engineer, disassemble, or otherwise reduce the
          Software to a human-perceivable form.
        </_Text>
        <_Text style={styles.txt}>
          (c) Unless otherwise provided herein, you may not rent, lease, or
          sublicense the Software. Unless otherwise expressly authorized in a
          separate written agreement between, and executed by, you and us, you
          may not use, or permit the use of, the Software on a timeshare or
          service bureau basis. In addition, unless otherwise expressly
          authorized in a separate written agreement between, and executed by,
          you and us you may not host, on a subscription basis or otherwise, the
          Software (1) to permit a third party to use the Software to create any
          content, or (2) to conduct conferences or on-line meeting services for
          a third party.
        </_Text>
        <_Text style={styles.txt}>
          (d) Other than with respect to a Trial Version, Developer Version or a
          Not For Resale Version of the Software, you may permanently transfer
          all of your rights under this EULA only as part of a sale or transfer,
          provided you retain no copies, you transfer all of the Software
          (including all component parts, the media and printed materials, any
          upgrades, this EULA, the serial numbers, and, if applicable, all other
          software products provided together with the Software), and the
          recipient agrees to the terms of this EULA. If the Software is an
          upgrade, any transfer must include all prior versions of the Software
          from which you are upgrading. If the copy of the Software is licensed
          as part of the Bundle, the Software shall be transferred only with and
          as part of the sale or transfer of the whole Bundle and not
          separately. You may retain no copies of the Software. You may not sell
          or transfer any Software purchased under a volume discount. You may
          not sell or transfer any Trial Version, Developer Version or Not For
          Resale Version of the Software.
        </_Text>
        <_Text style={styles.txt}>
          (e) You may not modify the Software or create derivative works based
          upon the Software.
        </_Text>
        <_Text style={styles.txt}>
          (f) Academic Versions may not be used for, or distributed to any party
          for, any commercial purpose.
        </_Text>
        <_Text style={styles.txt}>
          (g) You shall not use the Software to develop any application having
          the same primary function as the Software.
        </_Text>
        <_Text style={styles.txt}>
          (h) You may only use the Not for Resale Version of the Software to
          review and evaluate the Software.
        </_Text>
        <_Text style={styles.txt}>
          (i) You may not export the Software into any country prohibited by the
          United States Export Administration Act and the regulations
          thereunder.
        </_Text>
        <_Text style={styles.txt}>
          (j) You may receive the Software in more than one medium but you shall
          only install or use one medium. Regardless of the number of media you
          receive, you may use only the medium that is appropriate for the
          computer on which the Software is to be installed.
        </_Text>
        <_Text style={styles.txt}>
          (k) In the event that you fail to comply with this EULA, we may
          terminate the license and you must destroy all copies of the Software
          (with all other rights of both parties and all other provisions of
          this EULA surviving any such termination).
        </_Text>
        <_Text style={styles.headingsTxt}>6. UPGRADES</_Text>
        <_Text style={styles.txt}>
          If this copy of the Software is an upgrade from an earlier version of
          the Software, it is provided to you on a license exchange basis. You
          agree by your installation and use of such copy of the Software to
          voluntarily terminate your earlier EULA and that you will not continue
          to use the earlier version of the Software or transfer it to another
          person or entity You agree by your installation and use of this copy
          of the Software to voluntarily terminate your EULA with respect to
          such prior license to the Software and that you will not continue to
          install or use such prior license of the Software or transfer it to
          another person or entity.
        </_Text>
        <_Text style={styles.headingsTxt}>7. OWNERSHIP:</_Text>
        <_Text style={styles.txt}>
          The foregoing grants of rights give you limited license to use the
          Software. Except as expressly provided in this Agreement, our website
          and its suppliers retain all right, title and interest, including all
          copyright and intellectual property rights, in and to, the Software
          (as an independent work and as an underlying work serving as a basis
          for any improvements, modifications, derivative works, and
          applications you may develop), and all copies thereof. All rights not
          specifically granted in this EULA, including Federal and International
          Copyrights, are reserved by our website and its suppliers.
        </_Text>
        <_Text style={styles.headingsTxt}>8. OUR RIGHTS:</_Text>
        <_Text style={styles.txt}>
          8.1 In order to identify the Users, we may, at any given time, have
          the right to tag them by using HTTP Headers.
        </_Text>
        <_Text style={styles.txt}>
          8.2 We send errors inside browser or computer to our servers for
          statistical reasons and to improve our services.
        </_Text>
        <_Text style={styles.txt}>
          8.3 We have the right to blacklist certain websites or IP’s. When we
          blacklist website/IP, then our proxies will not connect to them and
          the user’s IP address will then be exposed for which we shall not at
          any time be held responsible or liable. This list can be extended any
          time at our sole discretion.
        </_Text>
        <_Text style={styles.headingsTxt}>9. PROPRIETARY RIGHTS:</_Text>
        <_Text style={styles.txt}>
          The software or the copy of the software is licensed and not sold to
          you. You acknowledge that the Company own all rights, title and
          interest, including without limitation all Intellectual Property
          Rights, in and to the software or products through or in conjunction
          with the software. "Intellectual Property Rights" means all rights
          existing from time to time under patent law, copyright law, trade
          secret law, trademark law, unfair competition law and all other
          proprietary rights, and all applications, renewals, extensions and
          restorations thereof, now or hereafter in force and effect worldwide.
          You also agree not to remove, obscure, or alter our copyright notice,
          trademarks or other proprietary rights notices affixed to or contained
          within or accessed in conjunction with or through the software. The
          Company reserves all rights not expressly granted to you. Licensee
          recognizes that The Company regards the licensed programs as its
          proprietary information and as confidential trade secrets of great
          value. Licensee agrees not to provide or to otherwise make available
          in any form the licensed programs, or any portion thereof, to any
          person other than employees of licensee without the prior written
          consent of Licensor. Licensee further agrees to treat the licensed
          programs with at least the same degree of care with which licensee
          treats its own confidential information and in no event with less care
          than is reasonably required to protect the confidentiality of the
          licensed programs.
        </_Text>
        <_Text style={styles.headingsTxt}>
          10. PATENT AND COPYRIGHT INDEMNITY:
        </_Text>
        <_Text style={styles.txt}>
          The Company will defend at its own expense any action brought against
          licensee to the extent it is based on a claim that the licensed
          programs used within the scope of the license granted hereunder
          infringe a United States Patent, copyright or other proprietary right
          of a third party. The Company will pay any costs, damages or attorney
          fees finally awarded against licensee in such action which are
          attributable to such claim, provided the licensor is promptly notified
          in writing of such claim, may control the defense and/or settlement of
          such claim, and is provided with all requested assistance, information
          and authority. In the event that a licensed program becomes, or in the
          Company’s opinion is likely to become, the subject of a claim of
          infringement of a United States Patent, copyright or trade secret, The
          Company may at its option either secure licensee's right to continue
          using the licensed programs, replace or modify the licensed programs
          to make them not infringing, or provide licensee with a refund of the
          license fee less depreciation on a …….. year, straight-line basis. The
          licensor shall have no liability for any claim of patent, copyright or
          trade secret infringement based on the use of a licensed program in
          any form other than the original, unmodified form provided to licensee
          or the use of a combination of the licensed programs with hardware,
          software or data not supplied by the Company where the used licensed
          programs alone in their original, unmodified form would not constitute
          an infringement. The foregoing states licensee's entire liability for
          infringement or claims of infringement of patents, copyrights or other
          intellectual property right.
        </_Text>
        <_Text style={styles.headingsTxt}>11. CONFIDENTIALITY:</_Text>
        <_Text style={styles.txt}>
          11.1 Scope: The term confidential information means all trade secrets,
          know-how, software and other financial, business or technical
          information of licensor or any of its suppliers that is disclosed by
          or for licensor in relation to this agreement, but not including any
          information. Licensee can demonstrate (a) rightfully furnished to it
          without restriction by a third party without breach of any obligation
          to the licensor, (b) generally available to the public without breach
          of this agreement or (c) independently developed by it without
          reliance on such information. The Licensed Products are licensor’s
          confidential information.
        </_Text>
        <_Text style={styles.txt}>
          11.2 Confidentiality: Except for the specific rights granted by this
          agreement, licensee shall not possess, use or disclose any
          confidential information without licensor’s prior written consent, and
          shall use reasonable care to protect the confidential information.
          Licensee shall be responsible for any breach of confidentiality by its
          employees.
        </_Text>
        <_Text style={styles.headingsTxt}>12.TERM AND TERMINATION:</_Text>
        <_Text style={styles.txt}>
          12.1 Term: This agreement shall commence on the effective date and
          continue in effect for a period of 5 years until terminated as
          provided herein.
        </_Text>
        <_Text style={styles.txt}>
          12.2 Termination: Licensee may terminate this agreement at any time
          for its convenience upon written notice to licensor. This agreement
          shall automatically terminate without further action by any party,
          immediately upon any material breach by licensee of any limitation or
          restriction set forth in this agreement.
        </_Text>
        <_Text style={styles.txt}>
          12.3 All expired premium accounts shall automatically be downgraded to
          free accounts.
        </_Text>
        <_Text style={styles.txt}>
          12.4 Any account shall terminate automatically on the date of end of
          the subscription period without any notification from the Company and
          the Company shall not be bound to extend such accounts for further
          period. The Company may discontinue its services at any time on its
          Sole discretion. Having account for any paid service shall not mean
          that the services are provided for unlimited duration.
        </_Text>
        <_Text style={styles.txt}>
          12.5 User shall have the right to delete/close his/her account at any
          time. Once the user deletes or closes his account then the user shall
          no longer be able to access our services. All logs etc. created by
          Users shall no longer be accessible by them when they delete/close
          their accounts but such logs shall not be deleted from our servers
          even when the users delete/close their accounts.
        </_Text>
        <_Text style={styles.txt}>
          12.6 Effects of Termination: Upon termination of this agreement for
          any reason, all rights, obligations and licenses of the parties
          hereunder shall cease, except that (a) all obligations that accrued
          prior to the effective date of termination (including without
          limitation, any payment obligation) and any remedies for breach of
          this Agreement shall survive any termination, (b) Licensee shall
          promptly return or destroy all of the licensed products and other
          tangible confidential information, and permanently erase all
          confidential information from any computer and storage media and (c)
          the provisions of limitations, payments, confidentiality, intellectual
          property rights, warranty disclaimers, limitation of liability,
          effects of termination, general provisions shall survive.
        </_Text>
        <_Text style={styles.txt}>
          12.7 Nothing in this section shall limit our options before law or
          other legal remedies.
        </_Text>
        <_Text style={styles.headingsTxt}>13. CHANGE IN POLICIES:</_Text>
        <_Text style={styles.txt}>
          Company reserves the right to change these policies at any time. While
          it is not our intention to do so, there may be factors outside of our
          control that require us to implement changes to our policies.
        </_Text>
        <_Text style={styles.headingsTxt}>14. MAINTENANCE SUPPORT:</_Text>
        <_Text style={styles.txt}>
          14.1 Licensor will provide to licensee the following support with
          respect to the software:
        </_Text>
        <_Text style={styles.txt}>
          a) If during the term of this agreement, licensee notifies licensor of
          a substantial program error respecting the software, or licensor has
          reason to believe that error exists in the software and so notifies
          licensee, licensor shall at its expense verify and attempt to correct
          such error within thirty (30) working days after the date of
          notification. If licensee is not satisfied with the correction, then
          licensee may terminate this agreement, but without refund of any
          amount paid to licensee or release of any amounts due to licensor at
          the time of termination.
        </_Text>
        <_Text style={styles.txt}>
          14.2 In the case that licensee has technical questions in the use of
          the software during the tenure of this agreement, licensee may submit
          those questions to licensor on e-mail or raise a support ticket and
          the Licensor shall provide consulting to answer such questions without
          charge to licensee till the license is valid.
        </_Text>
        <_Text style={styles.headingsTxt}>
          15. DISCONTINUED PURCHASE POLICY:
        </_Text>
        <_Text style={styles.txt}>
          As technology on the internet evolves there are times we may need to
          discontinue a program, theme, graphic etc. When that happens, these
          are removed from our website and will no longer be accessible through
          the customer care center. We suggest you always keep local backups of
          all purchases so that you have them available to you.
        </_Text>
        <_Text style={styles.headingsTxt}>16. DATA COLLECTION AND USE:</_Text>
        <_Text style={styles.txt}>
          You hereby agree that the Company, its parent, subsidiaries,
          affiliates, and their respective successors and assigns, may collect
          and use certain technical information associated with your use of
          thesoftware, including, without limitation, any information provided
          in connection with any support or technical services for the Software,
          in accordance with the Company’s privacy policy.
        </_Text>
        <_Text style={styles.headingsTxt}>
          17. THIRD PARTY PRODUCTS/PLUGINS:
        </_Text>
        <_Text style={styles.txt}>
          If you use third party products/plugins not provided to you by us then
          we shall in no case be held liable or responsible for use of such
          third party products by you. The services may enable you to add links
          to Web sites and access to content, products and services of third
          parties, including users, advertisers, affiliates and sponsors of such
          third parties. We are not responsible for any third party Web sites or
          third party content provided on or through the services and you bear
          all risks associated with the access and use of such Web sites and
          third party content, products and services. We shall also ban the
          users from using our services in case they use third party
          products/plugins.
        </_Text>
        <_Text style={styles.headingsTxt}>18. HOSTING:</_Text>
        <_Text style={styles.txt}>
          The licensor will ensure to provide the best uptime and performance,
          however the licensor will not be responsible for any server down time.
          We take all reasonable steps to ensure that this Website is available.
          However, websites do sometimes encounter downtime due to server and,
          other technical issues. Therefore we will not be liable if this
          website is unavailable at any time. This Website may be temporarily
          unavailable due to issues such as system failure, maintenance or
          repair, or for reasons beyond our control. Where possible we will try
          to give our visitors advance warning of maintenance issues but shall
          not be obliged to do so.
        </_Text>
        <_Text style={styles.headingsTxt}>19. BACKUPS AND DATA LOSS:</_Text>
        <_Text style={styles.txt}>
          We may perform backups of User’s data/content. We make every effort to
          ensure that these backups are valid. We assume no liability for any
          information published to any server including all user web site
          content, related files, backup files, databases or mail belonging to
          any user hosted at our website. Backup arrangements for user content
          for any frequency other than the standard backup frequency must be
          made by written contract and acceptance by us and any such contract
          will be subject to premium monthly charges. We assume no liability for
          lost content in the event a hardware or system failure occurs and data
          maintained on the effected servers cannot be recovered from the most
          recent backups. It is the sole responsibility of account owner/user to
          ensure that they maintain their own backup copy of any materials
          placed on our Servers, or of any database maintained on any server
          operated by us in the event we are unable to restore customer content
          from backup. At no time shall we assume any liability for lost
          customer data/content.
        </_Text>
        <_Text style={styles.headingsTxt}>20. DMCA POLICY:</_Text>
        <_Text style={styles.txt}>
          20.1 It is our policy to respond to clear notices of alleged
          infringement. This response describes the information that should be
          present in these notices. It is designed to make submitting notices of
          alleged infringement to us as straightforward as possible while
          reducing the number of notices that we receive that are fraudulent or
          difficult to understand or verify. The form of notice specified below
          is consistent with the form suggested by the United States Digital
          Millennium Copyright Act (the text of which can be found at the U.S.
          Copyright Office Web Site, http://www.copyright.gov) but we will
          respond to notices of this form from other jurisdictions as well. If
          you are not sure whether material available online infringes your
          copyright, we suggest that you first contact an attorney. To file a
          notice of infringement with us, you must provide a written
          communication (by fax or regular mail or by email) that sets forth the
          items specified below:-
        </_Text>
        <_Text style={styles.txt}>
          1. Identify the copyrighted work that you claim has been infringed, or
          if this Notice covers multiple copyrighted works then you may provide
          a representative list of the copyrighted works that you claim have
          been infringed.
        </_Text>
        <_Text style={styles.txt}>
          2. Identify the material or link you claim is infringing (or the
          subject of infringing activity) and to which access is to be disabled,
          including at a minimum, if applicable, the URL of the link shown on
          the Site or the exact location where such material may be found.
        </_Text>
        <_Text style={styles.txt}>
          3. Provide your company affiliation (if applicable), mailing address,
          telephone number, and, if available, email address.
        </_Text>
        <_Text style={styles.txt}>
          4. Include both of the following statements in the body of the Notice:
        </_Text>
        <_Text style={styles.txt}>
          "I hereby state that I have a good faith belief that the disputed use
          of the copyrighted material is not authorized by the copyright owner,
          its agent, or the law (eg: as a fair use)."
        </_Text>
        <_Text style={styles.txt}>
          "I hereby state that the information in this Notice is accurate and,
          under penalty of perjury, that I am the owner, or authorized to act on
          behalf of, the owner, of the copyright or of an exclusive right under
          the copyright that is allegedly infringed."
        </_Text>
        <_Text style={styles.txt}>
          5. Provide your full legal name and your electronic signature.
        </_Text>
        <_Text style={styles.txt}>
          6. Email the above to: info@calimatic.com.
        </_Text>
        <_Text style={styles.headingsTxt}>21. DMCA COUNTER NOTIFICATION:</_Text>
        <_Text style={styles.txt}>
          21.1 Pursuant to sections 512(g)(2) and (3) of the United States
          Digital Millennium Copyright Act, the user may make a counter
          notification. To file a counter notification with us, you must provide
          a written communication by email that sets forth the items specified
          below. Please note that you will be liable for damages (including
          costs and attorneys' fees) if you materially misrepresent that a
          product or activity is not infringing the copyrights of others.
          Accordingly, if you are not sure whether certain material infringes
          the copyrights of others, we suggest that you first contact an
          attorney. To expedite our ability to process your counter
          notification, please use the following steps:
        </_Text>
        <_Text style={styles.txt}>
          1. Identify the name of the specific URL’s/Site with respect to which
          we have blocked access.
        </_Text>
        <_Text style={styles.txt}>
          2. Please send us your full contact info including your name, address,
          telephone number, email address, and a statement that you consent to
          the jurisdiction of Federal District Court for the judicial district
          in which your address is located, and that you will accept service of
          process from the person who provided notification under subsection
          (c)(1)(C) of the DMCA or an agent of such person.
        </_Text>
        <_Text style={styles.txt}>
          3. Include the following statement: "I swear, under penalty of
          perjury, that I have a good faith belief that each search result,
          message, or other item of content identified above was removed or
          disabled as a result of a mistake or misidentification of the material
          to be removed or disabled, or that the material identified by the
          complainant has been removed or disabled at the URL identified and
          will no longer be shown.”
        </_Text>
        <_Text style={styles.txt}>
          4. Provide your full legal name and your electronic signature.
        </_Text>
        <_Text style={styles.txt}>
          Email the above to: info@calimatic.com with the words "DMCA Counter
          Notification" in the subject line.
        </_Text>
        <_Text style={styles.headingsTxt}>22. DISCLAIMER OF WARRANTY:</_Text>
        <_Text style={styles.txt}>
          THERE ARE NO REPRESENTATIONS OR WARRANTIES THAT APPLY OR THAT ARE MADE
          TO YOU IN ANY WAY IN CONNECTION WITH THE SOFTWARE OR THIS
          AGREEMENT/EULA. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM
          ALL REPRESENTATIONS AND WARRANTIES WITH RESPECT TO THE SOFTWARE AND
          YOUR ACCESS TO AND USE THEREOF, WHETHER EXPRESS OR IMPLIED, INCLUDING,
          WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY OR
          FITNESS FOR A PARTICULAR PURPOSE OR ANY WARRANTIES OF TITLE,
          NON-INFRINGEMENT AND/OR ARISING FROM A COURSE OF DEALING OR USAGE OF
          TRADE. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, THE SOFTWARE
          IS MADE AVAILABLE TO YOU ON AN “AS IS” AND “AS AVAILABLE” BASIS AND
          THE COMPANY DOES NOT GUARANTEE, WARRANT OR REPRESENT THAT THE SOFTWARE
          SHALL MEET YOUR REQUIREMENTS OR THAT YOUR USE, OPERATION OR RESULTS OF
          USE OF THE SOFTWARE SHALL BE UNINTERRUPTED, COMPLETE, RELIABLE,
          ACCURATE, CURRENT, ERROR-FREE, FREE OF COMPUTER VIRUSES OR OTHERWISE
          SECURE. YOU ASSUME THE ENTIRE RISK OF DOWNLOADING, INSTALLING,
          COPYING, OPERATING, USING AND/OR DISTRIBUTING THE SOFTWARE.
        </_Text>
        <_Text style={styles.headingsTxt}>23. LIMITATIONS OF LIABILITY:</_Text>
        <_Text style={styles.txt}>
          YOU UNDERSTAND, ACKNOWLEDGE AND AGREE THAT TO THE FULLEST EXTENT
          PERMISSIBLE BY LAW, NEITHER THE COMPANY NOR ITS PARENT, SUBSIDIARIES,
          AFFILIATES, THEIR RESPECTIVE SUCCESSORS AND ASSIGNS, OFFICERS,
          DIRECTORS, EMPLOYEES, AGENTS, LICENSORS, REPRESENTATIVES, ADVERTISERS,
          BUSINESS AND PROMOTIONAL PARTNERS, OPERATIONAL SERVICE PROVIDERS,
          SUPPLIERS, RESELLERS AND CONTRACTORS SHALL, UNDER ANY CIRCUMSTANCES,
          BE RESPONSIBLE OR LIABLE FOR ANY CLAIM, LOSS OR DAMAGE, OF ANY KIND,
          DIRECT OR INDIRECT, INCLUDING, WITHOUT LIMITATION, ANY AND ALL
          COMPENSATORY, CONSEQUENTIAL, INCIDENTAL, DIRECT, INDIRECT, SPECIAL,
          EXEMPLARY OR PUNITIVE DAMAGES, IN CONNECTION WITH OR ARISING FROM ANY
          USE OF THE SOFTWARE OR OTHERWISE IN CONNECTION WITH THIS EULA.
        </_Text>
        <_Text style={styles.txt}>
          YOU FURTHER ACKNOWLEDGE AND AGREE YOUR SOLE RIGHT AND EXCLUSIVE REMEDY
          FOR ANY LOSS OR DAMAGE ASSOCIATED WITH THE SOFTWARE OR THIS EULA, EVEN
          IF YOU CLAIM THAT SUCH REMEDY FAILS OF ITS ESSENTIAL PURPOSE, SHALL BE
          TO HAVE THE COMPANY, UPON WRITTEN NOTICE FROM YOU, ATTEMPT TO REPAIR,
          CORRECT OR REPLACE THE SOFTWARE. IF REPAIR, CORRECTION OR REPLACEMENT
          IS NOT REASONABLY COMMERCIALLY PRACTICABLE IN THE SOLE AND ABSOLUTE
          DISCRETION OF THE COMPANY, EITHER YOU OR THE COMPANY SHALL HAVE THE
          RIGHT TO TERMINATE AND DISCONTINUE YOUR USE OF THE SOFTWARE.
        </_Text>
        <_Text style={styles.txt}>
          SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR
          CERTAIN LIMITATIONS ON DAMAGES AND REMEDIES. ACCORDINGLY, SOME OF THE
          EXCLUSIONS AND LIMITATIONS DESCRIBED IN THIS EULA MAY NOT APPLY TO
          YOU.
        </_Text>
        <_Text style={styles.headingsTxt}>24. INDEMNIFICATION:</_Text>
        <_Text style={styles.txt}>
          You agree to defend the Company, its parent, subsidiaries, affiliates
          and/or their respective successors and assigns, officers, directors,
          employees, agents, licensors, representatives, advertisers, business
          and promotional partners, operational service providers, suppliers,
          resellers and contractors (the “the Company Indemnified Parties”)
          against any and all claims, demands and/or actions and indemnify and
          hold the Company indemnified parties harmless from and against any and
          all losses, damages, costs and expenses (including reasonable
          attorneys’ fees), resulting from any breach or violation of this EULA,
          infringement, misappropriation or any violation of the rights of any
          other party, violation or noncompliance with any law or regulation,
          the breach or violation of any term or condition of your agreement
          with us, any use, alteration or export of the Softwareor otherwise in
          connection with this EULA. We reserve the right to assume, at our
          expense, the exclusive defense and control of any claims or actions
          and all negotiations for settlement or compromise, and you agree to
          fully cooperate with us upon our request.
        </_Text>
        <_Text style={styles.headingsTxt}>25. EXPORT RESTRICTIONS:</_Text>
        <_Text style={styles.txt}>
          Software downloads available from the website of the Company include
          cryptographic software. Thus the use of the software may be subject to
          certain export restrictions of the Countries where the user resides.
          If you are (a) in a country to which export from any other Country is
          restricted for anti-terrorism reasons, or a national of any such
          country, wherever located, (b) in a country to which any other country
          has embargoed or restricted the export of goods or services, or a
          national of any such country, wherever located, or (c) a person or
          entity who has been prohibited from participating in any other country
          export transactions by any agency of that Country, then you may not
          install, download, access, use, or license our software. By accepting
          this license, you warrant and represent to the Company that (1) you do
          not match the criteria set forth in (a), (b), or (c) above, (2) that
          you will not export or re-export the software to any country, person,
          or entity subject to export restrictions in the Country where the user
          resides, including those persons and entities that match the criteria
          set forth in (a), (b), or (c) above, and (3) that neither any
          Government Body or any federal agency, has suspended, revoked, or
          denied your export privileges.
        </_Text>
        <_Text style={styles.txt}>
          The U.S. Government Department of Commerce, Bureau of Industry and
          Security (BIS), has classified this software as Export Commodity
          Control Number (ECCN) 5D002.C.1, which includes information security
          software using or performing cryptographic functions with asymmetric
          algorithms. The form and manner of this distribution makes it eligible
          for export under the License Exception ENC Technology Software
          Unrestricted (TSU) exception (see the BIS Export Administration
          Regulations, Section 740.13) for both object code and source code.
        </_Text>
        <_Text style={styles.headingsTxt}>
          26. PRIVACY AND OTHER USER AGREEMENTS:
        </_Text>
        <_Text style={styles.txt}>
          Your use of the licensed Software is subject to the terms of our
          privacy policy and terms of service.
        </_Text>
        <_Text style={styles.headingsTxt}>27. FORCE MAJEURE:</_Text>
        <_Text style={styles.txt}>
          Except with regard to payment obligations, either party shall be
          excused from delays in performing or from failing to perform its
          obligations under this contract to the extent the delays or failures
          result from causes beyond the reasonable control of the party,
          including, but not limited to: failures or default of third party
          software, vendors, or products; acts of God or of the public enemy;
          USA or foreign governmental actions; strikes; communications, network
          connection, or utility interruption or failure; fire; flood; epidemic;
          and freight embargoes.
        </_Text>
        <_Text style={styles.headingsTxt}>28. DISPUTE RESOLUTION:</_Text>
        <_Text style={styles.txt}>
          If a dispute arises between you and us, our goal is to provide you
          with a neutral and cost effective means of resolving the dispute
          quickly. Accordingly, you and the Company agree that we will resolve
          any claim or controversy at law or equity that arises out of this
          licensed Software (a "Claim") in accordance with the provisions
          contained in this agreement or as you and we otherwise agree in
          writing. Before resorting to these alternatives, we strongly encourage
          you to first contact us directly to seek a resolution by visiting
          contact us page. We will consider reasonable requests to resolve the
          dispute through alternative dispute resolution procedures, such as
          mediation or arbitration, as alternatives to litigation.
        </_Text>
        <_Text style={styles.headingsTxt}>29. GENERAL PROVISIONS:</_Text>
        <_Text style={styles.txt}>
          29.1 Governing Law: This EULA and all disputes, claims, actions, suits
          or other proceedings arising hereunder shall be governed by, and
          construed in accordance with, the laws of United States of America
          applicable to contracts wholly made and to be performed within Apple
          Valley, Minnesota. You agree to irrevocably submit to the sole and
          exclusive jurisdiction of the courts of Apple Valley, Minnesota.
        </_Text>
        <_Text style={styles.txt}>
          29.2 Amendments: No amendment, modification, waiver or discharge of
          any provision of this EULA shall be valid unless made in writing and
          signed by an authorized representative of the Company.
        </_Text>
        <_Text style={styles.txt}>
          29.3 Waiver: No failure or delay by the Company to exercise any right
          or enforce any obligation shall impair or be construed as a waiver or
          on-going waiver of that or any or other right or power, unless made in
          writing and signed by the Company.
        </_Text>
        <_Text style={styles.txt}>
          29.4 Severability: If any provision of this EULA is held to be
          illegal, invalid or unenforceable, the remaining provisions of this
          EULA shall be unimpaired and remain in full force and effect.
        </_Text>
        <_Text style={styles.txt}>
          29.5 Remedies: Unless specifically provided otherwise, each right and
          remedy in this agreement is in addition to any other right or remedy,
          at law or in equity. Licensee agrees that, in the event of any breach
          or threatened breach, licensor will suffer irreparable damage for
          which there is no adequate remedy at law. Accordingly, licensor shall
          be entitled to injunctive and other equitable remedies to prevent or
          restrain such breach or threatened breach, without the necessity of
          proving actual damages or posting any bond.
        </_Text>
        <_Text style={styles.txt}>
          29.6 Notices: Any notice or communication hereunder shall be in
          writing and either personally delivered or sent via confirmed
          facsimile, recognized express delivery courier or certified or
          registered mail, prepaid and return receipt requested. Notices shall
          be delivered to the address specified by licensee or to the address
          above for Licensor, as the case may be, or at such other address
          designated in a subsequent notice. Consents and approvals required
          under this agreement may be provided electronically, if they are
          provided in a jurisdiction that recognizes electronic signatures as
          enforceable under the particular circumstances.
        </_Text>
        <_Text style={styles.txt}>
          All notices shall be in English, effective upon receipt or, if
          refused, five (5) business days after being sent as set forth above.
        </_Text>
        <_Text style={styles.txt}>
          29.7 Assignment: This Agreement and the rights and obligations
          hereunder are personal to licensee, and may not be assigned or
          otherwise transferred, in whole or in part, without licensor’s prior
          written consent. Any attempt to do otherwise shall be void and of no
          effect. Without licensee’s consent, licensor may assign this agreement
          to any third party. This agreement shall be binding upon, and inure to
          the benefit of, the successors, representatives and permitted assigns
          of the parties.
        </_Text>
        <_Text style={styles.txt}>
          29.8 Independent Contractors: The parties shall be independent
          contractors under this agreement, and nothing herein will constitute
          either party as the employer, employee, agent or representative of the
          other party, or both parties as joint venturers or partners for any
          purpose.
        </_Text>
        <_Text style={styles.txt}>
          29.9 Basis of Bargain: Each Party recognizes and agrees that the
          warranty disclaimers and liability and remedy limitations are material
          bargained for basis of this agreement and that they have been taken
          into account by each party and reflected in determining the
          consideration to be given by each party hereunder and in the decision
          to enter into this agreement.
        </_Text>
        <_Text style={styles.txt}>
          29.10 Electronic Agreement:You understand and agree that we transact
          with our users electronically and, therefore, we may provide you with
          required notices and terms electronically, either by sending you an
          e-mail to the address that you have provided to us. By using our
          service or registering with us, you represent that you have the
          necessary equipment, software and Internet access to read, review,
          print and store any terms or notices that we provide to you. Your
          affirmative acts of either (si) accessing and using our licensed
          Software, or (ii) registering with us, and/or (iii) providing a
          Submission, constitutes your electronic signature to this Agreement.
          You acknowledge that these terms may not be denied legal effect or
          enforceability solely because this Agreement was formed
          electronically.
        </_Text>
        <_Text style={styles.txt}>
          29.11 Entire Agreement: This agreement constitutes the entire
          agreement, and supersedes all prior negotiations, understandings or
          agreements (oral or written), between the parties about the subject
          matter of this agreement. Terms set forth in licensee’s purchase order
          (or any similar document) that is in addition to or at variance with
          the terms of this agreement is specifically waived by licensee. All
          such terms are considered to be proposed material alterations of this
          agreement and are hereby rejected.
        </_Text>
        <_Text style={styles.headingsTxt}>30. ACKNOWLEDGEMENT:</_Text>
        <_Text style={styles.txt}>
          Licensee acknowledges that (a) licensee has read and understands this
          agreement, (b) it has had an opportunity to have its legal counsel
          review this agreement, (c) this agreement has the same force and
          effect as a signed agreement, (d) Licensor requires identification of
          the user and licensee before issuing this license and (e) issuance of
          this license does not constitute general publication of the licensed
          Software or any other Confidential Information.
        </_Text>
        <_Text style={styles.txt}>
          DATED:
          <_Text style={{ color: whiteThemeColors.black }}>
            {moment(new Date()).format(' ddd, MMM DD, YYYY')}
          </_Text>
        </_Text>
        <_Text style={styles.txt}>Caliber Technologies Inc</_Text>
      </_View>
      <_View
        style={{
          ...styles.BtnView,
          padding: 5,
        }}
      >
        <_Button
          submitting={true}
          borderRadius={7}
          style={[
            styles.btn,
            { backgroundColor: whiteThemeColors.primary, marginHorizontal: 10 },
          ]}
          BtnTxt={{ color: whiteThemeColors.white, alignSelf: 'center' }}
          btnText={'AGREE'}
          callback={() => {
            acceptEula();
          }}
        />
        <_Button
          submitting={true}
          borderRadius={7}
          style={[
            styles.btn,
            { backgroundColor: '#d9534f', marginHorizontal: 10 },
          ]}
          BtnTxt={{ color: whiteThemeColors.white, alignSelf: 'center' }}
          btnText={'DISAGREE'}
          callback={() => {
            navigation.navigate(Screen.signInScreen.name);
          }}
        />
        <_Button
          submitting={true}
          borderRadius={7}
          style={[
            styles.btn,
            { backgroundColor: whiteThemeColors.black, marginHorizontal: 10 },
          ]}
          BtnTxt={{ color: whiteThemeColors.white, alignSelf: 'center' }}
          btnText={'CANCEL'}
          callback={() => {
            navigation.navigate(Screen.signInScreen.name);
          }}
        />
      </_View>
      <_View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
  },
  content: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  eulaStartText: {
    marginTop: 30,
    padding: 5,
    color: whiteThemeColors.greyDark,
    textAlign: 'justify',
  },
  BtnView: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
  },
  btn: {
    flex: 0.33,
    justifyContent: 'center',
    height: 45,
  },
  txt: {
    marginTop: 10,
    color: whiteThemeColors.greyDark,
    textAlign: 'justify',
  },
  headingsTxt: {
    marginTop: 20,
    color: whiteThemeColors.black,
  },
});
