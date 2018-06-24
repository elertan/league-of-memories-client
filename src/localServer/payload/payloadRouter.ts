import { ipcMain } from 'electron';
import * as express from 'express';
import { IPCEvents } from '../../ipc';
const router = express.Router();

router.get('/skin-info', (req, res) => {
  res.send({
    example: 42,
    data: 1337,
    right: 'hell-yeah',
  });
});

export interface ILeagueClientLockedChampionBody {
  championId: number;
}

router.post('/league-client-locked-champion', (req, res) => {
  const body = req.body as ILeagueClientLockedChampionBody;
  ipcMain.emit(IPCEvents.Server_leagueClientLockedChampion, body);
});

export default router;
