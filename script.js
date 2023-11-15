// Dummy data for monthly sales (in centenas)
const monthlySalesData = {
    "Please Select": {
    },
    "Home Appliences": {
        "Please Select": {
        },
        "Coffee Machine": {
            "Mr Coffee": [50, 70, 30, 40, 60, 80, 90, 50, 70, 30, 40, 60],
            "Super Coffee": [30, 40, 60, 80, 90, 50, 70, 30, 40, 60, 50, 70],
            "Mega Coffee": [60, 80, 90, 50, 70, 30, 40, 60, 50, 70, 30, 40]
        },
        "Refrigerator": {
            "Electrolux": [40, 60, 80, 90, 50, 70, 30, 40, 60, 50, 70, 30],
            "Brastemp": [80, 90, 50, 70, 30, 40, 60, 50, 70, 30, 40, 60],
            "Samsung": [90, 50, 70, 30, 40, 60, 50, 70, 30, 40, 60, 80]
        },
        "Stove": {
            "Electrolux": [70, 30, 40, 60, 80, 90, 50, 70, 30, 40, 60, 50],
            "Brastemp": [50, 70, 30, 40, 60, 80, 90, 50, 70, 30, 40, 60],
            "Mega Stove": [30, 40, 60, 80, 90, 50, 70, 30, 40, 60, 50, 70]
        }
    },
    "Eletronics": {
        "Notebooks": {
            "Samsung": [50, 70, 30, 40, 60, 80, 90, 50, 70, 30, 40, 60],
            "Apple": [30, 40, 60, 80, 90, 50, 70, 30, 40, 60, 50, 70],
            "Asus": [60, 80, 90, 50, 70, 30, 40, 60, 50, 70, 30, 40]
        },
        "Cellphones": {
            "Samsung": [40, 60, 80, 90, 50, 70, 30, 40, 60, 50, 70, 30],
            "Apple": [80, 90, 50, 70, 30, 40, 60, 50, 70, 30, 40, 60],
            "Asus": [90, 50, 70, 30, 40, 60, 50, 70, 30, 40, 60, 80]
        },
        "Television": {
            "Samsung": [70, 30, 40, 60, 80, 90, 50, 70, 30, 40, 60, 50],
            "LG": [50, 70, 30, 40, 60, 80, 90, 50, 70, 30, 40, 60],
            "Other Brands": [30, 40, 60, 80, 90, 50, 70, 30, 40, 60, 50, 70]
        }
    },
    "Forniture": {
        "Table": {
            "Super Wood": [50, 70, 30, 40, 60, 80, 90, 50, 70, 30, 40, 60],
            "HandCraft": [30, 40, 60, 80, 90, 50, 70, 30, 40, 60, 50, 70],
            "Mega Wood": [60, 80, 90, 50, 70, 30, 40, 60, 50, 70, 30, 40]
        },
        "Chair": {
            "Super Wood": [40, 60, 80, 90, 50, 70, 30, 40, 60, 50, 70, 30],
            "HandCraft": [80, 90, 50, 70, 30, 40, 60, 50, 70, 30, 40, 60],
            "Mega Wood": [90, 50, 70, 30, 40, 60, 50, 70, 30, 40, 60, 80]
        },
        "Wardrobe": {
            "Super Wood": [70, 30, 40, 60, 80, 90, 50, 70, 30, 40, 60, 50],
            "HandCraft": [50, 70, 30, 40, 60, 80, 90, 50, 70, 30, 40, 60],
            "Mega Wood": [30, 40, 60, 80, 90, 50, 70, 30, 40, 60, 50, 70]
        }
    },

};


function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    select.innerHTML = ""; 
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.text = option;
        select.add(optionElement);
    });
}


populateSelect("category-select", Object.keys(monthlySalesData));
populateSelect("product-select", ["Please Select"]);
populateSelect("brand-select", ["Please Select"]);


function updateChart() {
    const selectedCategory = document.getElementById("category-select").value;
    const selectedProduct = document.getElementById("product-select").value;
    const selectedBrand = document.getElementById("brand-select").value;

    const selectedData = {
        [selectedCategory]: {
            [selectedProduct]: {
                [selectedBrand]: monthlySalesData[selectedCategory][selectedProduct][selectedBrand]
            }
        }
    };

    renderChart(selectedData);
}


function renderChart(data) {
    const labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const datasets = [];

    for (const category in data) {
        for (const product in data[category]) {
            for (const brand in data[category][product]) {
                const dataset = {
                    label: `${category} - ${product} - ${brand}`,
                    data: data[category][product][brand],
                    fill: false,
                    borderColor: getRandomColor(),
                };
                datasets.push(dataset);
            }
        }
    }

    const ctx = document.getElementById("sales-chart").getContext("2d");
    if (window.myLine) {
        window.myLine.destroy();
    }
    window.myLine = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: datasets,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    labels: labels,
                    position: 'bottom'
                },
                y: {
                    type: 'category',
                    labels: [10,20,30,40,50,60,70,80,90,].reverse(),
                    position: 'left'
                }
            }
        },
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


document.getElementById("category-select").addEventListener("change", () => {
    const selectedCategory = document.getElementById("category-select").value;
    const products = Object.keys(monthlySalesData[selectedCategory]);
    populateSelect("product-select", products);
    populateSelect("brand-select", []);
    updateChart();
});

document.getElementById("product-select").addEventListener("change", () => {
    const selectedCategory = document.getElementById("category-select").value;
    const selectedProduct = document.getElementById("product-select").value;
    const brands = Object.keys(monthlySalesData[selectedCategory][selectedProduct]);
    populateSelect("brand-select", brands);
    updateChart();
});

document.getElementById("brand-select").addEventListener("change", updateChart);


updateChart();
