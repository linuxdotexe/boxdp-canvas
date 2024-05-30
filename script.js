const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Load background image
const img = new Image();

let footerH = 50;

let titleFontSize = 40;
let title = "A Ghost Story (2017), dir. David Lowery";
let titleH = 60;

let titlePosition;
let byPosition;
let starsPosition;
let contentPosition;

let containerPadding = 75;

let byFontSize = 25;
let by = "Review by sai nivas mangu (@kenough_)";
let byH = 40;
let contentFontSize = 35;
let contentH;
let containerH;
let starsHeight = 50;
let gaps = 10 * 4;
let gapBetweenFooterAndContent = 50;
let containerHeightStart;

let content =
  "this film left a white blanket on my being. its done some damage, i know i need answers, but i dont know the questions. i dont know what this white blanket is. i dont know how i get to fix this hole it made in me. i dont know anything.";

function wrapText(context, text, x, y, line_width, line_height) {
  let line = "";
  let total_height = 0;
  ctx.font = `325 ${contentFontSize}px Karla`;
  let paragraphs = text.split("\n");
  for (let i = 0; i < paragraphs.length; i++) {
    let words = paragraphs[i].split(" ");
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > line_width && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += line_height;
        total_height += line_height;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
    y += line_height;
    total_height += line_height;
    contentH = total_height;
    line = "";
  }
}

function fillBg(ctx, img) {
  // get the scale
  // it is the min of the 2 ratios
  let scaleFactor = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  // Finding the new width and height based on the scale factor
  let newWidth = img.width * scaleFactor;
  let newHeight = img.height * scaleFactor;

  // get the top left position of the image
  // in order to center the image within the canvas
  let x = canvas.width / 2 - newWidth / 2;
  let y = canvas.height / 2 - newHeight / 2;

  // When drawing the image, we have to scale down the image
  // width and height in order to fit within the canvas
  ctx.drawImage(img, x, y, newWidth, newHeight);
}

function contentContainer(ctx) {
  // danke, stackoverflow
  CanvasRenderingContext2D.prototype.roundRect = function (
    x,
    y,
    width,
    height,
    radius
  ) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, 0);
    this.arcTo(x, y + height, x, y, 0);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
  };

  // container div
  containerH =
    titleH +
    byH +
    contentH +
    starsHeight +
    gaps +
    footerH +
    gapBetweenFooterAndContent;
  containerHeightStart = 1080 - containerH;

  ctx.fillStyle = "#11101180";
  ctx.roundRect(
    0,
    // canvas.height / 2 - footerH,
    containerHeightStart,
    canvas.width,
    // canvas.height / 2,
    containerH,
    100
  );
  ctx.fill();
}

function fillTitle(ctx, titleText, isTransparent) {
  // title
  ctx.letterSpacing = "-2.28px";
  ctx.font = `600 ${titleFontSize}px Karla`;
  if (isTransparent) {
    ctx.fillStyle = "#D9D9D900";
  } else {
    ctx.fillStyle = "#D9D9D9";
  }
  titlePosition = containerHeightStart + containerPadding;
  ctx.fillText(titleText, 50, titlePosition);
}

function fillBy(ctx, byText, isTransparent) {
  // by
  ctx.letterSpacing = "-2.28px";
  ctx.font = `300 ${byFontSize}px Karla`;
  if (isTransparent) {
    ctx.fillStyle = "#D9D9D900";
  } else {
    ctx.fillStyle = "#D9D9D9";
  }
  byPosition = titlePosition + byH;
  ctx.fillText(byText, 50, byPosition);
}

function fillContent(ctx, content, isTransparent) {
  // content
  ctx.letterSpacing = "-1.58px";
  ctx.font = `325 ${contentFontSize}px Karla`;
  if (isTransparent) {
    ctx.fillStyle = "#D9D9D900";
  } else {
    ctx.fillStyle = "#D9D9D9";
  }
  contentPosition = starsPosition + 85;
  console.log(byPosition);
  wrapText(ctx, content, 50, contentPosition, 980, contentFontSize + 5);
}

function fillFooter(ctx) {
  // footer text
  let tmdb = new Image();
  tmdb.onload = function () {
    ctx.drawImage(tmdb, 50, canvas.height - footerH);
  };
  tmdb.src = "./images/tmdb.svg";

  let box = new Image();
  box.onload = function () {
    ctx.drawImage(box, canvas.width - 258.54, canvas.height - footerH);
  };
  box.src = "./images/letterboxd.svg";

  let logo = new Image();
  logo.onload = function () {
    ctx.drawImage(logo, canvas.width / 2 - 30, canvas.height - 75);
  };
  logo.src = "./images/logo.svg";
}

function makeStars(ctx, count, isPartial) {
  let initX = 50;
  starsPosition = byPosition + starsHeight / 2;
  for (let i = 0; i < count; i++) {
    let img = new Image();
    img.onload = function () {
      ctx.drawImage(img, initX, starsPosition);
      initX += 55;
    };
    img.src = "./images/star.svg";
  }
  if (isPartial) {
    let img = new Image();
    img.onload = function () {
      ctx.drawImage(img, initX, starsPosition + 5.5);
      initX += 40;
    };
    img.src = "./images/half_star.svg";
  }
}

img.onload = () => {
  // fill the image
  fillBg(ctx, img);
  // call items for measurement
  fillContent(ctx, content, true);
  // got our measurements, now draw container
  contentContainer(ctx);
  // now add elements
  fillTitle(ctx, title, false);
  fillBy(ctx, by, false);
  makeStars(ctx, 4, true, true);
  fillContent(ctx, content, false);
  fillFooter(ctx);
};
img.src = "./images/bg.jpg";
