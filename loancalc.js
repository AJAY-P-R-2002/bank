document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// EMI Calculator
document.getElementById('emiForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseFloat(e.target.amount.value);
    const rate = parseFloat(e.target.rate.value);
    const tenure = parseFloat(e.target.tenure.value);
    
    const ratePerMonth = rate / (12 * 100);
    const tenureMonths = tenure * 12;
    
    const emi = amount * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths) / 
               (Math.pow(1 + ratePerMonth, tenureMonths) - 1);
    
    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - amount;
    
    document.getElementById('emiAmount').textContent = emi.toFixed(2);
    document.getElementById('totalPayment').textContent = totalPayment.toFixed(2);
    document.getElementById('totalInterest').textContent = totalInterest.toFixed(2);
    document.getElementById('emiResults').style.display = 'block';
});

// Personal Loan Calculator
document.getElementById('personalForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const salary = parseFloat(e.target.salary.value);
    const existingEmi = parseFloat(e.target.existingEmi.value) || 0;
    
    const maxEmiAllowed = salary * 0.5;
    const availableEmi = maxEmiAllowed - existingEmi;
    const eligibleAmount = availableEmi * 36;
    
    document.getElementById('maxEligible').textContent = eligibleAmount.toFixed(2);
    document.getElementById('emiLimit').textContent = availableEmi.toFixed(2);
    document.getElementById('personalResults').style.display = 'block';
});

// Home Loan Calculator
document.getElementById('homeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const propertyValue = parseFloat(e.target.propertyValue.value);
    const downPayment = parseFloat(e.target.downPayment.value);
    const rate = parseFloat(e.target.rate.value);
    const tenure = parseFloat(e.target.tenure.value);
    
    const loanAmount = propertyValue - downPayment;
    const ratePerMonth = rate / (12 * 100);
    const tenureMonths = tenure * 12;
    
    const emi = loanAmount * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths) / 
               (Math.pow(1 + ratePerMonth, tenureMonths) - 1);
    
    document.getElementById('homeLoanAmount').textContent = loanAmount.toFixed(2);
    document.getElementById('homeEmi').textContent = emi.toFixed(2);
    document.getElementById('homeTotalPayment').textContent = (emi * tenureMonths).toFixed(2);
    document.getElementById('homeResults').style.display = 'block';
});

// Car Loan Calculator
document.getElementById('carForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const carValue = parseFloat(e.target.carValue.value);
    const downPayment = parseFloat(e.target.downPayment.value);
    const rate = parseFloat(e.target.rate.value);
    const tenure = parseFloat(e.target.tenure.value);
    
    const loanAmount = carValue - downPayment;
    const ratePerMonth = rate / (12 * 100);
    const tenureMonths = tenure * 12;
    
    const emi = loanAmount * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths) / 
               (Math.pow(1 + ratePerMonth, tenureMonths) - 1);
    
    document.getElementById('carLoanAmount').textContent = loanAmount.toFixed(2);
    document.getElementById('carEmi').textContent = emi.toFixed(2);
    document.getElementById('carTotalPayment').textContent = (emi * tenureMonths).toFixed(2);
    document.getElementById('carResults').style.display = 'block';
});