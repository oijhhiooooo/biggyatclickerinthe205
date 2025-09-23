// I'll split it up eventually

let player = {
  clicks: 0,
  totalclicks: 0,
  upgrades: 0,
  prestiges: 0,
  rebirths: 0,
  totalerclicks: 0,
  totalestclicks: 0
}
let nosave
let autoprestige = false
let autoupgrade = false

costDict = {
  1000: 2708547.410783619,
  10000: 896692478.2493894,
  100000: 1970876423692347400,
  500000: 6.7897983458132445e+34,
  1000000: 1.2821082647855862e+47,
  1500000: 3.159440434999831e+56,
  2000000: 2.5421491668012782e+64,
  2500000: 2.309321708045139e+71,
  3000000: 4.4666333891204856e+77,
  3500000: 2.6794137504177706e+83,
  4000000: 6.367097606383963e+88,
  4500000: 7.102705678872235e+93,
  5000000: 4.208489658968185e+98,
  5500000: 1.4538235958597762e+103,
  6000000: 3.1477162923802556e+107,
  6500000: 4.52425462290798e+111,
  7000000: 4.522735202040813e+115,
  7500000: 3.2675887497861176e+119,
  8000000: 1.761779256534671e+123,
  8500000: 7.283646492591084e+126,
  9000000: 2.363101849394061e+130,
  9500000: 6.138076007222429e+133,
  10000000: 1.2988161184214631e+137
}

function deletesave() {
  localStorage.removeItem("gamesave")
  nosave = true
  location.reload()
}

function geom(n) {
  return 0.5 * n * (n + 1);
}
function getPrestigeProgress() {
  return Math.max(Math.pow(player.totalclicks, 0.225) / Math.pow(getPrestigeCost(), 0.225), 0)
}
function getscore() {
  prestigefactor = Math.min(player.prestiges + Math.min(getPrestigeProgress(), 1), 30 + player.rebirths * 5)
  rebirthfactor = sigmarebirth()
  return prestigefactor + rebirthfactor
}
function sigmarebirth() {
  res = 0
  for (i = 0; i < player.rebirths; i++) {
    res += getRebCost(i)
  }
  return res
}

let displayedProgress = 0
function progressBar() {
  progress = 0

  if (player.rebirths >= 1) {
    progress = Math.pow((player.prestiges + Math.min(getPrestigeProgress(), 1)) / getRebirthCost(), 0.7)
  } else if (player.prestiges < 1) {
    progress = player.totalclicks / getPrestigeCost()
  } else if (player.prestiges < 10) {
    progress = Math.pow((player.prestiges + Math.min(getPrestigeProgress(), 1)) / 10, 0.7)
  } else {
    progress = Math.pow((player.prestiges + Math.min(getPrestigeProgress(), 1) - 10) / (getRebirthCost() - 10), 0.7)
  }


  progress = Math.min(progress, 1)
  if (displayedProgress == 0) displayedProgress = progress

  displayedProgress -= (displayedProgress - progress) * 0.035
  document.getElementById("progressbar").style.width = displayedProgress * 100 + "%"
}


setInterval(save, 5000)
function save() {
  if (nosave) return
  localStorage.setItem("gamesave", JSON.stringify(player))
}

function load() {
  var save = localStorage.getItem("gamesave")
  if (save !== null) player = JSON.parse(save); console.log(player)
  if (save.length < 4) player.totalclicks = player.clicks
} 

function getmarcogain() {
  return (player.upgrades + 1) * Math.pow(getPrestigeExponent(), player.prestiges + 0) * (player.rebirths + 1 + 3 * Math.min(player.rebirths, 1) + 0.5 * Math.pow(player.rebirths, 2))
}

function buttonclick() {
  console.log("clicked") + getPrestigeCost().toString()
  gain = getmarcogain()
  player.clicks += gain
  player.totalclicks += gain
  player.totalerclicks += gain
  player.totalestclicks += gain
  var audio = new Audio('clicksoundeffect.ogg');
  audio.play();
  spawnParticles(event);
}

function format(n) {
  if (n < 1000) {
    return n.toFixed(2)
  } else if (n < 1000000) {
    return n.toFixed(0)
  } else {
    logn = Math.floor(Math.log10(n))
    remainder = n / Math.pow(10, logn)
    return remainder.toFixed(3) + "e" + logn.toString()
  }
}

function toggleauto() {
  autoprestige = !autoprestige
}


function calculatetop(x) {
  let res = 0
  for (i = 0; i < x; i++) {
    res += (Math.pow(1.1, Math.sqrt(i)) - 1) * 25 + 5 * (i + 1)
  }
  return res
}

function upgrade1() {
  if (player.clicks >= getUpgrade1Price()) { // 1.25% chance to change "shirt" to "shit", else change to shirt
    if (Math.random() < 0.0125) document.getElementById("shirt").innerHTML = "shit"
    else document.getElementById("shirt").innerHTML = "shirt"
  }

  const sortedKeys = Object.keys(costDict).map(Number).sort((a, b) => b - a);

  for (let key of sortedKeys) {
    if (player.clicks >= costDict[key] && player.upgrades == 0) {
      player.upgrades = key;
      player.clicks -= costDict[key];
    }
  }
  console.log(player.upgrades)

  while (true) {
    let price = getUpgrade1Price();
    if (player.clicks < price) break;
    player.clicks -= price;
    player.upgrades++;
  }
}
function prestige() {
  if (player.totalclicks >= getPrestigeCost()) {
    player.clicks = 0
    player.totalclicks = 0
    player.upgrades = 0
    player.prestiges = Math.floor(player.prestiges + 1)
    if (!autoprestige) triggerAchievement();
  }
}
function rebirth() {
  if (player.prestiges >= getRebirthCost()) {
    player.clicks = 0
    player.totalclicks = 0
    player.upgrades = 0
    player.prestiges = Math.floor(Math.max(player.prestiges / 1.5 - 25, 0))
    player.rebirths++
    player.totalerclicks = 0
  }
}

setInterval(tick, 1000 / 60)
function tick() {


  // save patching
  player.prestiges = Math.max(player.prestiges, 0)
  player.rebirths = Math.max(player.rebirths, 0)
  player.totalclicks = Math.max(player.totalclicks + 0, player.clicks)
  player.totalerclicks = Math.max(player.totalerclicks + 0, player.totalclicks)
  player.totalestclicks = Math.max(player.totalestclicks + 0, player.totalerclicks)


  // automation
  if (autoprestige && player.rebirths >= 3) prestige()
  if (autoupgrade && player.prestiges >= 10) upgrade1()

  // other stuff
  progressBar()
  display()

}

function toggleautoup() {
  autoupgrade = !autoupgrade
}
function getPrestigeCost() {
  return 2500 * Math.pow(Math.min(1.5 + (1.25 / 30) * player.prestiges, 2.75), player.prestiges) / Math.pow(1.2, Math.pow(player.rebirths, 0.6))
}
function getRebirthCost() {
  return getRebCost(player.rebirths)
}
function getRebCost(x) {
  return Math.ceil(30 + x * 5 / Math.pow(1.006, x))
}
function getPrestigeExponent() {
  // 11/12 is growth rate (lower = faster), approaches 0.625
  return 2 + (1 - Math.pow(11 / 12, player.rebirths)) * 0.625
}
function getUpgrade1Price() {
  return (Math.pow(1.1, Math.sqrt(player.upgrades)) - 1) * 25 + 5 * (player.upgrades + 1)
}