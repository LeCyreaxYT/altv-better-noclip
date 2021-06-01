# AltV Better NoClip - Documentation

This NoCLip version work with players and vehicles if you find errors or bugs then make a issue.

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
    TOGGLE: 166,
    
    MOVEUPONLY: 32,
    MOVEDOWNONLY: 33,
    MOVELEFTONLY: 34,
    MOVERIGHTONLY: 35,

    MOVEUP: 268,
    MOVEDOWN: 269,
    MOVELEFT:  266,
    MOVERIGHT: 267,

    MOVEUD: 31,
    MOVELR: 30,

    COVER: 44,
    SPRINT: 21,
    RADIOWHEEL: 85,
    HORN: 86,
    HEADLIGHT: 74
}
```
