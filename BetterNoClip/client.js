///<reference types="@altv/types-client" />
///<reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as game from 'natives';

// DO NOT EDIT //
let NoclipActive = false;
let MovingSpeed = 0;
let Scale = -1;
let FollowCamMode = true;

// THIS CAN YOU EDIT //
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
            game.scaleformMovieMethodAddParamTextureNameString(game.getControlInstructionalButton(0, KeyControls.TOGGLE, 1));
            game.scaleformMovieMethodAddParamTextureNameString("Toggle NoClip");
            game.endScaleformMovieMethod();

            game.beginScaleformMovieMethod(Scale, "DRAW_INSTRUCTIONAL_BUTTONS");
            game.scaleformMovieMethodAddParamInt(0);
            game.endScaleformMovieMethod();

            game.drawScaleformMovieFullscreen(Scale, 255, 255, 255, 255, 0);
        }
        
        let noclipEntity = alt.Player.local.vehicle ? alt.Player.local.vehicle : alt.Player.local;
        let newPos;

        game.disableControlAction(0, KeyControls.MOVEUPONLY);
        game.disableControlAction(0, KeyControls.MOVEUP);
        game.disableControlAction(0, KeyControls.MOVEUD);
        game.disableControlAction(0, KeyControls.MOVEDOWN);
        game.disableControlAction(0, KeyControls.MOVEDOWNONLY);
        game.disableControlAction(0, KeyControls.MOVELEFT);
        game.disableControlAction(0, KeyControls.MOVELEFTONLY);
        game.disableControlAction(0, KeyControls.MOVELR);
        game.disableControlAction(0, KeyControls.MOVERIGHT);
        game.disableControlAction(0, KeyControls.MOVERIGHTONLY);
        game.disableControlAction(0, KeyControls.COVER);
        game.disableControlAction(0, KeyControls.HORN);
        game.disableControlAction(0, KeyControls.HEADLIGHT);
        if (alt.Player.local.vehicle)
            game.disableControlAction(0, KeyControls.RADIOWHEEL);
        
        let yoff = 0.0;
        let zoff = 0.0;

        if (game.updateOnscreenKeyboard() !== 0 && alt.isGameFocused()) {
            if (game.isControlJustPressed(0, KeyControls.SPRINT))
            {
                MovingSpeed++;
                if (MovingSpeed === SpeedsCount)
                {
                    MovingSpeed = 0;
                }
            }

            if (game.isDisabledControlPressed(0,KeyControls.MOVEUPONLY))
            {
                yoff = 0.5;
            }
            if (game.isDisabledControlPressed(0, KeyControls.MOVEDOWNONLY))
            {
                yoff = -0.5;
            }
            if (!FollowCamMode && game.isDisabledControlPressed(0, KeyControls.MOVELEFTONLY))
            {
                game.setEntityHeading(alt.Player.local.scriptID, game.getEntityHeading(alt.Player.local.scriptID) + 3);
            }
            if (!FollowCamMode && game.isDisabledControlPressed(0, KeyControls.MOVERIGHTONLY))
            {
                game.setEntityHeading(alt.Player.local.scriptID, game.getEntityHeading(alt.Player.local.scriptID) - 3);
            }
            if (game.isDisabledControlPressed(0, KeyControls.COVER))
            {
                zoff = 0.21;
            }
            if (game.isDisabledControlPressed(0, KeyControls.HORN))
            {
                zoff = -0.21;
            }
            if (game.isDisabledControlJustPressed(0, KeyControls.HEADLIGHT))
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
        alt.emitServer("Server:NoClip:PlayerVisible", true);
    } else {
        game.freezeEntityPosition(noclipEntity.scriptID, false);
        game.setEntityCollision(noclipEntity.scriptID, true, true);
        alt.emitServer("Server:NoClip:PlayerVisible", false);
    }
}

alt.on("keyup", (key) => {
    if(key === KeyControls.TOGGLE) {
        NoClip();
    }
});

alt.onServer("client:noclip:enable", () => {
    NoClip();
});
