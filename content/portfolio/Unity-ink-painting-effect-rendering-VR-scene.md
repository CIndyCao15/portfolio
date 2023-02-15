+++
date = "2016-11-05T19:41:01+05:30"
title = "[ #Project 2 ] Unity VR - The Peach Blossom Spring - Chinese brush painting effect"
draft = false
image = "img/portfolio/Unity-ink-painting-effect-rendering-VR-scene.png"
showonlyimage = false
weight = 2
+++

The VR experience focuses on Climate Emergency. The first scene shows a utopian scene from a long time ago, the second scene shows the current Climate Emergency facing humanity (inspired by the Chongqing wildfire in 2022), and the third scene shows a cyberspace, where the player can make a commitment.

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
<br>

You can find the playable build shown in the video [here](https://drive.google.com/drive/folders/1O-hnS8qAkfEFtwk0FRUm3RVPHHwUvIW8?usp=sharing). The game runs on Oculus Rift S, so if you don't have the VR headset I'm afraid you won't get the full experience. You can still use the spacebar to switch between scenes, which is a backdoor I left, but other interactions (moving, teleporting, picking up props, dialogue, etc.) are not available.

Chinese brush painting rendering is the part where I spend the most effort. For the brush painting-only version, please check out my other video:

{{< youtube id="YdPf6S08NT0" title="Unity ink painting effect rendering VR scene" >}}
<br>

Using Unity's built-in pipeline, I implemented a small project in the style of Chinese brush painting.

I first analyze the aesthetic characteristics of landscape and figure paintings, and then proposed two methods for Chinese brush painting effect, one for characters and one for mountains and rocks. I use Oculus Rift S as a development device and developed this project based on the new XR plug-in architecture provided by Unity 2019.3.0, and finally use Oculus Debug Tool and Unity UPR (Unity Performance Report) for performance testing.

[![Snapshot 1 of Unity ink painting effect rendering VR scene][1]][1]

[![Snapshot 2 of Unity ink painting effect rendering VR scene][2]][2]

[1]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-1.png
[2]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-2.png

This picture shows what the models look like originally in Unity Standard shader.

[![Snapshot 3 of Unity ink painting effect rendering VR scene][3]][3]

[3]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-3.png

## Chinese Brush Painting Rendering
### Aesthetic Characteristics of Chinese Brush Painting
For **brush painting mountains and stones**, there are two characteristics that need to be reflected:

1.The stone has many sides (石分三面)

A stone should have a sense of space and volume, and a sense of impermeability is the top priority. The two steps of "rub (皴)" and "dye (染)" are the key steps to enhance the sense of volume of rocks.

2.Structural use of the brush (骨法用笔)

When drawing the contours of an object (sketch, 勾), the technique of using a brush must be strong, thus forming the structure of the object like bones.

{{< figure src="/img/portfolio/Unity-ink-水墨画特点分析.jpg" >}}

There are two very different styles of **figures in Chinese brush paintings**. The traditional style, such as the *Drunken Immortal in Splashed Ink Style* (泼墨仙人图) by Liang Kai of Song Dynasty, has vivid spiritual consonance and a high degree of refinement and exaggeration of the characters; the modern style, such as *Whisper* (悄悄话), is combined with pencil sketch techniques. The characters are perfectly shaped in rich details, while the background is blurred. 

{{< figure src="/img/portfolio/Unity-ink-泼墨仙人图悄悄话.png" alt="**Left**: *Drunken Immortal in Splashed Ink Style*(1200s);   **Right**: *Whisper*(1979)" caption="**Left**: *Drunken Immortal in Splashed Ink Style*(1200s);   **Right**: *Whisper*(1979)" width="600px" >}}

In character rendering part, I choose to simulate modern-style brush painting characters.

There are four techniques of traditional Chinese brush painting: sketching, rubbing, dotting, and shading (勾、皴、点、染). Among them, "dotting" refers to drawing moss, which is not a necessary step for painting. Therefore, I slightly changed these four steps to "sketching, rubbing, shading, and coloring (勾、皴、染、设色)", which correspond to the four parts that need to be implemented in realtime rendering: contour rendering, texture mapping/curvature, lighting model, and main texture.

{{< figure src="/img/portfolio/Unity-ink-勾皴染设色.png" >}}
