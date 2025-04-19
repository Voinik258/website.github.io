document.addEventListener('DOMContentLoaded', () => 
    {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const selectedList = document.getElementById('selected-items');
    const totalPriceElement = document.getElementById('total-price');

    let total = 0;

    selectedItems.forEach(item => 
        {
        const li = document.createElement('li');
        li.textContent = `${item.name} — ${item.price} руб.`;
        selectedList.appendChild(li);
        total += item.price;
    });

    totalPriceElement.textContent = total;
});
