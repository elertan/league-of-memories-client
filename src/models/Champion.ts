import ImageDTO from "./ImageDTO";
import Skin from "./Skin";

export default class Champion {
  public key: string;
  public name: string;
  public title: string;
  public image: ImageDTO;
  public skins: Skin[];
}
