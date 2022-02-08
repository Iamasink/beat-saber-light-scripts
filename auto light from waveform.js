/*
todo stuff
maybe make it do chroma gradients? and changing colours at points and cool stuffs like that ok
*/



AudioContext = require('web-audio-api').AudioContext
context = new AudioContext
fs = require('fs')


// hi variables !! thats so cool i love them <3 
// dont touch them >:c
type = 0
audio = []
prev0 = 0
prev1 = 0
maximum = 0
    // -


folder = "F:\\Steam\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\test\\" // folder to read from
soundFile = folder + "song.mp3" // sound file to sample
mapFile = folder + "ExpertPlusStandard.dat" // map file to read
writeFile = folder + "ExpertPlusLawless.dat" // map file to write to, advised to use a different name than the one you read from, as a backup (it might break.)
if (!checkFiles()) {
    throw new Error(`sound file does not exist`)
}


mode = "average" // the mode to sample audio with. options are "average" or "maximum"


mapInfo = readInfo(folder + "Info.dat")
console.log(mapInfo)

bpm = mapInfo._beatsPerMinute
console.log(`bpm found to be ${bpm}`)





console.log(`reading map\nsoundFile: ${soundFile}\nmapFile: ${mapFile}`)
replaceEvents([4], [4], [12], [11], 12, 0.05, 1, 0.2, 0.8)
    // for the default environment, the back light is kinda messed up - in chromapper, light 12 is the left one, and 11 is the right, while its the opposite in game





/// remove events for type
function replaceEvents(channel0ReplaceTypes, channel1ReplaceTypes, channel0LightIDs, channel1LightIDs, replaceMaximumLightID, sampleIntervalInSeconds, colorR, colorG, colorB) {

    replaceLightIDs = channel0LightIDs.concat(channel1LightIDs)
    replaceTypes = channel0ReplaceTypes.concat(channel1ReplaceTypes)
    readMap(mapFile)

    console.log(map)

    removeEventsForType(replaceTypes, replaceLightIDs, replaceMaximumLightID)

    promise = decodeAudio(soundFile)
    promise.then(audio => {
        // once the file has been read,
        console.log(`decoded audio, promise: ${promise}`) //, result: ${JSON.stringify(audioBuffer)} `)
            //console.log(`channeldata 0: ${JSON.stringify(audio.getChannelData(0))}`) //}, channeldata 1: ${audio.getChannelData(1)[1]}`)
        console.log(`length: ${audio.length}, channels: ${audio.numberOfChannels}, sampleRate: ${audio.sampleRate}, duration: ${audio.duration} `)
            //console.log(getAudioLevels(audioBuffer))



        /*
        todo: option to combine channels into one light, 
        also, allow custom light selection per channel and more than 2 channels       */
        switch (audio.numberOfChannels) {
            case 0:
                console.log("no channels")
                return
            case 1:
                console.log("one channel")
                audioData0 = audio.getChannelData(0)
                audioData1 = []
                break
            case 2:
                console.log("two channels")
                audioData0 = audio.getChannelData(0)
                audioData1 = audio.getChannelData(1)

                break
            default:
                console.log("more than two channels not allowed sorry! (or something else messed up xd)")
                return
        }

        level = 0
        index = 0
        step = Math.round(audio.sampleRate * sampleIntervalInSeconds) // number of samples to step - interval in seconds * samplerate
        console.log(`step: ${step}`)




        // first go through the audio to find the biggest value. theres probably a better way to do this but fuck you
        for (i = 0; index < audio.length; index += step) {
            if (mode == "average") {
                total0 = 0
                count0 = 0
                count1 = 0
                total1 = 0
                for (i = index; i < index + step; i++) {
                    if (audioData0[i] > 0.001) {
                        total0 = total0 + audioData0[i]
                        count0 += 1
                    }
                    if (audioData1[i] > 0.001) {
                        total1 = total1 + audioData1[i]
                        count1 += 1
                    }

                }
                console.log(`total: ${total0}, step: ${step}`)
                console.log(`total: ${total1}, step: ${step}`)
                if (count0 > 0 && total0 > 0) {
                    level0 = (total0 / count0).toFixed(3)
                } else {
                    level0 = 0
                }

                if (count1 > 0 && total1 > 0) {
                    level1 = (total1 / count1).toFixed(3)
                } else {
                    level1 = 0
                }
                console.log(`level0: ${level0}`)
                console.log(`level1: ${level1}`)
                if (level0 > level1) {
                    maximum = level0 > maximum ? level0 : maximum
                } else { maximum = level1 > maximum ? level1 : maximum }
            } else if (mode == "maximum") {

                for (i = index; i < index + step; i++) {
                    if (level0 > level1) {
                        maximum = audioData0[i] > maximum ? audioData0[i].toFixed(3) : maximum

                    } else {
                        maximum = audioData1[i] > maximum ? audioData1[i].toFixed(3) : maximum
                    }
                    //console.log(`audioData0[${i}]: ${audioData0[i].toFixed(3)}`)
                }
            }
        }

        console.log(`\n\n\nmaximum: ${maximum}`)

        multiplier = 2 / maximum
        console.log(`multiplier: ${multiplier}`)


        for (index = 0; index < audio.length; index += step) { // for every *step* samples until the end of the file

            /* 
            gets the level of audio between the current index and the next index,
            if mode is average, it averages the levels between the two indices,
            if mode is maximum, it gets the maximum level between the two indices. 
            idk which is better, but average is probably smoother
            */
            if (mode == "average") {
                total0 = 0
                count0 = 0
                total1 = 0
                count1 = 0

                for (i = index; i < index + step; i++) {
                    if (audioData0[i] > 0.001) {
                        total0 = total0 + audioData0[i]
                        count0 += 1
                    }
                    if (audioData1[i] > 0.001) {
                        total1 = total1 + audioData1[i]
                        count1 += 1
                    }
                }
                console.log(`total: ${total0}, step: ${step}`)
                if (count0 > 0 && total0 > 0) {
                    level0 = (total0 / count0).toFixed(3)
                } else {
                    level0 = 0
                }

                if (count1 > 0 && total1 > 0) {
                    level1 = (total1 / count1).toFixed(3)
                } else {
                    level1 = 0
                }

                console.log(`level0: ${level0}`)
                console.log(`level1: ${level1}`)
            } else if (mode == "maximum") {
                for (i = index; i < index + step; i++) {
                    level0 = audioData0[i] > level0 ? audioData0[i].toFixed(4) : level0
                    level1 = audioData1[i] > level1 ? audioData1[i].toFixed(4) : level1
                }

            }






            if (level0 < 0) {
                level0 *= -1
                console.log(`level0 was negative, flipped to: ${level0}`)
                    // is this bad? i dont really understand why its negative sometimes? should i ignore it? or is this fine????? 

            }
            if (level1 < 0) {
                level1 *= -1
                console.log(`level1 was negative, flipped to: ${level1}`)

            }

            realtime = (index / audio.sampleRate) // calculates the real time of the current sample (in seconds, not beats)
            time = (realtime * bpm / 60).toFixed(3) // calculates the time of the current sample (in beats)
            isSaved = false // for logging


            if (level0 != prev0) { // channel0ReplaceTypes, channel1ReplaceTypes, channel0LightIDs, channel1LightIDs
                for (i = 0; i < channel0ReplaceTypes.length; i++) {
                    toPush = { "_time": time, "_type": channel0ReplaceTypes[i], "_value": 5, "_customData": { "_lightID": channel0LightIDs, "_color": [colorR, colorG, colorB, level0 * multiplier] } }
                    map._events.push(toPush)
                    console.log(toPush)
                    isSaved = true
                }
            }
            if (level1 != prev1) {
                for (i = 0; i < channel1ReplaceTypes.length; i++) {
                    toPush = { "_time": time, "_type": channel1ReplaceTypes[i], "_value": 5, "_customData": { "_lightID": channel1LightIDs, "_color": [colorR, colorG, colorB, level1 * multiplier] } }
                    map._events.push(toPush)
                    console.log(toPush)
                    isSaved = true
                }
            }

            console.log(`Time: ${time}, Realtime: ${realtime.toFixed(2)} Saved ?: ${isSaved ? "t" : "f"}, Level: ${level}}`)



            prev0 = level0
            prev1 = level1
            prevtime = time
            level = 0

        }



        writeMap(writeFile)
        console.log(`completed lul heres some info \nmaximum: ${maximum}\nmultiplier: ${multiplier}\n`)


    }).catch(err => {
        console.log(`error: ${err}`)
    })
}


function decodeAudio(soundFile) {
    return new Promise(function(resolve, reject) {
        fs.readFile(soundFile, function(err, data) {
            if (err) {
                console.log(err)
                reject(err)
            }
            context.decodeAudioData(data, function(audioBuffer) {
                console.log(`length: ${audioBuffer.length}, channels: ${audioBuffer.numberOfChannels}, sampleRate: ${audioBuffer.sampleRate}, duration: ${audioBuffer.duration} `)
                resolve(audioBuffer)
            })
        })
    })
}





// write to map
function writeMap(mapFile) {
    fs.writeFileSync(mapFile, JSON.stringify(map), 'utf-8')
    console.log(`Map written to ${mapFile}`)
}

// read map
function readMap(mapFile) {
    file = fs.readFileSync(mapFile, 'utf-8')
    map = JSON.parse(file)
}

function readInfo(file) {
    mapInfo = JSON.parse(fs.readFileSync(file, 'utf-8'))
    return mapInfo
}

// check if soundFile, mapFile and writeFile exist
function checkFiles() {
    if (!fs.existsSync(soundFile)) {
        console.log("soundFile does not exist")
        return false
    }
    return true
}


/// type: event type to search
/// lightIDs: array of lightIDs to remove from events in type
/// maximumLightID: the highest lightID for the event type, used to set all other lights
function removeEventsForType(types, lightIDs, maximumLightID) {
    otherLights = []


    newLightID = []

    newEvents = []
    toPush = {}
    for (i = 0; i < types; i++) {
        type = types[i]


        // otherLights is an array of all the lights that are not in lightIDs
        for (var j = 0; j <= maximumLightID; j++) {
            if (!lightIDs.includes(j)) {
                otherLights.push(j)
            }
        }

        // for every event in the map
        for (i in map._events) {
            console.log(`\n\n Current event: ${i}`)

            // if it matches type
            if (map._events[i]._type == type) {
                console.log(`type found ${type}`)
                console.log(`${JSON.stringify(map._events[i])}`)
                    // if it has customdata and lightIDs
                console.log(`i = ${i}`)
                if (map._events[i].hasOwnProperty("_customData") && map._events[i]._customData.hasOwnProperty("_lightID")) {
                    newLightID = []

                    for (var j = 0; j < map._events[i]._customData._lightID.length; j++) {
                        console.log(`j = ${j}`)
                        console.log(`lightid = ${map._events[i]._customData._lightID[j]}`)
                        if (lightIDs.includes(map._events[i]._customData._lightID[j])) {
                            console.log(`removed lightid ${map._events[i]._customData._lightID[j]}`)
                        } else {
                            newLightID.push(map._events[i]._customData._lightID[j])
                        }
                    }
                    if (!newLightID.length) {
                        console.log(`removed event ${i}`)

                    }


                } else {

                    // if it doesn't have customdata or lightIDs
                    console.log("event has no customData or lightIDs")
                        // add lightid for all between 0 and maximumLightID, except lightIDs
                    newLightID = []
                    console.log(JSON.stringify(map._events[i]))
                    for (var j = 0; j <= maximumLightID; j++) {

                        if (!lightIDs.includes(j)) {
                            newLightID.push(j)
                            console.log(`added lightid ${j}`)

                        } else {
                            console.log("disallowed lightID")
                        }
                    }
                    console.log(`newLightID = ${newLightID}`)
                    toPush = map._events[i]
                    console.log(`1 ${JSON.stringify(toPush)}`)

                    if (!toPush.hasOwnProperty("_customData")) {
                        toPush._customData = { "_lightID": newLightID }
                    } else {
                        toPush._customData._lightID = newLightID
                    }
                    console.log(`newEvets pushed ${JSON.stringify(toPush)}`)
                    newEvents.push(toPush)


                }
                if (map._events[i]._value == 0) {
                    toPush = map._events[i]
                    toPush._value = 5
                    toPush._customData._lightID = otherLights
                    toPush._customData._color = [0, 0, 0, 1]
                    newEvents.push(toPush)
                    continue
                }

            } else {
                newEvents.push(map._events[i])
            }
        }
    }


    console.log(`newEvents = ${JSON.stringify(newEvents)}`)
    map._events = newEvents

}