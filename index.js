const icsToJson = require('ics-to-json').default
const fs = require("fs");

function convert(fileLocation) {
  const icsData = fs.readFileSync("./data/calendar.ics", "utf8");
	const data = icsToJson(icsData)
  return data
}

function parseWeirdDateToMs (weirdDate) {
  const date = weirdDate.split('')
  const yyyy = date.splice(0, 4).join('')
  const dd = date.splice(0, 2).join('')
  const mm = date.splice(0, 2).join('')
  const hh = date.splice(1, 2).join('')
  const mn = date.splice(1, 2).join('')
  const ss = date.splice(1, 2).join('')
  const datePretty = `${dd}/${mm}/${yyyy} ${hh}:${mn}:${ss}`
  const timeMs = Date.parse(datePretty)
  return timeMs
}

function msToHour(mls) {
  let h,m,s;
  h = Math.floor(mls/1000/60/60);
  m = Math.floor((mls/1000/60/60 - h)*60);
  s = Math.floor(((mls/1000/60/60 - h)*60 - m)*60);
  
  s < 10 ? s = `0${s}`: s = `${s}`
  m < 10 ? m = `0${m}`: m = `${m}`
  h < 10 ? h = `0${h}`: h = `${h}`

  if(s === '00') {
    return `${h}h:${m}m`
  } else {
    return `${h}h:${m}m:${s}s`
  }
} 

const events = convert("./data/calendar.ics")

function trackTime(query, opts) {
  const dateNow = Date.now()
  const papers = events.filter(e => e.summary.includes(query))
    
  console.log(opts.title || query)
  
  let eventsThisYear = 0
  const totalTimeMs = papers.reduce((total, event) => {
    const startDateMs = parseWeirdDateToMs(event.startDate)
    const endDateMs = parseWeirdDateToMs(event.endDate)
  
    if(startDateMs > dateNow || startDateMs < 1577836800000) {
      // ignore future events or events from < 2020
      return total
    } else {
      eventsThisYear++
      const time = endDateMs - startDateMs
      // console.log(
      //   'Entry:',
      //   new Date(startDateMs).toLocaleString('pt', { month: 'short', day: '2-digit'}),
      //   msToHour(time)
      // )
      return total + time
    }
  }, 0)
  
  console.log('- Entries count:', (eventsThisYear || papers.length).toString())
  console.log('- Total time:', msToHour(totalTimeMs))
}




trackTime('🎲', { title: '🎲 Papers 2020 🎲' })