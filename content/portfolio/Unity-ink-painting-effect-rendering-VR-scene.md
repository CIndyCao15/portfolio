+++
date = "2016-11-05T19:41:01+05:30"
title = "[ #Project 2 ] Unity VR - The Peach Blossom Spring - Chinese brush painting effect"
draft = false
image = "img/portfolio/Unity-ink-painting-effect-rendering-VR-scene.png"
showonlyimage = false
weight = 2
math = true
+++

---
|   |   |   |
|---|---|---|
| **ROLE:**<br>Team Leader<br><br>**YEAR:**<br>2022<br><br>**TOOLS USED:**<br>Unity, Photoshop<br><br>**PLATFORM:**&nbsp;<br>Oculus Rift S | **RESPONSIBILITY:**<br>1. As a technical artist, I am responsible for the Chinese brush painting rendering scheme and optimization. I am also responsible for the final visual presentation of the game. and propose technical solutions for programmers to implement.<br>2. As a designer, I design and implement the VR interaction scheme, and complete the UI design.<br>3. As a programmer, I write scripts concerning gameplay / UI /  visual effects with team member. | **DESCRIPTION:**<br>The VR experience focuses on Climate Emergency. The first scene shows a utopian scene from a long time ago, the second scene shows the current Climate Emergency facing humanity (inspired by the Chongqing wildfire in 2022), and the third scene shows a cyberspace, where the player can make a commitment. |
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

#### Contents {#catalog}

1. [Chinese Brush Painting Rendering](#Chinese-Brush-Painting-Rendering)
    1. [Aesthetic Characteristics of Chinese Brush Painting](#Aesthetic-Characteristics-of-Chinese-Brush-Painting)
    2. [Chinese Brush Painting Mountain & Rock Rendering Scheme](#Chinese-Brush-Painting-Mountain-and-Rock-Rendering-Scheme)
        1. [Contour rendering based on dual-pass Shell Method](#Contour-rendering)
        2. [Internal coloring with a shading method based on Half-Lambert lighting model and diffuse warping function](#Internal-coloring)
        3. [Rubbing simulation based on model curvature](#Rubbing)
        4. [Stroke texture (feathering and spreading)](#Stroke-texture)
    3. [Chinese Brush Painting Character Rendering Scheme](#Chinese-Brush-Painting-Character-Rendering-Scheme)
2. [Unity VR Integration](#Unity-VR)
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