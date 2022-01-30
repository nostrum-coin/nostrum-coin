/* Moralis init code */
const serverUrl = "https://5a9ogy67ifty.usemoralis.com:2053/server";
const appId = "lBIJQpV9GD0gBWsZ4g1HJ6JkYQwjyExL4Btez0Ry";
Moralis.start({ serverUrl, appId });

function showError(msg){
  var myModal = new bootstrap.Modal(document.getElementById('erroModal'), {
    focus: false,

  });
  document.getElementById('modal-body').innerHTML = msg;
  myModal.toggle();
  myModal.show();
}

function showMsg(msg){
  var myModal = new bootstrap.Modal(document.getElementById('msgModal'), {
    focus: false,
  });
  document.getElementById('modal-msg').innerHTML = "<h3>"+ msg + "</h3>";
  myModal.toggle();
  myModal.show();
}

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  console.log(user);
  if (user) {
    if (confirm('Do you want logout?')) {
      logOut();
    }
  }else{
    user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
      .then(function (user) {
        console.log("logged in user:", user);
        updateUserData()
      })
      .catch(function (error) {
        showError(error.message)
        console.log(error);
      });
  }
}

async function logOut() {
  await Moralis.User.logOut();;
  updateUserData()
}

async function setAvaxBalance() {
  let user = Moralis.User.current();
  let balanceElem = document.getElementById('avaxbalance');

  if (user) {
    avaxBalance = await Moralis.Web3API.account.getNativeBalance({chain: 'avalanche testnet', address:user.get("ethAddress")})
    balanceElem.innerHTML = (avaxBalance.balance / (10**18)).toFixed(6);
    if (balanceElem.classList.contains('placeholder')) {
      balanceElem.classList.remove("placeholder");
    }
  }else{
    if (!balanceElem.classList.contains('placeholder')) {
      balanceElem.classList.add("placeholder");
    }
  }
}

async function setUserNostrum() {
  let user = Moralis.User.current();
  let balanceElem = document.getElementById('nostrumbalance');

  if (user) {
    const options = {chain: "avalanche testnet", address:user.get("ethAddress") };
    tokens = await Moralis.Web3API.account.getTokenBalances(options)
    nostrum = tokens.filter(function (t) {return t.token_address == addressContract.toLowerCase()});
    if(nostrum[0].balance > 9999999){
      balanceElem.style.fontSize = "25px";
      balanceElem.innerHTML = (nostrum[0].balance / (10**18)).toFixed(1);
    }else{
      balanceElem.innerHTML = (nostrum[0].balance / (10**18)).toFixed(6);
    }
    if (balanceElem.classList.contains('placeholder')) {
      balanceElem.classList.remove("placeholder");
    }
  }else{
    if (!balanceElem.classList.contains('placeholder')) {
      balanceElem.classList.add("placeholder");
    }
  }
}

async function updateUserData() {
  let user = Moralis.User.current();
  await Moralis.enableWeb3();

  setAvaxBalance();
  setUserNostrum();
  setInfo();
  setChart();

  if (user) {
    document.getElementById('btn-login').innerHTML = user.get("ethAddress");
    document.getElementById("sendbtn").disabled = false;
    document.getElementById("stackbtn").disabled = false;
    document.getElementById("unstackbtn").disabled = false;
    document.getElementById("votebtn").disabled = false;
  }else{
    document.getElementById('btn-login').innerHTML = 'Connect';
    document.getElementById("sendbtn").disabled = true;
    document.getElementById("stackbtn").disabled = true;
    document.getElementById("unstackbtn").disabled = true;
    document.getElementById("votebtn").disabled = true;
  }
}