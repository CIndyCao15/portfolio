+++
date = "2016-11-05T19:41:01+05:30"
title = "Real-Time Chinese Ink Rendering for VR"
description = "This Unity VR project explores how the visual language of Chinese ink painting can be translated into real-time 3D rendering. I developed separate rendering treatments for characters and environments, then brought them together in a three-scene VR experience with interaction, spatial UI, and performance optimization for Oculus Rift S. I led the overall project, with additional programming support on parts of the gameplay implementation."
draft = false
image = "img/portfolio/Unity-ink-painting-effect-rendering-VR-scene.png"
showonlyimage = false
weight = 1
math = true
+++

---

<div class="table">
    <div class="row">
        <div class="cell border-right col-1">
            <strong>ROLE</strong><br>
            Project Lead & Technical Artist<br><br>
            <strong>YEAR</strong><br>
            2022<br><br>
            <strong>ENGINE</strong><br>
            Unity<br><br>
            <strong>TECH</strong><br>
            ShaderLab / HLSL, Unity XR<br><br>
            <strong>PLATFORM</strong><br>
            Oculus Rift S<br><br>
            <strong>FOCUS</strong><br>
            Stylized Rendering, Shader Development, VR Integration<br><br>
        </div>
        <div class="cell border-right col-2">
            <strong>RESPONSIBILITY</strong>
            <ol>
                <li>
                    Led the project’s visual and technical direction, developing the real-time Chinese ink rendering system for characters and environments.
                </li>
                <li>
                    Designed and implemented custom shaders, VR interaction, and spatial UI in Unity, integrating them into a complete three-scene VR experience.
                </li>
                <li>
                    Profiled and optimized the final experience for Oculus Rift S, averaging 89.9 FPS in headset testing and maintaining UPR performance scores of 90+.
                </li>
            </ol>
        </div>
        <div class="cell col-3">
            <strong>DESCRIPTION</strong><br>
            This Unity VR project explores how the visual language of Chinese ink painting can be translated into real-time 3D rendering. I developed separate rendering treatments for characters and environments, then brought them together in a three-scene VR experience with interaction, spatial UI, and performance optimization for Oculus Rift S. I led the overall project, with additional programming support on parts of the gameplay implementation.
        </div>
    </div>
</div>

---

{{< youtube id="NW-UrDA5nq0" title="Unity ink painting effect rendering VR scene" >}}
<br>

*["The Creation of Adam"](https://skfb.ly/6RnWL) by Loïc Norgeot is licensed under [Creative Commons Attribution](http://creativecommons.org/licenses/by/4.0/).*
<br>

### 01 From Artistic Principles to Rendering Rules

I started by narrowing the visual language of Chinese ink painting into four principles that could guide the rendering.

<div class="ink-principles-grid">
  <article class="ink-principle-card">
    <h5>Form Through Line / Bone Method in Brushwork<small>以线造形 / 骨法用笔</small></h5>
    <a href="/img/portfolio/Unity-ink-bone.jpg">
      <img src="/img/portfolio/Unity-ink-bone.jpg" alt="Chinese ink painting using expressive brush lines to define form" loading="lazy">
    </a>
    <p>Line defines form, while changes in weight, dryness, and rhythm give the line its character.</p>
  </article>
  <article class="ink-principle-card">
    <h5>Five Tones of Ink<small>墨分五色</small></h5>
    <a href="/img/portfolio/Unity-ink-5-tones.jpeg">
      <img src="/img/portfolio/Unity-ink-5-tones.jpeg" alt="Chinese ink painting showing tonal variation from light to dark ink" loading="lazy">
    </a>
    <p>Five Tones of Ink uses tonal variation to organize light and dark, which later informed the diffuse warp.</p>
  </article>
  <article class="ink-principle-card">
    <h5>Three Faces of Rock<small>石分三面</small></h5>
    <a href="/img/portfolio/Unity-ink-3-faces-stone.jpg">
      <img src="/img/portfolio/Unity-ink-3-faces-stone.jpg" alt="Chinese ink landscape painting showing rock planes and volume" loading="lazy">
    </a>
    <p>Three Faces of Rock emphasizes how the planes of a rock turn in space, which guided how I used lighting to show volume.</p>
  </article>
  <article class="ink-principle-card">
    <h5>Brush Texture / Cun Texture Strokes<small>笔墨肌理 / 皴法</small></h5>
    <a href="/img/portfolio/Unity-ink-cun-texture.jpg">
      <img src="/img/portfolio/Unity-ink-cun-texture.jpg" alt="Chinese ink painting using cun texture strokes to describe rock surfaces" loading="lazy">
    </a>
    <p>Brush marks describe the texture and character of a surface, not just its detail.</p>
  </article>
</div>

These became three rendering goals: **contour**, **tone and volume**, and **surface texture**.

[![Snapshot 2 of Unity ink painting effect rendering VR scene][2]][2]

[2]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-2.png
<br>

### 02 Character Rendering: View-Dependent Contours and Brushwork<br>

#### View-Dependent Contours

For the character shader, I translated the line-based visual language into view-dependent contours.

I used ***v*** ∙ ***n*** to pick out the silhouette, clothing folds, and other surface structure, then remapped the result through a 1D lookup texture to control line width, darkness, and falloff.

{{< figure src="/img/portfolio/Unity-ink-人物轮廓abcde.png" caption="Character contour development. a) Original model with Blinn-Phong shading; b) ***v*** · ***n*** result; c) contour calculated from *C<sub>edge</sub>*; d) silhouette after texture warping; e) final silhouette with normal-map detail" >}}

The first result kept too much small-scale detail, so the linework became noisy. I added a normal strength control to dial the detail back until the folds still read without overwhelming the character.

{{< figure src="/img/portfolio/Unity-ink-normal-details.jpg" caption="Full normal detail vs. reduced normal strength" width="400" >}}

#### Colour and Brush Texture

I kept the original character texture, reduced its saturation, and made the brightness adjustable so the colour could sit behind the linework and brush texture.

I first mapped the ink texture through the character UVs, but the pattern repeated too obviously across larger areas.

{{< figure
  src="/img/portfolio/Unity-ink-UV-mapped-brush-texture.png"
  link="/img/portfolio/Unity-ink-UV-mapped-brush-texture.png"
  caption="UV-mapped brush texture"
  width="200">}}

So I switched to triplanar mapping.

Because the character moves, I used object space to keep the brush texture locked to the model instead of sliding across it.

<figure style="margin: 0 0 24px; text-align: center;"> 
  <div style="display: inline-flex; align-items: center; gap: 6px;"> 
    <img src="/img/portfolio/Unity-ink-triplanar1.png" 
         alt="triplanar result 1" 
         style="display: block; width: 200px; max-width: calc(50vw - 12px); height: auto;"> 
    <img src="/img/portfolio/Unity-ink-triplanar2.png" 
         alt="triplanar result 2" 
         style="display: block; width: 200px; max-width: calc(50vw - 12px); height: auto;"> 
  </div> 
 
  <figcaption style="text-align: center; margin-top: 8px; font-size: 14px; color: #777;"> 
    Two object-space triplanar ink-texture variations 
  </figcaption> 
</figure>

The final character treatment combines view-dependent contours, adjusted texture colour, and object-space splashing-ink texture.

#### Character Rendering Overview

[![Snapshot 3 of Unity ink painting effect rendering VR scene][3]][3]

[3]: /img/portfolio/Unity-ink-MonkeyKing.png

### 03 Environment Rendering: Silhouette, Volume, and Brush Texture

Mountains and rocks needed a different treatment. The character shader relied on fine internal lines, while the environment needed stronger silhouettes, dry-brush edges, and clearer volume.

#### Dry-Brush Silhouettes

I used a multi-pass **Shell Method** for the outer contour. The base pass renders the surface and writes depth. The outline passes expand the backfaces so the exposed edge becomes the silhouette.

Testing at a wider VR FOV exposed a problem with the standard view-space Z offset. Near the edge of the view, the outline could shift, change width, or disappear behind the front surface.

{{< figure src="/img/portfolio/Unity-ink-frustum.png" caption="**Left**: view frustum; **Right**: contour misalignment becomes more visible toward the edge of the viewport, especially with the wider FOV used in VR" width="600px" >}}

I changed the offset so each vertex first moves along its own **view direction**, then expands mainly in view-space XY. This kept the outline much more consistent across the frustum.

{{< figure src="/img/portfolio/Unity-ink-mountainContour.png" caption="a) Adjusted silhouette; b) reference implementation. Circled regions show uneven outline thickness near the frustum edge" width="550px" >}}

To make the edge feel less mechanical, I layered two slightly different contour passes. Noise offsets the vertices, while the wider pass drops selected fragments to break the edge into a dry-brush pattern inspired by **flying-white (飞白)** brushwork.

#### Ink Shading and Brush Texture

The rocks still needed light and dark structure to show their volume.

I started with **Half-Lambert**, then remapped the diffuse result through a 1D diffuse warp texture. This compressed the smooth lighting gradient into a smaller range of ink tones while keeping the main planes of the rock readable.

{{< figure src="/img/portfolio/Unity-ink-漫反射结果图片.png" width="550px" >}}
<br>

The result still looked too smooth, so I added noise and brush texture through triplanar mapping.

{{< figure src="/img/portfolio/Unity-ink-漫反射加噪声结果.png" width="550px" >}}
<br>

I then applied a Gaussian blur to soften the transitions and mimic ink diffusion.

{{< figure src="/img/portfolio/Unity-ink-漫反射加噪声加高斯结果.png" width="550px" >}}
<br>

#### Environment Rendering Overview

[![Snapshot 5 of Unity ink painting effect rendering VR scene][5]][5]

[5]: /img/portfolio/Unity-ink-MountainStone.png

#### Curvature Experiment

I also tried driving the cun texture from real-time curvature.

It looked promising on dense meshes, but low-poly rocks exposed obvious triangle-shaped faceting.

{{< figure src="/img/portfolio/Unity-ink-曲率效果图.png" width="550px" >}}
<br>

I tested smoothing as a workaround, but the result still depended too much on mesh density. Since the Shell Method was already adding rendering cost, I left curvature out of the final VR scene.

{{< figure src="/img/portfolio/Unity-ink-曲率对比图.png" caption="**Left**: No curvature; **Right**: With blurred curvature" width="550px" >}}

### 04 VR Integration and Real-Time Validation

The ink rendering system was built for a complete three-scene VR experience, so it had to hold up in headset as well as in screenshots.

The wider FOV exposed the Shell Method issue above, while stereo rendering and frame rate also shaped the final rendering choices.

Oculus Store guidelines specified 80 FPS for Rift S on the target PC specification. In headset testing with Oculus Debug Tool, the final scene averaged 89.9 FPS.

{{< figure src="/img/portfolio/Unity-ink-Oculus-Debug-Tool.jpg" width="550px" >}}
<br>

I also used Unity Performance Reporting (UPR) to compare the original Standard Shader scene with the ink-rendered version.
Both remained in a strong performance range, with the ink version scoring 90+ across repeated UPR tests.

<figure style="margin: 0 0 24px;">
  <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center; gap: 16px;">
    <img src="/img/portfolio/Unity-ink-UPR1.png"
         alt="Unity UPR performance results for the scene using the Standard Shader"
         style="max-width: calc(50% - 8px); height: auto;">
    <img src="/img/portfolio/Unity-ink-UPR2.png"
         alt="Unity UPR performance results for the scene using the custom ink shader"
         style="max-width: calc(50% - 8px); height: auto;">
  </div>

  <figcaption style="text-align: center; margin-top: 8px; font-size: 14px; color: #777;">
    UPR performance comparison. <strong>Left:</strong> Standard Shader baseline; <strong>Right:</strong> custom ink shader.
  </figcaption>
</figure>

The Shell Method increased the reported mountain face and vertex counts by about 30%. Because the mountain geometry was still a relatively small part of the overall scene, the increase remained acceptable.

That trade-off also made the curvature experiment less worthwhile to keep in the final version.

### 05 Beyond Rendering: VR Interaction, UI, and Architecture

Rendering was the main technical focus, but the final project was still a complete VR experience with three connected scenes.

The experience also included gameplay logic, UI, VFX, and scene transitions.

#### Interaction Architecture

<br>
{{< figure
  src="/img/portfolio/Unity-ink-structure-of-scripts.png"
  link="/img/portfolio/Unity-ink-structure-of-scripts.png"
  alt="Simplified gameplay / interaction architecture"
  caption="Simplified gameplay / interaction architecture"
  width="430">}}

#### Spatial UI in VR

For dialogue and prompts, I tested two ways of orienting billboard text in 3D space.

For NPC dialogue, I wanted the text to stay readable while still feeling attached to the character as the player moved their head.

<figure style="margin: 0 0 24px;">
  <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center; gap: 16px;">
    <img src="/img/portfolio/Unity-ink-UI1.GIF"
         alt="VR dialogue text using a Viewer-Facing Billboard that rotates toward the viewer position"
         style="max-width: calc(50% - 8px); height: auto;">
    <img src="/img/portfolio/Unity-ink-UI2.GIF"
         alt="VR dialogue text using a Camera-Forward Billboard that remains parallel to the camera"
         style="max-width: calc(50% - 8px); height: auto;">
  </div>

  <figcaption style="text-align: center; margin-top: 8px; font-size: 14px; color: #777;">
    Billboard orientation comparison. <strong>Left:</strong> Viewer-Facing Billboard; <strong>Right:</strong> Camera-Forward Billboard.
  </figcaption>
</figure>

Viewer-Facing Billboard rotates the UI toward the viewer position. It creates more perspective change near the edge of the FOV, but in headset the text felt more naturally anchored to the character.

I used this version in the final experience.

Keeping the text plane parallel to the camera reduced edge distortion and looked cleaner on a flat screen. In VR, though, it felt more like a screen-space layer following the viewer.

The comparison made the choice less about geometric neatness and more about how the UI actually felt in space.

### 06 Final Experience and Reflection

The final ink scene uses different treatments depending on the asset and its depth in the composition.

Foreground rocks use stronger splashed ink and surface brushwork.
Midground rocks keep clearer texture and stronger light-dark separation to show volume.

Distant mountains use lighter ink, lower contrast, and a different brush scale to create more atmosphere.

[![Snapshot 1 of Unity ink painting effect rendering VR scene][1]][1]
[![Snapshot 3 of Unity ink painting effect rendering VR scene][7]][7]

[1]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-1.png
[7]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-3.png

Characters and environments also use different contour methods, so the final look comes from a set of related rendering treatments rather than one shader applied everywhere.

**One last shader tester…**

{{< figure src="/img/portfolio/Unity-ink-UnityChan.gif" caption="Unity Chan, with wind effects applied to her hair and skirt using Magica Cloth." width="300px" >}}

{{< figure src="/img/portfolio/Unity-ink-UnityChan2.jpg" caption="Adding post-process effects to mimic Xuan paper texture." width="600px" >}}

<!-- This picture shows what the models look like originally in Unity Standard shader.

[![Snapshot 3 of Unity ink painting effect rendering VR scene][7]][7]

[7]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-3.png

In the past two years, China has experienced an extremely severe climate emergency. The unprecedented heavy rains and floods in Henan Province in 2021 affected 14.8 million people and resulted in 398 deaths and disappearances. The capital city of Zhengzhou, with a population of nearly 13 million, received nearly the annual average rainfall in just three days. The hourly rainfall intensity between 4 p.m. and 5 p.m. on July 20 **broke the historical record for extreme rainfall in mainland China**. In August 2022, Chongqing was hit by an extreme weather event of consecutive high temperatures and sunny days, which led to a forest fire. The flames and thick smoke lit up the night sky, and Chongqing was sleepless throughout the night.

{{< figure src="/img/portfolio/Unity-ink-fire.png" width="500px" >}}
<br>

Shocked by the news images, I decided to create a VR experience depicting the scene of a forest fire at night.

Living in cities with air conditioning, central heating, skyscrapers, and glass corridors, we often overlook the pain in distant places. What we are familiar with seems to be a stable life, but it is actually a phantom created by the market economy, long-distance logistics, and social systems. Through creating this VR experience, I hope to draw attention to the urgent need to face the climate emergency. Otherwise, the sword of Damocles will eventually fall, and no one will be spared.

## Design Concept {#Design-Concept}

In ancient Chinese landscape philosophy, the concept of *"unity of man and nature"* (天人合一) was emphasized, where man and nature coexist in harmony. In landscape painting, the idea of *"reclining and traveling"* (卧游) was used to fully appreciate the beauty of mountains and rivers. The concept of *"reclining and traveling"* involves a spiritual journey through cultural mediums in a fleeting moment, similar to using VR headsets to tour landscape paintings.

The first scene is set in spring, with a light drizzle, expressing the ancient idea of the *unity of man and nature*. After taking off the VR headset, the second scene shows a modern-day mountain fire. In this scene, six modern people wearing VR headsets seem unwilling to wake up from their own illusion, unlike the timely awakening of the player. After the player talks to them and removes their VR headsets, they immediately burn and disperse, signifying that if we do not address the climate emergency, no one will be spared in the end.

The scene then switches to the third scene, a holographic consciousness space with a giant sculpture of the hand from Michelangelo's *The Creation of Adam*. At the fingertips where God and Adam meet, consciousness flows quietly. When the player gently touches it, they also make a commitment to address the climate emergency.

## Chinese Brush Painting Rendering {#Chinese-Brush-Painting-Rendering}
### Aesthetic Characteristics of Chinese Brush Painting {#Aesthetic-Characteristics-of-Chinese-Brush-Painting}
For **brush painting mountains and stones**, there are two characteristics that need to be reflected:

1.The stone has many sides (石分三面)

A stone should have a sense of space and volume, and a sense of impermeability is the top priority. The two steps of "rub (皴)" and "dye (染)" are the key steps to enhance the sense of volume of rocks.

2.Structural use of the brush (骨法用笔)

When drawing the contours of an object (sketch, 勾), the technique of using a brush must be strong, thus forming the structure of the object like bones.

{{< figure src="/img/portfolio/Unity-ink-水墨画特点分析.jpg" >}}
<br>

There are two very different styles of **figures in Chinese brush paintings**. The traditional style, such as the *Drunken Immortal in Splashed Ink Style* (泼墨仙人图) by Liang Kai of Song Dynasty, has vivid spiritual consonance and a high degree of refinement and exaggeration of the characters; the modern style, such as *Whisper* (悄悄话), is combined with pencil sketch techniques. The characters are perfectly shaped in rich details, while the background is blurred. 

{{< figure src="/img/portfolio/Unity-ink-泼墨仙人图悄悄话.png" alt="**Left**: *Drunken Immortal in Splashed Ink Style*(1200s);   **Right**: *Whisper*(1979)" caption="**Left**: *Drunken Immortal in Splashed Ink Style*(1200s);   **Right**: *Whisper*(1979)" width="600px" >}}

In character rendering part, I choose to simulate modern-style brush painting characters.

There are four techniques of traditional Chinese brush painting: sketching, rubbing, dotting, and shading (勾、皴、点、染). Among them, "dotting" refers to drawing moss, which is not a necessary step for painting. Therefore, I slightly changed these four steps to "sketching, rubbing, shading, and coloring (勾、皴、染、设色)", which correspond to the four parts that need to be implemented in realtime rendering: contour rendering, texture mapping/curvature, lighting model, and main texture.

{{< figure src="/img/portfolio/Unity-ink-勾皴染设色.png" >}}
<br>

### Chinese Brush Painting Mountain & Rock Rendering Scheme {#Chinese-Brush-Painting-Mountain-and-Rock-Rendering-Scheme}

In the Chinese brush painting mountain and rock rendering scheme, the Shell Method-based dual-pass rendering method is used to render the outline of the mountain stone, simulating the effect of dry brushes and whitewashing. The internal coloring uses a shading method based on Half-Lambert lighting model and diffuse warping function, and again uses triplanar to superimpose the stroke texture, and uses Gaussian blur to simulate the effect of ink diffusion.

#### Contour rendering based on dual-pass Shell Method {#Contour-rendering}

Traditional Shell Method offset the back of the shell geometry along the -z axis, causing the contour and object to have a strong sense of misalignment, especially at the edge of the view frustum. I eliminate this artifact by offsetting the geometry along the view direction. 

{{< figure src="/img/portfolio/Unity-ink-frustum.png" caption="**Left**: the view frustum; **Right**: the contour misalignment gets worse as the object gets closer to the edge of the viewport. This is unsatisfactory, especially in VR, when the player has a huge FOV." width="600px" >}}

To simulate whitewash and dry brush, the contour rendering requires two passes. Each pass samples a Perlin noise, and the vertices are offset according to the noise map. To sample a texture in the vertex shader, I use the *tex2Dlod* method in cg.

The comparison between my silhouette rendering scheme on the terrain and the existing scheme is as follows:

{{< figure src="/img/portfolio/Unity-ink-mountainContour.png" caption="a) My silhouette rendering effect; b) The silhouette rendering effect in the reference. The circled area is where the stroke thickness is uneven near the edge of the frustum." width="550px" >}}

#### Internal coloring with a shading method based on Half-Lambert lighting model and diffuse warping function {#Internal-coloring}

Since the mountain rock has the aesthetic characteristic of "space and volume", a lighting model should be used to render the mountain rock to create a sense of volume. In an empirical lighting model, lighting consists of 3 components: diffuse, specular, and ambient lighting. Brush painting mountain and stone mainly reflects diffuse light.

The diffuse warp function should be a step function. It is used to divide the ink color.

<div style="display: none">
{{< figure src="/img/portfolio/Unity-ink-漫反射公式.png" width="300px" >}}
<br>
</div>

$$
\begin{align}
C_{0}\left(C_{i}\right)=\begin{cases}
0.1, & C_{i} \leq 0.25 \cr
0.3, & 0.25 < C_{i} \leq 0.55 \cr
0.7, & 0.55 < C_{i} \leq 0.8 \cr
1.0, & C_{i} > 0.8
\end{cases}
\end{align}
$$

Among them, *C{{< sub "i" >}}* is the original diffuse color, which is the input color of the *C{{< sub "0" >}}* function. In actual use, to make the transition between different colors more natural, I roughly add a transition color between adjacent gradients.

{{< figure src="/img/portfolio/Unity-ink-漫反射函数图片.png" caption="Diffuse warp function" width="250px" >}}

The result of this step, a shading method based on Half-Lambert lighting model and diffuse warping function, is as follows.

{{< figure src="/img/portfolio/Unity-ink-漫反射结果图片.png" width="550px" >}}

#### Rubbing simulation based on model curvature {#Rubbing}

Rubbing (皴) is a technique of Chinese brush painting, which is used in landscape painting to represent trees and rocks. It is mainly used to express the texture of the rocks, that is, the texture of the inner contour.

I use model curvature to simulate rubbing. When calculating the curvature, as the arc length approaches zero, the arc length can be approximated by the distance Δ*p* between vertices, and the rate of change of the normal Δ*N* can be used to replace the rate of change of the tangent.

{{< figure src="/img/portfolio/Unity-ink-曲率计算图.jpg" caption="Surface curvature calculate" width="350px" >}}

The curvature at fragment *i* can be obtained by the ratio of the vertex normal vector and the rate of change of the position coordinate relative to the *x*-axis direction and the *y*-axis direction of the view space.

<div style="display:none">
{{< figure src="/img/portfolio/Unity-ink-曲率公式.png" width="100px" >}}
<br>
</div>

$$
\begin{align}
k_{i}=\frac{1}{k} \cdot \frac{\Delta N}{\Delta p}
\end{align}
$$

Among them, *k{{< sub "i" >}}* is the curvature value at fragment *i*, and *k* is the curvature adjustment coefficient. Written in Unity ShaderLab, the pseudocode is as follows:

{{< highlight go >}}
curvature = length(fwidth(viewNormal)) / (length(fwidth(viewPos)) * _CurveFactor);
{{< / highlight >}}

Curvature reflects the degree of change in the convexity and concavity of the object's surface. The larger the curvature value, the sharper the unevenness of the object's surface. At this point, the rubbing should be more obvious. I limit the curvature value in the range of 0 to 1, and use 1-*k{{< sub "i" >}}* to calculate the rubbing color.

{{< figure src="/img/portfolio/Unity-ink-曲率效果图.png" width="550px" >}}
<br>

This method based on the model curvature has its limitations in terms of use scenarios. I use the per vertex information (which is constant within a single triangle) of the normal rate of change and position to calculate the derivative. In the case of a relatively high triangle counts of a single model, the results obtained by this calculation method can meet the requirements; but in the case of a relatively low triangle count number, there will be more blocky. The solution to this artifact is:
1. Bake the curvature information into vertex color;
2. Bake the curvature information into a curvature map;
3. Use Post Processing and render texture to blur the blocky curvature, and then blend it with other render outputs.

{{< figure src="/img/portfolio/Unity-ink-曲率对比图.png" caption="**Left**: No curvature; **Right**: With blurred curvature" width="550px" >}}

Considering that the actual effect is not ideal, the simulation of the rubbing method was not deployed in the rendering scheme of mountains and rocks. Instead, I use triplanar and Gaussian blur to simulate the stroke texture of the rocks.

#### Stroke texture (feathering and spreading) {#Stroke-texture}

When using the one-dimensional lookup table for diffuse warp, the input is the diffuse calculated according to the Half-Lambert lighting model. Adding some randomness to this will make the final warp results feel more random.

<div style="display:none">
{{< figure src="/img/portfolio/Unity-ink-漫反射加噪声公式.png" width="150px" >}}
<br>
</div>

$$
\begin{align}
C_{i \space new}=C_{i}+r_{i}
\end{align}
$$

Among them, *C{{< sub "i new" >}}* is the new diffuse after processing, and *r{{< sub "i" >}}* is a random value. I use Perlin noise to introduce randomness, and use a stroke texture to control the overall light and shadow. I use triplanar to sample the two textures.

The image below is the result of inputting *C{{< sub "i new" >}}* into the diffuse warp function after adding the stroke texture. As you can see, the noise gives a more random look to the edges of the ink chunks.

{{< figure src="/img/portfolio/Unity-ink-漫反射加噪声结果.png" width="550px" >}}
<br>

After the above processing, I achieve the randomness of the edge of the mountains, but it still lacks the feeling of light ink spreading. To simulate the spreading and feathering, I introduce Gaussian blur for further processing.
I adjust the appropriate parameters, and the final blurred result is shown in the image. There is an obvious feathering edge at the junction of light and dark in the mountain rock.

{{< figure src="/img/portfolio/Unity-ink-漫反射加噪声加高斯结果.png" width="550px" >}}
<br>

The flow map of the brush painting mountain and rock rendering scheme is as follows:

[![Snapshot 4 of Unity ink painting effect rendering VR scene][4]][4]

[4]: /img/portfolio/Unity-ink-水墨山石渲染方案.png

Step-by-step output result of the scheme:

[![Snapshot 5 of Unity ink painting effect rendering VR scene][5]][5]

[5]: /img/portfolio/Unity-ink-MountainStone.png

{{< figure src="/img/portfolio/Unity-ink-山石界面截图.png" alt="A material panel in Unity" caption="A material panel in Unity" width="250px" >}}

### Chinese Brush Painting Character Rendering Scheme {#Chinese-Brush-Painting-Character-Rendering-Scheme}

In the Chinese brush painting character rendering scheme, I propose a rendering method based on the viewing direction and bump map for contour rendering, that is, **Surface Angle Silhouetting**. A one-dimensional look-up table is used to map the results, so that the pleats of the clothes get a soft willow leaf drawing (柳叶描) effect, and normal scale is used to control the fineness of the stroke. In the internal coloring part, the grayscale adjustment of the color is realized. At the same time, a triplanar stroke map based on object space is proposed to simulate the effect of randomly splashing ink. Finally, the contour line, internal coloring and splashing ink strokes are mixed by texture blending.

On a smooth surface, the definition of point P on the Silhouette is ***v*** ∙ ***n*** =0.

{{< figure src="/img/portfolio/Unity-ink-VdotN.png" width="300px" >}}
<br>

But an actual 3D model is composed of many planes. What's more, in order to make the silhouette have a certain width, the judgment condition needs to be relaxed as follows:

<div style="display: none">
{{< figure src="/img/portfolio/Unity-ink-人物轮廓线公式.png" width="300px" >}}
<br>
</div>

$$
\begin{align}
C_{edge}=\begin{cases}
1&, &\frac{|V \cdot N|}{r} > t \cr
\left(\frac{|V \cdot N|}{r}\right)^{p}&, &\frac{|V \cdot N|}{r} \leq t
\end{cases}
\end{align}
$$

Among them, *C{{< sub "edge" >}}* is the color of the contour; *r* can control the edge range, which can make the edge transition smoother; *t* controls the threshold; *p* is used to perform exponential operations on the edge and adjust the shade of edge color.

In order to narrow the gradient range between black and white, make the gradient range more natural, and simulate the effect of ink diffusion, I introduce a one-dimensional lookup table:

{{< figure src="/img/portfolio/Unity-ink-1DLUT.jpg" >}}
<br>

This one-dimensional lookup table has black on the left and white on the right, with very narrow gradients. This texture can also be seen as the result of Gaussian low-pass filtering preprocessing of an ordinary stepped lookup table. When in use, take the value of *C{{< sub "edge" >}}* as input, and use this ramp texture for warping. The final effect is as follows:

{{< figure src="/img/portfolio/Unity-ink-人物轮廓abcde.png" caption="a) The original model shaded according to the Blinn-Phong lighting model; b) The result of ***v*** ∙ ***n***; c) The result of calculating *Cedge*; d) Silhouette after texture warping; e ) Silhouette with normal map (final result for Silhouette)" >}}

The relevant shader code is as follows:

{{< highlight go >}}
fixed vdotn = abs(dot(viewDir, bump));
fixed edge = vdotn / _Range;
edge = edge > _Thred ? 1 : edge;
edge = pow(edge, _Pow);
fixed4 edgeColor = tex2D(_SilhouetteRampTex, fixed2(edge, 0.5));
{{< / highlight >}}

For the internal coloring of the character, I use some empirical tricks to reduce the saturation and increase the brightness. I also make a splashed ink stroke texture. So I have silhouettes, interior textures, and strokes. The next step is to blend them together to get the final result.

Contour lines and internal textures are blended using an interpolation algorithm.

<div style="display:none">
{{< figure src="/img/portfolio/Unity-ink-轮廓线和内部纹理差值公式.png" width="300px" >}}
<br>
</div>

$$
\begin{align}
Output = \left ( 1-\lambda  \right ) \cdot edgecolor + \lambda \cdot innercolor, 0 < \lambda < 1
\end{align}
$$

{{< highlight go >}}
// col is the internal shading result
col = edgeColor > col ? col : edgeColor * (1 - edge) + col * edge;
col = pow(col, _ColorPow);
return col;
{{< / highlight >}}

Among them, *edgecolor* is the silhouette color and *innercolor* is the inner texture color. The difference coefficient *λ* is *C{{< sub "edge" >}}*, which is the input of the one-dimensional lookup table. As a result, the silhouette blends well with the texture and has soft feathering edges. The shape of the contour line is similar to the "willow-leaf-shaped stroke"(柳叶描).

{{< figure src="/img/portfolio/Unity-ink-轮廓线和内部纹理差值结果.png" caption="**Left**: the blending result; **Right**: zoomed-in pleats" width="400px" >}}
<br>

The blend mode with splash stroke is Multiply. It examines the information in each color channel of the images and performs multiplying processing. The algorithm is as follows:

<div style="display:none">
{{< figure src="/img/portfolio/Unity-ink-正片叠底公式.png" width="300px" >}}
<br>
</div>

$$
\begin{align}
Output = brushcolor \otimes innercolor
\end{align}
$$

This algorithm has low complexity and fast operation speed, and each pixel retains the information of splash stroke and internal texture. Since the multiplication of colors is equivalent to the darkening of both colors, the brighter inner texture can be suppressed to the normal brightness range.

{{< figure src="/img/portfolio/Unity-ink-正片叠底结果.png" caption="The output result after blending with splash stroke" width="250px" >}}
<br>

After blending the silhouette, internal textures and strokes, Post Processing is overlaid, and the final render is shown in the image.

{{< figure src="/img/portfolio/Unity-ink-正片叠底和后处理结果.png" width="250px" >}}
<br>

The solution has the following advantages in terms of rendering performance:
1. The contour lines are more detailed and natural, especially the clothing part. The color of the line is darker, the edge transition is smoother, and there is no hard cutting edge, which corresponds to the effect of the outline drawn by the center of the brush.
2. The distribution of splash stroke textures is more in line with common sense, and there will be no complete symmetry or the situation where the strokes of two adjacent parts are completely disconnected.
At the same time, because of the above advantages, the rendering results look smoother and more flexible, and the distribution of ink colors is more natural, and more volumetric, even though I don't use any lighting models.

The flow map of the brush painting character rendering scheme is as follows:

[![Snapshot 6 of Unity ink painting effect rendering VR scene][6]][6]

[6]: /img/portfolio/Unity-ink-人物渲染方案.png

Step-by-step output result of the scheme:

[![Snapshot 7 of Unity ink painting effect rendering VR scene][7]][7]

[7]: /img/portfolio/Unity-ink-MonkeyKing.png

{{< figure src="/img/portfolio/Unity-ink-人物界面截图.png" alt="A material panel in Unity" caption="A material panel in Unity" width="250px" >}}

## Unity VR Integration {#Unity-VR}

In Unity 2019.3, Unity has developed a new plug-in framework called XR SDK that enables XR providers to integrate with the Unity engine and make full use of its features. For more information, please refer to the [official user manual](https://docs.unity3d.com/2019.3/Documentation/Manual/XR.html).

Notably, Unity 2019.3 features a brand-new XR plug-in framework. The multi-platform developer tools include AR Foundation and [XR Interaction Toolkit (XRI)](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@1.0/manual/index.html). Additionally, XR providers' plug-ins can be loaded using Unity's package manager, making performance optimization easier with the engine's convenience.

Traditional development requires developers to adapt to different VR platforms, which means adapting input/output, display, and functionality, including a lot of repetitive labor. With XRI, developers can directly bridge with hardware through the XR plug-in provided by hardware vendors, without worrying about platform adaptation issues. This enables "build once, deploy anywhere".

{{< figure src="/img/portfolio/Unity-ink-xr-tech-stack.png" caption="This diagram illustrates the current Unity XR plug-in framework structure, and how it works with platform provider implementations." width="600px" >}}

I choose Oculus Rift S as a verification and display device, with most of the work being done in the engine. This project uses Unity 2019.3's latest plugin architecture and XR Plug-in Management to load, initialize, set up, and manage plugins.

{{< figure src="/img/portfolio/Unity-ink-vr-oculus-packages.png" >}}
<br>

Since XRI in Unity 2019.3 is still in preview version (1.0.0-pre.2) and has not been officially released (note: it is officially released NOW), I use Virtual Reality Toolkit (VRTK) to replace its functionality. The disadvantage of VRTK is that bridging needs to be done manually, while XRI does it automatically. 

{{< figure src="/img/portfolio/Unity-ink-VRTK.png" alt="Manually bridge using VRTK" width="600px" >}}
<br>

During the bridging process, to bridge the display and input of Oculus and VRTK, several packages are required, including **Zinnia.Unity**, **Malimbe**, and **VRTK Prefabs**. They can be easily imported and managed using Unity's package manager.

All input actions such as grabbing are handled by the VRTK package without having to worry about hardware implementation. The prefab used is "**Interactable.Primary_Grab.Secondary_Swap**" with the primary script being **Interactable Facade.cs**.

{{< figure src="/img/portfolio/Unity-ink-facade.png" caption="The grabbable object can be placed as a child object under the prefab **key.Interactable.Primary_Grab.Secondary_Swap**." width="600px" >}}

{{< figure src="/img/portfolio/Unity-ink-facade1.png" caption="Get the grab action by adding listeners in the **Grab Events**." width="250px" >}}

## Gameplay {#Gameplay}

Now that the hardware inputs and outputs are in place, the next step is the writing of the gameplay section.

### Scripts  Architecture Overview {#Scripts}

The architecture designed for this project is shown in the figure below:

{{< figure src="/img/portfolio/Unity-ink-structure-of-scripts.png" alt="architecture of scripts" width="350px" >}}
<br>

The functions of each script are as follows:

1. ***InputHandler.cs***: Determines the action of taking off the VR glasses, which triggers the transition from the first scene to the second scene.

2. ***MainLogicController.cs***: Handles all scene transitions.

3. ***OtherCharacter***: Manages the Non-player characters, especially the burning effect (using a shader parameter).

4. ***GrabbableGlasses***: Handles the action of grabbing the NPC's glasses in the second scene, triggers the transition from the second scene to the third scene, and manages the action of dropping the glasses to the ground when the character burns out.

5. ***FadeParticle.cs***: Manages the particle animation during NPC burning.

6. ***SpeechManager***: Manages dialogues between the player and NPC.

7. ***QuitButton***: Handles the transition from the third scene to the credits scene and quitting the game.

Among them, 1 and 3, 4, 5 will be discussed in the [Gameplay](#Gameplay) section; 2 will be discussed in the [Scene Transition Design](#Transition) section; and 6 will be discussed in the [Dialogue and UI Design](#UI) section.

### Analysis of Gameplay Scripts {#Gameplay-Scripts}

***InputHandler.cs*** primarily handles the action recognition for **removing the VR headset from the player**, with the corresponding code shown below.

{{< highlight c >}}
void Update()
{
    isIndexPressed = OVRInput.Get(OVRInput.RawButton.RIndexTrigger);
    isMiddlePressed = OVRInput.Get(OVRInput.RawButton.RHandTrigger);
    handVelocityR = OVRInput.GetLocalControllerVelocity(OVRInput.Controller.RHand);
}

bool isLiftingGlass() {
    bool isCorrectVelocity = handVelocityR.y >= liftGlassThresholdY &&
        Vector3.Angle(handVelocityR, Vector3.up) <= liftGlassThresholdAngle;
    bool isCorrectDistance = Vector3.Distance(headTrans.position, rHandTrans.position) <= liftGlassThresholdDistance;
    return isCorrectDistance && isCorrectVelocity;         
}

bool isHandAtRight() {
    Vector3 eyeFront = headTrans.forward;
    Vector3 eyeToHand = rHandTrans.position - headTrans.position;
    // Unity uses left-handed coordinates
    return Vector3.Cross(eyeToHand, eyeFront).y < 0;
}

public static bool IsHandAtRight() {
    return instance.isHandAtRight();
}

public static bool IsLiftingGlass(){
    return instance.isLiftingGlass();
}

public static bool IsGrabbingR(){
    return instance.isIndexPressed && instance.isMiddlePressed;
}
{{< / highlight >}}

As you can see, there are three conditions involved: the hand is on the right side of the headset, a fist grab action, and a hand lift action. Based on this, the scene transition is triggered in *MainlogicController.cs*.

{{< highlight c >}}
            if (canSceneSwap && !isForcedWaiting)
            {
                if ((InputHandler.IsGrabbingR() 
                    && InputHandler.IsLiftingGlass()
                    && InputHandler.IsHandAtRight()) || Input.GetKeyUp("space"))
                {
                    StartSceneSwap();
                }
            }
{{< / highlight >}}

***OtherCharacter.cs***, which is responsible for handling the NPC burn effect, controls the dissolve progress of the NPC material by manipulating the exposed **_Dissolve** parameter in the shader. I created a simple dissolve effect by generating Perlin noise in the shader.

{{< highlight c >}}
void Update()
{
    if (isFading && dissolve < 1f)
    {
        dissolve = Mathf.Clamp(dissolve + dissolveSpeed * Time.deltaTime, 0f, 1f);
        for(int i = 0; i < relatedMaterials.Length; i++) {
            relatedMaterials[i].SetFloat("_Dissolve", dissolve);
        }

        foreach(FadeParticle sys in pSystem) {
            if (sys != null)
            {
                sys.SetValue(1 - dissolve);
            }
        }
    }
}

public void onGrabbed()
{
    isFading = true;
    
    Debug.Log("Grabbed glasses");
}

public void onGrabbedSelf()
{
    onGrabbed();
    glasses.transform.SetParent(null);
}
{{< / highlight >}}

## UI Design {#UI}

In VR scenes, two display modes were used for UI.

1. For my part in the dialogue, the canvas is fixed directly on the CenterEyeAnchor as a screen space UI (note that the render mode I choose is still world space, but it will look like screen space as it follows the movement of tracking);

{{< figure src="/img/portfolio/Unity-ink-myUI.png" caption="There are two Texts here, one for the dialogue and one for displaying Credits at the end of the process." width="600px" >}}

2. For others' part in the dialogue, the canvas is displayed above their respective heads as a world space UI.

{{< figure src="/img/portfolio/Unity-ink-othersUI.png" width="600px" >}}
<br>

I rewrote the UIDefault.shader in Unity's built-in shader and added a billboard function that allows it to rotate and always face the player's line of sight.

In the billboard code section, a coordinate system needs to be create first. But how to define the "front" direction of the coordinates?

The traditional method is to use the "*viewer minus center*" vector, but this can cause significant distortion at the edge of the viewing frustum.

{{< figure src="/img/portfolio/Unity-ink-UI1.GIF" alt="*viewer minus center* as front" width="400px" >}}
<br>

I try to use the "forward direction of the camera", namely the `UNITY_MATRIX_IT_MV[2].xyz` macro. This way, no matter if it's at the edge of the viewing frustum or in the center of the screen, the text will face the viewer directly.

{{< figure src="/img/portfolio/Unity-ink-UI2.GIF" alt="forward direction of the camera" width="400px" >}}
<br>

For traditional displays, I prefer the second method. Without distortion, it feels more "UI". In VR, however, it feels weird. After experimenting, I choose the first method in the VR scene.

## Scene Transition Design {#Transition}

The 2022 game *God of War Ragnarök* features an impressive one-shot design that seamlessly blends over 20 hours of gameplay into a cohesive experience. Many games, not just those in the *God of War* series, strive to make loading and scene transitions as seamless as possible. In my VR experience, I have three scenes with very different styles, so reducing the "jumpiness" of the gameplay experience and minimizing the "stuttering" of loading screens to alleviate VR sickness is a design focus.

To achieve a smoother transition, I use two effects in combination: fog and scene darkening. I create the fog particle effect and attach it as a child object to the OVRCameraRig's CenterEyeAnchor. I mainly control the density of the fog by scripting the **Rate over Time** parameter of particle emission. For the darkening effect, I use Unity's Post Processing Stack to control the **Exposure Compensation**.

{{< highlight c >}}
void HandleParticles()
{
    if (particleRatio <= 0)
    {
        particleRatio = 0f;
    }
    else
    {
        particleRatio = Mathf.Clamp(particleRatio - particleFadeRatio * Time.deltaTime, 0f, 1f);
    }

    foreach(ParticleStruct ps in fadeParticleSys)
    {
        ps.SetRate(particleRatio);
    }

    // The Adaptation Type is Progressive by default
    // so there is no need to animate autoExposure to make it linear
    // The adaptation speed can be adjusted directly in the Inspector panel of Post-process Volume
    if (!canSceneSwap || isForcedWaiting)
    {
        autoExposure.keyValue.Override(0f);   
    }
    else
    {
        autoExposure.keyValue.Override(1f);   
    }
}

public class ParticleStruct
{
    ParticleSystem system;
    float initEmission;
    public ParticleStruct(ParticleSystem _system)
    {
        system = _system;
        initEmission = _system.emission.rateOverTime.constant;
    }

    public void SetRate(float rate)
    {
        var emit = system.emission;
        emit.rateOverTime = rate * initEmission;
    }
}
{{< / highlight >}}

After the scene transition action is performed, there is a wait for the animation to play. Scene transitions are done asynchronously using coroutines to avoid the screen lagging caused by scene changes and mismatched headset movements, which could lead to VR sickness.

{{< highlight c >}}
void SceneSwap()
{
    canSceneSwap = false;
    bool found = false;
    int sceneCount = scenes.Length;
    if (sceneCount <= 1)
    {
        Debug.LogError("No scenes appointed");
        return;
    }
    
    for (int i = 0; i < sceneCount; i++)
    {
        if (scenes[i] == SceneManager.GetActiveScene().name)
        {
            if (i == 1)
            {
                particleFadeRatio = particleFadeRatioAlternate;
            }
            found = true;
            sceneSwapProgress = SceneManager.LoadSceneAsync(scenes[(i + 1) % sceneCount]);
        }
    }

    if (!found)
    {
        sceneSwapProgress = SceneManager.LoadSceneAsync(scenes[0]);
    }
}

// For the transition from Scene 2 to Scene 3
// in addition to waiting for the fog to thicken at the transition
// there is also a waiting period for the character to burn and dissolve and glasses to fall off
// which is an additional 8 seconds (pickGlassSceneSwapDelay)
public void StartDelayedSceneSwapAfterPickup()
{
    StartCoroutine("DelayedSceneSwapAfterPickup");
}

public IEnumerator DelayedSceneSwapAfterPickup()
{
    yield return new WaitForSeconds(pickGlassSceneSwapDelay);
    StartSceneSwap();
}

// For the transition from Scene 1 to Scene 2
// it takes 3 seconds (minWaitTime) to wait for the fog to thicken and the scene to darken
public void StartSceneSwap()
{
    StartCoroutine("ForcedWait");
}

IEnumerator ForcedWait()
{
    canSceneSwap = false;
    isForcedWaiting = true;
    particleRatio = 1f;
    yield return new WaitForSeconds(minWaitTime);
    isForcedWaiting = false;
    SceneSwap();
}
{{< / highlight >}}

{{< figure src="/img/portfolio/Unity-ink-scene-swap.png" alt="Scene Transition" width="400px" >}}
<br>

### Blooper {#Blooper}

These are some screenshots taken during the development process. Just want to find an opportunity to showcase the Kawaii Unity Chan😊.

{{< figure src="/img/portfolio/Unity-ink-UnityChan.gif" caption="Unity Chan, with wind effects applied to her hair and skirt using Magica Cloth." width="300px" >}}

{{< figure src="/img/portfolio/Unity-ink-UnityChan2.jpg" caption="Adding post-process effects to mimic Xuan paper texture." width="600px" >}} -->