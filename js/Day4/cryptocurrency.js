const API_URL = 'https://api4.binance.com/api/v3/ticker/24hr';
const REFRESH_INTERVAL = 1000;
const STORAGE_KEY = 'cryptoTrackerFavorites';

const cryptoList = document.getElementById('cryptoList');
const cryptoTable = document.getElementById('cryptoTable');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const emptyMessage = document.getElementById('emptyMessage');
const searchInput = document.getElementById('searchInput');
const allTab = document.getElementById('allTab');
const favoritesTab = document.getElementById('favoritesTab');
const favoriteCount = document.getElementById('favoriteCount');
const coinCount = document.getElementById('coinCount');
const lastUpdated = document.getElementById('lastUpdated');

let allCoins = [];
let activeTab = 'all';
let requestInProgress = false;
let lastSuccessfulUpdate = null;
let favoriteSymbols = loadFavorites();

function loadFavorites() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return new Set(Array.isArray(saved) ? saved : []);
    } catch (error) {
        console.warn('관심항목을 불러오지 못했습니다.', error);
        return new Set();
    }
}

function saveFavorites() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...favoriteSymbols]));
    } catch (error) {
        showError('브라우저 저장소에 관심항목을 저장하지 못했습니다.');
    }
}

function formatPrice(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '-';
    return number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: number >= 1000 ? 2 : number >= 1 ? 4 : 8
    });
}

function formatPercent(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '-';
    const prefix = number > 0 ? '+' : '';
    return `${prefix}${number.toFixed(2)}%`;
}

function getChangeClass(value) {
    const number = Number(value);
    if (number > 0) return 'up';
    if (number < 0) return 'down';
    return 'neutral';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
}

function updateSummary(visibleCount) {
    coinCount.textContent = visibleCount.toLocaleString('ko-KR');
    favoriteCount.textContent = favoriteSymbols.size.toLocaleString('ko-KR');
    lastUpdated.textContent = lastSuccessfulUpdate
        ? lastSuccessfulUpdate.toLocaleTimeString('ko-KR')
        : '대기 중';
}

function getVisibleCoins() {
    const query = searchInput.value.trim().toUpperCase();
    return allCoins.filter((coin) => {
        const matchesSearch = coin.symbol.toUpperCase().includes(query);
        const matchesTab = activeTab === 'all' || favoriteSymbols.has(coin.symbol);
        return matchesSearch && matchesTab;
    });
}

function renderCoins() {
    const visibleCoins = getVisibleCoins();
    cryptoList.innerHTML = '';

    const rows = document.createDocumentFragment();
    visibleCoins.forEach((coin) => {
        const isFavorite = favoriteSymbols.has(coin.symbol);
        const changeClass = getChangeClass(coin.priceChangePercent);
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="favorite-cell">
                <button
                    type="button"
                    class="fav-btn ${isFavorite ? 'active' : ''}"
                    data-symbol="${coin.symbol}"
                    aria-label="${coin.symbol} ${isFavorite ? '관심항목 해제' : '관심항목 추가'}"
                    aria-pressed="${isFavorite}"
                    title="${isFavorite ? '관심항목 해제' : '관심항목 추가'}"
                >${isFavorite ? '★' : '☆'}</button>
            </td>
            <td><span class="symbol">${coin.symbol}</span><span class="symbol-sub">Binance Spot</span></td>
            <td class="numeric price">${formatPrice(coin.lastPrice)}</td>
            <td class="numeric change ${changeClass}">${formatPercent(coin.priceChangePercent)}</td>
            <td class="numeric">${formatPrice(coin.highPrice)}</td>
            <td class="numeric">${formatPrice(coin.lowPrice)}</td>
        `;
        rows.appendChild(row);
    });

    cryptoList.appendChild(rows);
    cryptoTable.classList.toggle('hidden', visibleCoins.length === 0);
    emptyMessage.classList.toggle('hidden', visibleCoins.length !== 0);
    loading.classList.add('hidden');
    updateSummary(visibleCoins.length);
}

async function fetchCryptoData() {
    // 이전 요청이 끝나기 전에 새 요청을 보내지 않아 요청이 겹치는 것을 방지합니다.
    if (requestInProgress) return;
    requestInProgress = true;

    try {
        const response = await fetch(API_URL, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`API 요청 실패 (HTTP ${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('API 응답 형식이 올바르지 않습니다.');
        }

        // USDT로 끝나는 거래 심볼만 사용합니다.
        allCoins = data
            .filter((coin) => coin.symbol && coin.symbol.endsWith('USDT'))
            .map((coin) => ({
                symbol: coin.symbol,
                lastPrice: coin.lastPrice,
                priceChangePercent: coin.priceChangePercent,
                highPrice: coin.highPrice,
                lowPrice: coin.lowPrice
            }))
            .sort((a, b) => a.symbol.localeCompare(b.symbol));

        lastSuccessfulUpdate = new Date();
        clearError();
        renderCoins();
    } catch (error) {
        console.error('암호화폐 데이터를 가져오지 못했습니다.', error);
        showError('데이터를 가져오지 못했습니다. 인터넷 연결을 확인하고 잠시 후 다시 시도합니다.');
        if (allCoins.length === 0) {
            loading.classList.add('hidden');
            cryptoTable.classList.add('hidden');
        }
    } finally {
        requestInProgress = false;
    }
}

function setActiveTab(tab) {
    activeTab = tab;
    const showAll = tab === 'all';

    allTab.classList.toggle('active', showAll);
    favoritesTab.classList.toggle('active', !showAll);
    allTab.setAttribute('aria-selected', String(showAll));
    favoritesTab.setAttribute('aria-selected', String(!showAll));
    renderCoins();
}

cryptoList.addEventListener('click', (event) => {
    const button = event.target.closest('.fav-btn');
    if (!button) return;

    const symbol = button.dataset.symbol;
    if (favoriteSymbols.has(symbol)) {
        favoriteSymbols.delete(symbol);
    } else {
        favoriteSymbols.add(symbol);
    }

    saveFavorites();
    renderCoins();
});

searchInput.addEventListener('input', renderCoins);
allTab.addEventListener('click', () => setActiveTab('all'));
favoritesTab.addEventListener('click', () => setActiveTab('favorites'));

// 최초 실행 후 1초 간격으로 데이터를 갱신합니다.
fetchCryptoData();
setInterval(fetchCryptoData, REFRESH_INTERVAL);
