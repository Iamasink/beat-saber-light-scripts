var fs = require('fs')


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





// this will (should lol) convert all lights within a time, of one color, to a gradient
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





var file = fs.readFileSync('ExpertPlusStandard.dat', 'utf-8')
j = JSON.parse(file)


// default values
beginTime = 0
beginColour = [1, 1, 1, 1]
endTime = 100
endColour = [0, 1, 0, 1]
findType = []
fColor = [0.757, 0.961, 0.961, 1]
fLightID = [3, 4, 6]
precision = 1 // precision for colour change in subbeats (?)
ignore = [0, 0, 0, 1]
colourChange = [0, 0, 0, 0]
colour = [0, 0, 0, 0]



// colourChange is change in colour per 1/precision beats

eventGradient(40, 103, [0.757, 0.961, 0.961, 1], [0.46, 0.2, 0.9, 1], [0.757, 0.961, 0.961, 1], [0, 0, 0, 1])



console.log(j._events[137]._customData._color)
fs.writeFileSync('ExpertStandard.dat', JSON.stringify(j), 'utf-8')
console.log("file written! :D FUCKING HEL")