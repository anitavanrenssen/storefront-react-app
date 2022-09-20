# storefront-react-app

This is my tast test application for the Scandiweb Trainee/Junior React Developer position.

The application was built using React, class components and npm create-react-app.
Apollo client was used as GraphQL client.
No state management libraries were used, but following this assignment, Redux is next on my list to learn.
I made use of CSS modules for styling.

The application features a storefront application which consists of 3 pages - a category, product and cart page, together with a cart overlay. 
The category page lists all products, as well as products filtered by category name.
The product page displays the product's details as well as a product gallery.
The cart page and overlay displays all products added to cart, each with selected attributes.

A currency switcher is present where the currency of the store can be changed.

Selected currency as well as products added to cart are persistent with the use of localStorage.

A product can only be added to the cart from the category page if it does not have any attributes. 
