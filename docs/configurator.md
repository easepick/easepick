---
layout: default
nav: Configurator
title: "Configurator"
description: ""
nav_order: 1
permalink: /configurator
---

# Configurator <sup class="text-red">β</sup>
{: .no_toc }

<div id="app">
  <div class="app-picker-layout">
    <div> 
    <input id="app-picker"/>
    <input id="app-picker-end"/>
    </div>
  </div>
  <div class="app-wrapper">
    <div class="packages-list"></div>
    <div class="package-options">
      <div class="pkg-options-content"></div>
    </div>
  </div>

  <blockquote class="inform">
    <p>Currently some options may not be available in the configurator.</p>
    <p><span>You want to display all options anyway ?</span> <a href="#" id="yes-btn">Yes</a> <a href="#" id="no-btn">No</a></p>
  </blockquote>

  <h2 class="no_toc" id="installation">
    <a href="#installation" class="anchor-heading" aria-labelledby="installation">
      <svg viewBox="0 0 16 16" aria-hidden="true"><use xlink:href="#svg-link"></use></svg>
    </a> 
    Installation
  </h2>

  <div class="package-install">
    <div class="tabs-wrapper tabs-horizontal">
      <div class="tabs uppercase">
        <div class="tab active">
          <input type="radio" name="package_install" checked/>
          bundle
        </div>
        <div class="tab">
          <input type="radio" name="package_install"/>
          modular
        </div>
      </div>
      <div class="contents">
        <div class="tab-content active">
          <div class="tabs-wrapper tabs-vertical">
            <div class="tabs uppercase">
              <div class="tab active">npm</div>
              <div class="tab">cdn</div>
            </div>
            <div class="contents bg">
              <div class="tab-content active" id="bundle-npm">bundle npm</div>
              <div class="tab-content" id="bundle-cdn">bundle cdn</div>
            </div>
          </div>
        </div>
        <div class="tab-content">
          <div class="tabs-wrapper tabs-vertical">
            <div class="tabs uppercase">
              <div class="tab active">npm</div>
              <div class="tab">cdn</div>
            </div>
            <div class="contents bg">
              <div class="tab-content active" id="modular-npm">modular npm</div>
              <div class="tab-content" id="modular-cdn">modular cdn</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="no_toc" id="quick-example">
    <a href="#quick-example" class="anchor-heading" aria-labelledby="quick-example">
      <svg viewBox="0 0 16 16" aria-hidden="true"><use xlink:href="#svg-link"></use></svg>
    </a> 
    Quick example
  </h2>

  <div class="language-bash highlighter-rouge">
    <div class="highlight">
<pre class="highlight"><code id="quick-example-code"></code></pre>
    </div>
  </div>
</div>