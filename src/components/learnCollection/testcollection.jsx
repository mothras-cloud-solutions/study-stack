import React, { useState } from "react";

interface collection {
  term: string;
  definition: string;
  confidenceLevel: number;
  keywords: string;
  collectionid: number;
}

let testCollection: collection[] = [
  {
    "term": "firewall",
    "definition": "Use the cross-platform JBOD panel, then you can transmit the solid state circuit!",
    "confidenceLevel": 9,
    "keywords": "normal, Administrator",
    collectionid: 3
  },
  {
    "term": "program",
    "definition": "Use the back-end UTF8 capacitor, then you can generate the auxiliary pixel!",
    "confidenceLevel": 7,
    "keywords": "Market, Peso, apud",
    collectionid: 3
  },
  {
    "term": "transmitter",
    "definition": "Try to copy the IB firewall, maybe it will hack the redundant firewall!",
    "confidenceLevel": 3,
    "keywords": "purple",
    collectionid: 3
  }
];