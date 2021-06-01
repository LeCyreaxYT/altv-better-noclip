# AltV Better NoClip - Documentation

This NoClip version work with players and vehicles if you find errors or bugs then make a issue.

```
altVServer/
└── resources/
    └── BetterNoClip/
        ├── client.js
        ├── server.js
        ├── package.json
        └── resource.cfg
```

**Controls:**
```
  - F5 = Toggle NoClip
  - H = Toggle Cam Mode in Vehicle
  - Q = UP
  - E = DOWN
  - W = MOVE FORWAR
  - S = MOVE BACK
  - D = MOVE RIGHT
  - A = MOVE LEFT
  - SCHIFT = Change Speed
```

**Configs: (In client.js):**
```
const PlayerVisible = false;

const SpeedsCount = 7;
const speeds = {
    0: "Very Slow",
    1: "Slow",
    2: "Normal",
    3: "Fast",
    4: "Very Fast",
    5: "Extremely Fast",
    6: "Extremely Fast v2.0",
    7: "Max Speed"
}

const KeyInfos = {
    SpeedKey: "~INPUT_SPRINT~",
    LeftRightKey: "~INPUT_MOVE_LR~",
    MoveKey: "~INPUT_MOVE_UD~",
    DownKey: "~INPUT_VEH_HORN~",
    UpKey: "~INPUT_COVER~",
    CamModeKey: "~INPUT_VEH_HEADLIGHT~",

}

const KeyControls = {
    ToggleAltV: 116,
    ToggleGTA: 166,

    MoveUpOnly: 32,
    MoveDownOnly: 33,
    MoveLeftOnly: 34,
    MoveRightOnly: 35,

    MoveUP: 268,
    MoveDown: 269,
    MoveLeft: 266,
    MoveRight: 267,

    MoveUD: 31,
    MoveLR: 30,

    Cover: 44,
    Spring: 21,
    RadioWheel: 85,
    Horn: 86,
    HeadLight: 74
}
```
