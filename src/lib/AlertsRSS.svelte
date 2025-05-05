<script>
  let fullscreen="smallScreen"
</script>

<section
class={fullscreen === "full" ? "bigScreen" : "smallScreen"}
id={fullscreen === "small" ? "smallScreen" : ""}
>
  <h1>Metservice Warnings
    <button
    class="fullscreen-toggle"
    title={fullscreen === "full" ? "Shrink" : "Enlarge"}
    on:click={() => fullscreen == "full" ? (fullscreen = "small") : (fullscreen = "full")} >
    {fullscreen == "full" ? "🔍➖" : "🔍➕"}
  </button>
  </h1>
  <div id="widgetmain">
    <div id="rsswidget" style="height: 500px;">
      <iframe
        src="https://www.rssfeedwidget.com/getrss.php?time=1730414224022&amp;x=https%3A%2F%2Falerts.metservice.com%2Fcap%2Frss&amp;w=200&amp;h=500&amp;bc=333333&amp;bw=1&amp;bgc=transparent&amp;m=20&amp;it=false&amp;t=(default)&amp;tc=333333&amp;ts=15&amp;tb=transparent&amp;il=true&amp;lc=000000&amp;ls=14&amp;lb=true&amp;id=true&amp;dc=333333&amp;ds=14&amp;idt=true&amp;dtc=284F2D&amp;dts=12"
        border="0"
        frameborder="no"
        style="border: 0; padding: 0; margin: 0; width: 340px; height: 500px;"
        id="rssOutput"
        title="RSS Feed Widget">
        Reading RSS Feed ...
      </iframe>
    </div>
    <div
      style="text-align: right; margin-top: 0; border-top: 1px solid #333333;"
      id="widgetbottom"
    >
      <span style="font-size: 70%">
        <a href="https://www.rssfeedwidget.com">rss feed widget</a>&nbsp;
      </span><br />
    </div>
  </div>
</section>

<style>
  #widgetmain {
    text-align: center;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
  }

  .bigScreen {
        width: 75%;
        height: 700px;
    }
    .bigScreen * {
        padding: 0.3rem;
    }
    .bigScreen h1 {
        font-size: 1.5em;
    } 

    .smallScreen {
        width: 375px;
        height: 375px;
    }
    .fullscreen-toggle {
        cursor: pointer;
        background: none;
        border: none;
        font-size: 1em;
        margin-left: 0.5em;
    }
</style>
