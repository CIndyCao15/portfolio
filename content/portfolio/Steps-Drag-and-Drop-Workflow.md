+++
draft = false
image = "img/portfolio/Steps-cover.jpg"
showonlyimage = false
title = "Steps - Drag-and-Drop Workflow & Tool Architecture in Filament"
description = "Steps is a Netflix feature animation that puts an unconventional spin on the traditional Cinderella story. Its lighting was produced with Filament, a proprietary node-based lighting DCC used in a USD-based pipeline. I redesigned one of its scene-to-graph workflows to make frequent node creation faster and more intuitive, combining contextual drag-and-drop, cleaner multi-selection, and a safer execution model for undo and cancel behaviour."
weight = 1
+++

---

<div class="table">
  <div class="row">
    <div class="cell border-right col-1">
        <strong>ROLE</strong><br>
        Lighting Technical Assistant<br><br>
        <strong>YEAR</strong><br>
        2026<br><br>
        <strong>STACK</strong><br>
        Python, PyQt/Qt, OpenUSD, Node graph architecture, Git<br><br>
        <strong>GENRE</strong><br>
        Feature animation, DCC Tool Development
    </div>
    <div class="cell border-right col-2">
        <strong>RESPONSIBILITY</strong>
        <ol>
            <li>
                Extended Filament’s drag-and-drop workflow with contextual node creation and cleaner multi-selection behaviour.
            </li>
            <li>
                Conducted lightweight UX validation with lighting artists to compare interaction options and guide the final direction.
            </li>
            <li>
                Refactored the underlying Python/Qt execution flow to preserve consistent user interaction behaviour.
            </li>
        </ol>
    </div>
    <div class="cell col-3">
        <strong>DESCRIPTION</strong><br>
        <a href="https://www.imdb.com/title/tt14413964/"><em>Steps</em></a> is a Netflix feature animation that puts an unconventional spin on the traditional Cinderella story. Its lighting was produced with Filament, a proprietary node-based lighting DCC used in a USD-based pipeline. I redesigned one of its scene-to-graph workflows to make frequent node creation faster and more intuitive.
    </div>
  </div>
</div>

---

{{< figure
  src="/img/portfolio/Steps-Filament.png"
  link="/img/portfolio/Steps-Filament.png"
  alt="Filament and grip components"
  caption="Filament and grip components. *Image from [SIGGRAPH 2020: Grip and Filament: A USD-Based Lighting Workflow](https://animallogic.com/technology/publications/grip-and-filament-a-usd-based-lighting-workflow/).*">}}

How did a small artist request become a workflow and architecture redesign? Once upon a time, in a lighting department...

## 01 A Small Request

One day, an artist brought me a simple request:

{{< figure
  src="/img/portfolio/Steps-artist-request.png"
  link="/img/portfolio/Steps-artist-request.png"
  alt="Artist request"
  width="350">}}

Prune is a frequently used node in our lighting workflow. The request was less about the key itself than about reducing the steps between selecting something in the scene and creating the node they needed.

The shortcut was a valid option, but **P** was already assigned, so it would need to become **Ctrl/Cmd + P**. Filament also had an established drag-and-drop interaction: dropping a scene item from the hierarchy into the graph **always** created the same Path node. That behaviour revealed a second path: could the existing drag-and-drop let artists choose what to create after the drop?

## 02 Choosing the Interaction<br><small>Shortcut vs. contextual drag-and-drop</small>

To compare the two directions, I built a quick Figma prototype and asked six members of the lighting team, including artists and one TD, to try both interactions.

<figure style="margin: 0 0 24px;">
  <div style="display: flex; flex-wrap: nowrap; justify-content: center; align-items: center; gap: 16px;">
    <img src="/img/portfolio/Steps-figma-hit-P.gif"
         alt="Figma mockup: hit hotkey P to prune"
         style="max-width: calc(50% - 8px); height: auto;">
    <img src="/img/portfolio/Steps-figma-drag-and-drop.gif"
         alt="Figma mockup: drag and drop"
         style="max-width: calc(50% - 8px); height: auto;">
  </div>

  <figcaption style="text-align: center; margin-top: 8px; font-size: 14px; color: #777;">
    Figma mockup. Left: hit P to prune; Right: drag-and-drop
  </figcaption>
</figure>

{{< figure
  src="/img/portfolio/Steps-figma-user-test.png"
  link="/img/portfolio/Steps-figma-user-test.png"
  alt="Figma prototype test result"
  width="650">}}

Of the six participants, two preferred the shortcut and four preferred drag-and-drop. Their comments added useful context, but the stronger takeaway was that drag-and-drop already fit the artists’ mental model. So I decided to pivot from the shortcut to drag-and-drop.

While refining the interaction, I also simplified multi-selection. Instead of creating a path-based node for every selected scene item, the new interaction produced one combined node for the whole selection.

{{< figure
  src="/img/portfolio/Steps-no-yes.png"
  link="/img/portfolio/Steps-no-yes.png"
  alt="Artists prefer one selection, one operation"
  width="400">}}
<br>

It kept the graph cleaner and matched the artist’s intent: one selection, one operation.


## 03 It Works... Mostly<br><small>Except that one drag stopped behaving like one action</small>

I soon found that the existing drag-and-drop implementation was much more complex than “drop something in, create a node.” Some scene objects had type-specific behaviour that I needed to preserve. The handler also classified *and* executed each dropped item in the same pass.

Adding a contextual QMenu changed that flow. The menu needed to block until the artist made a choice, but opening it inside the active transaction would enter a nested event loop while Filament was still in its busy state.

My first solution was to move the QMenu between two transactions.

<figure style="margin: 0 0 24px;">
  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; gap: 16px;">
    <a href="/img/portfolio/Steps-v1-before-change.png" style="min-width: 0;">
      <img src="/img/portfolio/Steps-v1-before-change.png"
           alt="Workflow before the change"
           style="display: block; width: 100%; height: auto;">
    </a>
    <a href="/img/portfolio/Steps-v2-PR-version.png" style="min-width: 0;">
      <img src="/img/portfolio/Steps-v2-PR-version.png"
           alt="Workflow in the PR version"
           style="display: block; width: 100%; height: auto;">
    </a>
  </div>
  <figcaption style="text-align: center; margin-top: 8px; font-size: 14px; color: #777;">
    Left: Workflow before the change. Right: Workflow in the first implementation: moving the QMenu between two transactions.
  </figcaption>
</figure>

This solved the immediate UI constraint. But code review and mixed-selection testing exposed the problem: 
1. One drag could require two Undo steps, so a single Undo removed only part of the result.
2. If the artist dismissed the QMenu after the first transaction had already changed the graph, cancelling could still leave partial changes behind.

The nested event loop itself was not the problem. It was timing. The graph was changing before the artist’s full intent had been resolved.

## 04 Refactoring Around User Intent<br><small>Classify → Prompt → Execute!</small>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; gap: 24px; margin: 0 0 24px;">
  <a href="/img/portfolio/Steps-v3-final.png" style="min-width: 0;">
    <img src="/img/portfolio/Steps-v3-final.png"
         alt="Final workflow architecture: Classify and Gather, Prompt, Execute"
         style="display: block; width: 100%; height: auto;">
  </a>
  <div style="min-width: 0;">
    <p>To fix the inconsistency, I refactored the drop operation around a simple rule: resolve the artist’s intent before changing the graph.</p>
    <p>I separated the operation into three stages:</p>
    <ol>
      <li>
        <strong>Classify</strong> prepares the dropped items and any existing type-specific confirmations without changing the graph.
      </li>
      <li>
        <strong>Prompt</strong> uses the contextual QMenu to collect the artist’s choice.
      </li>
      <li>
        <strong>Execute</strong> is the only stage that enters the busy state and transaction, so all graph changes happen in one place.
      </li>
    </ol>
    <p>The refactor turned one drag back into one coherent action: one Undo step, no partial changes on cancel, and one combined node for multi-selection.</p>
    <p>Understand intent first. Mutate state second.</p>
  </div>
</div>

## 05 Happily Ever After<br><small>And What Came Next</small>

The feature shipped with a much shorter workflow:

**drag selection → choose action → get a populated node**

Soon after release, artists started asking for more frequently used node types in the quick menu. What began as a faster way to create Prune had grown into a reusable workflow for lighting artists.

{{< figure
  src="/img/portfolio/Steps-happily-ever-after.gif"
  link="/img/portfolio/Steps-happily-ever-after.gif"
  alt="Happily ever after"
  width="500">}}
<br>
<br>
<br>

<details class="portfolio-disclosure">
  <summary><span class="portfolio-disclosure-arrow" aria-hidden="true"></span> <span>The End?</span></summary>

## 06 When the Rules Changed<br><small>User choice vs. legacy behaviour</small>

After release, an artist pointed out an inconsistency. Some specialized scene items already had their own drag-and-drop behaviour. Even after the new menu asked the artist what they wanted to create, those older rules could still override that choice.

Once the interface explicitly asks for the artist’s intent, should hidden legacy behaviour still win?

Before the contextual menu existed, type-specific behaviour made sense because the tool never asked what the artist wanted to create. The new interaction changed that assumption: the artist was now making an explicit choice. I therefore explored a model where object type shapes which actions are available, but the artist’s choice determines the result.

{{< figure
  src="/img/portfolio/Steps-interaction-model.png"
  link="/img/portfolio/Steps-interaction-model.png"
  alt="Interaction model"
  width="600">}}
<br>

Mixed selections made the scope problem clearer. Showing an action that applied to only part of the selection would make the command ambiguous.

If an action appears in the menu, it applies to the entire dragged selection.

</details>
