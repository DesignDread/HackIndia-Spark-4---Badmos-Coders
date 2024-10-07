  import Background  from "../assets/Background.png";
  import Cup  from "../assets/Cup.png";
  import StakeNSeek from "../assets/Stake-N-Seek.png";
  import float1 from   "../assets/float1.png"; 
  import float2 from   "../assets/float2.png"; 
  import float3 from   "../assets/float3.png"; 
  import float4 from   "../assets/float4.png"; 
  import Roadmap1 from "../assets/Roadmap1.png";
  import Roadmap2 from "../assets/Roadmap2.png";
  import Roadmap3 from "../assets/Roadmap3.png";
  import Roadmap4 from "../assets/Roadmap4.png";
  import rules from "../assets/rules.png";
  import Loader from "../assets/Loading.png"
  import piratesBg from "../assets/piratesBg.jpg";
  import Pirate1 from "../assets/Pirates1.png";
  import Pirate2 from "../assets/Pirates2.png";
  import Pirate3 from "../assets/Pirates3.png";
  import Pirate4 from "../assets/Pirates4.png";
  

  export const navLinks = [
    {
      id: "hero",
      title: "Camp",
    },
  
    {
      id: "About",
      title: "Expedition",
    },
    {
      id: "work",
      title: "Roadmap",
    },
    {
      id: "rules",
      title: "Rules",
    },
  ];
  
  

  // src/constants/roadmapData.js
  const roadmap = [
    {
      title: "Stake & Explore",
      points: [
        "Travelers stake tokens at real-world locations to join treasure hunts.",
        "Each location has unique challenges tied to landmarks, hidden spots, or cultural sites."
      ],
      image: `${Roadmap1}`,  // Add image link here
    },
    {
      title: "Complete Challenges",
      points: [
        "Solve puzzles, complete quests, or find hidden treasures.",
        "Challenges are transparent and stored immutably on the blockchain."
      ],
      image: `${Roadmap2}`,  // Add image link here
    },
    {
      title: "Earn Rewards",
      points: [
        "Unlock unique NFT rewards and crypto prizes (ETH) by completing challenges.",
        "All rewards are verifiable and securely distributed via smart contracts."
      ],
      image: `${Roadmap3}`,  // Add image link here
    },
    {
      title: "Fair & Secure",
      points: [
        "Blockchain ensures transparency in staking, participation, and rewards.",
        "All data is stored on-chain, making hunts tamper-proof."
      ],
      image: `${Roadmap4}`,  // Add image link here
    },
  ];
  
 
  
  export  {   Background , Cup , StakeNSeek , roadmap ,float1 , float2 , float3 , float4 , rules ,Loader , piratesBg , Pirate1 , Pirate2 , Pirate3 , Pirate4 } ;