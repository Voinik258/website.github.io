// Отображение меню
async function displayMenu()
 {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = '<p>Загрузка...</p>';
    
    try 
    {
        // Получение блюд по API
        const response = await fetch('http://lab7-api.std-900.ist.mospolytech.ru/api/dishes');
        
        
        // Проверка на успешности запроса
        if (!response.ok) 
        {
            throw new Error('Не удалось загрузить данные о блюдах');
        }

        // Преобразование в JSON
        const dishes = await response.json();
        
        // Очистка перед добавлением новых данных
        menuContainer.innerHTML = '';

        // Проверка наличия
        if (dishes.length === 0)
         {
            menuContainer.innerHTML = '<p>Нет доступных блюд.</p>';
            return;
        }

        // Группировка по категориям
        const groupedDishes = groupDishesByCategory(dishes);

        for (const category in groupedDishes)
             {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-block');
            categoryDiv.innerHTML = `<h2>${category}</h2>`;

            // Получаем блюда этой категории
            const categoryDishes = groupedDishes[category];
            
            categoryDishes.forEach(dish =>
                {
                const dishDiv = document.createElement('div');
                dishDiv.classList.add('menu-item');
                
                // Строим HTML для отображения каждого блюда
                dishDiv.innerHTML = 
                `
                    <div class="dish-details">
                        <p><strong></strong> <img src="${dish.image}" alt="${dish.name}" width="100"></p>
                        <p><strong></strong> ${dish.name}</p>
                        <p><strong>Количество:</strong> ${dish.count}</p>
                        <p><strong>Цена:</strong> ${dish.price} руб</p>
                    </div>
                    <button class="add-btn" data-id="${dish.id}" data-name="${dish.name}" data-price="${dish.price}">Добавить</button>
                `;

                categoryDiv.appendChild(dishDiv);
            });

            menuContainer.appendChild(categoryDiv);
        }

        // Обработчики для кнопки "добавить"
        const addButtons = document.querySelectorAll('.add-btn');
        addButtons.forEach(button =>
             {
            button.addEventListener('click', (event) =>
             {
                const id = event.target.getAttribute('data-id');
                const name = event.target.getAttribute('data-name');
                const price = event.target.getAttribute('data-price');
                addItemToOrder(id, name, price);
            });
        });

    } catch (error)
     {
        menuContainer.innerHTML = `<p>Ошибка при загрузке данных: ${error.message}</p>`;
    }
}

// Функция группировки блюд по категории
function groupDishesByCategory(dishes) 
{
    return dishes.reduce((acc, dish) => 
        {
        const category = dish.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(dish);
        return acc;
    }, {});
}

// Функция добавления блюда в заказ
function addItemToOrder(id, name, price)
 {
    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const item = { id, name, price };
    selectedItems.push(item);
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    updateOrderPanel();
}

//Обновление панелизаказа
function updateOrderPanel() 
{
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    let totalPrice = 0;

    const panel = document.getElementById('order-panel');
    const itemList = document.getElementById('selected-items');
    itemList.innerHTML = ''; // очищаем список

    selectedItems.forEach(item =>
     {
        totalPrice += parseInt(item.price, 10);

        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} — ${item.price} руб`;
        itemList.appendChild(itemElement);
    });

    document.getElementById('total-price').innerText = `Итого: ${totalPrice} руб`;

    if (selectedItems.length > 0)
    {
        panel.classList.remove('hidden');
        document.getElementById('go-to-order').disabled = false;
    } else 
    {
        panel.classList.add('hidden');
        document.getElementById('go-to-order').disabled = true;
    }
}

document.getElementById('go-to-order').addEventListener('click', () => 
    {
    window.location.href = 'order.html';
});

displayMenu();
updateOrderPanel();




