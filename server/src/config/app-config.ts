import os from 'os'

function getHostIPAddress() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      // Skip over internal (i.e., 127.0.0.1) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  return '127.0.0.1'; // fallback to localhost if no external address found
}

const ip = getHostIPAddress();

export const origins = [
  "http://localhost:5173",
  "https://interview-hive-five.vercel.app",
  "https://interview-hive.dev-projects.site",
  "http://interview-hive.dev-projects.site",
  `http://${ip}`
];

export const isCredentialsAllowed = true;