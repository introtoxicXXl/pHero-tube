const categoryApi = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    displayCategory(data.data)
}
const displayCategory = (datas) => {
    const categoryContainer = document.getElementById('category-container');
    datas.forEach(data => {
        // console.log(data)
        const div = document.createElement('div');
        div.innerHTML = `
        <button class="btn bg-gray-400 ml-5 cursor-pointer" onclick="loadData('${data.category_id}')">${data.category}</button>
        `;
        categoryContainer.appendChild(div);
    });
}

const loadData = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    displayData(data.data);
}
const displayData = datas => {
    console.log(datas)
    const displayCard = document.getElementById('display-card');
    const noContent = document.getElementById('no-content');
    displayCard.textContent = '';
    if (datas.length === 0) {
        noContent.classList.remove('hidden');
    } else {
        noContent.classList.add('hidden');
    }
    datas.forEach(data => {
        // console.log(data)
        const div = document.createElement('div');
        div.classList = 'card bg-base-100 shadow-xl';
        div.innerHTML = `
        <figure><img src="${data.thumbnail}" alt="" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${data.category_id}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
        `;
        displayCard.appendChild(div);
    })
}

categoryApi()