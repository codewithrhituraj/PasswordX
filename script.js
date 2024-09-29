// Function to show feedback when text is copied
function copyText(txt, element) {
    navigator.clipboard.writeText(txt).then(
        () => {
            // Change the icon/text on successful copy
            const originalIcon = element.innerHTML;
            element.innerHTML = "Copied!";
            element.style.color = "green"; // Optional: change color to green

            // Reset icon/text after 1 second
            setTimeout(() => {
                element.innerHTML = originalIcon;
                element.style.color = ""; // Reset color to default
            }, 1000);
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

function maskPassword(pass) {
    return "*".repeat(pass.length);
}

const getFaviconUrl = (website) => {
    try {
        let domain = (new URL(website)).hostname;
        return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
    } catch (error) {
        console.error("Invalid URL:", website);
        return "";
    }
};

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    if (data) {
        let arr = JSON.parse(data);
        let updatedArr = arr.filter((e) => e.website !== website);
        localStorage.setItem("passwords", JSON.stringify(updatedArr));
        alert(`Successfully deleted ${website}'s password`);
        showPasswords();
    }
};

const showPasswords = () => {
    let tb = document.querySelector("tbody");
    let data = localStorage.getItem("passwords");

    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "<tr><td colspan='4'>No Data To Show</td></tr>";
    } else {
        let arr = JSON.parse(data);
        let str = arr.map((element) => `
        <tr>
            <td>
                <img src="${getFaviconUrl(element.website)}" alt="Favicon" class="mr-2" style="width: 16px; height: 16px;">
                ${element.website} <span class="copy-icon" onclick="copyText('${element.website}', this)">📋</span>
            </td>
            <td>${element.username} <span class="copy-icon" onclick="copyText('${element.username}', this)">📋</span></td>
            <td>${maskPassword(element.password)} <span class="copy-icon" onclick="copyText('${element.password}', this)">📋</span></td>
            <td><button class="btn btn-sm btn-danger" onclick="deletePassword('${element.website}')">Delete</button></td>
        </tr>`).join("");

        tb.innerHTML = str;
    }

    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
};

document.querySelector("#passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let passwords = localStorage.getItem("passwords");
    let json = passwords ? JSON.parse(passwords) : [];

    json.push({ website, username, password });
    localStorage.setItem("passwords", JSON.stringify(json));
    
    alert("Password Saved");
    showPasswords();
});

showPasswords();

// Optional: Change background color periodically
setInterval(() => {
    document.body.style.backgroundColor = getRandomColor();
}, 3000);

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
