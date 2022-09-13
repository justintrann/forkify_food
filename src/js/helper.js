import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const rec = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const recData = await rec.json();

    if (!rec.ok) throw new Error('Hello, this is your helper.js');
    return recData;
  } catch (error) {
    throw error;
  }
};
