function focusOnElement(id) {
  document.querySelectorAll(".window-holder").forEach((el) => {
    el.style.zIndex = "-2";
  });
  document.getElementById(id).style["z-index"] = "-1";
}

function dragElement(elmnt) {
  var shadowFight = document.querySelector(".shadowFight");
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (e.target.className == "close") {
      elmnt.style.display = "none";
      apps.find((app) => app.id == elmnt.id).closed = true;
      document.onmouseup = null;
      document.onmousemove = null;
      e.preventDefault();
      return;
    }

    let is_title = e.path.find((el) => {
      return el?.className == "title-bar";
    });
    e = e || window.event;

    focusOnElement(elmnt.id);

    if (is_title == undefined) {
      document.onmouseup = null;
      document.onmousemove = null;
      e.preventDefault();
      return;
    }
    shadowFight.style.left = elmnt.style.left;
    shadowFight.style.top = elmnt.style.top;
    shadowFight.style.width = elmnt.clientWidth + "px";
    shadowFight.style.height = elmnt.clientHeight + "px";
    shadowFight.style.display = "block";

    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  let posLeft = "0px";
  let posTop = "0px";

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // set the element's new position:
    document.querySelector(".shadowFight").style.top =
      shadowFight.offsetTop - pos2 + "px";
    document.querySelector(".shadowFight").style.left = posLeft =
      shadowFight.offsetLeft - pos1 + "px";
    shadowFight.offsetLeft - pos1 + "px";
    posTop = shadowFight.offsetTop - pos2 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.querySelector(".shadowFight").style.display = "none";
    if (Number(posTop.replace("px", "")) < 20) {
      elmnt.style.top = "20px";
    } else {
      elmnt.style.top = posTop;
    }
    elmnt.style.left = posLeft;
  }
}

var apps = [
  {
    id: 1,
    closed: false,
  },
  {
    id: 2,
    closed: true,
  },
  {
    id: 3,
    closed: false,
    center: true,
  },
  {
    id: 4,
    closed: true,
  },
];

window.onload = () => {
  //55% percent of window height
  let height = Math.floor(window.innerHeight * 0.75);
  let width = Math.floor(window.innerWidth * 0.35);

  document.querySelectorAll(".window-pane").forEach((el) => {
    el.style["max-height"] = height + "px";
  });

  document.querySelectorAll(".window-holder").forEach((el) => {
    dragElement(el);
    el.style["max-height"] = height + "px";
    el.style["max-width"] = width + "px";
    if (!apps.find((app) => app.id == el.id).closed) {
        el.style.display = "block";
    }
    if (apps.find((app) => app.id == el.id).center) {
        el.style.left = Math.floor(window.innerWidth / 2 - width / 2) + "px";
        el.style.top = Math.floor(window.innerHeight / 2 - height / 2) + "px";
    }
  });

  document.getElementById("about-dev").onclick = () => {
    let el = document.getElementById("1");
    focusOnElement("1")
    apps.find((app) => app.id == 1).closed = false;
    el.style.display = "block";
    el.style.opacity = 0;
    el.style.left = window.innerWidth / 2 - el.clientWidth / 2 + "px";
    el.style.opacity = 1;
  };

  document.getElementById("alarm-clock").onclick = () => {
    let el = document.getElementById("2");
    focusOnElement("2")
    apps.find((app) => app.id == 2).closed = false;
    el.style.display = "block";
    el.style.opacity = 0;
    el.style.left = window.innerWidth / 2 - el.clientWidth / 2 + "px";
    el.style.opacity = 1;
  };
  document.getElementById("social-media").onclick = () => {
    let el = document.getElementById("3");
    focusOnElement("3")
    apps.find((app) => app.id == 3).closed = false;
    el.style.display = "block";
    el.style.opacity = 0;
    el.style.left = window.innerWidth / 2 - el.clientWidth / 2 + "px";
    el.style.opacity = 1;
  };
  document.getElementById("projects").onclick = () => {
    let el = document.getElementById("4");
    focusOnElement("4")
    apps.find((app) => app.id == 4).closed = false;
    el.style.display = "block";
    el.style.opacity = 0;
    el.style.left = window.innerWidth / 2 - el.clientWidth / 2 + "px";
    el.style.opacity = 1;
  };

  setInterval(() => {
    document.getElementById("date").innerHTML = new Date().toLocaleTimeString();
  });
};
