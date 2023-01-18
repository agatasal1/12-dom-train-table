// <!-- Napisz aplikacje 'Rozklad jazdy' -->
// <!-- Aplikacja niech zawiera polaczenia z Warszawy do roznych miast. Zadania aplikacji -->
// <!-- 1. Polaczenia pociagow, to jest to tablica obiektow

// const trainRoutes = [
// {
//   from: 'Warsaw',
//   to: 'Poznań',
//   date: '23.12.2023',
//   time: '12:45',
//   intercity: true
// },
// {
//   from: 'Szczecin',
//   to: 'Poznań',
//   date: '01.02.2023',
//   time: '12:45',
//   intercity: true
// },
// {
//   from: 'Szczecin',
//   to: 'Zakopane',
//   date: '05.05.2023',
//   time: '20:45',
//   intercity: false
// },
// {
//   from: 'Warszawa',
//   to: 'Kraków',
//   date: '23.12.2023',
//   time: '20:45',
//   intercity: false
// },
// {
//   from: 'Wrocław',
//   to: 'Warszawa',
//   date: '03.12.2023',
//   time: '20:45',
//   intercity: false
// },
// ]

// 2. Za pomoca petli forEach, wyswietl na stronie rozklad pociagow (ostyluj zadanie w miare mozliwosci).
// 3. Nad rozkladem jazdy, dodaj wyszukiwarke. Jesli wpisze w wyszukiwarke slowo Warszawa, znajdz wszystkie polaczenia z lub do Warszawy.
// 4. Pod wyszukiwarka stworz checkbox, ktory wyswietli tylko polaczenia intercity.
// 5. Dodaj dynamiczne filtry z datami. Jesli klikniesz w dana date, wyswietla Ci sie polaczenia pociagow z tylko danego dnia.
// -->


import { trainRoutes } from "./trainRoutes"



const departuresTableBody = document.querySelector('#departuresTableBody');
const searchDepartureForm = document.querySelector('#searchDeparture')
const searchRouteInput = document.querySelector('#searchRouteInput')
const parNoTrainsInfo = document.querySelector('#noTrainsInfo')
const btnShowAll = document.querySelector('#btnShowAll')
const checkIsIntericty = document.querySelector('#checkIsIntericty')



let renderedTrainRoutes = trainRoutes


///////////////////wyświetlanie rozkładu

const renderRoutes = () => {

    departuresTableBody.innerHTML = ''

    renderedTrainRoutes.forEach(route => {
        departuresTableBody.innerHTML += `
<tr class='route'>
<td>${route.from}</td>
<td>${route.to}</td>
<td id="date">${route.date}</td>
<td>${route.time}</td>
<td>${route.intercity ? 'Intercity' : 'Inny przewoźnik'} </td>
</tr>
`
    })
}

renderRoutes()


///////////////////obsługa wyszukiwarki

const searchDepartureByStation = (event) => {
    event.preventDefault()

    const filteredRoutes = [];

    const inputValue = searchRouteInput.value.toLowerCase()


    parNoTrainsInfo.innerText = ''

    ///////wyszukanie wszystkich stacji

    const stations = [];

    trainRoutes.forEach((route => {
        if (!stations.includes(route.from)) {
            stations.push(route.from.toLowerCase())
        }
        if (!stations.includes(route.to)) {
            stations.push(route.to.toLowerCase())
        }
    }))

    ///////////sprawdzenie czy wpisana stacja jest w trasach

    if (!stations.includes(inputValue)) {
        parNoTrainsInfo.innerText = 'Brak połączeń ze wskazaną stacją!';
        renderedTrainRoutes = trainRoutes;
        return
    }


    //////////przefiltrowanie stacji
    trainRoutes.forEach((route) => {
        if (route.from.toLowerCase() === inputValue ||
            route.to.toLowerCase() === inputValue) {
            filteredRoutes.push(route)

        }
        renderedTrainRoutes = filteredRoutes;
    })


    renderRoutes();
    checkIsIntericty.checked = false;
    searchRouteInput.value = ''
}



searchDepartureForm.addEventListener('submit', searchDepartureByStation)





/////////////wyszukiwanie po dacie

const searchDepartureByDate = (event) => {
    event.preventDefault()
    const filteredRoutes = [];

    if (event.target.id !== 'date') {
        return
    }

    trainRoutes.forEach(route => {
        if (route.date === event.target.innerText) {
            filteredRoutes.push(route)
        }
    })
    checkIsIntericty.checked = false;
    renderedTrainRoutes = filteredRoutes;
    renderRoutes()
}






departuresTableBody.addEventListener('click', searchDepartureByDate)


/////////////////////pokazanie tylko połączeń intercity

const handleIsIntercityChecked = (event) => {
    event.preventDefault();
    if (event.target.checked) {
        const filteredArray = [];
        renderedTrainRoutes.forEach(route => {
            if (route.intercity) {

                filteredArray.push(route)
            }
        })

        renderedTrainRoutes = filteredArray
        renderRoutes()

    } else {
        renderedTrainRoutes = trainRoutes
        renderRoutes()
    }
}

checkIsIntericty.addEventListener('change', handleIsIntercityChecked)


/////////////////

const renderAllRoutes = (event) => {
    event.preventDefault()
    renderedTrainRoutes = trainRoutes;
    renderRoutes()
    checkIsIntericty.checked = false;
}


btnShowAll.addEventListener('click', renderAllRoutes)