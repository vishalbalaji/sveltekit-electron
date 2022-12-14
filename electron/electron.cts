import { fork } from 'child_process';
import path from 'path';
import { app, BrowserWindow } from 'electron';
import ws from 'electron-window-state';

const isDev = !app.isPackaged || (process.env.NODE_ENV == 'development');

let mainWindow: BrowserWindow | null;
let apiProcess: ReturnType<typeof fork>;

if (!isDev) {
	// For launching node server app.
	process.env.HOST = 'localhost';
	process.env.PORT = '5173';
	apiProcess = fork(path.join(__dirname, 'web', 'index.js'));
}

const port = process.env.PORT || 5173;
const appUrl = 'http://localhost:' + port;

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function createMainWindow() {
	const mws = ws({
		defaultWidth: 1000,
		defaultHeight: 800,
	});

	mainWindow = new BrowserWindow({
		transparent: true,
		x: mws.x,
		y: mws.y,
		width: mws.width,
		height: mws.height,
		titleBarStyle: 'hidden',
		autoHideMenuBar: true,

		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			// devTools: true,
			devTools: isDev,
		},
	});

	mainWindow.once('close', () => { mainWindow = null; });

	mainWindow.webContents.on('did-fail-load', async () => {
		if (!mainWindow) return;
		await sleep(500);
		mainWindow.loadURL(appUrl);
	});

	mws.manage(mainWindow);
	mainWindow.loadURL(appUrl);
}

app.once('ready', createMainWindow);
app.on('activate', () => { if (!mainWindow) createMainWindow(); });
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
	if (!isDev) apiProcess.kill();
});
