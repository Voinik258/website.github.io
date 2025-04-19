// Кнопки
const soupButtons = document.querySelectorAll('[data-kind="fish"], [data-kind="meat"], [data-kind="veg"]');
const mainDishButtons = document.querySelectorAll('[data-kind="fish"], [data-kind="meat"], [data-kind="veg"]');
const drinkButtons = document.querySelectorAll('[data-kind="cold"], [data-kind="hot"]');
const saladButtons = document.querySelectorAll('[data-kind="fish"], [data-kind="meat"], [data-kind="veg"]');
const dessertButtons = document.querySelectorAll('[data-kind="small"], [data-kind="medium"], [data-kind="large"]');

// Сохранение в localstorage
function saveSelection(category, kind, id) 
{
    let selections = JSON.parse(localStorage.getItem("selectedItems")) || [];

    const button = document.getElementById(id);
    const name = button.dataset.name || button.innerText.trim(); // название
    const price = button.dataset.price || button.value || "0";   // цена

    const selectedItem = 
    {
        category,
        kind,
        id,
        name,
        price
    };

    selections.push(selectedItem);
    localStorage.setItem("selectedItems", JSON.stringify(selections));
}

// События на кнопках
soupButtons.forEach(button => 
    {
    button.addEventListener('click', (event) => 
        {
        const kind = event.target.dataset.kind;
        // id - идентификатор
        const id = event.target.id; 
        saveSelection('soup', kind, id);
    });
});

mainDishButtons.forEach(button =>
     {
    button.addEventListener('click', (event) => 
        {
        const kind = event.target.dataset.kind;
        const id = event.target.id;
        saveSelection('main_dish', kind, id);
    });
});

drinkButtons.forEach(button => 
    {
    button.addEventListener('click', (event) =>
         {
        const kind = event.target.dataset.kind;
        const id = event.target.id;
        saveSelection('drink', kind, id);
    });
});

saladButtons.forEach(button => 
    {
    button.addEventListener('click', (event) =>
         {
        const kind = event.target.dataset.kind;
        const id = event.target.id;
        saveSelection('salad', kind, id);
    });
});

dessertButtons.forEach(button => 
    {
    button.addEventListener('click', (event) =>
         {
        const kind = event.target.dataset.kind;
        const id = event.target.id;
        saveSelection('dessert', kind, id);
    });
});

