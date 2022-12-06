import React from "react";
import { Link } from 'react-router-dom';
import { Layout } from "./Layout";

export const Terms = () => {
  return (
    <Layout>

      <div className={"mt-32 text-gray-200 container"}>
        <h1 className={"text-black dark:text-white font-bold text-3xl sm:text-4xl md:text-[45px] mb-4 text-center"}>
          Terms & Conditions
        </h1>
        <div className={"text-base mt-8"}>
          <p>
            The site chatme.page is a web browser application (here and hereafter "App") that provides users with the opportunity
            to send "messages", create groups and channels using web or mobile application based on NEAR Blockchain.
            ChatMe team making this App available to you. Before you use the App, however, you will need to agree to these
            Terms of Use and any terms and conditions incorporated herein by reference (collectively, these “Terms").
          </p>
          <br/>
          <p>
            PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE APP. THESE TERMS GOVERN YOUR USE OF THE APP, UNLESS WE HAVE EXECUTED A
            SEPARATE WRITTEN AGREEMENT WITH YOU FOR THAT PURPOSE. WE ARE ONLY WILLING TO MAKE THE APP AVAILABLE TO YOU IF YOU ACCEPT ALL OF
            THESE TERMS. BY USING THE APP OR ANY PART OF IT, YOU ARE CONFIRMING THAT YOU UNDERSTAND AND AGREE TO BE BOUND BY ALL OF THESE
            TERMS. IF YOU ARE ACCEPTING THESE TERMS ON BEHALF OF A COMPANY OR OTHER LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE LEGAL
            AUTHORITY TO ACCEPT THESE TERMS ON THAT ENTITY’S BEHALF AND BIND THAT ENTITY, IN WHICH CASE “YOU” WILL MEAN THAT ENTITY. IF YOU
            DO NOT HAVE SUCH AUTHORITY, OR IF YOU DO NOT ACCEPT ALL OF THESE TERMS, THEN WE ARE UNWILLING TO MAKE THE APP AVAILABLE TO
            YOU.
          </p>
          <br/>
          <p>
            ANY PURCHASE OR SALE YOU MAKE, ACCEPT OR FACILITATE OUTSIDE OF THIS APP (AS DEFINED BELOW) OF A COLLECTIBLE WILL BE ENTIRELY AT
            YOUR RISK. WE DO NOT CONTROL OR ENDORSE PURCHASES OR SALES OF COLLECTIBLES OUTSIDE OF THIS APP. WE EXPRESSLY DENY ANY OBLIGATION
            TO INDEMNIFY YOU OR HOLD YOU HARMLESS FOR ANY LOSSES YOU MAY INCUR BY TRANSACTING, OR FACILITATING TRANSACTIONS INVOLVING
            COLLECTIBLES.
          </p>
          <br/>
          <p>
            BY USING THE APP OR ANY PART OF IT OR INDICATING YOUR ACCEPTANCE IN AN ADJOINING BOX, YOU ARE
            CONFIRMING THAT YOU UNDERSTAND AND AGREE TO BE BOUND BY ALL OF THESE TERMS.
          </p>

          <p>
            Any changes to these Terms will be in effect as of the “Last Updated Date” referred to at the bottom of this page. You should
            review these Terms before using the App or purchasing any product or using any services that are available through this App.
          </p>

          <p>
            Your continued use of this App after the “Last Updated Date” will constitute your acceptance of and agreement to such changes.
          </p>

          <p>By using this App, you affirm that you are of legal age to enter into these Terms, and you accept and are bound by these Terms.
          </p>
          <br/>
          <p>You may not use this App if you: (i) do not agree to these Terms; (ii) are not of the age of majority in your jurisdiction of
            residence; or (iii) are prohibited from accessing or using this App or any of this App’s contents, products or services by
            applicable law.
          </p>

          <p className={"text-xl font-semibold mt-6"}>1. USE OF THE APP; ACCOUNT SET-UP AND SECURITY</p>

          <ul>
            <li className={"mb-2"}>
              1.1 Account and Wallet Set-Up. To most easily use the App, you should first install a web browser (such as the Google Chrome
              web browser). You will also need register to establish an account affiliated with an electronic wallet, which will enable you
              to store information in blockchain via the App.
            </li>
            <li className={"mb-2"}>
              1.2 Account Registration. You Account will be register automatically after login using your NEAR Wallet.
            </li>
            <li className={"mb-2"}>
              1.3 Account Security. You are responsible for the security of your account for the App and for your electronic wallets. If
              you become aware of any unauthorized use of your password or of your account with us, you agree to notify us immediately at
              insert email address.
            </li>
            <li>
              1.4 Account Transactions. You can use your electronic wallet to purchase, store, and engage in transactions using your one
              or more cryptocurrencies that we may elect to accept from time to time. Transactions that take place on the App are managed
              and confirmed via the NEAR Network. You understand that your NEAR public address will be made publicly visible whenever you
              engage in a transaction on the App.
            </li>
          </ul>

          <p className={"text-xl font-semibold mt-6"}>2. PAYMENT, GAS FEES AND TAXES</p>

          <ul>
            <li className={"mb-2"}>
              2.1 Financial Transactions on App. Any payments or financial transactions that you engage in via the App will be conducted
              solely through the NEAR Network. We have no control over these payments or transactions, nor do we have the ability to reverse
              any payments or transactions. We have no liability to you or to any third party for any claims or damages that may arise as a
              result of any payments or transactions that you engage in via the App, or any other payment or transactions that you conduct
              via the NEAR Network. We do not provide refunds for any token transfer or purchases that you might make on or through the App.
            </li>
            <li className={"mb-2"}>
              2.2 Gas Fees. Every transaction on the NEAR Network requires the payment of a transaction fee (each, a “Gas Fee”).
              The Gas Fees fund the network of computers that run the decentralized NEAR Network. This means that you will need to pay a Gas
              Fee for each transaction that you instigate via the App. Except as otherwise expressly set forth in these Terms, you will be
              solely responsible to pay any Gas Fee for any transaction that you instigate via the App.
            </li>
            <li>2.3 Responsibility for Taxes. You will be solely responsible to pay any and all sales, use, value-added and other taxes,
              duties, and assessments (except taxes on our net income) now or hereafter claimed or imposed by any governmental authority
              (collectively, the “Taxes”) associated with your use of the App. Except for income taxes levied on us, you: (a) will pay or
              reimburse us for all national, federal, state, local or other taxes and assessments of any jurisdiction, including value added
              taxes and taxes as required by international tax treaties, customs or other import or export taxes, and amounts levied in lieu
              thereof based on charges set, services performed or payments made hereunder, as are now or hereafter may be imposed under the
              authority of any national, state, local or any other taxing jurisdiction; and (b) will not be entitled to deduct the amount of
              any such taxes, duties or assessments from payments (including Gas Fees) made to us pursuant to these Terms. To allow us to
              determine our tax obligations, unless you otherwise notify us in writing, you confirm that you are not a resident in Canada
              nor are you registered for Goods and services tax / Harmonized sales tax (GST / HST) or Provincial sales taxes (PST) in
              Canada, and will inform us if your status changes in the future.
            </li>
          </ul>

          <p className={"text-xl font-semibold mt-6"}>3. OWNERSHIP, LICENSE, AND OWNERSHIP RESTRICTIONS</p>

          <p>For the purposes of this Section, the following capitalized terms will have the following meanings:</p>

          <p>
            “Message” means any text or media (any form or media, including, without limitation, video or photographs) that you can send or
            receive using our service. All your messages stored in NEAR blockchain logs and can't be removed.
          </p>

          <p>
            "User Account" means free or one of paid account plans that can provide external features and functionality for your NEAR
            wallet Address.
          </p>

          <br/>
          <ul>
            <li className={"mb-2"}>
              3.1 We Own the App. You acknowledge and agree that we (or, as applicable, our licensors) owns all legal right, title and
              interest in and to all other elements of the App, and all intellectual property rights therein (including, without limitation,
              all media files, designs, systems, methods, information, computer code, software, services, “look and feel”, organization,
              compilation of the content, code, data, and all other elements of the App (collectively, the “App Materials”)). You
              acknowledge that the App Materials are protected by copyright, trade dress, patent, and trademark laws, international
              conventions, other relevant intellectual property and proprietary rights, and applicable laws. All App Materials are the
              copyrighted property of us or our licensors, and all trademarks, service marks, and trade names associated with the App or
              otherwise contained in the App Materials are proprietary to us or our licensors.
            </li>
            <li className={"mb-2"}>
              3.2 No User License or Ownership of App Materials. Except as expressly set forth herein, your use of the App does not grant
              you ownership of or any other rights with respect to any content, code, data, or other App Materials that you may access on or
              through the App. We reserve all rights in and to the App Materials that are not expressly granted to you in these Terms.
            </li>
            <li className={"mb-2"}>
              3.3 Further User Ownership Acknowledgements. For the sake of clarity, you understand and agree: (a) that your purchase of a
              User Account, whether via the App or otherwise, does not give you any rights or licenses in or to the App Materials
              (including, without limitation, our copyright in and to the associated messages) other than those expressly contained in these
              Terms; (b) that you do not have the right, except as otherwise set forth in these Terms, to reproduce, distribute, or
              otherwise commercialize any elements of the App Materials (including, without limitation) without our prior written consent in
              each case, which consent we may withhold in our sole and absolute discretion; and (c) that you will not apply for, register,
              or otherwise use or attempt to use any of our trademarks or service marks, or any confusingly similar marks, anywhere in the
              world without our prior written consent in each case, which consent we may withhold at our sole and absolute discretion.
            </li>
            <li>
              3.4 User Feedback. You may choose to submit comments, bug reports, ideas or other feedback about the App, including without
              limitation about how to improve the App (collectively, “Feedback”). By submitting any Feedback, you agree that we are free to
              use such Feedback at our discretion and without additional compensation to you, and to disclose such Feedback to third parties
              (whether on a non-confidential basis, or otherwise). You hereby grant us a perpetual, irrevocable, nonexclusive, worldwide
              license under all rights necessary for us to incorporate and use your Feedback for any purpose.
            </li>
          </ul>

          <p className={"text-xl font-semibold mt-6"}>4. CONDITIONS OF USE AND PROHIBITED ACTIVITIES</p>

          <p>
            YOU AGREE THAT YOU ARE RESPONSIBLE FOR YOUR OWN CONDUCT WHILE ACCESSING OR USING THE APP, AND FOR ANY CONSEQUENCES THEREOF. YOU
            AGREE TO USE THE APP ONLY FOR PURPOSES THAT ARE LEGAL, PROPER AND IN ACCORDANCE WITH THESE TERMS AND ANY APPLICABLE LAWS OR
            REGULATIONS.
          </p>
          <br/>
          <p>
            User Warranties. Without limiting the foregoing, you warrant and agree that your use of the App will not (and will not allow
            any third party to):(a) in any manner:
          </p>
          <ul>
            <li>- involve the sending, uploading, distributing or disseminating any unlawful, defamatory, harassing, abusive, fraudulent,
              obscene, or otherwise objectionable content;
            </li>
            <li>- involve the distribution of any viruses, worms, defects, Trojan horses, corrupted files, hoaxes, or any other items of a
              destructive or deceptive nature;
            </li>
            <li>- involve the uploading, posting, transmitting or otherwise making available through the App any content that infringes the
              intellectual proprietary rights of any party;
            </li>
            <li>- involve using the App to violate the legal rights (such as rights of privacy and publicity) of others;</li>
            <li>- involve engaging in, promoting, or encouraging illegal activity (including, without limitation, money laundering);</li>
            <li>- involve interfering with other users’ enjoyment of the App;</li>
            <li>- involve exploiting the App for any unauthorized commercial purpose;</li>
            <li>- involve modifying, adapting, translating, or reverse engineering any portion of the App;</li>
            <li>- involve removing any copyright, trademark or other proprietary rights notices contained in or on the App or any part of
              it;
            </li>
            <li>- involve reformatting or framing any portion of the App;</li>
            <li>- involve displaying any content on the App that contains any hate-related or violent content or contains any other
              material, products or services that violate or encourage conduct that would violate any criminal laws, any other applicable
              laws, or any third party rights;
            </li>
            <li>- involve using any spider, site search/retrieval application, or other device to retrieve or index any portion of the App
              or the content posted on the App, or to collect information about its users for any unauthorized purpose;
            </li>
            <li>- involve accessing or using the App for the purpose of creating a product or service that is competitive with any of our
              products or services;
            </li>
            <li>- involve abusing, harassing, or threatening another user of the App or any of our authorized representatives, customer
              service personnel, chat board moderators, or volunteers (including, without limitation, filing support tickets with false
              information, sending excessive emails or support tickets, obstructing our employees from doing their jobs, refusing to follow
              the instructions of our employees, or publicly disparaging us by implying favoritism by a our employees or otherwise);
            </li>
            <li>- involve using any abusive, defamatory, ethnically or racially offensive, harassing, harmful, hateful, obscene, offensive,
              sexually explicit, threatening or vulgar language when communicating with another user of the App or any of our authorized
              representatives, customer service personnel, chat board moderators, or volunteers
            </li>
          </ul>
          <br/>
          <p>In any manner:</p>

          <ul>
            <li>- involve creating user accounts by automated means or under false or fraudulent pretenses;</li>
            <li>- involve the impersonation of another person (via the use of an email address or otherwise);</li>
            <li>- involve using, employing, operating, or creating a computer program to simulate the human behavior of a user (“Bots”);
            </li>
            <li>- involve using, employing, or operating Bots or other similar forms of automation to engage in any activity or transaction
              on the App;
            </li>
            <li>- involve the purchasing, selling or facilitating the purchase and sale of any user’s account(s) to other users or third
              parties for cash or cryptocurrency consideration outside of the App;
            </li>
            <li>- otherwise involve or result in the wrongful seizure or other digital assets (each, a
              “Category B Prohibited Activity” and, together with Category A Prohibited Activity, the “Prohibited Activities”).
              Effect of Your Breaches. If you engage in any of the Prohibited Activities, we may, at our sole and absolute discretion,
              without notice or liability to you, and without limiting any of our other rights or remedies at law or in equity, immediately
              suspend or terminate your user account.
            </li>
          </ul>

          <p className={"text-xl font-semibold mt-6"}>5. DISCLAIMERS</p>

          <p>
            YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR ACCESS TO AND USE OF THE APP IS AT YOUR SOLE RISK, AND THAT THE APP PROVIDED
            "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED.
            TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, THE ATOMICLAB AND THEIR RESPECTIVE PARENTS, SUBSIDIARIES,
            AFFILIATES, AND LICENSORS MAKE NO EXPRESS WARRANTIES AND HEREBY DISCLAIM ALL IMPLIED WARRANTIES REGARDING THE APP AND ANY PART
            OF IT INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            NON-INFRINGEMENT, CORRECTNESS, ACCURACY, OR RELIABILITY. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, ATOMICLAB
            AND THEIR PARENTS, SUBSIDIARIES, AFFILIATES, AND LICENSORS DO NOT REPRESENT OR WARRANT TO YOU THAT: (I) YOUR ACCESS TO
            OR USE OF THE APP WILL MEET YOUR REQUIREMENTS; (II) YOUR ACCESS TO OR USE OF THE APP WILL BE UNINTERRUPTED, TIMELY, SECURE OR
            FREE FROM ERROR; (III) USAGE DATA PROVIDED THROUGH THE APP WILL BE ACCURATE; (IV) THE APP OR ANY CONTENT, SERVICES, OR FEATURES
            MADE AVAILABLE ON OR THROUGH THE APP ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (V) THAT ANY DATA THAT YOU DISCLOSE
            WHEN YOU USE THE APP WILL BE SECURE. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES IN CONTRACTS WITH
            CONSUMERS, SO SOME OR ALL OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
          </p>
          <br/>
          <p>
            YOU ACCEPT THE INHERENT SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER THE INTERNET AND AGREE THAT
            ATOMICLAB HAVE NO LIABILITY OR RESPONSIBILITY FOR ANY BREACH OF SECURITY UNLESS IT IS DUE TO THEIR GROSS
            NEGLIGENCE.
          </p>
          <br/>
          <p>
            ATOMICLAB WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSSES YOU INCUR AS THE RESULT OF YOUR USE OF THE NEAR
            NETWORK, OR YOUR ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES OR CLAIMS ARISING FROM: (I) USER ERROR,
            SUCH AS FORGOTTEN PASSWORDS OR INCORRECTLY CONSTRUED SMART CONTRACTS OR OTHER TRANSACTIONS; (II) SERVER FAILURE OR DATA LOSS;
            (III) CORRUPTED WALLET FILES; (IV) UNAUTHORIZED ACCESS OR ACTIVITIES BY THIRD PARTIES, INCLUDING, BUT NOT LIMITED TO, THE USE OF
            VIRUSES, PHISHING, BRUTE-FORCING OR OTHER MEANS OF ATTACK AGAINST THE APP, THE NEAR NETWORK, OR ANY ELECTRONIC WALLET OR (V)
            INCOMPLETE, SLOWED OR DISRUPTED TRANSACTIONS.
          </p>
          <br/>
          <p>
            ATOMICLAB ARE NOT RESPONSIBLE FOR LOSSES DUE TO BLOCKCHAINS OR ANY OTHER FEATURES OF THE NEAR NETWORK, OR ANY
            ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO LATE REPORT BY DEVELOPERS OR REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES
            WITH THE BLOCKCHAIN SUPPORTING THE NEAR NETWORK, INCLUDING FORKS, TECHNICAL NODE ISSUES, OR ANY OTHER ISSUES HAVING FUND LOSSES
            AS A RESULT.</p>

          <p className={"text-xl font-semibold mt-6"}>6. LIMITATION OF LIABILITY</p>

          <p>
            IN NO EVENT SHALL ATOMICLAB BE LIABLE TO YOU FOR ANY PERSONAL INJURY, PROPERTY DAMAGE, LOST PROFITS, COST OF
            SUBSTITUTE GOODS OR SERVICES, LOSS OF DATA, LOSS OF GOODWILL, WORK STOPPAGE, DIMINUTION OF VALUE OR ANY OTHER INTANGIBLE LOSS,
            COMPUTER AND/OR DEVICE OR TECHNOLOGY FAILURE OR MALFUNCTION, OR FOR ANY FORM OF DIRECT OR INDIRECT DAMAGES, AND/OR ANY SPECIAL,
            INCIDENTAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES BASED ON ANY CAUSES OF ACTION WHATSOEVER RELATED TO THE APP. YOU AGREE
            THAT THIS LIMITATION OF LIABILITY APPLIES WHETHER SUCH ALLEGATIONS ARE FOR BREACH OF CONTRACT, TORTIOUS BEHAVIOR, NEGLIGENCE,
            OR FALL UNDER ANY OTHER CAUSE OF ACTION, REGARDLESS OF THE BASIS UPON WHICH LIABILITY IS CLAIMED AND EVEN IF
            A DISCLAIMING PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH LOSS OR DAMAGE.
          </p>
          <br/>
          <p>
            YOU AGREE THAT THE TOTAL, AGGREGATE LIABILITY TO YOU FOR ANY AND ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR
            ACCESS TO OR USE OF (OR YOUR INABILITY TO ACCESS OR USE) ANY PORTION OF THE APP, WHETHER IN CONTRACT, TORT,
            STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, IS LIMITED TO THE GREATER OF THE AMOUNTS YOU HAVE ACTUALLY AND LAWFULLY PAID US
            UNDER THESE TERMS IN THE TWO (2) MONTH PERIOD PRECEDING THE DATE THE CLAIM AROSE.
          </p>
          <br/>
          <p>
            YOU ACKNOWLEDGE AND AGREE THAT WE HAVE MADE THE APP AVAILABLE TO YOU AND ENTERED INTO THESE TERMS IN RELIANCE UPON THE
            REPRESENTATIONS AND WARRANTIES, DISCLAIMERS AND LIMITATIONS OF LIABILITY SET FORTH HEREIN, WHICH REFLECT A REASONABLE AND FAIR
            ALLOCATION OF RISK BETWEEN US AND YOU AND FORM AN ESSENTIAL BASIS OF THE BARGAIN BETWEEN US AND YOU. WE WOULD NOT BE ABLE TO
            PROVIDE THE APP TO YOU WITHOUT THESE LIMITATIONS.
          </p>

          <p className={"text-xl font-semibold mt-6"}>7. ASSUMPTION OF RISK</p>
          <ul>
            <li className={"mb-2"}>
              7.1 Value and Volatility. The rights provided to you are for entertainment purposes only. Without limiting the foregoing, the
              prices of collectible blockchain assets are extremely volatile and subjective and collectible blockchain assets have no
              inherent or intrinsic value.
            </li>
            <li className={"mb-2"}>
              7.2 Tax Calculations. You are solely responsible for determining what, if any, taxes apply to your Collectible-related
              transactions. We are not responsible for determining the taxes that apply to your transactions on the App.
            </li>
            <li className={"mb-2"}>
              7.3 Use of Blockchain. The App store all information in NEAR Blockchain. This information can't be removed or changed after
              creation. All blockchain transaction indexed by The Graph to delivery messages for end users.
            </li>
            <li className={"mb-2"}>
              7.4 Inherent Risks with Internet Currency. There are risks associated with using an Internet-based currency, including, but
              not limited to, the risk of hardware, software and Internet connections, the risk of malicious software introduction, and the
              risk that third parties may obtain unauthorized access to information stored within your electronic wallet. You accept and
              acknowledge that we will not be responsible for any communication failures, disruptions, errors, distortions or delays you may
              experience when using the NEAR Network, however caused.
            </li>
            <li className={"mb-2"}>
              7.5 Regulatory Uncertainty. The regulatory regime governing blockchain technologies, cryptocurrencies and tokens is uncertain,
              and new regulations or policies may materially adversely affect the development of NEAR ecosystem or ChatMe service.
            </li>
            <li>
              7.6 Software Risks. Upgrades to the NEAR Network, a hard fork in the NEAR Network, or a change in how transactions are
              confirmed on the NEAR Network may have unintended, adverse effects on all blockchains using the NEAR Network’s standard,
              including the ChatMe service.
            </li>
          </ul>

          <p className={"text-xl font-semibold mt-6"}>8. INDEMNIFICATION</p>

          <p>
            You agree to hold harmless and indemnify each of AtomicLab and each of their respective parents, subsidiaries,
            affiliates, officers, agents, employees, advertisers, licensors, suppliers or partners from and against any claim, liability,
            loss, damage (actual and consequential) of any kind or nature, suit, judgment, litigation cost and attorneys' fees arising out
            of or in any way related to: (i) your breach of these Terms; (ii) your misuse of the App; (iii) your violation of applicable
            laws, rules or regulations in connection with your access to or use of the App or (iv) any other of your activities in
            connection with App. You agree that we will have control of the defense or settlement of any such claims.
          </p>

          <p className={"text-xl font-semibold mt-6"}>9. EXTERNAL SITES</p>

          <p>
            The App may include hyperlinks to other websites or resources (collectively, the “External Sites”), which are provided solely as
            a convenience to our users. We have no control over any External Sites. You acknowledge and agree that we are not responsible
            for the availability of any External Sites, and that we do not endorse any advertising, products or other materials on or made
            available from or through any External Sites. Furthermore, you acknowledge and agree that we are not liable for any loss or
            damage which may be incurred as a result of the availability or unavailability of the External Sites, or as a result of any
            reliance placed by you upon the completeness, accuracy or existence of any advertising, products or other materials on, or made
            available from, any External Sites.
          </p>

          <p className={"text-xl font-semibold mt-6"}>10. FORCE MAJEURE</p>

          <p className={"mb-2"}>
            10.1 Force Majeure Events. AtomicLab will not be liable or responsible to the you, nor be deemed to have defaulted
            under or breached these Terms, for any failure or delay in fulfilling or performing any of these Terms, when and to the extent
            such failure or delay is caused by or results from the following force majeure events (“Force Majeure Event(s)”): (a) flood,
            fire, earthquake, epidemics, pandemics, including the 2019 novel coronavirus pandemic (COVID-19), tsunami, explosion; (b) war,
            invasion, hostilities (whether war is declared or not), terrorist threats or acts, riot or other civil unrest; (c) government
            order, law, or action; (d) embargoes or blockades in effect on or after the date of this agreement; (e) strikes, labor stoppages
            or slowdowns or other industrial disturbances; (f) shortage of adequate or suitable Internet connectivity, telecommunication
            breakdown or shortage of adequate power or electricity; and (g) other similar events beyond our control.
          </p>
          <p>
            10.2 Performance During Force Majeure Events. If we suffer a Force Majeure Event, we will use reasonable efforts to promptly
            notify you of the Force Majeure Event, stating the period of time the occurrence is expected to continue. We will use diligent
            efforts to end the failure or delay and ensure the effects of such Force Majeure Event are minimized. We will resume the
            performance of our obligations as soon as reasonably practicable after the removal of the cause. In the event that our failure
            or delay remains uncured for a period of forty-five (45) consecutive days following written notice given by us under this
            Section 11, we may thereafter terminate these Terms upon fifteen (15) days' written notice.
          </p>

          <p className={"text-xl font-semibold mt-6"}>11. CHANGES TO THE APP</p>

          <p>
            We are constantly innovating the App to help provide the best possible experience. You acknowledge and agree that the form and
            nature of the App, and any part of it, may change from time to time without prior notice to you, and that we may add new
            features and change any part of the App at any time without notice.
          </p>

          <p className={"text-xl font-semibold mt-6"}>12. CHILDREN</p>

          <p>
            You affirm that you are over the age of 18. The App is not intended for children under 18. If you are under the age of 18, you
            may not use the App. We do not knowingly collect information from or direct any of our content specifically to children under
            the age of 18. If we learn or have reason to suspect that you are a user who is under the age of 18, we will unfortunately have
            to close your account. Other countries may have different minimum age limits, and if you are below the minimum age for providing
            consent for data collection in your country, you may not use the App.
          </p>

          <p className={"text-xl font-semibold mt-6"}>13. PRIVACY POLICY</p>

          <p>
            Our <Link to={"privacy"}>Privacy Policy</Link> describes the ways we collect, use, store and disclose your personal information,
            and is hereby incorporated by this reference into these Terms. You agree to the collection, use, storage, and disclosure of your
            data in accordance with our Privacy Policy.
          </p>

          <br/>
          <p>Last Updated Date: 01 December 2022.</p>
        </div>
      </div>

    </Layout>
  );
};
