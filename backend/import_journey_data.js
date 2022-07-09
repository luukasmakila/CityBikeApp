// File to handle the journey data importing to MongoDB

const csv = require("csv-parser")
const Journeys = require("./models/journeys")
const mongoose = require("mongoose")
const fs = require("fs")
require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI

const main = async () => {
  mongoose.connect(MONGO_URI)
  const validatedRecords = []
  const fileName = `../<filename>`
  const readStream = fs.createReadStream(fileName)
  readStream.pipe(csv({}))
    .on("data", async (data) => {
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
      if(parseInt(document.duration) > 10 && parseInt(document.coveredDistance) > 10) {
        validatedRecords.push(document)        
      }
    })
    .on("end", async () => {
      console.log("All records validated")
      console.log(`Number of validated records: ${validatedRecords.length}`)

      validatedRecords.sort((a, b) => {
        a.departure - b.departure
      })

      const chunkSize = 1000
      const modelList = []
      let key = 124
      for(let i = 0; i < validatedRecords.length; i += chunkSize) {
        const chunk = validatedRecords.slice(i, i + chunkSize)
        modelList.push(new Journeys({ primaryKey: key, journeys: chunk }))
        key++
      }
      console.log(modelList.length)

      try {
        const uploadToDb = async (list) => {
          for(let i = 0; i < list.length; i += 100) {
            const chunk = list.slice(i, i + 100)
            const result = Journeys.insertMany(chunk, { ordered: false })
            console.log(i)
            if(result) console.log(result)
          }
        }
        await uploadToDb(modelList)
        mongoose.connection.close(function () {
            console.log("complete");
            process.exit(0);
        })
      } catch (error) {
        console.log(error)
      }
    })
}

main()
