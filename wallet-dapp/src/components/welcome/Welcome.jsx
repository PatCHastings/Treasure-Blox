import React from "react";
import "./welcome.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import imageSrc from "./EtherMine-entrance.webp";
import "react-lazy-load-image-component/src/effects/blur.css";

function Welcome() {
  return (
    <div className="welcome-container">
      <div className="logo-container"></div>
      <div className="content-section">
        <h2>- Wecome to -</h2>
        <h1>TreasureBlox!</h1>
        <p>
          Discover the adventures and possibilities within the TreasureBlox
          cryptoverse. Engage with the community, earn resources, and explore!
        </p>
        <div className="about-section">
          <h2>About TreasureBlox</h2>
          <p>
            ERC-20 smart contract and TBX token for staking to mint your ERC-721
            mining plot. TBX staking amount determines NFT resource yield, while
            staking duration determines resource load. Total TBX supply:
            100,000,000.
          </p>
        </div>
        <div className="how-to-play">
          <h2>How to Play</h2>
          <p>
            Obtain a share of TBX tokens, then enter the Mines.. Start staking
            to start a mine, which is an ERC-721 NFT. The resources within are
            determined by your TBX. Use the forge to craft these into new NFTs
            that could prove useful in your quest for ever greater value and
            power..
          </p>
        </div>
        <div className="announcements">
          <h2>Announcements</h2>
          <p>
            Stay updated with the latest news, updates, and events from
            TreasureBlox. Don't miss out!
          </p>
        </div>
        <div className="community-links">
          <h2>Join Our Community</h2>
          <ul>
            <li>
              <a href="https://forum.treasureblox.com">Community Forum</a>
            </li>
            <li>
              <a href="https://discord.treasureblox.com">Discord Channel</a>
            </li>
            <li>
              <a href="https://twitter.treasureblox.com">Twitter Page</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
