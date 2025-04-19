// Отображение из localstorage
function displaySelectedItems()
 {
    const selectedItemsList = document.getElementById('selected-items');
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    // Чистка контейнера
    selectedItemsList.innerHTML = '';

    if (selectedItems.length === 0) 
        {
        selectedItemsList.innerHTML = 'Ничего не выбрано. Чтобы добавить блюда в заказ, <a href="zakaz.html">перейдите на страницу Собрать ланч.</a>';
        document.getElementById('total-price').innerText = `0 руб`;
        return;
    }

    let totalPrice = 0;
    selectedItems.forEach(item => 
        {
        const li = document.createElement('div');
        li.classList.add('selected-item');
        li.innerHTML = `
            <div class="item-info">
                <p>${item.name} - ${item.price} руб</p>
            </div>
            <button class="remove-btn" data-id="${item.id}">Удалить</button>
        `;
        selectedItemsList.appendChild(li);

        totalPrice += parseInt(item.price, 10);
    });

    document.getElementById('total-price').innerText = `${totalPrice} руб`;

    // Обработчик для кнопки удаления
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => 
        {
        button.addEventListener('click', (event) => 
            {
            const itemId = event.target.getAttribute('data-id');
            removeItem(itemId);
        });
    });
}

// Функция удаления блюда
function removeItem(itemId)
 {
    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    selectedItems = selectedItems.filter(item => item.id !== itemId);
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    displaySelectedItems();
}

document.addEventListener("DOMContentLoaded", () =>
     {
    const selectedItemsList = document.getElementById("selected-items");
    const totalPriceElement = document.getElementById("total-price");

    function renderSelectedItems()
     {
        selectedItemsList.innerHTML = "";
        let total = 0;

        const items = JSON.parse(localStorage.getItem("selectedItems")) || [];

        items.forEach((item, index) =>
             {
            const li = document.createElement("li");
            li.textContent = `${item.name} - ${item.price} руб`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Удалить";
            removeButton.style.marginLeft = "10px";
            removeButton.addEventListener("click", () => 
                {
                removeItem(index);
            });

            li.appendChild(removeButton);
            selectedItemsList.appendChild(li);

            total += item.price;
        });

        totalPriceElement.textContent = total;
    }

    function removeItem(index) 
    {
        let items = JSON.parse(localStorage.getItem("selectedItems")) || [];
        items.splice(index, 1);
        localStorage.setItem("selectedItems", JSON.stringify(items));
        renderSelectedItems();
    }

    renderSelectedItems();
});

// Отображение при запуске страницы
document.addEventListener('DOMContentLoaded', displaySelectedItems);
