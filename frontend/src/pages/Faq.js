import React, { useState } from "react";
import { Layout } from "./Layout";

export const Faq = () => {
  const [openedIndex, setOpenedIndex] = useState(0);

  const OneQuestion = ({ title, index, children }) => (
    <div
      onClick={() => setOpenedIndex(index)}
      className={`mb-6 relative 
      ${index === openedIndex ? "cursor-default" : "cursor-pointer"}
      ${index !== 16 ? "border-b border-white/20" : "mb-20"}`}>
      <div
        className={`absolute w-10 h-10 rounded-full text-center middle top-0 right-0
        ${
          index === openedIndex
            ? "bg-sky-900 cursor-default opacity-50"
            : "bg-sky-900 cursor-pointer"
        }`}
      >
        <span className="inline-block pt-1 text-2xl font-semibold">
          {index === openedIndex ? "−" : "+"}
        </span>
      </div>

      <div className={`text-2xl font-semibold mb-6`}>{title}</div>
      <div className={`text-gray-300/90 ${index === openedIndex ? "h-auto mb-6" : "h-0"} pr-16 overflow-hidden transition`}>
        {children}
      </div>
    </div>
  )

  return (
    <Layout>

      <div className={"mt-32 text-gray-200 container"}>
        <h1 className={"text-black dark:text-white font-bold text-3xl sm:text-4xl md:text-[45px] text-center"}>
          Frequently Asked Questions
        </h1>
        <div className={"text-base mt-16 mx-auto max-w-4xl"}>

          <OneQuestion
            title={"What is ChatMe"}
            index={1}
          >
            <p>
              ChatMe is chats and messages service build on
              <a href="https://near.org/" className={"faq-link"} target={"_blank"}>
                NEAR blockchain
              </a>
              that combine the best user experience, security, fast and cheap transactions with new web3 possibilities.
            </p>
            <p className={"mt-3"}>
              Our service provide direct messages between native NEAR accounts, public and private chats, broadcasting channels and other
              great features for communication and data sharing. ChatMe is open-source and well documented to simplify integration into
              any project in NEAR ecosystem.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"How to start using our service"}
            index={2}
          >
            <p>
              To use ChatMe you need only NEAR account with small amount of NEAR tokens. If you don't have this account, we prepared more
              details below: how to create new account and get NEAR tokens.
            </p>
            <p className={"mt-3"}>
              When account created, just click "Connect Wallet" button in top-left corner of our website and select wallet that you used to
              create you account. On next step allow ChatMe to get access to your account (access only for 0.25 NEAR to cover blockchain
              transactions). When your account connected click "Launch App", you will be able to send messages, create groups and use our
              service.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"How to create NEAR wallet"}
            index={3}
          >
            <p>
              <b>Option 1 - desktop browser or ledger hardware wallet.</b><br/>
              It is really simple process, just open:
              <a href="https://wallet.near.org" className={"faq-link"} target={"_blank"}>
                https://wallet.near.org
              </a>
              and click "Create Account". Follow few steps guide to receive
              Seed Phrase (save it in secure place and NEVER share with other users, this phrase provide full access to your wallet). As
              result you will have registered wallet address (unique 64 characters string) that can be used to deposit NEAR tokens and use
              ChatMe service.
            </p>
            <p className={"mt-3"}>
              <b>Option 2 - mobile phone.</b><br/>
              You can install
              <a href="https://herewallet.app/" className={"faq-link"} target={"_blank"}>
                HERE wallet
              </a>
              in your iOS/Android phone. Follow simple instructions to create new account in your mobile
              phone and deposit NEAR tokens. In ChatMe website click "Connect Wallet", chose HERE wallet and scan QR-code to allow access to
              your account for our service.
            </p>
            <p className={"mt-3"}>
              <b>Option 3 - browser wallet extensions.</b><br/>
              Install
              <a href="https://meteorwallet.app/" className={"faq-link"} target={"_blank"}>
                Meteor wallet
              </a>
              extension for Google Chrome or Brave browser and use it to connect with our service. You can
              find all details how to create new account using Meteor wallet in their website
              <a href="https://meteorwallet.app/" className={"faq-link"} target={"_blank"}>
                "Simple Onboarding"
              </a>
              section. Next step is deposit NEAR tokens to use it with our service.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"How to buy NEAR token"}
            index={4}
          >
            <ul>
              <li>
                1. Register account in crypto exchange or use existing one. You can use one of the exchanges:
                <a href="https://www.binance.com/" className={"faq-link"} target={"_blank"}>
                  Binance
                </a>,
                <a href="https://www.huobi.com/" className={"faq-link"} target={"_blank"}>
                  Huobi
                </a>,
                <a href="https://www.kucoin.com/" className={"faq-link"} target={"_blank"}>
                  Kukoin.
                </a>
              </li>
              <li>
                2. After registration you may need to verify/approve your account.
              </li>
              <li>
                3. Now you can deposit fiat currency using one of provided payment methods that best suits for you.
              </li>
              <li>
                4. After deposit confirmation you can exchange your funds for NEAR. On easier-to-use exchanges, this is as easy as entering
                the amount you want to purchase and clicking buy.
              </li>
              <li>
                5. Withdraw NEAR tokens to your Wallet address (existing or registered on previous step). Use "NEAR" network when you
                withdraw your tokens.
              </li>
            </ul>
          </OneQuestion>

          <OneQuestion
            title={"How much NEAR tokens I need to use ChatMe?"}
            index={5}
          >
            <p>
              We recommend at least 0.5 NEAR to cover gas usage for blockchain transactions. If you buy NEAR tokens first time, don't forget
              to include transaction fees that you pay on withdraw NEAR tokens from crypto exchange.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"Main reasons why ChatMe was created"}
            index={6}
          >
            <p>
              ChatMe was created to extend communication and data sharing in NEAR ecosystem. Also we found new possibilities for chats based
              on web3 technologies that simplify work with NFT, tokens and smart-contracts.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"Why we choose NEAR blockchain"}
            index={8}
          >
            <p>
              NEAR is fast and secure blockchain with cheap transactions and great community. NEAR blockchain provide great user experience
              for new users, you don't need to install wallets or extensions to start using NEAR ecosystem, only your web browser.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"Can I start using ChatMe for free?"}
            index={7}
          >
            <p>
              Yes, you can start for free, all you need is small amount of NEAR tokens to cover blockchain gas usage.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"Difference between ChatMe and other chatting apps"}
            index={9}
          >
            <p>
              For telegram or other messenger you connect by phone number or nickname. ChatMe can be used directly with native NEAR address
              and we build it to cover NEAR ecosystem needs. We don't try to replace telegram, viber, whatsApp or other
              messenger, but who knows :)
            </p>
          </OneQuestion>

          <OneQuestion
            title={"Please provide more details about encoding and Private Mode"}
            index={10}
          >
            <p>
              All data in blockchain is publicly available but for direct messages we build private mode that encode data before sending to
              blockchain and decode in other side. For this process we use
              <a href="https://github.com/NEARFoundation/near-js-encryption-box" className={"faq-link"} target={"_blank"}>
                near-js-encryption-box library
              </a>.
            </p>
            <p>
              To start using private mode your account need Gold Level. Open direct conversation and click "lock" icon to request privacy
              mode. You will receive a notification when request accepted and Private Mode will automatically be turned on
              (red color for the background and icons show that Private Mode is enabled).
            </p>
            <p className={"mt-3 text-red-300"}>
              NOTE: Private Mode not work in public/private chats, it is available only for direct conversations.
            </p>
            <p className={"mt-3 text-red-300"}>
              We recommend to not send passwords or other important information because maybe in future current encoding algorithms can
              become insecure. You can find more details how encryption works and security details in our documentation.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"What is Account Levels"}
            index={12}
          >
            <p>
              When we provide so cheap and fast messages there is area for spammers. That's why we add Account Levels to prevent spam in our
              messages. For example if you start sending spam from free account and 10 people report about spam in your messages, your
              account will be completely locked. If user pay for higher account level, we provide more trust and temporary lock account for
              few minutes after spam reports.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"ChatMe role in NEAR ecosystem"}
            index={13}
          >
            <p>
              Main role and value - we provide communication for accounts and projects in NEAR ecosystem. Any project can implement our
              features and receive all benefits of communication between accounts or groups of people. For users it extend their abilities
              and provide central point for all conversations and chats: if you use different services that integrated with ChatMe, have
              direct messages with accounts or participate in groups - all this chats and channels will be available in our main website.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"Can I use mobile phone to receive and send messages?"}
            index={14}
          >
            <p>
              Yes, all you need is web browser with NEAR wallet account. You can create this account on your mobile phone or import existing
              account using account Seed Phrase.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"Do we collaborate with other projects in the NEAR ecosystem?"}
            index={15}
          >
            <p>
              Yes, we opened and ready for technical and social collaborations with other teams and projects.
              You can find ChatMe use cases in our
              <a href="https://chatme.gitbook.io/chatme/use-cases-and-benefits" className={"faq-link"} target={"_blank"}>documentation</a>
              and integrate our features in your project (technical partnership). For social partnerships please contact us to discuss
              details.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"Our team history and experience"}
            index={11}
          >
            <p>
              We are team of talented people that work with web3 projects in different chains but NEAR is our favourite one. We also create
              <a href="https://zomland.com/" className={"faq-link"} target={"_blank"}>
                ZomLand
              </a>
              NFT collectible game on NEAR. Main our focus at the moment is to build quality applications and games to extend NEAR
              ecosystem.
            </p>
            <p className={"mt-3"}>
              In general ChatMe was build in 3 months by
              <a href="https://twitter.com/vlodkowZ" className={"faq-link"} target={"_blank"}>
                Vlodkow
              </a>
              and if we talk about my experience:
              I started from web development 15 years ago and completely switched to web3 development 2 years ago to find new
              possibilities and move development to new level.
            </p>
          </OneQuestion>

          <OneQuestion
            title={"Where can you find additional information"}
            index={16}
          >
            <p>
              Our
              <a href="https://chatme.gitbook.io/chatme/" className={"faq-link"} target={"_blank"}>
                documentation
              </a>
              contain all information about ChatMe. <br/>
              Join our social channels to get updates:
            </p>
            <ul className={"mt-3"}>
              <li>
                <a href="https://twitter.com/chatme_near" className={"faq-link"} target={"_blank"}>
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://t.me/chatme_near" className={"faq-link"} target={"_blank"}>
                  Telegram
                </a>
              </li>
              <li>
                <a href="/my/group/1" className={"faq-link"}>
                  ChatMe public Channel
                </a>
              </li>
            </ul>
            <p className={"mt-3"}>
              If you have additional questions, you can ask in our
              <a href="https://discord.gg/pcvvn4EJpa" className={"faq-link"} target={"_blank"}>
                discord.
              </a>
            </p>
          </OneQuestion>

        </div>
      </div>

    </Layout>
  );
};
