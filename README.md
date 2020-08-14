# calendar-tracker
Track how many hours spent in certain calendar events


## How to run
- Add a `data/calendar.ics` - It's an exporter calendar ics format.
- Open `index.js` and edit last line to search for a certain event by name.

```
// Search for events that contain "🎲"
trackTime('🎲', { title: '🎲 Papers 2020 🎲' })
```
- Run `node index.js`. The output is similar to this:

```
🎲 Papers 2020 🎲
- Entries count: 65
- Total time: 162h:15m
```
