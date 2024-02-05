window.onload = () => {
  // MENU 
  const links = document.querySelectorAll('nav > ul > li > a');
  let openedLink = null;

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const sublist = link.nextElementSibling;
    link.addEventListener('click', (event) => {

      // Закрываем текущий открытый элемент, если он есть
      if (openedLink && openedLink !== link) {
        openedLink.classList.remove('opened');
        const openedSublist = openedLink.nextElementSibling;
        if (openedSublist) {
          openedSublist.classList.remove('opened');
          const nestedSublists = openedSublist.querySelectorAll('ul');
          nestedSublists.forEach(nestedSublist => nestedSublist.classList.remove('opened'));
        }
      }

      // Открываем или переходим по ссылке
      if (sublist) {
        const isArrowClick = event.target.tagName === 'A' && event.clientX > event.target.getBoundingClientRect().right;

        if (isArrowClick) {
          link.classList.toggle('opened');
          sublist.classList.toggle('opened');
          const nestedSublists = sublist.querySelectorAll('ul');
          nestedSublists.forEach(nestedSublist => {
            nestedSublist.classList.toggle('opened')
          });
          event.preventDefault();
        } else {
          window.location.href = link.href;
        }
      } else {
        window.location.href = link.href;
      }

      // Обновляем текущий открытый элемент
      openedLink = link.classList.contains('opened') ? link : null;
    });
  }


// SEARCH INPUT
  const searchComponent = document.getElementById('search-component');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('results');
  const hideResults = () => searchResults.innerHTML = '';
  const searchProducts = async function(inputValue) {
    if (inputValue === '') {
      searchResults.innerHTML = '';
      return;
    }
    try {
      searchComponent.classList.add('loading');
      const response = await fetch(`https://dummyjson.com/products/search?q=${inputValue}&limit=5&delay=1000`);
      const data = await response.json();
      const products = data.products;
      const resultsHtml = products.map(product => `<li><a href="#"><span>${product.title}</span><span>$${product.price}</span></a></li>`).join('');
      searchResults.innerHTML = resultsHtml;
    } catch (error) {
      console.error('Error:', error);
    }
    finally {
      searchComponent.classList.remove('loading');
    }
  }

  document.addEventListener('click', (event) => {
    if (event.target !== searchInput) {
      hideResults();
    }
  });

  searchInput.addEventListener('input', async (e) => {
    let inputValue = e.target.value;
    await searchProducts(inputValue);
  });

// TERMINAL
const terminalInput = document.querySelector('.terminal_input');
const terminalResult = document.querySelector('.terminal_result');
const lastLogin = localStorage.getItem('lastLogin');
const commandHistory = [];
let commandIndex = -1;
const CUSTOM_COMMANDS = {
  hello: {
    msg: 'Hello'
  },
  /* niestandardowe komendy */
  weather: {
    fetch: async (city) => {
      let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7bb96bdc43ef502bc36c78a30db8b2da`);
      let data = await response.json();
      if (data) {
        return `<pre>Weather in ${city}:</pre>
        <pre>Temperature: ${data.main.temp} °C,</pre>
        <pre>Feels like: ${data.main.feels_like} °C,</pre>
        <pre>Wind speed: ${data.wind.speed} m/s,</pre>
        <pre>Humidity: ${data.main.humidity}%,</pre>
        <pre>Pressure: ${data.main.pressure} hPa</pre>`;
      }
    }
  }
};
const COMMANDS = {
  clear: () => terminalResult.innerHTML = '',
  help: () => Object.keys(COMMANDS).join(', '),
  quote: async () => {
    let response = await fetch('https://dummyjson.com/quotes/random');
    let data = await response.json();
    if (data) return data.quote;
  },
  double: (x) => {
    if (isNaN(x)) return 'Not a number';
    return x * 2;
  },
  ...CUSTOM_COMMANDS
};
localStorage.setItem('lastLogin', new Date().toString()); 
terminalResult.innerHTML += `<pre>Last login: ${lastLogin}</pre>`;
terminalInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const command = this.value.split(' ');
    const action = COMMANDS[command[0]];

    if (action) {
      let result;
      if (typeof action === 'function') {
        result = action(command[1]);
      } else if (action.fetch) {
        result = action.fetch(command[1]);
      } else if (action.msg) {
        result = action.msg;
      }
      if (result instanceof Promise) {
        result.then(res => terminalResult.innerHTML += `<pre>${res}</pre>`);
      } else {
        terminalResult.innerHTML += `<pre>${result}</pre>`;
      }
    } else {
      terminalResult.innerHTML += `<pre>Nieznana komenda: ${command[0]}</pre>`;
    }
    terminalResult.scrollTop = terminalResult.scrollHeight;
    commandHistory.push(this.value);
    commandIndex = commandHistory.length - 1;
    this.value = '';

  } else if (e.key === 'ArrowUp') {
    if (commandIndex >= 0) {
      this.value = commandHistory[commandIndex];
      commandIndex--;
    }
  } else if (e.key === 'ArrowDown') {
    if (commandIndex < commandHistory.length - 1) {
      commandIndex++;
      this.value = commandHistory[commandIndex];
    }
  }
});
}
