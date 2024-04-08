# MarketMosaic: Comprehensive Finance &amp; Investment Database Solution (ERD)

## Introduction:
Navigating the complexities of finance and investments requires a sophisticated yet user-friendly data management solution. Our project, MarketMosaic, is designed to meet the intricate needs of stock traders and brokerage firms by offering a comprehensive database structure that balances in-depth information with accessibility. This platform facilitates the addition, deletion, and modification of critical market data, catering specifically to operations such as initial public offerings (IPOs) by allowing users to create new stock entries and define their attributes and relationships, like incorporating a new stock into a fund.

Currently, **the project's foundation is laid out in an Entity-Relationship Diagram (ERD)**, detailing the structured data storage approach tailored for financial market analysis, including stock prices, volumes, company and sector information, and more. As we progress, **we ring MarketMosaic to life using mySQL for database management, with Java (SpringBoot) powering the the backend, and a React/HTML/JS front-end**. Our technical framework may evolve as we advance towards the implementation phase, ensuring the most efficient and effective solution is developed to support our main users—stock traders and brokerages—in making informed investment decisions.

### Image 1: ERD Diagram Detailing MarketMosaic Database Structure
<img width="1091" alt="Screenshot 2024-03-16 at 11 15 29 AM" src="https://github.com/thiagoamin/MarketMosaic/assets/122248078/2897b3c8-4eea-4980-bd74-07a9cab3b696">

### Image 2: Stock Interface:
<img width="1473" alt="Screenshot 2024-04-08 at 12 17 59 AM" src="https://github.com/thiagoamin/MarketMosaic/assets/122248078/34d49d13-d75a-4b00-97fb-8932247f8630">


### Image 3: Filter Stocks:
<img width="1470" alt="Screenshot 2024-04-08 at 12 19 30 AM" src="https://github.com/thiagoamin/MarketMosaic/assets/122248078/7751a429-c9ad-4996-b62c-6bf011a525a3">


## Data Integrity (Normalizing Relations):
In the development of MarketMosaic, a significant emphasis has been placed on the rigorous process of relational database design, specifically through the methodical decomposition of relations based on identified functional dependencies. This critical step ensures that our database structure adheres to the principles of normalization, specifically achieving the Boyce-Codd Normal Form (BCNF) and the Third Normal Form (3NF) where only primary keys and candidate keys serve as functional dependencies. Such a meticulous approach to decomposition enhances the database's efficiency by eliminating redundancy and ensuring data integrity, making it more streamlined for transaction processing and query optimization. 

Complementing this foundational work, we have crafted SQL Data Definition Language statements to translate our conceptual and logical design into a physical database schema within the Oracle DBMS environment. These SQL statements define the structure of the database by creating tables that reflect the decomposed relations, enforcing key constraints, and establishing relationships through foreign keys. This enables precise control over data entry, ensuring that the database accurately represents the complex relationships inherent in financial data. 

_You can find the normalization process inside ./documents/normalization.pdf_


