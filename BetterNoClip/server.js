/*
 * © 2021 - 2021 Alec S. - DerEchteAlec - All Rights Reserved.
 * Last Updated : 01/06/2021 22:00:00
 */


import alt from 'alt-server';

alt.onClient("NoClip:PlayerVisible", (player, bool) => {
    player.visible = !bool;
});