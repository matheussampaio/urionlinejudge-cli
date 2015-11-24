import checkUpdate from 'check-update';
import { name, version } from '../package.json';

export default function checkForUpdate() {
  checkUpdate({
    packageName: name,
    packageVersion: version,
    isCLI: true,
  }, (err, latestVersion, defaultMessage) => {
    if (!err) {
      console.log(defaultMessage + '\n');
    }
  });
}
