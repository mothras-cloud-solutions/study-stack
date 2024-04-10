export interface collection {

  id: number;
  deck_title: string;
  term: string;
  definition: string;
  confidenceLevel: number;
  keywords: string;
  collectionid: number;
  archived: number;
  starred: number;
}

// add flashcard ID to this so that we accept that as well
// can use that to make the axios calls afterwards


let testCollection: collection[] = [
  {
    id: 1,
    deck_title: "Fake Deck",
    term: "firewall",
    definition: "Use the cross-platform JBOD panel, then you can transmit the solid state circuit!",
    confidenceLevel: 9,
    keywords: "normal, Administrator",
    collectionid: 3,
    archived: 0,
    starred: 0
  },
  {
    id:2,
    deck_title: "Fake Deck",
    term: "program",
    definition: "Use the back-end UTF8 capacitor, then you can generate the auxiliary pixel!",
    confidenceLevel: 7,
    keywords: "Market, Peso, apud",
    collectionid: 3,
    archived: 0,
    starred: 0
  },
  {
    id: 3,
    deck_title: "Fake Deck",
    term: "transmitter",
    definition: "Try to copy the IB firewall, maybe it will hack the redundant firewall!",
    confidenceLevel: 3,
    keywords: "purple",
    collectionid: 3,
    archived: 1,
    starred: 0
  },
  {
    id: 4,
    deck_title: "Fake Deck",
    term: "bandwidth",
    definition: "I'll compress the online SSL matrix, that should hard drive the DNS pixel!",
    confidenceLevel: 1,
    keywords: "Chair",
    collectionid: 3,
    archived: 0,
    starred: 1
  },
  {
    id: 5,
    deck_title: "Fake Deck",
    term: "circuit",
    definition: "We need to index the optical API feed!",
    confidenceLevel: 3,
    keywords: "Liaison, colorful, however",
    collectionid: 3,
    archived: 0,
    starred: 0
  },
  {
    id: 6,
    deck_title: "Fake Deck",
    term: "interface",
    definition: "I'll input the neural SMTP alarm, that should matrix the PCI array!",
    confidenceLevel: 8,
    keywords: "blah",
    collectionid: 3,
    archived: 0,
    starred: 1
  },
  {
    id: 7,
    deck_title: "Fake Deck",
    term: "orange",
    definition: "The DRAM interface is down, back up the bananas application so we can transmit the FTP microchip!",
    confidenceLevel: 10,
    keywords: "Handmade, female",
    collectionid: 3,
    archived: 0,
    starred: 0
  }
];

export {testCollection}

