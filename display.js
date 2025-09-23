function display() {
  document.getElementById("sigmacount").innerHTML = format(player.clicks)
  document.getElementById("totalcount").innerHTML = format(player.totalclicks)
  document.getElementById("totalercount").innerHTML = format(player.totalerclicks)
  document.getElementById("totalestcount").innerHTML = format(player.totalestclicks)

  document.getElementById("clicksper").innerHTML = format(getmarcogain())
  document.getElementById("upgrprice").innerHTML = format(getUpgrade1Price())

  document.getElementById("prestigecount").innerHTML = player.prestiges.toFixed(0)
  document.getElementById("prestigecost").innerHTML = format(Math.max(getPrestigeCost() - player.totalclicks, 0))
  document.getElementById("rebirthcost").innerHTML = format(Math.max(getRebirthCost() - player.prestiges, 0))
  document.getElementById("prestigeexponent").innerHTML = Math.round(getPrestigeExponent() * 1000) / 1000

  document.getElementById("rebirths").innerHTML = player.rebirths.toFixed(0)
  document.getElementById("score").innerHTML = getscore().toFixed(2)
  document.getElementById("minoncount").innerHTML = format(player.upgrades, 0)

  document.getElementById("autoprstgtxt").innerHTML = autoprestige ? "ON" : "OFF"
  document.getElementById("autoupgrtxt").innerHTML = autoupgrade ? "ON" : "OFF"


  // hide "totalm" if upgrade is 0, prestige is 0, or rebirth is 0

  if (player.upgrades == 0 && player.prestiges == 0 && player.rebirths == 0) document.getElementById("totalm").style.display = "none"
  else document.getElementById("totalm").style.display = "block"
  if (player.upgrades == 0 && player.prestiges == 0 && player.rebirths == 0) document.getElementById("upgrtxt").style.display = "none"
  else document.getElementById("upgrtxt").style.display = "block"

  // hide "totalerm" if prestige is 0 or rebirth is 0

  if (player.prestiges == 0 && player.rebirths == 0) document.getElementById("totalerm").style.display = "none"
  else document.getElementById("totalerm").style.display = "block"

  // hide "totalestm" if rebirth is 0

  if (player.rebirths == 0) document.getElementById("totalestm").style.display = "none"
  else document.getElementById("totalestm").style.display = "block"

  // hide "rebirthb" if prestige < 30 and rebirth is 0

  if (player.rebirths == 0 && player.prestiges < 30) document.getElementById("rebirthb").style.display = "none"
  else document.getElementById("rebirthb").style.display = "block"
  if (player.rebirths == 0) document.getElementById("rebirthtxt").style.display = "none"
  else document.getElementById("rebirthtxt").style.display = "block"
  if (player.rebirths >= 3) document.getElementById("autoprstg").style.display = "block"
  else document.getElementById("autoprstg").style.display = "none"
  if (player.prestiges >= 10) document.getElementById("autoupgr").style.display = "block"
  else document.getElementById("autoupgr").style.display = "none"
}