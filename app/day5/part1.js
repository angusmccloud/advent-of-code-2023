import { readFileSync } from 'fs';
const text = readFileSync('app/day5/data.txt', 'utf8');

const parseMap = (input) => {
  const map = [];
  for(let i = 0; i < input.length; i++) {
    const row = input[i];
    const rowSplit = row.split(' ');
    const source = parseInt(rowSplit[1]);
    const destination = parseInt(rowSplit[0]);
    const length = parseInt(rowSplit[2]);
    map.push({
      sourceStart: source,
      sourceEnd: source + length - 1,
      offset: destination - source,
    })
  }
  return map;
}

const getMapInputData = (input, label) => {
  const startIndex = input.findIndex((row) => row === label);
  const rawData = [];
  let keepFindingData = true;
  let rowIndex = startIndex + 1;
  while(keepFindingData) {
    const row = input[rowIndex];
    if (row && row !== '') {
      rawData.push(row);
    } else {
      keepFindingData = false;
    }
    rowIndex++;
  }
  return rawData;
}

export const calculate = (input) => {


  // First create an array of seeds
  // Should be the first line of the array in input, formatted as: seeds: 79 14 55 13
  const seeds = [];
  const seedsLine = input[0];
  const seedsLineSplit = seedsLine.split(': ');
  const seedsLineSeeds = seedsLineSplit[1];
  const seedsLineSeedsSplit = seedsLineSeeds.split(' ');
  seedsLineSeedsSplit.forEach((seed) => {
    seeds.push(parseInt(seed));
  });
  // console.log(seeds);
  
  const seedToSoilMap = parseMap(getMapInputData(input, 'seed-to-soil map:'));
  const soilToFertilizerMap = parseMap(getMapInputData(input, 'soil-to-fertilizer map:'));
  const fertilizerToWaterMap = parseMap(getMapInputData(input, 'fertilizer-to-water map:'));
  const waterToLightMap = parseMap(getMapInputData(input, 'water-to-light map:'));
  const lightToTemperatureMap = parseMap(getMapInputData(input, 'light-to-temperature map:'));
  const temperatureToHumidityMap = parseMap(getMapInputData(input, 'temperature-to-humidity map:'));
  const humidityToLocationMap = parseMap(getMapInputData(input, 'humidity-to-location map:'));
  // console.log(seedToSoilMap);

  const seedLocations = seeds.map((seed) => {
    let soil = seed += seedToSoilMap.find((map) => {return seed >= map.sourceStart && seed <= map.sourceEnd})?.offset || 0;
    let fertilizer = soil += soilToFertilizerMap.find((map) => {return soil >= map.sourceStart && soil <= map.sourceEnd})?.offset || 0;
    let water = fertilizer += fertilizerToWaterMap.find((map) => {return fertilizer >= map.sourceStart && fertilizer <= map.sourceEnd})?.offset || 0;
    let light = water += waterToLightMap.find((map) => {return water >= map.sourceStart && water <= map.sourceEnd})?.offset || 0;
    let temperature = light += lightToTemperatureMap.find((map) => {return light >= map.sourceStart && light <= map.sourceEnd})?.offset || 0;
    let humidity = temperature += temperatureToHumidityMap.find((map) => {return temperature >= map.sourceStart && temperature <= map.sourceEnd})?.offset || 0;
    let location = humidity += humidityToLocationMap.find((map) => {return humidity >= map.sourceStart && humidity <= map.sourceEnd})?.offset || 0;
    return location;
  })

  // Return minimum location
  return Math.min(...seedLocations);
  // return 20;
}

const fn = () => {
  const dt = text.split('\n');
  
  return calculate(dt);
}

export default fn;