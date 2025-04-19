document.addEventListener("DOMContentLoaded", () => 
    {
    const selectedItemsList = document.getElementById('selected-items');
    const totalPriceElement = document.getElementById('total-price');
    const form = document.getElementById("order-form");

    function renderSelectedItems() 
    {
        const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

        selectedItemsList.innerHTML = '';

        selectedItems.forEach((item, index) =>
         {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${item.price} руб`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Удалить";
            deleteButton.addEventListener('click', () => removeItem(index));

            listItem.appendChild(deleteButton);
            selectedItemsList.appendChild(listItem);
        });

        updateTotalPrice(selectedItems);
    }

    function removeItem(index)
     {
        const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
        selectedItems.splice(index, 1);
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        renderSelectedItems();
    }

    function updateTotalPrice(selectedItems) 
    {
        const total = selectedItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
        totalPriceElement.textContent = total.toFixed(2) + " руб";
    }

    function saveSelection(category, kind, id, price)
     {
        let selections = JSON.parse(localStorage.getItem("selectedItems")) || [];
        const existingItem = selections.find(item => item.category === category && item.kind === kind);

        if (existingItem) 
            {
            existingItem.id = id;
            existingItem.price = price;
        } else {
            selections.push
            ({
                category: category,
                kind: kind,
                id: id,
                price: price,
                name: `${kind} - ${category}`,
            });
        }

        localStorage.setItem("selectedItems", JSON.stringify(selections));
    }

    renderSelectedItems();

    form.addEventListener("submit", async (e) => 
        {
        e.preventDefault();

        const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

        const drinkSelected = selectedItems.some(item => item.category === 'drink' && item.id);

        if (drinkSelected) 
        {
            alert('Выберите напиток');
            return;
        }

        const hasMainOptions = ['main_course', 'soup', 'salad'].some(type =>
            selectedItems.some(item => item.category === type)
        );

        if (hasMainOptions)
         {
            alert('Выберите хотя бы одно из: суп, салат или главное блюдо');
            return;
        }

        const formData = new FormData(form);
        const orderData = {};

        formData.forEach((value, key) => 
        {
            orderData[key] = value;
        });

        // Собираем полное имя из отдельных частей
        const fullName = `${orderData.first_name} ${orderData.last_name} ${orderData.middle_name}`;
        orderData.full_name = fullName;

        const total = selectedItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

        const payload = {
            user: {
                full_name: orderData.full_name,
                email: orderData.email,
                phone: orderData.phone,
                delivery_address: orderData.delivery_address,
                delivery_type: orderData.delivery_type,
                delivery_time: orderData.delivery_time || null,
                comment: orderData.comment || "",
                subscribe: !!orderData.subscribe
            },
            items: selectedItems,
            total_price: total
        };

        try {
            console.log("Данные, отправляемые на сервер:", payload);
            const response = await fetch("https://edu.std-900.ist.mospolytech.ru", 
                
                {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json",
                    "x-api-key": "33c72675-5f2a-4636-8a22-ec20e9d0a6c6"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok)
             {
                throw new Error("Ошибка при отправке заказа.");
            }

            alert("Заказ успешно отправлен!");
            localStorage.removeItem("selectedItems");
            form.reset();
            window.location.href = "index.html";
        } catch (error) 
        {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при отправке заказа.");
        }
    });
});
