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
  canvas_front: string;
  canvas_back: string;
}

// add flashcard ID to this so that we accept that as well
// can use that to make the axios calls afterwards


const testCollection: collection[] = [
  {
    id: 1,
    deck_title: "Fake Deck",
    term: "firewall",
    definition: "Use the cross-platform JBOD panel, then you can transmit the solid state circuit!",
    confidenceLevel: 9,
    keywords: "normal, Administrator",
    collectionid: 3,
    archived: 0,
    starred: 0,
    canvas_front: '{"rectangles":[{"x":472,"y":95,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect1"}],"circles":[{"x":329,"y":203,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ2"}],"lines":[{"points":[50,50,125,50],"stroke":"black","strokeWidth":5,"fill":"black","id":"line3","x":153,"y":42}],"texts":[{"x":804.0000000000013,"y":21,"fill":"black","align":"center","text":"hello","id":"text4","width":761.7808988040487,"height":360.55633943856986,"fontSize":360.55633943856986}],"number":4}',
    canvas_back: '{"rectangles":[{"x":1103,"y":96,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect1"},{"x":906,"y":201,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect5"}],"circles":[{"x":671.601766452995,"y":205.3982335470053,"width":201.77868029109925,"height":201.77868029109933,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ2"}],"lines":[{"points":[50,50,125,50],"stroke":"black","strokeWidth":5,"fill":"black","id":"line3","x":153,"y":42}],"texts":[{"x":358.00000000000125,"y":-33,"fill":"black","align":"center","text":"hello","id":"text4","width":761.7808988040487,"height":360.55633943856986,"fontSize":360.55633943856986}],"number":5}'
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
    starred: 0,
    canvas_front: '{"rectangles":[],"circles":[{"x":907.3807883808756,"y":214.61921161912446,"width":237.85982498836532,"height":237.85982498836518,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ3"}],"lines":[{"points":[50,50,125,50],"stroke":"black","strokeWidth":5,"fill":"black","id":"line2","x":72,"y":27}],"texts":[{"x":230.00000000000006,"y":151.99999999999997,"fill":"black","align":"center","text":"ONE WAT","id":"text1","width":258.51600851226004,"height":56.75214765067088,"fontSize":56.75214765067088}],"number":3}',
    canvas_back: '{"rectangles":[{"x":270,"y":170,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect4"}],"circles":[{"x":591.3807883808756,"y":249.61921161912446,"width":237.85982498836532,"height":237.85982498836518,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ3"}],"lines":[{"points":[50,50,125,50],"stroke":"black","strokeWidth":5,"fill":"black","id":"line2","x":72,"y":27}],"texts":[{"x":230.00000000000006,"y":151.99999999999997,"fill":"black","align":"center","text":"ONE WAT","id":"text1","width":258.51600851226004,"height":56.75214765067088,"fontSize":56.75214765067088}],"number":4}'
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
    starred: 0,
    canvas_front: '{"rectangles":[{"x":332.1487037800322,"y":47.37736963293512,"width":175.47392658703308,"height":175.4739265870331,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect4"}],"circles":[{"x":591.3807883808756,"y":249.61921161912446,"width":237.85982498836532,"height":237.85982498836518,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ3"},{"x":341.4859503774878,"y":261.514049622512,"width":255.47336558913273,"height":255.47336558913273,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ5"}],"lines":[{"points":[50,50,125,50],"stroke":"black","strokeWidth":5,"fill":"black","id":"line2","x":72,"y":27}],"texts":[{"x":230.00000000000006,"y":151.99999999999997,"fill":"black","align":"center","text":"ONE WAT","id":"text1","width":258.51600851226004,"height":56.75214765067088,"fontSize":56.75214765067088}],"number":5}',
    canvas_back: '{"rectangles":[{"x":624.1487037800322,"y":47.377369632935114,"width":175.47392658703308,"height":175.4739265870331,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect4"}],"circles":[{"x":524.3807883808756,"y":109.61921161912446,"width":237.85982498836532,"height":237.85982498836518,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ3"},{"x":640.4859503774878,"y":284.514049622512,"width":255.47336558913273,"height":255.47336558913273,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ5"}],"lines":[{"points":[50,50,125,50],"stroke":"black","strokeWidth":5,"fill":"black","id":"line2","x":72,"y":27}],"texts":[{"x":230.00000000000006,"y":151.99999999999997,"fill":"black","align":"center","text":"ONE WAT","id":"text1","width":258.51600851226004,"height":56.75214765067088,"fontSize":56.75214765067088}],"number":5}'
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
    starred: 1,
    canvas_front: '{"rectangles":[{"x":624.1487037800322,"y":47.377369632935114,"width":175.47392658703308,"height":175.4739265870331,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect4"}],"circles":[{"x":471.38078838087563,"y":223.61921161912448,"width":237.85982498836532,"height":237.85982498836518,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ3"},{"x":294.4859503774878,"y":117.514049622512,"width":255.47336558913273,"height":255.47336558913273,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ5"}],"lines":[{"points":[50,50,125,50],"stroke":"black","strokeWidth":5,"fill":"black","id":"line2","x":72,"y":27}],"texts":[{"x":230.00000000000006,"y":151.99999999999997,"fill":"black","align":"center","text":"ONE WAT","id":"text1","width":258.51600851226004,"height":56.75214765067088,"fontSize":56.75214765067088}],"number":5}',
    canvas_back: ''
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
    starred: 0,
    canvas_front: '',
    canvas_back: '{"rectangles":[{"x":624.1487037800322,"y":47.377369632935114,"width":175.47392658703308,"height":175.4739265870331,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect4"}],"circles":[{"x":736.3807883808756,"y":297.6192116191245,"width":237.85982498836532,"height":237.85982498836518,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ3"},{"x":294.4859503774878,"y":117.514049622512,"width":255.47336558913273,"height":255.47336558913273,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ5"}],"lines":[{"points":[50,50,125,50],"stroke":"black","strokeWidth":5,"fill":"black","id":"line2","x":72,"y":27}],"texts":[{"x":230.00000000000006,"y":151.99999999999997,"fill":"black","align":"center","text":"ONE WAT","id":"text1","width":258.51600851226004,"height":56.75214765067088,"fontSize":56.75214765067088}],"number":5}'
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
    starred: 1,
    canvas_front: '{"rectangles":[{"x":624.1487037800322,"y":47.377369632935114,"width":175.47392658703308,"height":175.4739265870331,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect4"},{"x":412,"y":339,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect8"}],"circles":[{"x":615.3807883808756,"y":244.61921161912448,"width":237.85982498836532,"height":237.85982498836518,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ3"},{"x":373.4859503774878,"y":200.514049622512,"width":255.47336558913273,"height":255.47336558913273,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ5"},{"x":374,"y":254,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ6"},{"x":602,"y":285,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ7"}],"lines":[{"points":[50,50,125,50],"stroke":"black","strokeWidth":5,"fill":"black","id":"line2","x":72,"y":27}],"texts":[{"x":230.00000000000006,"y":151.99999999999997,"fill":"black","align":"center","text":"ONE WAT","id":"text1","width":258.51600851226004,"height":56.75214765067088,"fontSize":56.75214765067088}],"number":8}',
    canvas_back: '{"rectangles":[],"circles":[],"lines":[],"texts":[{"x":54,"y":96.00000000000007,"fill":"black","align":"center","text":"HELOLO","id":"text1","width":965.9959153676622,"height":238.0984034989737,"fontSize":238.0984034989737}],"number":1}'
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
    starred: 0,
    canvas_front: '{"rectangles":[],"circles":[],"lines":[],"texts":[],"number":0}',
    canvas_back: '{"rectangles":[{"x":480,"y":47,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"rect3"}],"circles":[{"x":346,"y":117,"width":100,"height":100,"fill":"rgba(0,0,0,0.01)","strokeWidth":1,"stroke":"black","id":"circ2"}],"lines":[{"points":[49.99999999999997,50.000000000000234,124.99999999999993,50.000000000000234],"stroke":"black","strokeWidth":5,"fill":"black","id":"line4","rotation":89.618033795271,"x":132.9155685551223,"y":12.168618453458834}],"texts":[{"x":49.99999999999995,"y":50.00000000000002,"fill":"black","align":"center","text":"Last card","id":"text1","width":503.6330773913844,"height":122.44071017302412,"fontSize":122.44071017302413}],"number":4}'
  }
];

export {testCollection}

