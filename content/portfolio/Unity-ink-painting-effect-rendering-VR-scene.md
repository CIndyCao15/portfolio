+++
date = "2016-11-05T19:41:01+05:30"
title = "Unity ink painting effect rendering VR scene"
draft = false
image = "img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-1.png"
showonlyimage = false
weight = 2
+++

Use Unity's built-in pipeline to achieve a small ink style.
<!--more-->

The character is primarily soft-edged using the VdotN concept, and there are two sets of shaders: character and mountain. The semi-Lambert lighting model's coloring results are stepped using the deformation function after the mountain stone has been hard stroked ("hooked") using the Shell Method, a model curvature-based chapping method (which is not very effective and is not applicable to models with low distant surface numbers, so it is not shown), and the Shell Method. Finally, Triplanar was used to superimpose each splash stroke.

Using VRTK, the bridge to the Oculus Rift S device was manually built (Virtual Reality Toolkit). Performance analysis was conducted using the official tool UPR (Unity Performance Report).

For the characters, only the main and normal maps from the original model were used, and for the rocks, only the normal maps. (P3 is the result of the original model.) The ramp map and the stroke texture map were added.

{{< youtube id="CH7Ro8B77GQ" title="Unity ink painting effect rendering VR scene" >}}
\
[![Snapshot 1 of Unity ink painting effect rendering VR scene][1]][1]

[![Snapshot 2 of Unity ink painting effect rendering VR scene][2]][2]

[![Snapshot 3 of Unity ink painting effect rendering VR scene][3]][3]

[1]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-1.png
[2]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-2.png
[3]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-3.png
