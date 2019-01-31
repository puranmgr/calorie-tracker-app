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
			// {
			// 	id: 0,
			// 	name: 'Bread with Jam',
			// 	calories: 270
			// },
			// {
			// 	id: 1,
			// 	name: 'Meatball Pasta',
			// 	calories: 800
			// },
			// {
			// 	id: 2,
			// 	name: 'Chocolate Protein shake',
			// 	calories: 100
			// }
		],

		currentItem: null,
		totalCalories: 0
	};

	// Public methods
	return {
		getItems: () => {
			return data.items;
		},
		addItem: (name, calories) => {
			let ID;
			// Create ID
			if (data.items.length > 0) {
				ID = data.items[data.items.length - 1].id + 1;
			} else {
				ID = 0;
			}

			// Calories to number
			calories = parseInt(calories);

			// Create new item
			newItem = new Item(ID, name, calories);

			// Add to items array
			data.items.push(newItem);

			return newItem;
		},
		getItemById: (id) => {
			let found = null;
			// Loop through items
			data.items.forEach((item) => {
				if (item.id === id) {
					found = item;
				}
			});
			return found;
		},
		updateItem: (name, calories) => {
			// Calories to number
			calories = parseInt(calories);

			let found = null;

			data.items.forEach((item) => {
				if (item.id === data.currentItem.id) {
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});
			return found;
		},
		deleteItem: (id) => {
			// Get ids
			const ids = data.items.map((item) => {
				return item.id;
			});
			// Get index
			const index = ids.indexOf(id);
			// Remove item
			data.items.splice(index, 1);
		},
		setCurrentItem: (item) => {
			data.currentItem = item;
		},
		getCurrentItem: (item) => {
			return data.currentItem;
		},
		getTotalCalories: () => {
			let total = 0;

			// Loop through items and add cals
			data.items.forEach((item) => {
				total += item.calories;
			});

			// Set total cal in data structure
			data.totalCalories = total;

			// Return total
			return data.totalCalories;
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
		listItems: '#item-list li',
		addBtn: '.add-btn',
		updateBtn: '.update-btn',
		deleteBtn: '.delete-btn',
		backBtn: '.back-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
		totalCalories: '.total-calories'
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

		addListItem: (item) => {
			// Show the list
			document.querySelector(UISelectors.itemList).style.display = 'block';
			// Create li element
			const li = document.createElement('li');
			// Add class
			li.className = 'collection-item';
			// Add ID
			li.id = `item-${item.id}`;
			// Add HTML
			li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
			// Insert item
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
		},
		updateListItem: (item) => {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			// Turn Node list into array
			listItems = Array.from(listItems);

			listItems.forEach((listItem) => {
				const itemID = listItem.getAttribute('id');

				if (itemID === `item-${item.id}`) {
					document.querySelector(
						`#${itemID}`
					).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
					<a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
				}
			});
		},
		deleteListItem: (id) => {
			const itemID = `#item-${id}`;
			const item = document.querySelector(itemID);
			item.remove();
		},
		clearInput: () => {
			document.querySelector(UISelectors.itemNameInput).value = '';
			document.querySelector(UISelectors.itemCaloriesInput).value = '';
		},
		addItemToForm: () => {
			document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		},

		hideList: () => {
			document.querySelector(UISelectors.itemList).style.display = 'none';
		},
		showTotalCalories: (totalCalories) => {
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		},
		clearEditState: () => {
			UICtrl.clearInput();
			document.querySelector(UISelectors.updateBtn).style.display = 'none';
			document.querySelector(UISelectors.deleteBtn).style.display = 'none';
			document.querySelector(UISelectors.backBtn).style.display = 'none';
			document.querySelector(UISelectors.addBtn).style.display = 'inline';
		},
		showEditState: () => {
			document.querySelector(UISelectors.updateBtn).style.display = 'inline';
			document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
			document.querySelector(UISelectors.backBtn).style.display = 'inline';
			document.querySelector(UISelectors.addBtn).style.display = 'none';
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

		// Disable submit on enter
		document.addEventListener('keypress', (e) => {
			if (e.keyCode === 13 || e.which === 13) {
				e.preventDefault();
				return false;
			}
		});

		// Edit icon click event
		document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

		// Update item event
		document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

		// Delete item event
		document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

		// Back button event
		document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
	};

	// Add item submit
	const itemAddSubmit = (e) => {
		// Get form input from UI Controller
		const input = UICtrl.getItemInput();

		// Check for name and calorie input
		if (input.name !== '' && input.calories !== '') {
			// Add item
			const newItem = ItemCtrl.addItem(input.name, input.calories);
			// Add item to UI list
			UICtrl.addListItem(newItem);
			// Clear fields
			UICtrl.clearInput();
			// Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();

			// Add total calories to UI
			UICtrl.showTotalCalories(totalCalories);
		}
		e.preventDefault();
	};

	// Click edit item
	const itemEditClick = (e) => {
		if (e.target.classList.contains('edit-item')) {
			// Get list item id (item-0, item-1)
			const listId = e.target.parentNode.parentNode.id;

			// Break into an array
			const listIdArr = listId.split('-');

			// Get the actual id
			const id = parseInt(listIdArr[1]);

			// Get item
			const itemToEdit = ItemCtrl.getItemById(id);

			// Set current item
			ItemCtrl.setCurrentItem(itemToEdit);

			// Add item to form
			UICtrl.addItemToForm();
		}
		e.preventDefault();
	};

	// Update item submit
	const itemUpdateSubmit = (e) => {
		// Get item input
		const input = UICtrl.getItemInput();

		// Update item
		const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

		// Update UI
		UICtrl.updateListItem(updatedItem);
		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		// Add total calories to UI
		UICtrl.showTotalCalories(totalCalories);

		UICtrl.clearEditState();
		e.preventDefault();
	};

	// Delete button event
	const itemDeleteSubmit = (e) => {
		// Get current item
		const currentItem = ItemCtrl.getCurrentItem();

		// Delete from data structure
		ItemCtrl.deleteItem(currentItem.id);

		// Delete from UI
		UICtrl.deleteListItem(currentItem.id);

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();

		// Add total calories to UI
		UICtrl.showTotalCalories(totalCalories);

		UICtrl.clearEditState();

		e.preventDefault();
	};
	// Public methods
	return {
		init: () => {
			// Clear edit state / set initial set
			UICtrl.clearEditState();
			// Fetch items from data structure
			const items = ItemCtrl.getItems();

			// Check if any items
			if (items.length === 0) {
				UICtrl.hideList();
			} else {
				// Populate list with items
				UICtrl.populateItemList(items);
			}
			// Load event listeners
			loadEventListeners();
		}
	};
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
