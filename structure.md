<!-- TODO -->

verify user auth by getting a value from the protected routes on the server

> resolve .env error
> resolve redirect errors on the client

---

company oriented:
can have multiple companies, each with different credentials and schemas (under same database)
eaach company can have multiple users, each user with custom credentials.
if a user logins, he will be able to manipulate data from the schema of the company in which he is registered.

<!-- Schemas -->

> a new one is created whenever a new company is registered.
> a user will also be created with admin rights for that very schema --> read about it.

<!-- tables -->

> Users -> contains the list of all registered users within the company.
> materials -> table that contains the actual inventory with refrences to other tables.
> suppliers
> warehouses
> category

<!-- Client Side -->
<!-- UI Flow -->

> user enters the app.
> landing page has options to login and sign up.

<!-- signup -->

> email id, password is required.
> after varification, user is taken to the profile setup page, where the user enters company details such as addrss, logo etc.
> then the user taken to the main app interface.

<!-- signin -->

> after logging in, user is taken to the main app.
