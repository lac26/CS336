React.js frontend component structure: 
 - A header component – goes on top of every page 
 - A footer component – at the bottom of every page A photo component 
 - A photo gallery component using the photo component An info component, this component could be adjusted to be used for both the leadership team information section and the about our club section 
 - A contact us component 
 - An event component 
 - An event List component containing the events 
 - An event Box component containing the event List 
 - An event Edit component allowing admin to edit events 
 - If we have time, a calendar component (perhaps consisting of calendar events components) 
 - A Members List component, displaying all of the members An Add Member component, to add a new member 
 - An Update Member component, to update/delete a member

Document structure for MongoDB backend: 
- Events document: fields specifying date, location, time, name, description, cost 
- Members document: fields specifying name, year, major, email address, role (member/leadership)
