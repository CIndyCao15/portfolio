+++
draft = false
image = "img/portfolio/Robi-cover.png"
showonlyimage = false
title = "Robi - AI-Powered XR Host at Signals by DigiBC and VIFF"
description = "SandScape is a collaboration with BC Children's Hospital to develop a digital therapeutic tool for kids. Our agile team of six used Unity WebGL to create an interactive sandtray, designed to support therapy through engaging digital experiences."
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
        SandScape is an industrial collaboration with BC Children's Hospital Digital Lab, aimed at developing a digital therapeutic tool for kids. As part of an agile team of six students, we employed a user-centered design approach to create a digital sandtray using Unity, which was deployed to WebGL. This tool supports therapeutic practices, helping children through interactive and immersive experiences.
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

In case the 
It is accessible on both PC and Mac via browser, with mouse controls. While it can also run on mobile browsers, full touchscreen compatibility is not yet supported.

More about this industry project and the CDM, click [here](https://thecdm.ca/projects/ai-powered-xr-hosts-your-smart-mobile-companions-signals-digibc-and-viff).

{{< youtube id="nNiohXikHgI" title="Robi - AI-Powered XR Host" >}}
<br>

Research and Ideation:
[Miro board](https://miro.com/app/board/uXjVKLSl4yY=/?share_link_id=53938384272)

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVKLSl4yY=/?moveToViewport=-49111,-38368,136612,66984&embedId=651599236080" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>



