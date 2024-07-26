const fs = require('fs')
const path = require('path')

const dbDir = './db'
const usersFileName = 'users.json'
const dailyReportsFileName = 'dailyReports.json'

// Check if the files already exist
const usersExist = fs.existsSync(path.join(dbDir, usersFileName))
const dailyReportsExist = fs.existsSync(path.join(dbDir, dailyReportsFileName))

// If files exist, create a new folder and move them there
if (usersExist) {
  const newFolderNumber = findNextFolderNumber()
  const newDir = path.join(dbDir, newFolderNumber.toString())

  // Create the new directory
  fs.mkdirSync(newDir)

  // Move existing files into the new directory
  if (usersExist) {
    fs.renameSync(
      path.join(dbDir, usersFileName),
      path.join(newDir, usersFileName)
    )
  }

  console.log('Existing files moved to folder:', newFolderNumber)
}
if (dailyReportsExist) {
  const newFolderNumber = findNextFolderNumber()
  const newDir = path.join(dbDir, newFolderNumber.toString())

  // Create the new directory
  fs.mkdirSync(newDir)

  // Move existing files into the new directory
  if (dailyReportsExist) {
    fs.renameSync(
      path.join(dbDir, dailyReportsFileName),
      path.join(newDir, dailyReportsFileName)
    )
  }

  console.log('Existing files moved to folder:', newFolderNumber)
}

// Create new files in the db/ directory
const usersJson = JSON.stringify({ users: [] }, null, 2)
fs.writeFileSync(path.join(dbDir, usersFileName), usersJson)
console.log('users json generated successfully.')

const dailyReportsJson = JSON.stringify({ dailyReports: [] }, null, 2)
fs.writeFileSync(path.join(dbDir, dailyReportsFileName), dailyReportsJson)
console.log('dailyReports json generated successfully.')

// Helper function to find the next available folder number
function findNextFolderNumber() {
  let counter = 1
  while (fs.existsSync(path.join(dbDir, counter.toString()))) {
    counter++
  }
  return counter
}
