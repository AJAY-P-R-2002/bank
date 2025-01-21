let users = [];
let currentUser = null;

function showHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('signUpForm').style.display = 'none';
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
}

function showSignUp() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'block';
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'none';
}

function showSignIn() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'none';
    document.getElementById('signInForm').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'none';
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}

function validateID(type, value) {
    if (type === 'aadhar') {
        return /^\d{12}$/.test(value);
    } else { // PAN
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
    }
}

function handleSignUp(event) {
    event.preventDefault();
    
    const name = document.getElementById('signUpName').value;
    const dob = document.getElementById('signUpDOB').value;
    const email = document.getElementById('signUpEmail').value;
    const idType = document.querySelector('input[name="idType"]:checked').value;
    const idNumber = document.getElementById('signUpID').value;
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('signUpConfirmPassword').value;

    // Validation checks
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (!validateID(idType, idNumber)) {
        alert(`Please enter a valid ${idType.toUpperCase()} number!`);
        return;
    }

    if (users.some(u => u.username === username)) {
        alert('Username already exists! Please choose a different username.');
        return;
    }

    if (users.some(u => u.email === email)) {
        alert('Email already registered! Please use a different email.');
        return;
    }

    const user = {
        name,
        dob,
        email,
        idType,
        idNumber,
        username,
        password,
        accountNumber: null,
        balance: 0
    };

    users.push(user);
    alert('Registration successful! Please sign in with your username and password.');
    
    // Clear form
    event.target.reset();
    
    // Redirect to sign in page
    showSignIn();
}

function handleSignIn(event) {
    event.preventDefault();
    
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user;
        document.getElementById('userName').textContent = user.name;
        document.getElementById('accountNumber').textContent = user.accountNumber || 'Not Generated';
        document.getElementById('balance').textContent = user.balance;
        document.getElementById('generateAccBtn').style.display = user.accountNumber ? 'none' : 'block';
        showDashboard();
    } else {
        alert('Invalid username or password!');
    }
}

function generateAccountNumber() {
    const random = Math.floor(Math.random() * 9000000000) + 1000000000;
    const accountNumber = 'CNR' + random;
    
    if (users.some(u => u.accountNumber === accountNumber)) {
        generateAccountNumber(); // Regenerate if duplicate
        return;
    }

    currentUser.accountNumber = accountNumber;
    document.getElementById('accountNumber').textContent = accountNumber;
    document.getElementById('generateAccBtn').style.display = 'none';
    alert('Account number generated successfully!');
}

function handleDeposit(event) {
    event.preventDefault();
    
    if (!currentUser.accountNumber) {
        alert('Please generate an account number first!');
        return;
    }

    const amount = Number(document.getElementById('depositAmount').value);
    currentUser.balance += amount;
    document.getElementById('balance').textContent = currentUser.balance;
    document.getElementById('depositAmount').value = '';
    alert(`Successfully deposited ₹${amount}`);
}

function handleWithdraw(event) {
    event.preventDefault();
    
    if (!currentUser.accountNumber) {
        alert('Please generate an account number first!');
        return;
    }

    const amount = Number(document.getElementById('withdrawAmount').value);
    
    if (amount > currentUser.balance) {
        alert('Insufficient balance!');
        return;
    }

    currentUser.balance -= amount;
    document.getElementById('balance').textContent = currentUser.balance;
    document.getElementById('withdrawAmount').value = '';
    alert(`Successfully withdrawn ₹${amount}`);
}

// Show home page by default
showHome();

function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = chatContainer.style.display === 'none' || chatContainer.style.display === '' ? 'flex' : 'none';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function showTyping() {
    document.getElementById('botTyping').style.display = 'block';
}

function hideTyping() {
    document.getElementById('botTyping').style.display = 'none';
}

function addMessage(message, isUser) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    // Simple rule-based responses
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! How can I assist you today?";
    }
    
    if (message.includes('account')) {
        if (message.includes('open') || message.includes('create')) {
            return "To open a new account, please click the 'Sign Up' button at the top of the page and follow the registration process.";
        }
        if (message.includes('balance')) {
            return "You can check your account balance by signing into your account and viewing your dashboard.";
        }
    }
    
    if (message.includes('loan')) {
        return "We offer various types of loans including Home, Personal, and Business loans. Would you like specific information about any of these?";
    }
    
    if (message.includes('transfer') || message.includes('send money')) {
        return "You can transfer money through your dashboard once you're logged in. Make sure you have generated your account number first.";
    }
    
    if (message.includes('deposit')) {
        return "You can make deposits through your dashboard. Simply log in, enter the amount you wish to deposit, and click the 'Deposit' button.";
    }
    
    if (message.includes('withdraw')) {
        return "To withdraw money, log in to your dashboard, enter the amount you wish to withdraw (ensuring you have sufficient balance), and click the 'Withdraw' button.";
    }

    if (message.includes('contact') || message.includes('support')) {
        return "You can reach our customer support at 1800-XXX-XXXX or visit your nearest Canara Bank branch.";
    }

    if (message.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with?";
    }

    return "I'm not sure about that. Could you please rephrase your question or contact our customer support for more detailed assistance?";
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, true);
    userInput.value = '';
    
    // Show typing indicator
    showTyping();
    
    // Simulate bot thinking and typing
    setTimeout(() => {
        hideTyping();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, false);
    }, 1000);
}


window.onload = function() {
    const language = localStorage.getItem('preferredLanguage');
    if (language) {
        document.getElementById('languageModal').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        applyLanguage(language);
    }
};

// const translations = {
//     en: {
//         // Header
//         title: "Punjab National Bank",
//         signIn: "Sign In",
//         signUp: "Sign Up",
        
//         // Home Page
//         welcome: "Welcome to Punjab National Bank",
//         heroSubtitle: "Your Trusted Banking Partner Since 1906",
        
//         // Features
//         onlineBanking: {
//             title: "Online Banking",
//             description: "Access your account 24/7 with our secure online banking platform"
//         },
//         easyTransfers: {
//             title: "Easy Transfers",
//             description: "Send and receive money instantly with our digital transfer services"
//         },
//         secureBanking: {
//             title: "Secure Banking",
//             description: "Bank with confidence knowing your money is protected"
//         },

//         // Sign Up Form
//         createAccount: "Create Your Account",
//         fullName: "Full Name",
//         dateOfBirth: "Date of Birth",
//         emailId: "Email ID",
//         idType: "ID Type",
//         username: "Username",
//         password: "Password",
//         confirmPassword: "Confirm Password",
//         submitSignUp: "Sign Up",

//         // Sign In Form
//         signInTitle: "Sign In to Your Account",
//         submitSignIn: "Sign In",

//         // Dashboard
//         welcomeUser: "Welcome",
//         accountNumber: "Account Number",
//         balance: "Balance",
//         createNewAccount: "Create New Account Number",
//         deposit: "Deposit",
//         withdraw: "Withdraw",
//         amount: "Amount",

//         // Messages
//         insufficientBalance: "Insufficient balance!",
//         successDeposit: "Successfully deposited ₹",
//         successWithdraw: "Successfully withdrawn ₹",
//         accountGenerated: "Account number generated successfully!"
//     },
//     hi: {
//         // Header
//         title: "पंजाब नैशनल बैंक",
//         signIn: "साइन इन",
//         signUp: "साइन अप",
        
//         // Home Page
//         welcome: "पंजाब नैशनल बैंक में आपका स्वागत है",
//         heroSubtitle: "1906 से आपका विश्वसनीय बैंकिंग साथी",
        
//         // Features
//         onlineBanking: {
//             title: "ऑनलाइन बैंकिंग",
//             description: "हमारे सुरक्षित ऑनलाइन बैंकिंग प्लेटफॉर्म से 24/7 अपने खाते तक पहुंच"
//         },
//         easyTransfers: {
//             title: "आसान स्थानांतरण",
//             description: "हमारी डिजिटल ट्रांसफर सेवाओं से तुरंत पैसे भेजें और प्राप्त करें"
//         },
//         secureBanking: {
//             title: "सुरक्षित बैंकिंग",
//             description: "विश्वास के साथ बैंकिंग करें, आपका पैसा सुरक्षित है"
//         },

//         // Sign Up Form
//         createAccount: "अपना खाता बनाएं",
//         fullName: "पूरा नाम",
//         dateOfBirth: "जन्म तिथि",
//         emailId: "ईमेल आईडी",
//         idType: "पहचान पत्र का प्रकार",
//         username: "यूजरनेम",
//         password: "पासवर्ड",
//         confirmPassword: "पासवर्ड की पुष्टि करें",
//         submitSignUp: "साइन अप करें",

//         // Sign In Form
//         signInTitle: "अपने खाते में साइन इन करें",
//         submitSignIn: "साइन इन करें",

//         // Dashboard
//         welcomeUser: "स्वागत है",
//         accountNumber: "खाता संख्या",
//         balance: "शेष राशि",
//         createNewAccount: "नया खाता संख्या बनाएं",
//         deposit: "जमा करें",
//         withdraw: "निकासी",
//         amount: "राशि",

//         // Messages
//         insufficientBalance: "अपर्याप्त शेष राशि!",
//         successDeposit: "सफलतापूर्वक जमा किया गया ₹",
//         successWithdraw: "सफलतापूर्वक निकाला गया ₹",
//         accountGenerated: "खाता संख्या सफलतापूर्वक बनाई गई!"
//     }
// };

// function setLanguage(lang) {
//     // Save language preference
//     localStorage.setItem('preferredLanguage', lang);
    
//     // Hide modal and show content
//     document.getElementById('languageModal').classList.add('hidden');
//     document.getElementById('mainContent').classList.remove('hidden');
    
//     // Apply language to website
//     applyLanguage(lang);
// }

// // function applyLanguage(lang) {
// //     // Your existing website content translation logic here
// //     if (lang === 'en') {
// //         // Apply English translations
// //         document.title = "Punjab National Bank";
// //         // Add more translation logic for other elements
// //     } else {
// //         // Apply Hindi translations
// //         document.title = "पंजाब नैशनल बैंक";
// //         // Add more translation logic for other elements
// //     }
// // }

// function applyLanguage(lang) {
//     // Set document title
//     document.title = translations[lang].title;
    
//     // Update header content
//     document.querySelector('.logo').textContent = translations[lang].title;
//     document.querySelectorAll('.auth-buttons button')[0].textContent = translations[lang].signIn;
//     document.querySelectorAll('.auth-buttons button')[1].textContent = translations[lang].signUp;
    
//     // Update home page content
//     document.querySelector('.hero-section h1').textContent = translations[lang].welcome;
//     document.querySelector('.hero-section p').textContent = translations[lang].heroSubtitle;
    
//     // Update feature cards
//     const features = document.querySelectorAll('.feature-card');
//     features[0].querySelector('h3').textContent = translations[lang].onlineBanking.title;
//     features[0].querySelector('p').textContent = translations[lang].onlineBanking.description;
//     features[1].querySelector('h3').textContent = translations[lang].easyTransfers.title;
//     features[1].querySelector('p').textContent = translations[lang].easyTransfers.description;
//     features[2].querySelector('h3').textContent = translations[lang].secureBanking.title;
//     features[2].querySelector('p').textContent = translations[lang].secureBanking.description;
    
//     // Update Sign Up form
//     const signUpForm = document.getElementById('signUpForm');
//     signUpForm.querySelector('h2').textContent = translations[lang].createAccount;
//     signUpForm.querySelectorAll('label')[0].textContent = translations[lang].fullName;
//     signUpForm.querySelectorAll('label')[1].textContent = translations[lang].dateOfBirth;
//     signUpForm.querySelectorAll('label')[2].textContent = translations[lang].emailId;
//     signUpForm.querySelectorAll('label')[3].textContent = translations[lang].idType;
//     signUpForm.querySelectorAll('label')[4].textContent = translations[lang].username;
//     signUpForm.querySelectorAll('label')[5].textContent = translations[lang].password;
//     signUpForm.querySelectorAll('label')[6].textContent = translations[lang].confirmPassword;
//     signUpForm.querySelector('button').textContent = translations[lang].submitSignUp;
    
//     // Update Sign In form
//     const signInForm = document.getElementById('signInForm');
//     signInForm.querySelector('h2').textContent = translations[lang].signInTitle;
//     signInForm.querySelectorAll('label')[0].textContent = translations[lang].username;
//     signInForm.querySelectorAll('label')[1].textContent = translations[lang].password;
//     signInForm.querySelector('button').textContent = translations[lang].submitSignIn;
    
//     // Update Dashboard
//     const dashboard = document.getElementById('dashboard');
//     dashboard.querySelector('h2').firstChild.textContent = `${translations[lang].welcomeUser}, `;
//     dashboard.querySelector('.account-info').querySelectorAll('p')[0].firstChild.textContent = 
//         `${translations[lang].accountNumber}: `;
//     dashboard.querySelector('.account-info').querySelectorAll('p')[1].firstChild.textContent = 
//         `${translations[lang].balance}: ₹`;
//     dashboard.querySelector('#generateAccBtn').textContent = translations[lang].createNewAccount;
    
//     // Update transaction forms
//     const transactionForms = document.querySelectorAll('.transaction-form');
//     transactionForms[0].querySelector('h3').textContent = translations[lang].deposit;
//     transactionForms[1].querySelector('h3').textContent = translations[lang].withdraw;
//     transactionForms[0].querySelector('label').textContent = translations[lang].amount;
//     transactionForms[1].querySelector('label').textContent = translations[lang].amount;
//     transactionForms[0].querySelector('button').textContent = translations[lang].deposit;
//     transactionForms[1].querySelector('button').textContent = translations[lang].withdraw;

//     // Update alert messages in the original script
//     window.insufficientBalanceMsg = translations[lang].insufficientBalance;
//     window.successDepositMsg = translations[lang].successDeposit;
//     window.successWithdrawMsg = translations[lang].successWithdraw;
//     window.accountGeneratedMsg = translations[lang].accountGenerated;
// }

// // Update the existing alert messages in your functions
// function handleWithdraw(event) {
//     event.preventDefault();
    
//     if (!currentUser.accountNumber) {
//         alert('Please generate an account number first!');
//         return;
//     }

//     const amount = Number(document.getElementById('withdrawAmount').value);
    
//     if (amount > currentUser.balance) {
//         alert(window.insufficientBalanceMsg);
//         return;
//     }

//     currentUser.balance -= amount;
//     document.getElementById('balance').textContent = currentUser.balance;
//     document.getElementById('withdrawAmount').value = '';
//     alert(window.successWithdrawMsg + amount);
// }

// function handleDeposit(event) {
//     event.preventDefault();
    
//     if (!currentUser.accountNumber) {
//         alert('Please generate an account number first!');
//         return;
//     }

//     const amount = Number(document.getElementById('depositAmount').value);
//     currentUser.balance += amount;
//     document.getElementById('balance').textContent = currentUser.balance;
//     document.getElementById('depositAmount').value = '';
//     alert(window.successDepositMsg + amount);
// }

// function generateAccountNumber() {
//     const random = Math.floor(Math.random() * 9000000000) + 1000000000;
//     const accountNumber = 'PNB' + random;
    
//     if (users.some(u => u.accountNumber === accountNumber)) {
//         generateAccountNumber(); // Regenerate if duplicate
//         return;
//     }

//     currentUser.accountNumber = accountNumber;
//     document.getElementById('accountNumber').textContent = accountNumber;
//     document.getElementById('generateAccBtn').style.display = 'none';
//     alert(window.accountGeneratedMsg);
// }



function updateDateTime() {
    const now = new Date();
    
    // Update date
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    const date = now.toLocaleDateString(undefined, options);
    document.getElementById('date').textContent = date;
    
}
updateDateTime();
setInterval(updateDateTime, 1000);