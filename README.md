# beat-saber-light-scripts
 hi i have like no idea what im doing btw<br />
but ok i made some stuffs
<br />

this is for chroma btw dont try and like do some funky stuff with not chroma cuz you will expericence great pain when i slap you in the face <br />
if youre insane or something, you can try use this for whatever. like.. please credit me if you experience a vision from God and can use this to make something cool


# how to use it??????
if you want help or want to help me (with my mental state or maybe this shit), my discord is `sink#5742` or [join my dead discord server](https://discord.gg/BcM8bxErer)<br /><br />
download the zip then extract it 
first you can open the file in a editor and change stufffff like the map folder and the options for the function
you can run the files with node in command line `node.exe "auto light from waveform.js"`, or maybe you can run it in vscode but like, its slower i think.
is there a better way to do this?? idk fuck you <br />
<br />
just a tip: for the default environment (maybe others), the back chevron light is kinda messed up - in chromapper, light 12 is the left one, and 11 is the right, while its the opposite in game

### auto light from waveform.js
the `auto light from waveform.js` file can be used to extract the audio levels from a mp3 file, and set chroma light levels based on that<br/>
it has stuff at the top u can change them and then it does the stuff!!!!!! yayu!!!!! yay!!!!!!!!!!!!<br/>
its kinda self explainatory (to me because i wrote it) but <br/>
put an mp3 file in the map folder (by default should be called vocals.mp3) and you can convert the waveform to chroma lights which is good for vocals because of yeah (i tried doing it manually and its shit. so i made this )<br />
make sure you change the folder and options in the .js file. by default it should work for the normaly environments. <br />
also there are comments to explain the things <br />
you can use one of the ai services that try to extract vocals from a song, and it doesnt have to be perfect because you dont hear that audio.<br />
make sure the silence at the beginning (from audacity or whatever) is included, or it will be out of sync. (ie use song.ogg from your map if using an ai, or add the silence manually if youre doing something funky)<br />
it should replace all lights of the type and lightID that you use. that is, you can use all other lights of the type (eg big rings, etc), and only the ids you set will be replaced. if you do this, you should run it after creating all the other lights (i think you can start with this, just run it again once youve done everything else for it to look correct and not flicker)<br />

i think if you have the song project and/or can extract seperate instruments tracks then you can just  automaticaly light it,, yes? ive only tried it with vocals and the rest of the sounds (first example) <br />

### old gradient thingy.js
the `old gradient thingy.js` is just a thing i did ill prolly update it at some point. it changes every light of a specific chroma colour in a range, to be a gradient through the time that you set. could be for a long like slowly changing chroma colour or something, cool ok I wish i could tell you how it works but I forgor💀<br />
dont worry theres comments i wrote like 2 months ago if u wanna use it :D<br />
<br /> i know this could be a CM-JS script but whatever. i dont think the other one can be and like ughhsdfjakljfsa it works <br />

# examples
using https://vocalremover.org/ , with the vocals set to the chevron light and music to the bottom (run the script twice on the same file)
https://www.youtube.com/watch?v=DK7vFGxD0VQ

an older example with different settings<br />
https://streamable.com/89r8h9
<br />
<br />
<br />
#
ok if u read this i am so sorry bye<br />


