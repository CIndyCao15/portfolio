+++
date = "2016-11-05T19:41:01+05:30"
title = "Unity ink painting effect rendering VR scene"
draft = false
image = "img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-1.png"
showonlyimage = false
weight = 2
+++

Using Unity's built-in pipeline, I implemented a small project in the style of Chinese brush painting.

The project is divided into two shaders, one for characters and one for rocks. The characters mainly use the VdotN principle to implement soft edges, while the rocks use the Shell Method to implement hard edges ("勾"). The rocks also use a curvature-based method (pitting) to produce a bumpy surface, but this method is not suitable for models with low face counts at a distance and is not shown in the final result. The final result uses the Triplanar method to add brush strokes.

I used VRTK (Virtual Reality Toolkit) to manually complete the connection with the Oculus Rift S device. I also used the official Unity tool UPR (Unity Performance Report) to analyze performance.

The characters only used the original model's main texture and normal map, while the rocks only used the original model's normal map. (The original model effect is Figure 3.) I also added texture maps for brush strokes and ramp maps.

{{< youtube id="YdPf6S08NT0" title="Unity ink painting effect rendering VR scene" >}}
\
[![Snapshot 1 of Unity ink painting effect rendering VR scene][1]][1]

[![Snapshot 2 of Unity ink painting effect rendering VR scene][2]][2]

[![Snapshot 3 of Unity ink painting effect rendering VR scene][3]][3]

[1]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-1.png
[2]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-2.png
[3]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-3.png
