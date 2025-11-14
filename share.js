document.getElementById('sharePortfolioBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // In a real app, this would save to server and return a shareable link
    const portfolioData = getPortfolioData();
    saveToServer(portfolioData).then(link => {
        if (navigator.share) {
            // Use Web Share API if available
            navigator.share({
                title: 'My Portfolio',
                text: 'Check out my professional portfolio',
                url: link
            }).catch(err => {
                fallbackShare(link);
            });
        } else {
            fallbackShare(link);
        }
    });
});

function fallbackShare(link) {
    // Fallback for browsers without Web Share API
    const shareText = `Check out my portfolio: ${link}`;
    
    // Try WhatsApp
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
        window.open(`whatsapp://send?text=${encodeURIComponent(shareText)}`);
    } else {
        // Copy to clipboard as final fallback
        navigator.clipboard.writeText(shareText);
        alert('Link copied to clipboard!');
    }
}

function saveToServer(data) {
    // Simulate API call
    return new Promise(resolve => {
        // In a real app, this would be a fetch() to your backend
        setTimeout(() => {
            const fakeId = Math.random().toString(36).substring(7);
            resolve(`https://portfoliogen.com/share/${fakeId}`);
        }, 500);
    });
}

function getPortfolioData() {
    // Collect all portfolio data
    return {
        name: document.getElementById('slide1-name').textContent,
        profession: document.getElementById('slide1-profession').textContent,
        // Add all other fields
        updatedAt: new Date().toISOString()
    };
}