# Back-end Analysis

## Role

- EO: Event Organizer
- User

### Feature 1

1. Event Discovery & Details
    - `GET`: Get all events
    - `GET`: Get event based on category or location

2. Event Transaction & Promotion
    - `POST`: (EO) Create event (title, price, date, time, location, description, available seats, ticket types)
        - ticket types: (e.g: VIP, Regular)

    - `POST`: (EO) Create promo (promo name, expire at, discout)

3. Event Reviews & Ratings
    - `POST`: (User) Create review => after event

### Feature 2

4. User Authentication & Authorization
    - `POST`: Create account as User (user generating referral number) or EO (not generating referral number, could create promo)
    - `POST`: Login to the website as User
    - `GET`: verify token on User & EO when login
    - `GET`: verify token & verify account when registered

5. Referral Number, Points & Prizes
    - `PATCH`: Updating points for user (each 10.000 point lasts for 3 months)
        - point table
    - For those registered using referral number, first transaction get 10% discount

6. Event Management Dashboard
    - `POST`: Login to the dashboard as EO
    - `GET`: Fetching the sales table for each EO

### Database

##### User Table
- name
- email
- password
- referral number
- points (pointId referring to Point Table)

##### EO Table

##### Event Table

##### Point Table
- id
- userId (references to User Table)
- issued at
