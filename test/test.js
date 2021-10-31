import { assert } from 'chai';
import fsPromises from 'fs/promises';
import path from 'path';

import {
  getActualHours, getHours, isAlwaysOpen, isOpen, isOpen24Hours,
} from '../index.js';

describe('#getActualHours()', async () => {
  it('should return the actual opening hours for a certain day of week', async () => {
    const dataDir = 'test/data/GetPlaceDetails';
    const expectedDir = 'test/expected/getActualHours';
    const dataFiles = await fsPromises.readdir(dataDir);
    const data = dataFiles.map(async (dataFile) => ({
      placeDetails: JSON.parse(await fsPromises.readFile(path.join(dataDir, dataFile))),
      expected: JSON.parse(await fsPromises.readFile(path.join(expectedDir, dataFile))),
    }));

    return Promise.all(data.map(async (dataPromise) => {
      const { placeDetails, expected } = await dataPromise;

      [...Array(7).keys()].forEach((day) => {
        const actualHours = getActualHours(placeDetails.opening_hours?.periods, day);

        assert.deepEqual(actualHours, expected[day], JSON.stringify({
          place_id: placeDetails.place_id,
          day,
        }));
      });
    }));
  });
});

describe('#getHours()', async () => {
  it('should return the opening hours for a certain day of week', async () => {
    const dataDir = 'test/data/GetPlaceDetails';
    const expectedDir = 'test/expected/getHours';
    const dataFiles = await fsPromises.readdir(dataDir);
    const data = dataFiles.map(async (dataFile) => ({
      placeDetails: JSON.parse(await fsPromises.readFile(path.join(dataDir, dataFile))),
      expected: JSON.parse(await fsPromises.readFile(path.join(expectedDir, dataFile))),
    }));

    return Promise.all(data.map(async (dataPromise) => {
      const { placeDetails, expected } = await dataPromise;

      [...Array(7).keys()].forEach((day) => {
        const hours = getHours(placeDetails.opening_hours?.periods, day);

        assert.deepEqual(hours, expected[day], JSON.stringify({
          place_id: placeDetails.place_id,
          day,
        }));
      });
    }));
  });
});

describe('#isAlwaysOpen()', async () => {
  it('should return whether the place is always open', async () => {
    const dataDir = 'test/data/GetPlaceDetails';
    const expectedDir = 'test/expected/isAlwaysOpen';
    const dataFiles = await fsPromises.readdir(dataDir);
    const data = dataFiles.map(async (dataFile) => ({
      placeDetails: JSON.parse(await fsPromises.readFile(path.join(dataDir, dataFile))),
      expected: JSON.parse(await fsPromises.readFile(path.join(expectedDir, dataFile))),
    }));

    return Promise.all(data.map(async (dataPromise) => {
      const { placeDetails, expected } = await dataPromise;
      const alwaysOpen = isAlwaysOpen(placeDetails.opening_hours?.periods);

      assert.strictEqual(alwaysOpen, expected, JSON.stringify({
        place_id: placeDetails.place_id,
      }));
    }));
  });
});

describe('#isOpen()', async () => {
  it('should return whether the place is open on a certain day of week', async () => {
    const dataDir = 'test/data/GetPlaceDetails';
    const expectedDir = 'test/expected/isOpen';
    const dataFiles = await fsPromises.readdir(dataDir);
    const data = dataFiles.map(async (dataFile) => ({
      placeDetails: JSON.parse(await fsPromises.readFile(path.join(dataDir, dataFile))),
      expected: JSON.parse(await fsPromises.readFile(path.join(expectedDir, dataFile))),
    }));

    return Promise.all(data.map(async (dataPromise) => {
      const { placeDetails, expected } = await dataPromise;

      [...Array(7).keys()].forEach((day) => {
        const open = isOpen(placeDetails.opening_hours?.periods, day);

        assert.strictEqual(open, expected[day], JSON.stringify({
          place_id: placeDetails.place_id,
          day,
        }));
      });
    }));
  });
});

describe('#isOpen24Hours()', async () => {
  it('should return whether the place is open 24 hours on a certain day of week', async () => {
    const dataDir = 'test/data/GetPlaceDetails';
    const expectedDir = 'test/expected/isOpen24Hours';
    const dataFiles = await fsPromises.readdir(dataDir);
    const data = dataFiles.map(async (dataFile) => ({
      placeDetails: JSON.parse(await fsPromises.readFile(path.join(dataDir, dataFile))),
      expected: JSON.parse(await fsPromises.readFile(path.join(expectedDir, dataFile))),
    }));

    return Promise.all(data.map(async (dataPromise) => {
      const { placeDetails, expected } = await dataPromise;

      [...Array(7).keys()].forEach((day) => {
        const open24Hours = isOpen24Hours(placeDetails.opening_hours?.periods, day);

        assert.strictEqual(open24Hours, expected[day], JSON.stringify({
          place_id: placeDetails.place_id,
          day,
        }));
      });
    }));
  });
});
