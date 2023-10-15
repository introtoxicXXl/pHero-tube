function handleButtonClick(buttonId) {
    var buttons = document.querySelectorAll("button");
    buttons.forEach(function (button) {
        if (button.id === buttonId) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

const categoryApi = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    displayCategory(data.data)
}
const displayCategory = (datas) => {
    const categoryContainer = document.getElementById('category-container');
    const button5 = document.getElementById('button5');
    datas.forEach((data, index) => {
        const button = document.createElement("button");
        button.classList = 'btn btn-xs sm:btn-sm md:btn-md lg:btn bg-gray-400 mr-5';
        button.textContent = data.category;
        button.setAttribute("onclick", "loadData(" + data.category_id + ")");
        button.setAttribute("id", "button" + (index + 1));
        button.addEventListener("click", function () {
            handleButtonClick("button" + (index + 1));
        });
        if (index === 0) {
            button.classList.add("active");
            loadData(data.category_id)
        }
        categoryContainer.appendChild(button);
    });
};

const loadData = async (id) => {
    loading(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    sortView(data.data);
    displayData(data.data);
}
const displayData = datas => {
    const displayCard = document.getElementById('display-card');
    const noContent = document.getElementById('no-content');
    displayCard.textContent = '';
    if (datas.length === 0) {
        noContent.classList.remove('hidden');
    } else {
        noContent.classList.add('hidden');
    }
    datas.forEach(data => {
        const div = document.createElement('div');
        div.classList = 'card bg-base-100 shadow-xl';
        div.innerHTML = `
        <div class="relative">
            <img src="${data.thumbnail}" alt="" />
         <div class="">
             <span id="content" class="p-2 text-white rounded text-[10px] absolute top-3/4 right-6" >${(data.others?.posted_date).length > 0 ? convertTime(data.others.posted_date) : ''}</span>
         </div>
        </div>
            <div class="flex mt-3 space-x-3 p-3">
                <div class="avatar">
                        <div class="w-10 h-10 rounded-full">
                            <img src="${data.authors[0].profile_picture}" />
                        </div>
                </div>
                <div>
                    <h2 class="font-bold text-base text-[#171717]">${data.title}</h2>
                    <div class="flex">
                        <p class="text-[#171717B2] text-sm">${data.authors[0].profile_name}</p>
                        <img class="w-5 ml-2" src="${data.authors[0]?.verified ? 'image/fi_10629607.svg' : ''}">

                        </div>
                        <p class="views text-[#171717B2] text-sm mt-2">${data.others.views} views</p>
                </div>
            </div>
        `;
        displayCard.appendChild(div);
    });
    loading(false)
}

const loading = (isLoading) => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden');
    }
};

const convertTime = (num) => {
    const hours = Math.floor(num / 3600);
    const seconds = num % 3600;
    const minutes = Math.floor(seconds / 60);

    return hours + " hrs " + minutes + " min ago";
}
const sortView = () => {
    
    const displayCard = document.getElementById('display-card');
    const cards = Array.from(displayCard.children);

    cards.sort((a, b) => {
        const viewsA = parseInt(a.querySelector('.views').textContent.split('k')[0]);
        const viewsB = parseInt(b.querySelector('.views').textContent.split('k')[0]);
        return viewsB - viewsA;
    });

    displayCard.textContent = '';
    cards.forEach(card => displayCard.appendChild(card));
};

categoryApi()