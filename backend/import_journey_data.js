// File to handle the journey data importing to MongoDB

const csv = require("csv-parser")
const Journeys = require("./models/journeys")
const mongoose = require("mongoose")
const fs = require("fs")
require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI

const handleValidation = async (document) => {
  if(parseInt(document.duration) > 10 && parseInt(document.coveredDistance) > 10) {
    return true
  }
  return false
}

const handleData = async (data, validatedRecords) => {
  let dataFields = Object.values(data)
  let document = {
    departure: dataFields[0],
    return: dataFields[1],
    departureStationID: dataFields[2],
    departureStationName: dataFields[3],
    returnStationID: dataFields[4],
    returnStationName: dataFields[5],
    coveredDistance: dataFields[6],
    duration: dataFields[7]
  }
  if(await handleValidation(document)){
    validatedRecords.push(document)
  }
}

const turnToModels = async (validatedRecords) => {
  const chunkSize = 1000
  const modelList = []
  let key = 1962
  for(let i = 0; i < validatedRecords.length; i += chunkSize) {
    const chunk = validatedRecords.slice(i, i + chunkSize)
    modelList.push(new Journeys({ primaryKey: key, journeys: chunk }))
    key++
  }
  return modelList
}

const uploadToDb = async (list) => {
  for(let i = 0; i < list.length; i += 100) {
    const chunk = list.slice(i, i + 100)
    const result = await Journeys.insertMany(chunk, { ordered: false })
    if(result) console.log(result)
  }
}

const main = async () => {
  mongoose.connect(MONGO_URI)
  const validatedRecords = []
  const fileName = `../2021-07.csv`
  const readStream = fs.createReadStream(fileName)
  readStream.pipe(csv({}))
    .on("data", async (data) => {
      await handleData(data, validatedRecords)
    })
    .on("end", async () => {
      console.log("All records validated")
      console.log(`Number of validated records: ${validatedRecords.length}`)
      
      const modelList = await turnToModels(validatedRecords)
      console.log(modelList.length)

      try {
        await uploadToDb(modelList)
        mongoose.connection.close(function () {
            console.log("complete")
            process.exit(0)
        })
      } catch (error) {
        console.log(error)
        mongoose.connection.close(function () {
          console.log("exited with an error")
          console.log(error)
          process.exit(0)
        })
      }
    })
}

main()
