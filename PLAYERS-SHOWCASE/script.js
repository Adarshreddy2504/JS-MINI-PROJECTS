document.addEventListener('DOMContentLoaded',() =>{
    const searchInput=document.getElementById('search-player');
    const countDisplay=document.getElementById('player-count');
    const cards=document.querySelectorAll('.card');

    function updateCount() {
        const visibleCards=[...cards].filter(card => card.style.display !== 'none');
        countDisplay.textContent=visibleCards.length;
    }

    searchInput.addEventListener('input',()=>{
        const query=searchInput.value.trim().toLowerCase();

        cards.forEach(card=>{
            const name=card.querySelector('h3').textContent.toLowerCase();
            const role=card.querySelector('.role').textContent.toLowerCase();
            const matches=name.includes(query) || role.includes(query);
            card.style.display=matches ? '' : 'none';
        });

        updateCount();
    });

    const savedFavorites=JSON.parse(localStorage.getItem('favoritePlayers') || '[]');

    function getPlayerName(card){
        return card.querySelector('h3').textContent.trim();
    }

    function saveFavorites(favorites) {
        ocalStorage.setItem('favoritePlayers', JSON.stringify(favorites));
    }

    cards.forEach(card=>{
        const favoriteBtn=card.querySelector('.favorite-btn');
        const playerName=getPlayerName(card);

        if(savedFavorites.includes(playerName)){
            favoriteBtn.classList.add('active');
        }

        favoriteBtn.addEventListener('click', () => {
        favoriteBtn.classList.toggle('active');

        let favorites=JSON.parse(localStorage.getItem('favoritePlayers') || '[]');

        if (favoriteBtn.classList.contains('active')) {
            favorites.push(playerName);
        }
        else{
            favorites=favorites.filter(name=>name !== playerName);
        }

        saveFavorites(favorites);
        });
    });

    updateCount();
});