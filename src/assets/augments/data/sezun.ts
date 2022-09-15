import stat, { StatEnum } from "../../stat";
import augment, { Augment } from "../augment";
import GroupEnum from "../groupEnum";

const GROUP = GroupEnum.SEZUN;
const CONFLICT: GroupEnum[] = [GroupEnum.SEZUN];

let data: Augment[] = [];

data.push(
  augment("sezun lunafiv", 0, GROUP, CONFLICT, [
    stat(StatEnum.CORE_BP, 0),
    stat(StatEnum.WEAPON_MELEE, 1.15),
    stat(StatEnum.WEAPON_RANGED, 1.15),
    stat(StatEnum.WEAPON_TECHNIQUE, 1.15),
    stat(StatEnum.ADV_DEF_DAMAGE_RES, 1.25),
  ]),
);

export default data;