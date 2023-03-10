+++
date = "2016-11-05T19:41:01+05:30"
title = "[ #Project 2 ] Unity VR - The Peach Blossom Spring - Chinese brush painting effect"
description = "The VR experience focuses on Climate Emergency. The first scene shows a utopian scene from a long time ago, the second scene shows the current Climate Emergency facing humanity (inspired by the Chongqing wildfire in 2022), and the third scene shows a cyberspace, where the player can make a commitment."
draft = false
image = "img/portfolio/Unity-ink-painting-effect-rendering-VR-scene.png"
showonlyimage = false
weight = 2
math = true
+++

---

<div class="table">
    <div class="row">
        <div class="cell border-right col-1">
            <strong>ROLE</strong><br>
            Team Leader<br><br>
            <strong>YEAR</strong><br>
            2022<br><br>
            <strong>TOOLS USED</strong><br>
            Unity, Photoshop<br><br>
            <strong>PLATFORM</strong><br>
            Oculus Rift S
        </div>
        <div class="cell border-right col-2">
            <strong>RESPONSIBILITY</strong>
            <ol>
                <li>
                    As a technical artist, I am responsible for the Chinese brush painting rendering scheme and optimization. I am also responsible for the final visual presentation of the game. and propose technical solutions for programmers to implement.
                </li>
                <li>
                    As a designer, I design and implement the VR interaction scheme, and complete the UI design.
                </li>
                <li>
                    As a programmer, I write scripts concerning gameplay / UI /  visual effects with team member.
                </li>
            </ol>
        </div>
        <div class="cell col-3">
            <strong>DESCRIPTION</strong><br>
            The VR experience focuses on Climate Emergency. The first scene shows a utopian scene from a long time ago, the second scene shows the current Climate Emergency facing humanity (inspired by the Chongqing wildfire in 2022), and the third scene shows a cyberspace, where the player can make a commitment.
        </div>
    </div>
</div>

---

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
> It is not now as it hath been of yore;???
\
> Turn wheresoe'er I may,
\
> By night or day.
\
> The things which I have seen I now can see no more.

{{< youtube id="NW-UrDA5nq0" title="Unity ink painting effect rendering VR scene" >}}
<br>

*["The Creation of Adam"](https://skfb.ly/6RnWL) by Lo??c Norgeot is licensed under [Creative Commons Attribution](http://creativecommons.org/licenses/by/4.0/).*

You can find the playable build shown in the video [here](https://drive.google.com/drive/folders/1O-hnS8qAkfEFtwk0FRUm3RVPHHwUvIW8?usp=sharing). The game runs on Oculus Rift S, so if you don't have the VR headset I'm afraid you won't get the full experience. You can still use the spacebar to switch between scenes, which is a backdoor I left, but other interactions (moving, teleporting, picking up props, dialogue, etc.) are not available.

Chinese brush painting rendering is the part where I spend the most effort. For the brush painting-only version, please check out my other video:

{{< youtube id="YdPf6S08NT0" title="Unity ink painting effect rendering VR scene" >}}
<br>

Using Unity's built-in pipeline, I implemented this project in the style of Chinese brush painting.

I first analyze the aesthetic characteristics of landscape and figure paintings, and then proposed two methods for Chinese brush painting effect, one for characters and one for mountains and rocks. I use Oculus Rift S as a development device and developed this project based on the new XR plug-in architecture provided by Unity 2019.3.0, and finally use Oculus Debug Tool and Unity UPR (Unity Performance Report) for performance testing.

[![Snapshot 1 of Unity ink painting effect rendering VR scene][1]][1]

[![Snapshot 2 of Unity ink painting effect rendering VR scene][2]][2]

[1]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-1.png
[2]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-2.png

This picture shows what the models look like originally in Unity Standard shader.

[![Snapshot 3 of Unity ink painting effect rendering VR scene][3]][3]

[3]: /img/portfolio/Unity-ink-painting-effect-rendering-VR-scene-3.png

#### Contents {#catalog}

1. [Inspiration - about Climate Emergency](#Inspiration)
2. [Design Concept](#Design-Concept)
3. [Chinese Brush Painting Rendering](#Chinese-Brush-Painting-Rendering)
    1. [Aesthetic Characteristics of Chinese Brush Painting](#Aesthetic-Characteristics-of-Chinese-Brush-Painting)
    2. [Chinese Brush Painting Mountain & Rock Rendering Scheme](#Chinese-Brush-Painting-Mountain-and-Rock-Rendering-Scheme)
        1. [Contour rendering based on dual-pass Shell Method](#Contour-rendering)
        2. [Internal coloring with a shading method based on Half-Lambert lighting model and diffuse warping function](#Internal-coloring)
        3. [Rubbing simulation based on model curvature](#Rubbing)
        4. [Stroke texture (feathering and spreading)](#Stroke-texture)
    3. [Chinese Brush Painting Character Rendering Scheme](#Chinese-Brush-Painting-Character-Rendering-Scheme)
4. [Unity VR Integration](#Unity-VR)
5. [Gameplay](#Gameplay)
    1. [Scripts  Architecture Overview](#Scripts)
    2. [Analysis of Gameplay Scripts](#Gameplay-Scripts)
6. [UI Design](#UI)
7. [Scene Transition Design](#Transition)

??? [Blooper](#Blooper)
## Inspiration - about Climate Emergency {#Inspiration}

In the past two years, China has experienced an extremely severe climate emergency. The unprecedented heavy rains and floods in Henan Province in 2021 affected 14.8 million people and resulted in 398 deaths and disappearances. The capital city of Zhengzhou, with a population of nearly 13 million, received nearly the annual average rainfall in just three days. The hourly rainfall intensity between 4 p.m. and 5 p.m. on July 20 **broke the historical record for extreme rainfall in mainland China**. In August 2022, Chongqing was hit by an extreme weather event of consecutive high temperatures and sunny days, which led to a forest fire. The flames and thick smoke lit up the night sky, and Chongqing was sleepless throughout the night.

{{< figure src="/img/portfolio/Unity-ink-fire.png" width="500px" >}}
<br>

Shocked by the news images, I decided to create a VR experience depicting the scene of a forest fire at night.

Living in cities with air conditioning, central heating, skyscrapers, and glass corridors, we often overlook the pain in distant places. What we are familiar with seems to be a stable life, but it is actually a phantom created by the market economy, long-distance logistics, and social systems. Through creating this VR experience, I hope to draw attention to the urgent need to face the climate emergency. Otherwise, the sword of Damocles will eventually fall, and no one will be spared.

## Design Concept {#Design-Concept}

In ancient Chinese landscape philosophy, the concept of *"unity of man and nature"* (????????????) was emphasized, where man and nature coexist in harmony. In landscape painting, the idea of *"reclining and traveling"* (??????) was used to fully appreciate the beauty of mountains and rivers. The concept of *"reclining and traveling"* involves a spiritual journey through cultural mediums in a fleeting moment, similar to using VR headsets to tour landscape paintings.

The first scene is set in spring, with a light drizzle, expressing the ancient idea of the *unity of man and nature*. After taking off the VR headset, the second scene shows a modern-day mountain fire. In this scene, six modern people wearing VR headsets seem unwilling to wake up from their own illusion, unlike the timely awakening of the player. After the player talks to them and removes their VR headsets, they immediately burn and disperse, signifying that if we do not address the climate emergency, no one will be spared in the end.

The scene then switches to the third scene, a holographic consciousness space with a giant sculpture of the hand from Michelangelo's *The Creation of Adam*. At the fingertips where God and Adam meet, consciousness flows quietly. When the player gently touches it, they also make a commitment to address the climate emergency.

## Chinese Brush Painting Rendering {#Chinese-Brush-Painting-Rendering}
### Aesthetic Characteristics of Chinese Brush Painting {#Aesthetic-Characteristics-of-Chinese-Brush-Painting}
For **brush painting mountains and stones**, there are two characteristics that need to be reflected:

1.The stone has many sides (????????????)

A stone should have a sense of space and volume, and a sense of impermeability is the top priority. The two steps of "rub (???)" and "dye (???)" are the key steps to enhance the sense of volume of rocks.

2.Structural use of the brush (????????????)

When drawing the contours of an object (sketch, ???), the technique of using a brush must be strong, thus forming the structure of the object like bones.

{{< figure src="/img/portfolio/Unity-ink-?????????????????????.jpg" >}}
<br>

There are two very different styles of **figures in Chinese brush paintings**. The traditional style, such as the *Drunken Immortal in Splashed Ink Style* (???????????????) by Liang Kai of Song Dynasty, has vivid spiritual consonance and a high degree of refinement and exaggeration of the characters; the modern style, such as *Whisper* (?????????), is combined with pencil sketch techniques. The characters are perfectly shaped in rich details, while the background is blurred. 

{{< figure src="/img/portfolio/Unity-ink-????????????????????????.png" alt="**Left**: *Drunken Immortal in Splashed Ink Style*(1200s);   **Right**: *Whisper*(1979)" caption="**Left**: *Drunken Immortal in Splashed Ink Style*(1200s);   **Right**: *Whisper*(1979)" width="600px" >}}

In character rendering part, I choose to simulate modern-style brush painting characters.

There are four techniques of traditional Chinese brush painting: sketching, rubbing, dotting, and shading (?????????????????????). Among them, "dotting" refers to drawing moss, which is not a necessary step for painting. Therefore, I slightly changed these four steps to "sketching, rubbing, shading, and coloring (????????????????????????)", which correspond to the four parts that need to be implemented in realtime rendering: contour rendering, texture mapping/curvature, lighting model, and main texture.

{{< figure src="/img/portfolio/Unity-ink-???????????????.png" >}}
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
{{< figure src="/img/portfolio/Unity-ink-???????????????.png" width="300px" >}}
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

{{< figure src="/img/portfolio/Unity-ink-?????????????????????.png" caption="Diffuse warp function" width="250px" >}}

The result of this step, a shading method based on Half-Lambert lighting model and diffuse warping function, is as follows.

{{< figure src="/img/portfolio/Unity-ink-?????????????????????.png" width="550px" >}}

#### Rubbing simulation based on model curvature {#Rubbing}

Rubbing (???) is a technique of Chinese brush painting, which is used in landscape painting to represent trees and rocks. It is mainly used to express the texture of the rocks, that is, the texture of the inner contour.

I use model curvature to simulate rubbing. When calculating the curvature, as the arc length approaches zero, the arc length can be approximated by the distance ??*p* between vertices, and the rate of change of the normal ??*N* can be used to replace the rate of change of the tangent.

{{< figure src="/img/portfolio/Unity-ink-???????????????.jpg" caption="Surface curvature calculate" width="350px" >}}

The curvature at fragment *i* can be obtained by the ratio of the vertex normal vector and the rate of change of the position coordinate relative to the *x*-axis direction and the *y*-axis direction of the view space.

<div style="display:none">
{{< figure src="/img/portfolio/Unity-ink-????????????.png" width="100px" >}}
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

{{< figure src="/img/portfolio/Unity-ink-???????????????.png" width="550px" >}}
<br>

This method based on the model curvature has its limitations in terms of use scenarios. I use the per vertex information (which is constant within a single triangle) of the normal rate of change and position to calculate the derivative. In the case of a relatively high triangle counts of a single model, the results obtained by this calculation method can meet the requirements; but in the case of a relatively low triangle count number, there will be more blocky. The solution to this artifact is:
1. Bake the curvature information into vertex color;
2. Bake the curvature information into a curvature map;
3. Use Post Processing and render texture to blur the blocky curvature, and then blend it with other render outputs.

{{< figure src="/img/portfolio/Unity-ink-???????????????.png" caption="**Left**: No curvature; **Right**: With blurred curvature" width="550px" >}}

Considering that the actual effect is not ideal, the simulation of the rubbing method was not deployed in the rendering scheme of mountains and rocks. Instead, I use triplanar and Gaussian blur to simulate the stroke texture of the rocks.

#### Stroke texture (feathering and spreading) {#Stroke-texture}

When using the one-dimensional lookup table for diffuse warp, the input is the diffuse calculated according to the Half-Lambert lighting model. Adding some randomness to this will make the final warp results feel more random.

<div style="display:none">
{{< figure src="/img/portfolio/Unity-ink-????????????????????????.png" width="150px" >}}
<br>
</div>

$$
\begin{align}
C_{i \space new}=C_{i}+r_{i}
\end{align}
$$

Among them, *C{{< sub "i new" >}}* is the new diffuse after processing, and *r{{< sub "i" >}}* is a random value. I use Perlin noise to introduce randomness, and use a stroke texture to control the overall light and shadow. I use triplanar to sample the two textures.

The image below is the result of inputting *C{{< sub "i new" >}}* into the diffuse warp function after adding the stroke texture. As you can see, the noise gives a more random look to the edges of the ink chunks.

{{< figure src="/img/portfolio/Unity-ink-????????????????????????.png" width="550px" >}}
<br>

After the above processing, I achieve the randomness of the edge of the mountains, but it still lacks the feeling of light ink spreading. To simulate the spreading and feathering, I introduce Gaussian blur for further processing.
I adjust the appropriate parameters, and the final blurred result is shown in the image. There is an obvious feathering edge at the junction of light and dark in the mountain rock.

{{< figure src="/img/portfolio/Unity-ink-?????????????????????????????????.png" width="550px" >}}
<br>

The flow map of the brush painting mountain and rock rendering scheme is as follows:

[![Snapshot 4 of Unity ink painting effect rendering VR scene][4]][4]

[4]: /img/portfolio/Unity-ink-????????????????????????.png

Step-by-step output result of the scheme:

[![Snapshot 5 of Unity ink painting effect rendering VR scene][5]][5]

[5]: /img/portfolio/Unity-ink-MountainStone.png

{{< figure src="/img/portfolio/Unity-ink-??????????????????.png" alt="A material panel in Unity" caption="A material panel in Unity" width="250px" >}}

### Chinese Brush Painting Character Rendering Scheme {#Chinese-Brush-Painting-Character-Rendering-Scheme}

In the Chinese brush painting character rendering scheme, I propose a rendering method based on the viewing direction and bump map for contour rendering, that is, **Surface Angle Silhouetting**. A one-dimensional look-up table is used to map the results, so that the pleats of the clothes get a soft willow leaf drawing (?????????) effect, and normal scale is used to control the fineness of the stroke. In the internal coloring part, the grayscale adjustment of the color is realized. At the same time, a triplanar stroke map based on object space is proposed to simulate the effect of randomly splashing ink. Finally, the contour line, internal coloring and splashing ink strokes are mixed by texture blending.

On a smooth surface, the definition of point P on the Silhouette is ***v*** ??? ***n*** =0.

{{< figure src="/img/portfolio/Unity-ink-VdotN.png" width="300px" >}}
<br>

But an actual 3D model is composed of many planes. What's more, in order to make the silhouette have a certain width, the judgment condition needs to be relaxed as follows:

<div style="display: none">
{{< figure src="/img/portfolio/Unity-ink-?????????????????????.png" width="300px" >}}
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

{{< figure src="/img/portfolio/Unity-ink-????????????abcde.png" caption="a) The original model shaded according to the Blinn-Phong lighting model; b) The result of ***v*** ??? ***n***; c) The result of calculating *Cedge*; d) Silhouette after texture warping; e ) Silhouette with normal map (final result for Silhouette)" >}}

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
{{< figure src="/img/portfolio/Unity-ink-????????????????????????????????????.png" width="300px" >}}
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

Among them, *edgecolor* is the silhouette color and *innercolor* is the inner texture color. The difference coefficient *??* is *C{{< sub "edge" >}}*, which is the input of the one-dimensional lookup table. As a result, the silhouette blends well with the texture and has soft feathering edges. The shape of the contour line is similar to the "willow-leaf-shaped stroke"(?????????).

{{< figure src="/img/portfolio/Unity-ink-????????????????????????????????????.png" caption="**Left**: the blending result; **Right**: zoomed-in pleats" width="400px" >}}
<br>

The blend mode with splash stroke is Multiply. It examines the information in each color channel of the images and performs multiplying processing. The algorithm is as follows:

<div style="display:none">
{{< figure src="/img/portfolio/Unity-ink-??????????????????.png" width="300px" >}}
<br>
</div>

$$
\begin{align}
Output = brushcolor \otimes innercolor
\end{align}
$$

This algorithm has low complexity and fast operation speed, and each pixel retains the information of splash stroke and internal texture. Since the multiplication of colors is equivalent to the darkening of both colors, the brighter inner texture can be suppressed to the normal brightness range.

{{< figure src="/img/portfolio/Unity-ink-??????????????????.png" caption="The output result after blending with splash stroke" width="250px" >}}
<br>

After blending the silhouette, internal textures and strokes, Post Processing is overlaid, and the final render is shown in the image.

{{< figure src="/img/portfolio/Unity-ink-??????????????????????????????.png" width="250px" >}}
<br>

The solution has the following advantages in terms of rendering performance:
1. The contour lines are more detailed and natural, especially the clothing part. The color of the line is darker, the edge transition is smoother, and there is no hard cutting edge, which corresponds to the effect of the outline drawn by the center of the brush.
2. The distribution of splash stroke textures is more in line with common sense, and there will be no complete symmetry or the situation where the strokes of two adjacent parts are completely disconnected.
At the same time, because of the above advantages, the rendering results look smoother and more flexible, and the distribution of ink colors is more natural, and more volumetric, even though I don't use any lighting models.

The flow map of the brush painting character rendering scheme is as follows:

[![Snapshot 6 of Unity ink painting effect rendering VR scene][6]][6]

[6]: /img/portfolio/Unity-ink-??????????????????.png

Step-by-step output result of the scheme:

[![Snapshot 7 of Unity ink painting effect rendering VR scene][7]][7]

[7]: /img/portfolio/Unity-ink-MonkeyKing.png

{{< figure src="/img/portfolio/Unity-ink-??????????????????.png" alt="A material panel in Unity" caption="A material panel in Unity" width="250px" >}}

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

The 2022 game *God of War Ragnar??k* features an impressive one-shot design that seamlessly blends over 20 hours of gameplay into a cohesive experience. Many games, not just those in the *God of War* series, strive to make loading and scene transitions as seamless as possible. In my VR experience, I have three scenes with very different styles, so reducing the "jumpiness" of the gameplay experience and minimizing the "stuttering" of loading screens to alleviate VR sickness is a design focus.

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

These are some screenshots taken during the development process. Just want to find an opportunity to showcase the Kawaii Unity Chan????.

{{< figure src="/img/portfolio/Unity-ink-UnityChan.gif" caption="Unity Chan, with wind effects applied to her hair and skirt using Magica Cloth." width="300px" >}}

{{< figure src="/img/portfolio/Unity-ink-UnityChan2.jpg" caption="Adding post-process effects to mimic Xuan paper texture." width="600px" >}}