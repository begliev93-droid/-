import {Config} from '@remotion/cli/config';
import fs from 'fs';
// В облачном контейнере используем предустановленный headless shell; на Mac Remotion скачает свой.
const shell = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
if (fs.existsSync(shell)) Config.setBrowserExecutable(shell);
Config.setVideoImageFormat('jpeg');
Config.setConcurrency(4);
