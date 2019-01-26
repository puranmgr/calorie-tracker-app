// Storage Controller

// Item Controller
const ItemCtrl = (function() {
	// Item Constructor
	const Item = function(id, name, calories) {
		this.id = id;
		this.name = name;
		this.calories = calories;
	};

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
	};

	// Public methods
	return {
		getItems: () => {
			return data.items;
		},
		logData: () => {
			return data;
		}
	};
})();

// UI Controller
const UICtrl = (function() {
	const UISelectors = {
		itemList: '#item-list',
		addBtn: '.add-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories'
	};
	// Public method
	return {
		populateItemList: (items) => {
			let html = '';

			items.forEach((item) => {
				html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>`;
			});

			// Insert list items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},
		getItemInput: () => {
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value
			};
		},
		getSelectors: () => {
			return UISelectors;
		}
	};
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
	// Load event listeners
	const loadEventListeners = () => {
		// Get UI Selectors
		const UISelectors = UICtrl.getSelectors();

		// Add item event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
	};

	// Add item submit
	const itemAddSubmit = (e) => {
		// Get form input from UI Controller
		const input = UICtrl.getItemInput();

		console.log(input);
		e.preventDefault();
	};
	// Public methods
	return {
		init: () => {
			// Fetch items from data structure
			const items = ItemCtrl.getItems();

			// Populate list with items
			UICtrl.populateItemList(items);

			// Load event listeners
			loadEventListeners();
		}
	};
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
