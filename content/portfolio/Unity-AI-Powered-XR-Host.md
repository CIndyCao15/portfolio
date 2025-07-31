+++
draft = false
image = "img/portfolio/Robi-cover.png"
showonlyimage = false
title = "Robi - AI-Powered XR Host at Signals by DigiBC and VIFF"
description = "Robi is a virtual guide for the Signals event. With a team of six, Robi was created in Unity, powered by a custom GPT, and deployed using WebGL and WebAR. This charming and helpful robot can answer custom questions and provide general guidance on artworks."
weight = 1
+++

---

<div class="table">
  <div class="row">
    <div class="cell border-right col-1">
        <strong>ROLE</strong><br>
        Technical Artist, Developer<br><br>
        <strong>YEAR</strong><br>
        2024<br><br>
        <strong>TOOLS USED</strong><br>
        Unity<br><br>
        <strong>GENRE</strong><br>
        Web
    </div>
    <div class="cell border-right col-2">
        <strong>RESPONSIBILITY</strong>
        <ol>
            <li>
                Collaborated to develop an engaging virtual host solution for the SIGNALS event, showcasing AI and MR technology
            </li>
            <li>
                Directed 3D pipeline management; facilitated team communication with 3D artist and developers
            </li>
            <li>
                Used profiler tools to analyze optimization bottlenecks, reducing shader variants and texture size, achieving an 11% reduction in memory usage
            </li>
            <li>
                Implemented the AR solution using Unity WebGL and Web AR; conducted stress tests and created technical documentation
            </li>
        </ol>
    </div>
    <div class="cell col-3">
        <strong>DESCRIPTION</strong><br>
        Robi is a virtual guide for the Signals event. With a team of six, Robi was created in Unity, powered by a custom GPT, and deployed using WebGL and WebAR. This charming and helpful robot can answer custom questions via chat, or provide general information about artworks through an AR scan — a seamless, low-key and easy entry point for visitors unfamiliar with the exhibits.
    </div>
  </div>
</div>

---

The playable WebGL demo is hosted by DigiBC.
<div class="link-box">
  <input type="text" id="link" value="https://signalshost.digibc.org/Robi" readonly>
  <button onclick="window.open(document.getElementById('link').value, '_blank');">Visit Site</button>
  <button onclick="copyLink()">Copy Link</button>
</div>

<style>
  .link-box {
    display: flex;
    align-items: center;
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    max-width: 100%;
    overflow-x: auto;
  }

  .link-box input {
    border: none;
    border-radius: 5px;
    background-color: #f4f4f4;
    flex-grow: 1;
    padding: 5px;
    font-size: 100%;
    font-family: monospace;
    color: #333;
    white-space: nowrap;
    overflow-x: auto;
    outline: none;
  }

  .link-box input:focus {
    outline: 2px solid #de5e85;
    border-radius: 5px;
  }

  .link-box button {
    background-color: #999999;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 5px;
    border-radius: 3px;
    font-size: 100%;
  }

  .link-box button:hover {
    background-color: #de5e85;
  }
</style>

<script>
  function copyLink() {
    var copyText = document.getElementById("link");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
  }
</script>
<br>

Please open the link in a mobile browser and grant access to your microphone and camera for the full experience including speaking with Robi and using AR scanning.

More about this industry project and the CDM, click [here](https://thecdm.ca/projects/ai-powered-xr-hosts-your-smart-mobile-companions-signals-digibc-and-viff).

{{< youtube id="nNiohXikHgI" title="Robi - AI-Powered XR Host" >}}
<br>

Research and Ideation:
[Miro board](https://miro.com/app/board/uXjVKLSl4yY=/?share_link_id=53938384272)

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVKLSl4yY=/?moveToViewport=-49111,-38368,136612,66984&embedId=651599236080" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

After discussed with our 3D artist, I made the project timeline for the second client meeting, proposing shortcuts and addressing tradeoffs, as building a photorealistic model from scratch would have taken at least five months, which exceeded our 16-week timeline. To stay on schedule, we proposed more efficient approaches, including adopting a stylized art style, modifying off-the-shelf models, and using Mixamo for animation.

{{< swiper images="/img/portfolio/Robi-3D-Pipiline.png,/img/portfolio/Robi-3D-Pipiline1.png,/img/portfolio/Robi-3D-Pipiline2.png,/img/portfolio/Robi-3D-Pipiline3.png,/img/portfolio/Robi-3D-Pipiline4.png" >}}

We aimed to create a web-based experience to make the host more accessible for a wider audience during the Signals event. However, due to the 384 MB memory limit on iOS 15 (and over) browser, we encountered unstable performance and crashes. I analyzed the project with **Unity Profiler** tools, and identified the main bottlenecks: oversized textures and the shader variants unity included in the build. I reduced the memory usage by *11%* to 360 MB, just under the platform limitation.

To ensure more stable performance, I also conducted **stress tests**. The results showed that having over 20 artworks — the expected number for Signals — did not significantly affect recognition time or cause crashes. However, when the number exceeded 30, recognition could take up to 6–7 seconds. This suggests that for future development, careful curation of the AR journey will be essential to maintain a smooth user experience.

[![AR experience][2]][2]

[2]: /img/portfolio/Robi-AR.gif




