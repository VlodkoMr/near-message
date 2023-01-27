import React from "react";
import { Link } from 'react-router-dom';
import Layout from "./Layout";

 const Privacy: React.FC = () => {

  return (
    <Layout>

      <div className={"mt-32 text-gray-200 container"}>
        <h1 className={"text-black dark:text-white font-bold text-3xl sm:text-4xl md:text-[45px] mb-4 text-center"}>
          Privacy Policy
        </h1>
        <div className={"text-base mt-8"}>
          <p>AtomicLab, (hereafter “the Company”, “we”, “us” or “our”) is committed to protecting the privacy and security of the personal
            information that is provided to us or collected by us during the course of our business. We store and process personal
            information in accordance with the EU General Data Protection Regulation.</p>
          <br/>
          <p>This Privacy Notice applies to “ChatMe” offered by the Company through Internet Websites, mobile devices or other platforms
            (collectively, the “Services”). This Privacy Notice explains how we may collect and use any personal information that we obtain
            about you and your rights in relation to that information. Please read this carefully. By using the Services, you affirm that
            you have read and understand this Privacy Notice and that you consent to the collection and use of your personal information as
            outlined in this Privacy Notice.</p>
          <p>We may provide you with additional Privacy Notices where we believe that it is appropriate to do so. Those additional notices
            supplement and should be read together with this Privacy Notice.</p>

          <p className={"text-xl font-semibold mt-6"}>1. Who is responsible for your personal information?</p>

          <p>
            AtomicLab is responsible for your personal information as provided to us or collected by us during the course of our business.
          </p>

          <p className={"text-xl font-semibold mt-6"}>2. Which information about you is collected?</p>

          <p>
            Whenever you access or make use of any of the Website, Materials or Services, we may collect the following types of information
            from you:
          </p>
          <br/>
          <p>2.1 Information you provide directly to us, including:</p>

          <ul>
            <li>- When you create a User Account, NEAR digital wallet address and NEAR user name;</li>
            <li>- Your purchase history and other information relating to transactions made through the Website;</li>
            <li>- Information contained in your correspondence with us, for example, when you send us an email;</li>
          </ul>
          <br/>

          <p>2.2 Information collected during the course of your use of the Website, Materials or Services, including:</p>

          <ul>
            <li>- Your messages and conversations (text and media files);</li>
            <li>- Your chats and channels list;</li>
            <li>- “Crash reports” in the event that a software crash occurs, which may include details of your User Account;</li>
            <li>- Data contained in log files. The information in log files may include your IP address, your ISP, the Web browser you used
              to visit the Services, the time you visited the Services, which web pages you visited on the Services, and other anonymous
              usage data.
            </li>
            <li>- Information about the computer or device you use to access our Service, including the hardware model, operating system and
              version, MAC address, unique device identifier (“UDID”), International Mobile Equipment Identity (“IMEI”) and mobile network
              information.
            </li>
          </ul>
          <br/>
          <p>2.3 Information collected from third parties where you have authorised this or the information is publicly available;</p>
          <br/>
          <p>2.4 Information collected through our use of cookies or similar technologies.</p>
          <p>Please refer to our Cookies Notice for further information, including information on how you can disable these
            technologies.</p>
          <br/>
          <p>2.5 Other contacts.</p>
          <p>We collect and process information about you if you offer or provide products or services to us, if we evaluate your products
            or services, and generally when you request information from us or provide information to us.</p>

          <p className={"text-xl font-semibold mt-6"}>3. How we use your personal information</p>

          <p>3.1 We use the information provided by you in connection with providing our Services:</p>

          <ul>
            <li>1. To provide the Website, Materials and Services in connection with our <Link to={"terms"}>Terms of Use</Link>;</li>
            <li>2. To verify your identity and verify that your User Account is not being used by others;</li>
            <li>3. To respond to communications from you.</li>
          </ul>
          <br/>
          <p>3.2 We use the information generated by your access or use of the Website, Materials or Services:</p>

          <ul>
            <li>1. To monitor the performance of the Website, Materials and Services and ensure that the Website, Materials and Services
              perform in the best manner possible;
            </li>
            <li>2. For security and system integrity purposes;</li>
            <li>3. To conduct research and statistical analysis (on an anonymised basis) (see more in the Statistics section of this privacy
              notice below);
            </li>
          </ul>
          <br/>
          <p>3.3 We may also use your personal information in connection with our rights and interests:</p>

          <ul>
            <li>1. To protect and/or enforce our legal rights and interests, including defending any claim;</li>
            <li>2. For any other purpose authorised by you;</li>
            <li>3. To respond to lawful requests by public authorities, including to meet law enforcement requirements;</li>
            <li>4. Where this is necessary for our legitimate interests (except where such interests would be overridden by your fundamental
              rights and freedoms which require the protection of personal data).
            </li>
          </ul>

          <p className={"text-xl font-semibold mt-6"}>4. How and why we may share your personal information</p>

          <p>We may share your personal information with third persons (such as advisors, authorities and other persons) in the EU or other
            countries if required or useful for providing our products and services. Further, we may share your personal information with
            third persons where:</p>
          <ul>
            <li>- you have consented to us doing so (where necessary) or any other person has obtained your consent for us to do so (where
              necessary);
            </li>
            <li>- we are under a legal, regulatory or professional obligation to do so (for example, to comply with anti-money laundering or
              sanctions requirements);
            </li>
            <li>- it is necessary in connection with legal proceedings or in order to exercise or defend legal rights.</li>
          </ul>

          <p className={"text-xl font-semibold mt-6"}>5. Transfer of Data outside of the EEA</p>

          <p>The personal data we collect in relation to the Website, Materials and/or Services may be transferred to, and stored in, a
            country operating outside the European Economic Area (“EEA”). Under the GDPR, the transfer of personal data to a country outside
            the EEA may take place where the European Commission has decided that the country ensures an adequate level of protection. In
            the absence of an adequacy decision, we may transfer personal data provided appropriate safeguards are in place.</p>

          <p className={"text-xl font-semibold mt-6"}>6. Statistics</p>

          <p>We may use and publish non-personal aggregate statistics and group data about those people who access or make use of any of the
            Website, Materials or Services and their usage of any of the Website, Materials or Services.</p>

          <p className={"text-xl font-semibold mt-6"}>7. How we protect your personal information</p>

          <p>Unfortunately, no data transmission over the Internet can be guaranteed as totally secure. We will take reasonable steps to
            keep your personal information safe from loss, unauthorised activity or other misuse. We implement appropriate technical and
            organisational measures to ensure a level of security appropriate to the risks inherent in processing personal information. You
            can play an important role in keeping your personal data secure by maintaining the confidentiality of NEAR wallet seed phrases
            and accounts used in relation to the Website, Materials and Services.</p>

          <p>Please notify us immediately if there is any unauthorised use of your account or any other breach of security. While we take
            reasonable steps to maintain secure internet connections, if you provide us with personal information over the internet, the
            provision of that information is at your own risk. If you post your personal information on the Website’s public pages, you
            acknowledge that the information you post is publicly available. If you follow a link on the Website to another website, the
            owner of that website will have its own privacy policy relating to your personal information that you should review before you
            provide any personal information.</p>

          <p className={"text-xl font-semibold mt-6"}>8. How long we keep your personal data</p>

          <p>We will retain your personal information for as long as is necessary for the purpose for which it was collected. We will
            further retain your personal information to comply with legal and regulatory obligations, for as long as claims could be brought
            against us and for as long as legitimate interest, including data security, requires.</p>

          <p className={"text-xl font-semibold mt-6"}>9. Your rights</p>

          <p>In relation to the processing of your personal information you have rights that you can exercise under certain circumstances.
            These rights are to:</p>

          <ul>
            <li>- request access to your personal information and certain information in relation to its processing;</li>
            <li>- request rectification of your personal information;</li>
            <li>- request the erasure of your personal information;</li>
            <li>- request that we restrict the processing of your personal information;</li>
            <li>- object to the processing of your personal information;</li>
          </ul>
          <br/>
          <p>If you have provided your consent to the collection, processing and transfer of your personal information for a specific
            purpose, you have the right to withdraw your consent for that specific processing at any time. Once we have received
            notification that you have withdrawn your consent, we will no longer process your information for the purpose or purposes you
            originally agreed to, unless we have another legitimate basis for doing so.</p>

          <p>We may refuse to provide access if the relevant data protection legislation or other legislation allows or obliges us to do so,
            in which case we will provide reasons for our decision as required by the law.</p>

          <p>If you would like to exercise these rights, please contact us in writing by email to: atomiclab.official@gmail.com.</p>

          <p>You will not, in general, have to pay a fee to exercise any of your individual rights. However, we may charge a fee for access
            to your personal information if the relevant data protection legislation allows us to do so, in which case we will inform you as
            required by the law.</p>

          <p>We reserve the right to update and change this Privacy Notice from time to time in order to reflect any changes to the way in
            which we process your personal information or changing legal requirements. Any changes we may make to our Privacy Notice in the
            future will be posted on this website. Please check back frequently to see any updates or changes to our Privacy Notice.</p>

          <p className={"text-xl font-semibold mt-6"}>10. Cookie Policy</p>

          <p>THIS WEBSITE USES COOKIES TO IMPROVE YOUR EXPERIENCE</p>

          <p>Cookies are small data files that can be stored on a computer’s hard drive. These cookies would only be stored in case the
            user’s Web browser setting permits such storage. In case a user chooses not to allow cookies, the user can adjust the browser
            settings to refuse the same. However, some parts of our sites may not function optimally if the browser is set to refuse
            cookies.</p>

          <p>We use cookies for the following general purposes:</p>
          <ul>
            <li>- To help us recognize the particular browser as a previous visitor. We may also retain a user’s registration details on the
              cookie.
            </li>
            <li>- To help us customize the content provided on our websites and on other websites across the Internet.</li>
            <li>- To help research the effectiveness of our website features, advertisements, and e-mail communications.</li>
          </ul>
          <br/>
          <p>Our website may use following type of cookies:</p>

          <p>“First party cookies” are technical cookies used by the site itself with the purpose of optimizing the use of the website
            (e.g., settings the user has modified on previous visits). “Third party cookies” are cookies not from the website itself but
            from third parties, such as plugins for marketing purposes. Examples of third party cookies are cookies from Facebook or Google
            Analytics. For these cookies, a user must authorize the use of such cookies. You may do this by accepting the use of cookies on
            a banner placed on top of below the webpage. Your use of the website will not be hindered by refusing to accept the use of
            cookies.) You may change the settings of your internet browser in such a way that it does not accept cookies or that you receive
            a warning whenever a cookie is installed or when cookies are deleted from your hard drive. You can do this by changing the
            settings of your browser. Be aware that modifying these settings may cause graphic elements not to be shown correctly on the
            website or may disable the use of certain functionalities on the website.</p>
          <br/>
          <p>By using our website, you agree that the website uses cookies.</p>
          <p>This website uses Google Analytics, a web analysis service offered by Google Inc., Amplitude, a cloud-based product analytics
            service. The Analytics Providers use “cookies” to help analyze the use of the website by its visitors. The by the cookie
            generated information about your behavior on the website (including your IP-address) is sent to the Analytics Provider and
            stored on servers in the United States. The Analytics Providers use this information to store how you use the website, to create
            reports of website activity for the website owners and other services with regard to website activity and internet usage. By
            using this website, you agree to the use of information by the Analytics Providers as described above.</p>
        </div>
      </div>

    </Layout>
  );
};

export default Privacy;