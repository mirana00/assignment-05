document.addEventListener("DOMContentLoaded", function(){

// history store
const donationHistoryArray = [];

const donateSection = document.getElementById("donateSection");
const historySection = document.getElementById("historySection");

const donateSectionBtn = document.getElementById("donateSectionBtn");
const historySectionBtn = document.getElementById("historySectionBtn");

const donationHistoryTable = document.getElementById("donationHistory");
let donateBtns = document.querySelectorAll(".donateBtn");


// tpggle section 

donateSectionBtn.addEventListener("click", () => {
    donateSection.classList.remove("hidden");
    historySection.classList.add("hidden");

    donateSectionBtn.classList.add("bg-green-500");
    historySectionBtn.classList.remove("bg-green-500");
    historySectionBtn.classList.add("bg-gray-300");
});

historySectionBtn.addEventListener("click", ()=> {
        donateSection.classList.add("hidden");
         historySection.classList.remove("hidden");

         historySectionBtn.classList.add("bg-green-500");
         donateSectionBtn.classList.remove("bg-green-500");
         donateSectionBtn.classList.add("bg-gray-300");
});

// donation btns

for ( let i = 0; i< donateBtns.length; i++ ) {
    donateBtns[i].onclick = function (event) {
        event.preventDefault();
        

        const parentSection = event.target.closest('.hero');
        const inputDonationDiv = parentSection.querySelector('.inputDonation');
        
        const donationBalanceDiv = parentSection.querySelector('.donationBalance');

        let inputDonation = parseFloat(inputDonationDiv.value);
        let accountBalance = parseFloat(document.getElementById('mainBalanceDesktop').innerText.replace(/,/g, ''));
// console
console.log('inputDonation:', inputDonation);
        console.log('accountBalance:', accountBalance);
        console.log('donationBalanceDiv:', donationBalanceDiv);



        if(isNaN(inputDonation) || inputDonation <=0 || inputDonation> accountBalance) {
            alert("Insufficient balance or negative number");
        }


        else{

            let currentBalance = parseFloat(donationBalanceDiv.innerText.replace(/,/g,''));
            let newDonationBalance = currentBalance + inputDonation;
            donationBalanceDiv.innerText = newDonationBalance.toLocaleString();


            let newAccountBalance = accountBalance - inputDonation;
            document.getElementById('mainBalanceDesktop').innerText = newAccountBalance.toLocaleString();
            document.getElementById('mainBalanceMobile').innerText = newAccountBalance.toLocaleString();
    
               
           
            // donation historuy
            donationHistoryArray.push({
                cause: parentSection.querySelector('h1').innerText,
                amount : inputDonation,
                date : new Date().toLocaleString()
            });

            // update table
            updateDonationHistory();

            // mpdal
            document.getElementById('my_modal_5').showModal();
            inputDonationDiv.value = "";

    }
};
}

function updateDonationHistory(){
    donationHistoryTable.innerHTML = '';
    donationHistoryArray.forEach((donation, index)=> {
        donationHistoryTable.innerHTML += `
         <tr>
        <th>${index + 1}</th>
        <td>${donation.cause}</td>
        <td>${donation.amount.toFixed(2)}</td>
        <td>${donation.date}</td>
     </tr>
  `;

  donationHistoryTable.appendChild(donationHistoryTable);
    });
}

});


// const newRow = document.createElement("tr");

//                 // Insert columns (Number, Amount, Date)
//                 newRow.innerHTML = `
//                     <td>${index + 1}</td>
//                     <td>$${donation.amount.toFixed(2)}</td>
//                     <td>${donation.date}</td>
//                 `;

//                 // Append the row to the table body
//                 donationHistoryTable.appendChild(newRow);