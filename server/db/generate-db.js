const fs = require('fs')
const path = require('path')

const dbDir = './db'
const usersFileName = 'users.json'
const dailyReportsFileName = 'dailyReports.json'

// Check if the files already exist
const usersExist = fs.existsSync(path.join(dbDir, usersFileName))
const dailyReportsExist = fs.existsSync(path.join(dbDir, dailyReportsFileName))

// Create new files in the db/ directory
if (!usersExist) {
  const usersJson = JSON.stringify({ users: [] }, null, 2)
  fs.writeFileSync(path.join(dbDir, usersFileName), usersJson)
  console.log('users json generated successfully.')
} else {
  console.log('users json already exists.')
}

if (!dailyReportsExist) {
  const dailyReportsJson = JSON.stringify({ dailyReports: [] }, null, 2)
  fs.writeFileSync(path.join(dbDir, dailyReportsFileName), dailyReportsJson)
  console.log('dailyReports json generated successfully.')
} else {
  console.log('dailyReports json already exists.')
}
