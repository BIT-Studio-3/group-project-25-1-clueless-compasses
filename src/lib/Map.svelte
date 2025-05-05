<script>
  import MapView from "@arcgis/core/views/MapView";
  import Graphic from "@arcgis/core/Graphic";
  import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
  import Point from "@arcgis/core/geometry/Point";
  import WMTSLayer from "@arcgis/core/layers/WMTSLayer";
  import "@arcgis/core/assets/esri/themes/light/main.css";
  import Home from "@arcgis/core/widgets/Home";

  const createMap = (domNode) => {
    const graphicsLayer = new GraphicsLayer();

    // Create the WMTS layer using the URL you provided
    const wmtsLayer = new WMTSLayer({
      url: "https://data.linz.govt.nz/services;key=846b31609e5947cfb627eb8135b8e9a3/wmts/1.0.0/layer/50767/WMTSCapabilities.xml",
      subdomains: ["a", "b", "c", "d"],
    });

    // Create the map view
    const view = new MapView({
      container: domNode,
      map: {
        basemap: "streets-vector",  // Optional, you can change it to 'gray-vector' or another basemap
        layers: [wmtsLayer, graphicsLayer],  // Add WMTS as an overlay layer
      },
      zoom: 13,
      center: [170.51952093430864, -45.86587714349185],
    });
    
    const homeWidget = new Home({
       view: view
    });
    view.ui.add(homeWidget, "top-left"); // Add the Home button to the top-left of the view

    // List of points with labels
    const points = [
      { coords: [170.5195, -45.8659], label: "Otago Polytech" },
      { coords: [170.4958, -45.8804], label: "OtagoCDEM" },
      { coords: [170.5020, -45.8744], label: "Emergency Operations Centre" },
      { coords: [170.32762846702468, -45.94930979874042], label: "Brighton Hall" },
      { coords: [170.62147469142226, -45.84871779750973], label: "Broad Bay Community Centre" },
      { coords: [170.50294148580366,-45.87285713658329], label: "Dunedin Town Hall" },
      { coords: [170.50297628403, -45.87337915409424], label: "Dunedin Centre" },
      { coords: [170.38776715568994, -45.8768017971585], label:"Wingatui Hall"},
      { coords: [170.39359012737134, -45.89778812931163], label:"Fairfield Community Hall"},
      { coords: [170.50181658683823, -45.87714586516688], label:"Otago Regional Council"},
      { coords: [170.5024210500887, -45.87669991256181], label:"Dunedin Community Halls"},
      { coords: [170.34956322345303, -45.876951150281435], label:"Mosgiel Coronation Hall"},
      { coords: [170.6481654569191, -45.83902838425256], label:"Portobello Coronation Hall"},
    ];

    points.forEach(({ coords, label }) => {
      const point = new Point({
        longitude: coords[0],
        latitude: coords[1],
      });

      // Define point symbol
      const pointSymbol = {
        type: "simple-marker",
        color: "red",
        size: "10px",
        outline: {
          color: "black",
          width: 1,
        },
      };

      // Define text symbol
      const textSymbol = {
        type: "text",
        color: "black",
        haloColor: "white",
        haloSize: "2px",
        text: label,
        font: {
          size: 10,
        },
        horizontalAlignment: "left",
        verticalAlignment: "middle",
        xoffset: 10,
        yoffset: -1
      };

      // Create graphics for point and label
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: pointSymbol,
      });

      const textGraphic = new Graphic({
        geometry: point,
        symbol: textSymbol,
      });

      // Add both point and text graphics to the layer
      graphicsLayer.add(pointGraphic);
      graphicsLayer.add(textGraphic);
    });
  };

  let fullscreen="small";
</script>

<section    class={fullscreen === "full" ? "bigScreen" : "smallScreen"}
id={fullscreen === "small" ? "smallScreen" : ""}
>

  <h1>
    Community Centre & Halls
    <button
    class="fullscreen-toggle"
    title={fullscreen === "full" ? "Shrink" : "Enlarge"}
    on:click={() => fullscreen == "full" ? (fullscreen = "small") : (fullscreen = "full")} >
    {fullscreen == "full" ? "🔍➖" : "🔍➕"}
</button>
</h1>
  <div class="buttonContainer">
</div>

<div class="view" use:createMap></div>
</section>

<style>
  section {
    display: grid;
    place-items: center; 
  }

  .view {
    height: 300px;
    width: 350px;
  }

  .smallScreen {
    width: 375px;
    height: 375px;
  }

  .bigScreen {
    width: 75%;
    height: 700px;
  }

  .bigScreen .view {
    width: 700px;
    height: 600px;
  }
  .fullscreen-toggle {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 0.7em;
    margin-left: 0.2sem;
  }

</style>