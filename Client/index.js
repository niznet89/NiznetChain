import "./index.scss";

const server = "http://localhost:3000";

document.getElementById("get-accounts").addEventListener('click', () => {

  fetch(`${server}/balance`).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data.accounts);
    for (const key in data.accounts) {
      console.log(`${key}: ${data.accounts[key]}`)
      document.getElementById("account-table").insertAdjacentHTML('beforeend', `<tr>
      <th>${key}</th>
      <th>${data.accounts[key]}</th>
    </tr>`);
    }
    //document.getElementById("balance").innerHTML = balance;
  });
});

document.getElementById("transfer-amount").addEventListener('click', () => {
  const sender = document.getElementById("private-key").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;

  const body = JSON.stringify({
    sender, amount, recipient
  });

  const request = new Request(`${server}/send`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' }}).then(response => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});
