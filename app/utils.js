export const resultWrapper = (result, dayNumber, partNumber) => {
  const intro = `Day ${dayNumber}, Part ${partNumber}: <br/>`;
  return intro + result;
}