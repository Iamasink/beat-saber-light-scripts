var fs = require('fs')

folder = "F:\\Steam\\steamapps\\common\\Beat Saber\\Beat Saber_Data\\CustomWIPLevels\\test\\" // folder to read from
mapFile = folder + "ExpertPlusStandard.dat" // map file to read
writeFile = folder + "ExpertPlusLawless.dat" // map file to write to, advised to use a different name than the one you read from, as a backup (it might break.)








var file = fs.readFileSync(mapFile, 'utf-8')
j = JSON.parse(file)





// convert all lights within a time, of one color, to a gradient
// beginTime 	- the start of time to look at		( pretty sure these times are in beats)
// endTime 		- the end of time to look at
// beginColour 	- the color to start the gradient from, array rgba
// endColour 	- the color to end the gradient at      array rgba
// colorToFind 	- the color to look for array rgba
// these can be ommitted i think:
// ignore 		- the colors to ignore array [r,g,b,a] 1 if you want to ignore that color
// typesToFind 	- the type to look for array
// lightidToFind- the lightids to look for array 
// precision 	- the precision for something idk like i genuinely have no idea what this does. I'm sorry future me. just omit it. it might be fine

beginTime = 0
endTime = 100
beginColour = [0, 0, 0, 1]
endColour = [1, 0, 0, 1]
colorToFind = [1, 0, 0, 1]
ignore = [0, 0, 0, 1]
typesToFind = [0, 1, 2, 3, 4, 5]
lightIDsToFind = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
precision = 1

eventGradient(beginTime, endTime, beginColour, endColour, colorToFind, ignore, typesToFind, lightIDsToFind, precision)
    //eventGradient(40, 103, [0.757, 0.961, 0.961, 1], [0.46, 0.2, 0.9, 1], [0.757, 0.961, 0.961, 1], [0, 0, 0, 1])




fs.writeFileSync(writeFile, JSON.stringify(j), 'utf-8')
console.log("file written! :D FUCKING HEL") // i was in a bad place when i wrote this. I regret what I said but shall not remove it as it is a good reminder of my struggles and how i was able to get this far. I hope you enjoy the file. I will be sure to add more features to it as i get the time. I will also add a better way to edit the file, so you can edit it without having to rewrite the whole thing. GITHUB COPILOT WROTE MOST OF THIS ASGHJDASGHJKDHJKGSADHJKLSADJKHLDASHJKLDASJHKASDJHK its true though 








// convert all lights within a time, of one color, to a gradient
// beginTime 	- the start of time to look at		( pretty sure these times are in beats)
// endTime 		- the end of time to look at
// beginColour 	- the color to start the gradient from
// endColour 	- the color to end the gradient at
// colorToFind 	- the color to look for
// ignore 		- the colors to ignore
// typesToFind 	- the type to look for
// lightidToFind- the lightids to look for
// precision 	- the precision to look at
eventGradient = (beginTime, endTime, beginColour, endColour, colorToFind, ignore, typesToFind, lightIDsToFind, precision) => {
    if (!ignore) ignore = [0, 0, 0, 0]
    if (!precision) precision = 1
    timeDiff = endTime - beginTime
    for (var i in endColour) {
        colourChange[i] = (endColour[i] - beginColour[i]) / (timeDiff * precision)
    }

    console.log("colourchannge === " + colourChange)
    for (var i in j._events) {


        //   console.log(e._customData._color)
        console.log("hi! " + i)
        console.log("event = " + JSON.stringify(j._events[i]))
        if (j._events[i]._customData) {
            console.log("lmao")
            if (arraysEqual(j._events[i]._customData._color, colorToFind, ignore)) {
                if (j._events[i]._time >= beginTime && j._events[i]._time <= endTime) {
                    if (!typesToFind || typesToFind.includes(j._events[i]._type)) {
                        if (!lightIDsToFind || lightIDsToFind.includes(j._events[i]._customData._lightID)) {
                            console.log("light id = " + j._events[i]._customData._lightID)
                            console.log("color = " + j._events[i]._customData._color)
                            console.log("time = " + j._events[i]._time)

                            for (k in j._events[i]._customData._color) {
                                if (ignore[k] == 0) {
                                    colour[k] = Math.round((beginColour[k] + (colourChange[k] * (j._events[i]._time - beginTime))) * 1000) / 1000
                                } else {
                                    colour[k] = j._events[i]._customData._color[k]
                                }
                            }
                            j._events[i]._customData._color = [colour[0], colour[1], colour[2], colour[3]]
                            console.log("newcolour = " + j._events[i]._customData._color)
                        }
                    }
                }
            }
        }
    }
}

// removes events of type and lightID includes lightIDs
removeEventsForType = (type, lightIDs) => {
    for (var i in j._events) {
        if (j._events[i]._type == type) {
            if (lightIDs.includes(j._events[i]._customData._lightID)) {
                j._events.splice(i, 1)
            }
        }
    }
}

// check if two arrays are equal, ignoring the values in the ignore array
function arraysEqual(a, b, ignore) {
    if (!ignore) ignore = [0, 0, 0, 0]
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false


    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i] && ignore[i] == 0) return false
    }
    return true
}