import React, { useState } from "react";
import StudyCards from './StudyCards.tsx';
import { collection, testCollection } from './Interfaces.tsx';

// use this test to call index.tsx

export default function StudyPageTest () {




  return (<StudyCards prop={testCollection} />)
}