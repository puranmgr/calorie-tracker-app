// Storage Controller




// Item Controller
const ItemCtrl = (function () {
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: [

            {
                id: 0,
                name: 'Bread with Jam',
                calories: 270
            },

            {
                id: 1,
                name: 'Meatball Pasta',
                calories: 800
            },

            {
                id: 2,
                name: 'Chocolate Protein shake',
                calories: 100
            }
        ],

        currentItem: null,
        totalCalories: 0
    }

    // Public methods
    return {
        logData: () => {
            return data;
        }
    }


})();



// UI Controller
const UICtrl = (function () {

    // Public method
    return {

    }

})();



// App Controller
const App = (function (ItemCtrl, UICtrl) {

    // Public methods
    return {
        init: () => {
            console.log('Initializing App...');
        }
    }

})(ItemCtrl, UICtrl);



// Initialize App
App.init();