const lunation = 29.53058770576 // Lunar cycle in days
const lunarSeconds = lunation * 24 * 60 * 60
const newMoon2000 = 947150040 // New Moon of '2000-01-06 18:14' as Unix seconds

const moonPhases = [
  { name: "newmoon", endDay: 1 },
  { name: "waxingcrescent", endDay: 6.38264692644 },
  { name: "firstquarter", endDay: 8.38264692644 },
  { name: "waxinggibbous", endDay: 13.76529385288 },
  { name: "fullmoon", endDay: 15.76529385288 },
  { name: "waninggibbous", endDay: 21.14794077932 },
  { name: "thirdquarter", endDay: 23.14794077932 },
  { name: "waningcrescent", endDay: 28.53058770576 },
  { name: "newmoon", endDay: 29.53058770576 },
]

/**
 * Returns at which phase the moon is at a given time.
 *
 * @param time unix time in milliseconds
 * @returns moon phase as a string
 */
export function getMoonPhase(time: number) {
  const totalSeconds = Math.floor(time / 1000) - newMoon2000
  const currentSeconds = totalSeconds % lunarSeconds

  const currentCycleFraction = currentSeconds / lunarSeconds
  const currentCycleDays = currentCycleFraction * lunation

  let phaseName = moonPhases[0].name
  for (const phase of moonPhases) {
    if (currentCycleDays <= phase.endDay) {
      phaseName = phase.name
      break
    }
  }

  return phaseName
}
