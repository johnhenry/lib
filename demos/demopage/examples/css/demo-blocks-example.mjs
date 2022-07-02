export default `<div class="application">
      <h1>Demo Blocks</h1>
      <p>
        Decorate classes with the 'demo-block' class to create standard (128px ×
        128px) blocks.
      </p>
      <p>Add the 'demo-block__autocolor' class to cycle through colors.</p>
      <div class="demo-block demo-block__autocolor"></div>
      <div class="demo-block demo-block__autocolor"></div>
      <p>
        Add the 'demo-block__golden' or 'demo-block__golden-inverse' class to
        create 'golden rectangles'
      </p>
      <div class="demo-block demo-block__autocolor demo-block__golden"></div>
      <div
        class="demo-block demo-block__autocolor demo-block__golden-inverse"
      ></div>
      <p>
        Add the '--demo-block__size', '--demo-block__size-width', and
        '--demo-block__size-height' custom properties for custom sizes.
      </p>
      <div
        class="demo-block demo-block__autocolor"
        style="--demo-block__size: 64px"
      ></div>
      <div
        class="demo-block demo-block__autocolor"
        style="--demo-block__size: 32px"
      ></div>
      <div
        class="demo-block demo-block__autocolor"
        style="--demo-block__size-height: 32px; --demo-block__size-width: 128px"
      ></div>
      <p>
        Add the class 'demo-block__a' through 'demo-block h' to create blocks of
        set sizes -- 128 through 1024 pixels).
      </p>
      <p>.demo-block__h</p>
      <div class="demo-block demo-block__autocolor demo-block__h"></div>
      <p>.demo-block__g</p>
      <div class="demo-block demo-block__autocolor demo-block__g"></div>
      <p>.demo-block__f</p>
      <div class="demo-block demo-block__autocolor demo-block__f"></div>
      <p>.demo-block__e</p>
      <div class="demo-block demo-block__autocolor demo-block__e"></div>
      <p>.demo-block__d</p>
      <div class="demo-block demo-block__autocolor demo-block__d"></div>
      <p>.demo-block__c</p>
      <div class="demo-block demo-block__autocolor demo-block__c"></div>
      <p>.demo-block__b</p>
      <div class="demo-block demo-block__autocolor demo-block__b"></div>
      <p></p>
      <p>.demo-block__a</p>
      <div class="demo-block demo-block__autocolor demo-block__a"></div>
      <p>Use 'demo-block__{small, smaller, smallest}' to create small boxes</p>
      <p>.demo-block__small</p>
      <div class="demo-block demo-block__autocolor demo-block__small"></div>
      <p>.demo-block__smaller</p>
      <div class="demo-block demo-block__autocolor demo-block__smaller"></div>
      <p>.demo-block__smallest</p>
      <p>
        Use 'demo-block__{tiny, tinier, tiniest}' to create even smaller boxes
      </p>
      <p>.demo-block__tiny</p>
      <div class="demo-block demo-block__autocolor demo-block__tiny"></div>
      <p>.demo-block__tiny</p>
      <div class="demo-block demo-block__autocolor demo-block__tinier"></div>
      <p>.demo-block__tiniest</p>
      <div class="demo-block demo-block__autocolor demo-block__tiniest"></div>
      <p>
        Use 'demo-block__pixel' and 'demo-block__zero' to create a box of one and
        zero size
      </p>
      <p>.demo-block__pixel</p>
      <div class="demo-block demo-block__autocolor demo-block__pixel"></div>
      <p>.demo-block__zero</p>
      <div class="demo-block demo-block__autocolor demo-block__zero"></div>
    </div>`;

export const style = `
@import url('https://johnhenry.github.io/lib/css/demo-block/0.0.0/index.css');
.application{
  width: 100%;
  height: 100%;
  font-size:0px;
}
.application * {
  font-size:medium;
}
`;

export const title = "Demo Block Example";
const gap = {
  type: "range", //slider,number,date, etc
  description: "set gap between items",
  default: 4,
  min: 1,
  max: 64,
  step: 1,
};

export const variations = {
  More: {
    template: `
<div class="application">
      <h1>Demo Blocks</h1>
      <p>
        Use 'demo-block__{full, half, quarter, eight}' to create a block that scales
        with the container width.
      </p>
      <p>.demo-block__full</p>
      <div class="demo-block demo-block__autocolor demo-block__full"></div>
      <p>.demo-block__half</p>
      <div class="demo-block demo-block__autocolor demo-block__half"></div>
      <div class="demo-block demo-block__autocolor demo-block__half"></div>

      <p>.demo-block__quarter</p>
      <div class="demo-block demo-block__autocolor demo-block__quarter"></div>
      <div class="demo-block demo-block__autocolor demo-block__quarter"></div>
      <div class="demo-block demo-block__autocolor demo-block__quarter"></div>
      <div class="demo-block demo-block__autocolor demo-block__quarter"></div>

      <p>.demo-block__eighth</p>

      <div class="demo-block demo-block__autocolor demo-block__eighth"></div>
      <div class="demo-block demo-block__autocolor demo-block__eighth"></div>
      <div class="demo-block demo-block__autocolor demo-block__eighth"></div>
      <div class="demo-block demo-block__autocolor demo-block__eighth"></div>
      <div class="demo-block demo-block__autocolor demo-block__eighth"></div>
      <div class="demo-block demo-block__autocolor demo-block__eighth"></div>
      <div class="demo-block demo-block__autocolor demo-block__eighth"></div>
      <div class="demo-block demo-block__autocolor demo-block__eighth"></div>
</div>`,
  },
};
