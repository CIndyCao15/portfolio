+++
date = "2016-11-05T19:41:01+05:30"
title = "[ #Project 2 ] Unity VR - The Peach Blossom Spring - Chinese brush painting effect"
draft = false
image = "img/portfolio/Unity-ink-painting-effect-rendering-VR-scene.png"
showonlyimage = false
weight = 2
+++

The VR experience focuses on Climate Emergency. The first scene shows a utopian scene from a long time ago, the second scene shows the current Climate Emergency facing mankind (inspired by the Chongqing wildfire in 2022), and the third scene shows a cyberspace, where the player can make a commitment.

> There was a time when meadow, grove, and stream,
\
> The earth, and every common sight,
\
> To me did seem
\
> Apparelled in celestial light,
\
> The glory and the freshness of a dream.
\
> It is not now as it hath been of yore;—
\
> Turn wheresoe'er I may,
\
> By night or day.
\
> The things which I have seen I now can see no more.

*["The Creation of Adam"](https://skfb.ly/6RnWL) by Loïc Norgeot is licensed under [Creative Commons Attribution](http://creativecommons.org/licenses/by/4.0/).*

{{< youtube id="NW-UrDA5nq0" title="Unity ink painting effect rendering VR scene" >}}
\
Chinese brush painting rendering is the part where I spend the most effort. For the brush painting-only version, please check out my other video:

{{< youtube id="YdPf6S08NT0" title="Unity ink painting effect rendering VR scene" >}}
\
Using Unity's built-in pipeline, I implemented a small project in the style of Chinese brush painting.

The project is divided into two shaders, one for characters and one for rocks. The characters mainly use the VdotN principle to implement soft edges, while the rocks use the Shell Method to implement hard edges ("勾"). The rocks also use a curvature-based method (pitting) to produce a bumpy surface, but this method is not suitable for models with low face counts at a distance and is not shown in the final result. The final result uses the Triplanar method to add brush strokes.

I used VRTK (Virtual Reality Toolkit) to manually complete the connection with the Oculus Rift S device. I also used the official Unity tool UPR (Unity Performance Report) to analyze performance.

The characters only used the original model's main texture and normal map, while the rocks only used the original model's normal map. (The original model effect is Figure 3.) I also added texture maps for brush strokes and ramp maps.

[![Snapshot 1 of Unity ink painting effect rendering VR scene][1]][1]

[![Snapshot 2 of Unity ink painting effect rendering VR scene][2]][2]

[![Snapshot 3 of Unity ink painting effect rendering VR scene][3]][3]

[1]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-1.png
[2]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-2.png
[3]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-3.png
