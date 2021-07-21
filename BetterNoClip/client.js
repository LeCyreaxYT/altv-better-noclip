import * as alt from 'alt-client';
import * as game from 'natives';

// DO NOT EDIT //
let NoclipActive = false;
let MovingSpeed = 0;
let Scale = -1;
let FollowCamMode = true;

// THIS CAN YOU EDIT //
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

// CODE - DO NOT EDIT

alt.everyTick(() => {
    if (NoclipActive)
    {
        Scale = game.requestScaleformMovie("INSTRUCTIONAL_BUTTONS");

        if(!game.isHudHidden()) {
            game.beginScaleformMovieMethod(Scale, "CLEAR_ALL");
            game.endScaleformMovieMethod();

            game.beginScaleformMovieMethod(Scale, "SET_DATA_SLOT");
            game.scaleformMovieMethodAddParamInt(0);
            game.scaleformMovieMethodAddParamTextureNameString(KeyInfos.SpeedKey);
            game.scaleformMovieMethodAddParamTextureNameString("Change Speed (" + speeds[MovingSpeed] + ")");
            game.endScaleformMovieMethod();

            game.beginScaleformMovieMethod(Scale, "SET_DATA_SLOT");
            game.scaleformMovieMethodAddParamInt(1);
            game.scaleformMovieMethodAddParamTextureNameString(KeyInfos.LeftRightKey);
            game.scaleformMovieMethodAddParamTextureNameString("Turn Left/Right");
            game.endScaleformMovieMethod();

            game.beginScaleformMovieMethod(Scale, "SET_DATA_SLOT");
            game.scaleformMovieMethodAddParamInt(2);
            game.scaleformMovieMethodAddParamTextureNameString(KeyInfos.MoveKey);
            game.scaleformMovieMethodAddParamTextureNameString("Move");
            game.endScaleformMovieMethod();

            game.beginScaleformMovieMethod(Scale, "SET_DATA_SLOT");
            game.scaleformMovieMethodAddParamInt(3);
            game.scaleformMovieMethodAddParamTextureNameString(KeyInfos.DownKey);
            game.scaleformMovieMethodAddParamTextureNameString("Down");
            game.endScaleformMovieMethod();

            game.beginScaleformMovieMethod(Scale, "SET_DATA_SLOT");
            game.scaleformMovieMethodAddParamInt(4);
            game.scaleformMovieMethodAddParamTextureNameString(KeyInfos.UpKey);
            game.scaleformMovieMethodAddParamTextureNameString("Up");
            game.endScaleformMovieMethod();

            game.beginScaleformMovieMethod(Scale, "SET_DATA_SLOT");
            game.scaleformMovieMethodAddParamInt(5);
            game.scaleformMovieMethodAddParamTextureNameString(KeyInfos.CamModeKey);
            game.scaleformMovieMethodAddParamTextureNameString("Cam Mode");
            game.endScaleformMovieMethod();

            game.beginScaleformMovieMethod(Scale, "SET_DATA_SLOT");
            game.scaleformMovieMethodAddParamInt(6);
            game.scaleformMovieMethodAddParamTextureNameString(game.getControlInstructionalButton(0, KeyControls.ToggleGTA, true));
            game.scaleformMovieMethodAddParamTextureNameString("Toggle NoClip");
            game.endScaleformMovieMethod();

            game.beginScaleformMovieMethod(Scale, "DRAW_INSTRUCTIONAL_BUTTONS");
            game.scaleformMovieMethodAddParamInt(0);
            game.endScaleformMovieMethod();

            game.drawScaleformMovieFullscreen(Scale, 255, 255, 255, 255, 0);
        }

        let noclipEntity = alt.Player.local.vehicle ? alt.Player.local.vehicle : alt.Player.local;
        let newPos;

        game.disableControlAction(0, KeyControls.MoveUpOnly, true);
        game.disableControlAction(0, KeyControls.MoveUP, true);
        game.disableControlAction(0, KeyControls.MoveUD, true);
        game.disableControlAction(0, KeyControls.MoveDown, true);
        game.disableControlAction(0, KeyControls.MoveDownOnly, true);
        game.disableControlAction(0, KeyControls.MoveLeft, true);
        game.disableControlAction(0, KeyControls.MoveLeftOnly, true);
        game.disableControlAction(0, KeyControls.MoveLR, true);
        game.disableControlAction(0, KeyControls.MoveRight, true);
        game.disableControlAction(0, KeyControls.MoveRightOnly, true);
        game.disableControlAction(0, KeyControls.Cover, true);
        game.disableControlAction(0, KeyControls.Horn, true);
        game.disableControlAction(0, KeyControls.HeadLight, true);
        if (alt.Player.local.vehicle)
            game.disableControlAction(0, KeyControls.RadioWheel, true);

        let yoff = 0.0;
        let zoff = 0.0;

        if (game.updateOnscreenKeyboard() !== 0 && alt.isGameFocused()) {
            if (game.isControlJustPressed(0, KeyControls.Spring))
            {
                MovingSpeed++;
                if (MovingSpeed === SpeedsCount)
                {
                    MovingSpeed = 0;
                }
            }

            if (game.isDisabledControlPressed(0,KeyControls.MoveUpOnly))
            {
                yoff = 0.5;
            }
            if (game.isDisabledControlPressed(0, KeyControls.MoveDownOnly))
            {
                yoff = -0.5;
            }
            if (!FollowCamMode && game.isDisabledControlPressed(0, KeyControls.MoveLeftOnly))
            {
                game.setEntityHeading(alt.Player.local.scriptID, game.getEntityHeading(alt.Player.local.scriptID) + 3);
            }
            if (!FollowCamMode && game.isDisabledControlPressed(0, KeyControls.MoveRightOnly))
            {
                game.setEntityHeading(alt.Player.local.scriptID, game.getEntityHeading(alt.Player.local.scriptID) - 3);
            }
            if (game.isDisabledControlPressed(0, KeyControls.Cover))
            {
                zoff = 0.21;
            }
            if (game.isDisabledControlPressed(0, KeyControls.Horn))
            {
                zoff = -0.21;
            }
            if (game.isDisabledControlJustPressed(0, KeyControls.HeadLight))
            {
                FollowCamMode = !FollowCamMode;
            }
        }

        let moveSpeed = MovingSpeed;
        if (MovingSpeed > SpeedsCount / 2)
        {
            moveSpeed *= 1.8;
        }
        moveSpeed = moveSpeed / (1 / game.getFrameTime()) * 60;
        newPos = game.getOffsetFromEntityInWorldCoords(noclipEntity.scriptID, 0, yoff * (moveSpeed + 0.3), zoff * (moveSpeed + 0.3));

        let heading = game.getEntityHeading(noclipEntity.scriptID);
        game.setEntityVelocity(noclipEntity.scriptID, 0, 0, 0);
        game.setEntityRotation(noclipEntity.scriptID, 0, 0, 0, 0, false);
        game.setEntityHeading(noclipEntity.scriptID, FollowCamMode ? game.getGameplayCamRelativeHeading() : heading);
        game.setEntityCoordsNoOffset(noclipEntity.scriptID, newPos.x, newPos.y, newPos.z, true, true, true);
    }
});

function NoClip() {
    NoclipActive = !NoclipActive;

    let noclipEntity = alt.Player.local.vehicle ? alt.Player.local.vehicle : alt.Player.local;
    if(NoclipActive) {
        game.freezeEntityPosition(noclipEntity.scriptID, true);
        game.setEntityCollision(noclipEntity.scriptID, false, false);

        if(PlayerVisible) alt.emitServer("NoClip:PlayerVisible", true);

    } else {
        game.freezeEntityPosition(noclipEntity.scriptID, false);
        game.setEntityCollision(noclipEntity.scriptID, true, true);

        if(PlayerVisible) alt.emitServer("NoClip:PlayerVisible", false);

    }
}

alt.on("keyup", (key) => {
    if(key === KeyControls.ToggleAltV) {
        NoClip();
    }
});

alt.onServer("NoClip:Toggle", () => {
    NoClip();
});