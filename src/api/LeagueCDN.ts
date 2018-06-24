import Axios from 'axios';
import Champion from '../models/Champion';

const patchVersion = '8.11.1';

export default class LeagueCDN {
  public static async getChampions() {
    const response = await Axios.get('http://localhost:13370/client/champions');
    return response.data as Champion[];
  }

  public static getChampionIconUrl(championKey: string) {
    return `http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${championKey}.png`;
  }

  public static getDefaultBackgroundImage() {
    // tslint:disable-next-line:max-line-length
    return 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/rg-champion-aatrox/en_GB/5f609ee4af95b65c17860c30661652a1c0a530bd/assets/img/content/wallpaper/base-splash.jpg';
  }

  public static getChampionSplashUrl(championKey: string, skinIndex: number = 0) {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championKey}_${skinIndex}.jpg`;
  }
}
